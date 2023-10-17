import React from 'react'
import AddIcon from '@mui/icons-material/Add';

// material ui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CreateFormComp from '../forms/CreateFormComp'

const style = {
    width: "80%",
    height: "80%",
    ml: "10%",
    mt: "5%",
    bgcolor: "#101418",
    outline: "none",
    border: "1px dotted gray",
    borderRadius: "0.5vmax",
    color: "white"
};


// react redux 
import { useSelector, useDispatch } from 'react-redux';

   
const MenuItemCreate = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className='navItem createBlue' onClick={handleOpen}>Create<AddIcon style={{ fontSize: '1.4vmax' }} /></div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                    style={{ overflowY: 'scroll' }}
                >
                    <CreateFormComp />
                </Box>
            </Modal>
        </>
    )
}

export default MenuItemCreate;