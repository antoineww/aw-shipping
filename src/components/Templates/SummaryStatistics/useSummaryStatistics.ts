import { ShipmentData } from "@/app/api/metrics/route"
import { useState, useEffect } from "react"

const fetchMetrics = async () => {
  try {
    const response = await fetch("/api/metrics")
    const metrics = await response.json()
    console.log({metrics})
    return metrics
  } catch (error) {
    console.error("Error fetching metrics:", error)
  }
  return null
}

export const useSummaryStatistics = () => {
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null)

  useEffect(() => {
    const setData = async () => setShipmentData(await fetchMetrics())
    setData()
  }, [])

  return { shipmentData }
}
