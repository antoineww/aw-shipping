import {
  dbReadConsolidationOpportunities,
  dbReadShipmentMetrics,
} from "@/utils/data"
import { NextResponse } from "next/server"

export interface ShipmentData {
  totalShipments: number
  shipmentsByStatus: Array<{ status: string; _count: number }>
  shipmentsByCarrier: Array<{ carrier: string; _count: number }>
  shipmentsByMode: Array<{ mode: string; _sum: { volume: number } }>
  warehouseUtilization: number
  shipmentsByDate: Array<{ arrival_date: string; _count: number }>
  consolidationOpportunities: Array<{
    destination: string
    departure_date: string
    shipment_count: number
  }>
}

export async function GET() {
  try {
    const {
      totalShipments,
      shipmentsByStatus,
      shipmentsByCarrier,
      shipmentsByMode,
      warehouseUtilization,
      shipmentsByDate,
    } = await dbReadShipmentMetrics()

    const { consolidationOpportunities } =
      await dbReadConsolidationOpportunities()

    const metrics: ShipmentData = {
      totalShipments,
      shipmentsByStatus,
      shipmentsByCarrier,
      shipmentsByMode,
      warehouseUtilization,
      shipmentsByDate,
      consolidationOpportunities,
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error("Error fetching insights:", error)
    return NextResponse.json(
      { error: "Error fetching insights" },
      { status: 500 }
    )
  }
}
