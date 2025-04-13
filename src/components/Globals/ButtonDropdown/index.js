import * as React from 'react';
import SectionButton from './SectionButton';
import SectionDropdown from './SectionDropdown';

export default function ButtonDropdown(props) {

  const {
    open,
    handleClick,
    handleMenuItemClick,
    handleToggle,
    handleClose,
    options,
    anchorRef,
    selectedIndex,
  } = props

  const buttonDropdown = (
    <>
      <SectionButton {...props}/>
      <SectionDropdown {...props}/>
    </>
  )

  return buttonDropdown;
}
