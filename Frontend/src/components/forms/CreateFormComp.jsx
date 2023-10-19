import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux'

import SubmitBtn from '../submitBtn/SubmitBtn';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, reporters, theme) {
  return {
    fontWeight:
      reporters.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ToggleMode = ({ type, setType }) => {
  return (
    <div>
      <div className='upper'>
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-primary" value={"org"} onClick={(e) => setType(e.target.value)} active={type === "org" ? true : false}>Organisation</Button>
          <Button variant="outline-primary" value={"project"} onClick={(e) => setType(e.target.value)} active={type === "project" ? true : false}>Project</Button>
          <Button variant="outline-primary" value={"team"} onClick={(e) => setType(e.target.value)} active={type === "team" ? true : false}>Team</Button>
          <Button variant="outline-primary" value={"task"} onClick={(e) => setType(e.target.value)} active={type === "task" ? true : false}>Task</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}


import { createOrg } from '../../features/organisation/orgSlice';

const OrganisationCreateForm = ({ setShow, setToastMsg }) => {
  const [orgId, setOrgId] = useState('');
  const [orgName, setOrgName] = useState('');
  const [desc, setDesc] = useState('');
  const [dept, setDept] = useState('undefined');

  const dispatch = useDispatch();
  const onSubmitHandler = async () => {
    const response = await dispatch(createOrg({ orgId, orgName, desc, dept }));
    if (response.payload) {
      setOrgId('');
      setOrgName('');
      setDesc('');
      setDept('');
    }
  }

  return (
    <>
      <div className='org-create-form'>
        <div className="row1">
          <Avatar
            alt="razorPay"
            src="https://bit.ly/3RZDdpJ"
            sx={{ width: 130, height: 130 }}
            style={{ border: '3px dotted gray' }}
          />
          <span>Organisation Image</span>
        </div>
        <div className="row2">
          <div className='row2Left'>
            <p>Organisation ID</p>
            <p>Organisation Name</p>
            <p>Description</p>
            <p>Department</p>
          </div>
          <div className='row2Right'>
            <Form.Control type="text" placeholder="Organisation 0-1" value={orgId} onChange={(e) => setOrgId(e.target.value)} />
            <Form.Control type="text" placeholder="Datamoth" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
            <Form.Control type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Form.Control type="text" placeholder="Department" value={dept} onChange={(e) => setDept(e.target.value)} />
          </div>
        </div>
      </div>
      <SubmitBtn onSubmitHandler={onSubmitHandler} text={"Create"} />
    </>
  );
}

import { createProject, getAllProjects } from "../../features/project/projectSlice";
const ProjectCreateForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [org, setOrg] = useState({ id: " ", name: " " });
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [projectLead, setProjectLead] = useState({ id: " ", name: " " });
  const [selected, setSelected] = React.useState(useSelector((state) => state.project.addTeamMembers));

  // modal for team members functions
  // redux states
  const orgs = useSelector((state) => state.org.orgs);
  const projectManagers = useSelector((state) => state.user.projectManagers);

  const onSubmitHandler = async () => {
    const converted = selected.map(item => ({ _id: item }));
    await dispatch(createProject({ org, projectId, projectName, desc, category, projectLead, members: converted }));
    dispatch(getAllProjects())
  }

  return (
    <>
      <div className='org-create-form'>
        <div className="row1">
          <Avatar
            alt="razorPay"
            src="https://bit.ly/3RZDdpJ"
            sx={{ width: 70, height: 70 }}
            style={{ border: '2px dotted gray' }}
          />
          <span>Project Image</span>
        </div>
        <div className="row1_5">
          <div className='row1_Left'>
            <span>Organisation</span>
          </div>
          <div className='row1_Right'>
            <Form.Select size="sm" value={org.name} onChange={(e) => {
              const org = JSON.parse(e.target.value);
              setOrg({ id: org.id, name: org.name })
            }}>
              <option value={org.id}>{org.name}</option>
              {
                orgs.map((org) => (
                  <option value={JSON.stringify({ id: org._id, name: org.name })} key={org._id}>{org.name}</option>
                ))
              }
            </Form.Select>
          </div>
        </div>
        <div className="row2">
          <div className='row2Left'>
            <p>Project ID</p>
            <p>Project Name</p>
            <p>Project Description</p>
            <p>Project Category</p>
            <p>Project Lead</p>
            <p>Project Members</p>
          </div>
          <div className='row2Right'>
            <Form.Control type="text" placeholder="Project P-1" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
            <Form.Control type="text" placeholder="Xmonad" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            <Form.Control type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Form.Control type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Form.Select size="sm" value={projectLead.name} onChange={(e) => {
              const projMan = JSON.parse(e.target.value);
              setProjectLead({ id: projMan.id, name: projMan.name })
            }}>
              <option value={projectLead.id}>{projectLead.name}</option>
              {
                projectManagers.map((projMan) => (
                  <option value={JSON.stringify({ id: projMan._id, name: projMan.name })} key={projMan._id}>{projMan.name}</option>
                ))
              }
            </Form.Select>
            <AddTeamMembers selected={selected} setSelected={setSelected} />
          </div>
        </div>
      </div>
      <SubmitBtn onSubmitHandler={onSubmitHandler} text={"Create"} />
    </>
  );
}

const TeamCreateForm = () => {
  const theme = useTheme();
  const [members, setMembers] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMembers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onSubmitHandler = () => {

  }

  return (
    <>
      <div className='org-create-form'>
        <div className="row1">
          <Avatar
            alt="razorPay"
            src="https://bit.ly/3RZDdpJ"
            sx={{ width: 70, height: 70 }}
            style={{ border: '2px dotted gray' }}
          />
          <span>Team Image</span>
        </div>
        <div className="row2">
          <div className='row2Left'>
            <p>Team ID</p>
            <p>Team Name</p>
            <p>Team Description</p>
            <p>Team Lead</p>
            <p>Team Members</p>
          </div>
          <div className='row2Right'>
            <Form.Control type="text" placeholder="Team TM-1" />
            <Form.Control type="text" placeholder="Zenconf" />
            <Form.Control type="text" placeholder="Description" />
            <Form.Select size="sm">
              <option>Dank Dev</option>
            </Form.Select>
            <Select
              sx={{
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={members}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ color: "white", backgroundColor: "#999999" }} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, members, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <SubmitBtn onSubmitHandler={onSubmitHandler} text={"Create"} />
    </>
  );
}

const TaskCreateForm = ({ classes }) => {
  const theme = useTheme();
  const [reporters, setReporters] = useState([]);
  const [subReporters, setSubReporters] = useState([]);
  const [labels, setLabels] = useState([]);
  const [subLabels, setSubLabels] = useState([]);

  const handleChangeReporters = (event) => {
    const {
      target: { value },
    } = event;
    setReporters(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChangeSubReporters = (event) => {
    const {
      target: { value },
    } = event;
    setSubReporters(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChangeLabels = (event) => {
    const {
      target: { value },
    } = event;
    setLabels(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChangeSubLabels = (event) => {
    const {
      target: { value },
    } = event;
    setSubLabels(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const onSubmitHandler = () => {

  }


  return (
    <>
      <div className='org-create-form'>
        <div className="row1">
          <Avatar
            alt="razorPay"
            src="https://bit.ly/3RZDdpJ"
            sx={{ width: 70, height: 70 }}
            style={{ border: '2px dotted gray' }}
          />
        </div>
        <div className="row2">
          <div className='row2Left'>
            <p>Task ID</p>
            <p>Task Name</p>
            <p>Description</p>
            <p>Assignees</p>
            <p>Reporters</p>
            <p>Labels</p>
          </div>
          <div className='row2Right'>
            <Form.Control type="text" placeholder="Project P-1" />
            <Form.Control type="text" placeholder="Xmonad" />
            <Form.Control type="text" placeholder="Description" />
            <Form.Select size="sm">
              <option>Ibrahim Hz</option>
            </Form.Select>
            <Select
              sx={{
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={reporters}
              onChange={handleChangeReporters}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ color: "white", backgroundColor: "#999999" }} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, reporters, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
            <Select
              sx={{
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={labels}
              onChange={handleChangeLabels}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ color: "white", backgroundColor: "#ea9999" }} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, reporters, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className='row2LeftMost'>
            <p>SubTask ID</p>
            <p>SubTask Name</p>
            <p>Description</p>
            <p>Assignees</p>
            <p>Reporters</p>
            <p>Labels</p>
          </div>
          <div className="row2RightMost">
            <Form.Control type="text" placeholder="Project P-1" />
            <Form.Control type="text" placeholder="Xmonad" />
            <Form.Control type="text" placeholder="Description" />
            <Form.Select size="sm">
              <option>Ibrahim Hz</option>
            </Form.Select>
            <Select
              sx={{
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={subReporters}
              onChange={handleChangeSubReporters}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ color: "white", backgroundColor: "#999999" }} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, reporters, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>

            <Select
              sx={{
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={subLabels}
              onChange={handleChangeSubLabels}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ color: "white", backgroundColor: "#ea9999" }} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, reporters, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>

          </div>
        </div>
      </div>
      <SubmitBtn onSubmitHandler={onSubmitHandler} text={"Create"} />
    </>
  );
}

import AddTeamMembers from '../modals/addTeamMembers';
const CreateFormComp = ({ handleClose }) => {
  const [type, setType] = useState('org');

  return (
    <div className='createForm'>
      <div className='upper'>
        <div className='left'>
          <span>SELECT TYPE</span>
          <ToggleMode type={type} setType={setType} />
        </div>
        <div className="right">
          <Button onClick={handleClose}>Close</Button>
        </div>
      </div>
      <hr />
      <div className='lower'>
        <form onSubmit={(e) => e.preventDefault()}>
          {type === "org" ? <OrganisationCreateForm /> :
            type === "project" ? <ProjectCreateForm /> :
              type === "team" ? <TeamCreateForm /> :
                <TaskCreateForm />}
        </form>
      </div>
    </div>
  )
}

export default CreateFormComp;