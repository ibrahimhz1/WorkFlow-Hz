import React from 'react'
import "./dropdownButton.css"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const DropdownButton = ({ role, setRole }) => {
    return (
        <Select
            labelId="role-label"
            id="dropDownComp"
            value={role}
            label="Role"
            onChange={(e)=> setRole(e.target.value)}
            style={{height: '2.5vmax', color: 'white', border: '2px dotted white'}}
        >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="founder">Founder</MenuItem>
        </Select>
    )
}

export default DropdownButton;