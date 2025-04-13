import { writeFile } from "fs/promises"
import { join } from "path"
import { mkdir } from "fs/promises"
import { parse } from "csv-parse/sync"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const UPLOAD_DIR = join(process.cwd(), "uploads")

const createDirIfNotExists = async (path: string) => {
  try {
    await mkdir(path, { recursive: true })
  } catch (error) {
    console.error("Error creating upload directory:", error)
  }
}

export const fileStore = async (file: File) => {
  await createDirIfNotExists(UPLOAD_DIR)

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filePath = join(UPLOAD_DIR, file.name)

  await writeFile(filePath, buffer)

  return buffer
}

export const csvReadAndParse = (buffer: Buffer<ArrayBuffer>) => {
  const csvContent = buffer.toString()
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  })

  return records
}

export const recordProcessAndValidate = (record: any) => ({
  shipment_id: parseInt(record.shipment_id),
  customer_id: parseInt(record.customer_id),
  origin: record.origin,
  destination: record.destination,
  weight: parseInt(record.weight),
  volume: parseInt(record.volume),
  carrier: record.carrier,
  mode: record.mode,
  status: record.status,
  arrival_date: new Date(record.arrival_date),
  departure_date: record.departure_date
    ? new Date(record.departure_date)
    : null,
  delivered_date: record.delivered_date
    ? new Date(record.delivered_date)
    : null,
})

export const dbStore = async (records: any) => {
  const validRecords = records.map(recordProcessAndValidate)

  const uniqueRecordsByShipmentId = validRecords.filter(
    (record: any, index: number, self: any[]) =>
      index === self.findIndex((r) => r.shipment_id === record.shipment_id)
  )

  // Insert/update records in db one by one
  let insertedCount = 0
  for (const record of uniqueRecordsByShipmentId) {
    try {
      await prisma.shipment.upsert({
        where: { shipment_id: record.shipment_id },
        update: record,
        create: record,
      })
      insertedCount++
    } catch (error) {
      console.error(`Error inserting shipment ${record.shipment_id}:`, error)
    }
  }

  return insertedCount
}
