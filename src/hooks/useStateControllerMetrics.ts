"use client"

import { ShipmentData } from "@/app/api/metrics/route"
import { useState, useEffect } from "react"

const fetchMetrics = async () => {
  try {
    const response = await fetch("/api/metrics")
    const metrics: ShipmentData = await response.json()

    return metrics
  } catch (error) {
    console.error("Error fetching metrics:", error)
  }
  return null
}

export const useStateControllerMetrics = (currentPage: any, filters: any) => {
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null)

  useEffect(() => {
    setData_fetchMetrics()
  }, [currentPage, filters])

  const setData_fetchMetrics = async () => setShipmentData(await fetchMetrics())

  useEffect(() => {
    setData_fetchMetrics()
  }, [])

  return { shipmentData }
}
