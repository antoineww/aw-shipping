'use client';

import * as React from "react"
import ButtonDropdown from "@/components/Globals/ButtonDropdown";

const options = [
  "Create a merge commit",
  "Squash and merge",
  "Rebase and merge",
]

export default function ContainerDropdownTest({ children }) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  const newProps = {
    open,
    handleClick,
    handleMenuItemClick,
    handleToggle,
    handleClose,
    options,
    anchorRef,
    selectedIndex,
  }

  return <ButtonDropdown {...newProps}/>
}
