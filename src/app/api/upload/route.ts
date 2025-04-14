import { NextResponse } from "next/server"
import {
  fileStore,
  csvReadAndParse,
  dbStore,
  fileStoreForStream,
  csvReadAndParseForStream,
  dbStoreViaStreamChunks,
} from "@/utils/data"

export interface UploadResponse {
  filename?: string
  elapsedTime?: string
  message: string
  recordsProcessed: number
}

const upload_method1 = async (file) => {
  // 11 mb file take 7.5 mins
  const buffer = await fileStore(file)
  const records = csvReadAndParse(buffer)
  const insertedCount = await dbStore(records)
  return insertedCount
}

const upload_method2 = async (file) => {
  // 11 mb file takes 1.5 mins
  const filePath = await fileStoreForStream(file)
  const parser = csvReadAndParseForStream(filePath)
  const insertedCount = await dbStoreViaStreamChunks(parser)

  return insertedCount
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // const insertedCount = await upload_method1(file)
    const insertedCount = await upload_method2(file)

    const uploadResponse: UploadResponse = {
      message: "File uploaded and processed successfully",
      recordsProcessed: insertedCount,
    }

    return NextResponse.json(uploadResponse)
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json(
      { error: "Error processing file" },
      { status: 500 }
    )
  }
}
