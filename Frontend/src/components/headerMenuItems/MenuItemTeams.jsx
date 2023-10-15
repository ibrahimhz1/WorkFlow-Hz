import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// material ui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuItemTeams = () => {
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
                Teams <ArrowDropDownIcon style={{ fontSize: '1.4vmax' }} />
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
                <MenuItem onClick={handleClose}>Team 1</MenuItem>
                <MenuItem onClick={handleClose}>Team 2</MenuItem>
                <MenuItem onClick={handleClose}>View All Teams</MenuItem>
            </Menu>
        </>
    )
}

export default MenuItemTeams