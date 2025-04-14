"use client"

import { getShipmentDataFromProps_Safe } from "@/utils/helper"

export const SummaryStatistics = (props) => {
  const { shipmentData } = getShipmentDataFromProps_Safe(props)

  const {
    totalShipments,
    warehouseUtilization,
    shipmentsByStatus,
    consolidationOpportunities,
  } = shipmentData

  const onTimeCount =
    shipmentsByStatus.find((s) => s.status === "delivered")?._count || 0
  const delayedCount = totalShipments - onTimeCount

  const onTimeVsDelayedShipments = `On Time: ${onTimeCount} vs Delayed ${delayedCount}`

  const stats = {
    totalShipments,
    onTimeVsDelayedShipments,
    warehouseUtilization: `${warehouseUtilization.toFixed(2)}%`,
    consolidationOpportunities: consolidationOpportunities.length,
  }

  return <>{<pre>{JSON.stringify(stats, null, 2)}</pre>}</>
}
