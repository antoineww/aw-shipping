"use client"

import { useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"
import { Shipment } from "@/hooks/useStateControllerShipments"
import {
  CARRIERS_TYPES_SHIPMENTS,
  DESTINATION_TYPES_SHIPMENTS,
  downloadCSV,
  generateFilename,
  STATUS_TYPES_SHIPMENTS,
} from "@/utils/helper"
import Button from "@mui/material/Button"
import DownloadIcon from "@mui/icons-material/Download"

interface ShipmentManagementTableProps {
  shipments: Shipment[]
  total: number
  page: number
  limit: number
  totalPages: number
  onPageChange: (page: number) => void
  onFilterChange: (filters: {
    status: string
    destination: string
    carrier: string
  }) => void
}

export default function ShipmentManagementTable({
  shipments,
  total,
  page,
  limit,
  totalPages,
  onPageChange,
  onFilterChange,
}: ShipmentManagementTableProps) {
  const [filters, setFilters] = useState({
    status: "",
    destination: "",
    carrier: "",
  })

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) =>
              handleFilterChange("status", e.target.value as string)
            }
          >
            {STATUS_TYPES_SHIPMENTS.map((type) => (
              <MenuItem value={type.value}>{type.text}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Destination</InputLabel>
          <Select
            value={filters.destination}
            label="Destination"
            onChange={(e) =>
              handleFilterChange("destination", e.target.value as string)
            }
          >
            {DESTINATION_TYPES_SHIPMENTS.map((type) => (
              <MenuItem value={type.value}>{type.text}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Carrier</InputLabel>
          <Select
            value={filters.carrier}
            label="Carrier"
            onChange={(e) =>
              handleFilterChange("carrier", e.target.value as string)
            }
          >
            {CARRIERS_TYPES_SHIPMENTS.map((type) => (
              <MenuItem value={type.value}>{type.text}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={() => downloadCSV(shipments, generateFilename())}
        >
          <DownloadIcon />
          Download Current Shipments as CSV
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Shipment ID</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Carrier</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Arrival Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow
                key={shipment.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{shipment.shipment_id}</TableCell>
                <TableCell>{shipment.customer_id}</TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.carrier}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor:
                        shipment.status === "delivered"
                          ? "#e8f5e9"
                          : shipment.status === "intransit"
                          ? "#fff3e0"
                          : "#e3f2fd",
                      color:
                        shipment.status === "delivered"
                          ? "#2e7d32"
                          : shipment.status === "intransit"
                          ? "#ef6c00"
                          : "#1565c0",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      display: "inline-block",
                      fontSize: "0.875rem",
                    }}
                  >
                    {shipment.status}
                  </Box>
                </TableCell>
                <TableCell>
                  {new Date(shipment.arrival_date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
          Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of{" "}
          {total} results
        </Box>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, newPage) => onPageChange(newPage)}
          color="primary"
        />
      </Box>
    </Box>
  )
}
