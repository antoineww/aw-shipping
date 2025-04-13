import * as React from "react"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

export default function SectionButton({
  open,
  handleClick,
  handleToggle,
  options,
  anchorRef,
  selectedIndex,
}) {
  return (
    <ButtonGroup
      variant="contained"
      ref={anchorRef}
      aria-label="Button group with a nested menu"
    >
      <Button onClick={handleClick}>{options[selectedIndex]}</Button>
      <Button
        size="small"
        aria-controls={open ? "split-button-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-label="select merge strategy"
        aria-haspopup="menu"
        onClick={handleToggle}
      >
        <ArrowDropDownIcon />
      </Button>
    </ButtonGroup>
  )
}
