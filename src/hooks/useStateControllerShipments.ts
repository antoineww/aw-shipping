import { ShipmentsResponse } from "@/app/api/shipments/route"
import { useEffect, useState } from "react"

export interface Shipment {
  id: number
  shipment_id: number
  customer_id: number
  origin: string
  destination: string
  weight: number
  volume: number
  carrier: string
  mode: string
  status: string
  arrival_date: string
  departure_date: string | null
  delivered_date: string | null
}

export const useStateControllerShipments = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalShipments, setTotalShipments] = useState(0)
  const [filters, setFilters] = useState({
    status: "",
    destination: "",
    carrier: "",
  })
  useEffect(() => {
    setData_fetchShipments()
  }, [currentPage, filters])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const fetchShipments = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "50",
        ...(filters.status && { status: filters.status }),
        ...(filters.destination && { destination: filters.destination }),
        ...(filters.carrier && { carrier: filters.carrier }),
      })

      const response = await fetch(`/api/shipments?${params}`)
      const data: ShipmentsResponse = await response.json()

      return data
    } catch (error) {
      console.error("Error fetching shipments:", error)
    }
    return null
  }
  const setData_fetchShipments = async () => {
    const shipmentsResponse: ShipmentsResponse | null = await fetchShipments()
    if (shipmentsResponse) {
      setShipments(shipmentsResponse.shipments)
      setTotalPages(shipmentsResponse.pagination.totalPages)
      setTotalShipments(shipmentsResponse.pagination.total)
    }
  }

  useEffect(() => {
    setData_fetchShipments()
  }, [])

  // return {
  //   currentPage,
  //   setCurrentPage,
  //   shipments,
  //   setShipments,
  //   totalPages,
  //   setTotalPages,
  //   totalShipments,
  //   setTotalShipments,
  //   filters,
  //   setFilters,
  //   handleFilterChange,
  // }

  return {
    shipments,
    total: totalShipments,
    page: currentPage,
    limit: 50,
    totalPages,
    onPageChange: handlePageChange,
    onFilterChange: handleFilterChange,
  }
}
