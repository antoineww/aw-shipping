import { dbReadShipmentsPaginated } from "@/utils/data"
import { NextResponse } from "next/server"

export interface ShipmentsResponse {
  shipments: any
  pagination: any
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const destination = searchParams.get("destination")
    const carrier = searchParams.get("carrier")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")

    const [shipments, total] = await dbReadShipmentsPaginated({
      status,
      destination,
      carrier,
      page,
      limit,
    })

    const shipmentsResponse: ShipmentsResponse = {
      shipments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }

    return NextResponse.json(shipmentsResponse)
  } catch (error) {
    console.error("Error fetching shipments:", error)
    return NextResponse.json(
      { error: "Error fetching shipments" },
      { status: 500 }
    )
  }
}
