import React, { useState } from 'react'
// material ui
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';

import SubmitBtn from '../submitBtn/SubmitBtn';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const UsersTable = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <ThemeProvider theme={darkTheme}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </ThemeProvider>
    </div>
  );
}

const MembersRoleAndInfo = () => {
  return (
    <div className='membersRoleAndInfo'>
      <Accordion style={{ backgroundColor: "#101418" }}>
        <AccordionSummary
          style={{ color: "white" }}
          expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><u>Founder</u></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UsersTable />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ backgroundColor: "#101418" }}>
        <AccordionSummary
          style={{ color: "white" }}
          expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><u>Project Managers</u></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UsersTable />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ backgroundColor: "#101418" }}>
        <AccordionSummary
          style={{ color: "white" }}
          expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><u>Project Team Leaders</u></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UsersTable />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ backgroundColor: "#101418" }}>
        <AccordionSummary
          style={{ color: "white" }}
          expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><u>Project Team Members</u></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UsersTable />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


import { createUser, getAllProjectManagers, getAllTeamLeaders, getAllTeamMembers } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
export const CreateUserComp = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState({
    public_id: "abc",
    url: "def"
  });
  const [role, setRole] = useState('teamMember');

  const onSubmitHandler = async()=> {
    const response = await dispatch(createUser({userId, username, name, email, password, avatar, role}));
    if(response.payload){
      setUserId('');
      setUsername('');
      setName('');
      setEmail('');
      setPassword('');
      setAvatar({public_id: "abc", url: "def"});
      setRole('');
      await dispatch(getAllProjectManagers());
      await dispatch(getAllTeamLeaders());
      await dispatch(getAllTeamMembers());
    }
  }

  return (
    <div className='createUserComp'>
      <div className='usercreateForm'>
        <div className="left">
          <Avatar
            alt="razorPay"
            src="https://bit.ly/3RZDdpJ"
            sx={{ width: 150, height: 150 }}
            style={{ border: '2px dotted gray' }}
          />
          <span>Profile Picture</span>
        </div>
        <div className="right">
          <div className="rows">
            <label htmlFor="">User ID</label>
            <input type="text" placeholder='User ID' className="inputbox" value={userId} onChange={(e)=>setUserId(e.target.value)} />
          </div>
          <div className="rows">
            <label htmlFor="">Username</label>
            <input type="text" placeholder='Username' className="inputbox" value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div className="rows">
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Full name' className="inputbox" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="rows">
            <label htmlFor="">Password</label>
            <input type="password" placeholder='Password' className="inputbox" value={password} onChange={(e)=> setPassword(e.target.value)} />
          </div>
          <div className="rows">
            <label htmlFor="">Email Address</label>
            <input type="email" placeholder='Email Address' className="inputbox" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>
          <div className="rows">
            <label htmlFor="">Role</label>
            <Select
              labelId="role-label"
              id="dropDownComp"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
              style={{ height: '2.5vmax', color: 'white', border: '1px dotted white' }}
            >
              <MenuItem value="projectManager">Project Manager</MenuItem>
              <MenuItem value="teamLeader">Team Leader</MenuItem>
              <MenuItem value="teamMember">Team Member</MenuItem>
            </Select>
          </div>
          <div className="rows">
            <SubmitBtn text={"Create"} onSubmitHandler={onSubmitHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}

const UsersListComp = () => {
  const [switchBack, setSwitchBack] = useState(false);

  return (
    <div className='usersListComp'>
      <div className="userHeader">
        <h5> {switchBack === true ? "Create User" : "Members"} </h5>
        <button id="submitBtn" onClick={() => setSwitchBack(!switchBack)}>
          {switchBack === true ? "Cancel" : "Add Members"}
        </button>
      </div>
      <hr />
      {switchBack === false ? <MembersRoleAndInfo /> : <CreateUserComp />}
    </div>
  );
}



const style = {
  width: "80%",
  height: "80%",
  ml: "10%",
  mt: "5%",
  bgcolor: "#101418",
  outline: "none",
  border: "1px dotted gray",
  borderRadius: "0.5vmax",
  color: "white",
  padding: "1vmax"
};

const MenuItemUsers = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className='navItem'
        onClick={handleOpen}
      >Users</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{ overflowY: 'scroll', overflowX: 'hidden' }}
        >
          <UsersListComp />
        </Box>
      </Modal>
    </>

  )
}

export default MenuItemUsers;