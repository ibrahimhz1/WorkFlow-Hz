import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// material ui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


// react redux 
import { useSelector, useDispatch } from 'react-redux';


const MenuItemOrgs = () => {
    

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
                Organization <ArrowDropDownIcon style={{ fontSize: '1.4vmax' }} />
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
                <MenuItem onClick={handleClose}>Organisation</MenuItem>
                <MenuItem onClick={handleClose}>View All Organisation</MenuItem>
            </Menu>
        </>
    )
}

export default MenuItemOrgs