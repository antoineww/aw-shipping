"use client"

const DEFAULT_STATS = {
  totalShipments: 0,
  warehouseUtilization: 0,
  shipmentsByStatus: [],
  consolidationOpportunities: [],
}

export const SummaryStatistics = ({ shipmentData }) => {
  const { totalShipments, warehouseUtilization, shipmentsByStatus,consolidationOpportunities } =
    shipmentData || DEFAULT_STATS

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
