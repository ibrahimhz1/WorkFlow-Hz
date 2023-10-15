import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// material ui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuItemProjects = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <>
      <div
        className='navItem'
        onClick={handleClick}
      >
        Projects <ArrowDropDownIcon style={{ fontSize: '1.4vmax' }} />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Project 1</MenuItem>
        <MenuItem onClick={handleClose}>Project 2</MenuItem>
        <MenuItem onClick={handleClose}>View All Projects</MenuItem>
      </Menu>
    </>
  )
}

export default MenuItemProjects