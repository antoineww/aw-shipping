import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import ControlledAccordion from "@/components/Globals/ControlledAccordion"

export default function Home() {
  return (
    <div className="">
      <AppBar>
        <Toolbar>
          <Typography variant="h4" component="div">
            AW Shipping App
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container>
        <Box sx={{ my: 2 }}>
          <ControlledAccordion>
            <div title="Upload CSV Files"></div>
          </ControlledAccordion>

          <Toolbar>
            <Typography variant="h4" component="div">
              Dashboard with Visual Insights
            </Typography>
          </Toolbar>
          <ControlledAccordion>
            <div title="Summary Statistics"></div>
            <div title="Charts and Graphs"></div>
            <div title="Shipment Management Table"></div>
            <div title="Consolidation Recommendations"></div>
          </ControlledAccordion>
        </Box>
      </Container>
    </div>
  )
}
