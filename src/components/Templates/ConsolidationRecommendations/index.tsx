"use client"

import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { getJSONDataView, getShipmentDataFromProps_Safe } from "@/utils/helper"
import { ShipmentData } from "@/app/api/metrics/route"

export const ConsolidationRecommendations = (props) => {
  const { shipmentData } = getShipmentDataFromProps_Safe(props)
  const { consolidationOpportunities } = shipmentData as ShipmentData

  return (
    <Paper sx={{ p: 3 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Destination</TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell align="right">Shipments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consolidationOpportunities.map((opportunity, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{opportunity.destination}</TableCell>
                <TableCell>
                  {new Date(opportunity.departure_date).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      backgroundColor: "#e3f2fd",
                      color: "#1565c0",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      display: "inline-block",
                      fontSize: "0.875rem",
                    }}
                  >
                    {opportunity.shipment_count}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
