import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"

export default function ControlledAccordion({children}) {

  return (
    <div>
      {React.Children.toArray(children).map((child, i) => (
        <Accordion key={`Accordion_${i}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-content${i}`}
            id={`panel-header${i}`}
          >
            <Typography component="span">
              {child.props?.title || `Accordion ${i}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {child ||
              `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.`}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
