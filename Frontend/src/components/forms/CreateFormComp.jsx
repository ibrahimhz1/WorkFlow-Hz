import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux'

import SubmitBtn from '../submitBtn/SubmitBtn';

const ToggleMode = ({ type, setType }) => {
  return (
    <div>
      <div className='upper'>
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-primary" value={"org"} onClick={(e) => setType(e.target.value)} active={type === "org" ? true : false}>Organisation</Button>
          <Button variant="outline-primary" value={"project"} onClick={(e) => setType(e.target.value)} active={type === "project" ? true : false}>Project</Button>
          <Button variant="outline-primary" value={"team"} onClick={(e) => setType(e.target.value)} active={type === "team" ? true : false}>Team</Button>
          <Button variant="outline-primary" value={"task"} onClick={(e) => setType(e.target.value)} active={type === "task" ? true : false}>Task</Button>
          <Button variant="outline-primary" value={"user"} onClick={(e) => setType(e.target.value)} active={type === "user" ? true : false}>User</Button>
          <Button variant="outline-primary" value={"label"} onClick={(e) => setType(e.target.value)} active={type === "label" ? true : false}>Label</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}


import { createOrg } from '../../features/organisation/orgSlice';

const OrganisationCreateForm = () => {
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
  // const [selected, setSelected] = React.useState(useSelector((state) => state.project.addTeamMembers));

  // modal for team members functions
  // redux states
  const orgs = useSelector((state) => state.org.orgs);
  const projectManagers = useSelector((state) => state.user.projectManagers);

  const onSubmitHandler = async () => {
    // const converted = selected.map(item => ({ _id: item }));
    // await dispatch(createProject({ org, projectId, projectName, desc, category, projectLead, members: converted }));
    const response = await dispatch(createProject({ org, projectId, projectName, desc, category, projectLead }));
    if (response.payload.success) {
      setOrg({ id: " ", name: " " });
      setProjectId('');
      setProjectName('');
      setDesc('');
      setCategory('');
      setProjectLead({ id: " ", name: " " });
    }
    dispatch(getAllProjects());
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
            {/* <p>Project Members</p> */}
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
            {/* <AddTeamMembers selected={selected} setSelected={setSelected} /> */}
          </div>
        </div>
      </div>
      <SubmitBtn onSubmitHandler={onSubmitHandler} text={"Create"} />
    </>
  );
}

import { createTeam } from '../../features/team/teamSlice';
import { getProjectsOfOrg } from '../../features/project/projectSlice';

const TeamCreateForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState('');
  const [desc, setDesc] = useState('');
  const [teamLeader, setTeamLeader] = useState({ id: '', name: '' });
  const [org, setOrg] = useState({ id: '', name: '' });
  const [project, setProject] = useState({ id: 'id', name: 'select' });

  const orgs = useSelector((state) => state.org.orgs);
  const projects = useSelector((state) => state.project.projectsOfOrg);
  const teamLeads = useSelector((state) => state.user.teamLeaders);
  const [selected, setSelected] = useState(useSelector((state) => state.project.addTeamMembers));

  const onSubmitHandler = async () => {
    const converted = selected.map(item => ({ _id: item }));
    const response = await dispatch(createTeam({ orgId: org.id, projectId: project.id, teamId, teamName, teamLeader: teamLeader.id, members: converted, desc }));

    if (response.payload.success) {
      setTeamName('');
      setTeamId('');
      setDesc('');
      setTeamLeader({ id: '', name: '' });
      setOrg({ id: '', name: '' });
      setProject({ id: 'id', name: 'select' });
      setSelected([]);
    }
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
            <p>Organisation</p>
            <p>Project</p>
            <p>Team ID</p>
            <p>Team Name</p>
            <p>Team Description</p>
            <p>Team Lead</p>
            <p>Team Members</p>
          </div>
          <div className='row2Right'>
            <Form.Select size="sm" value={org.name} onChange={(e) => {
              const org = JSON.parse(e.target.value);
              setOrg({ id: org.id, name: org.name })
              dispatch(getProjectsOfOrg({ orgId: org.id }));
            }}>
              <option value={org.id}>{org.name}</option>
              {
                orgs.map((org) => (
                  <option value={JSON.stringify({ id: org._id, name: org.name })} key={org._id}>{org.name}</option>
                ))
              }
            </Form.Select>
            <Form.Select size="sm" value={project.name} onChange={(e) => {
              const project = JSON.parse(e.target.value);
              setProject({ id: project.id, name: project.name });

            }}>
              <option value={project.id}>{project.name}</option>
              {
                projects.map((project) => (
                  <option value={JSON.stringify({ id: project._id, name: project.name })} key={project._id}>{project.name}</option>
                ))
              }
            </Form.Select>
            <Form.Control type="text" placeholder="Team TM-1" value={teamId} onChange={(e) => setTeamId(e.target.value)} />
            <Form.Control type="text" placeholder="Zenconf" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
            <Form.Control type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Form.Select size="sm" value={teamLeader.name} onChange={(e) => {
              const lead = JSON.parse(e.target.value);
              setTeamLeader({ id: lead.id, name: lead.name })
            }}>
              <option value={teamLeader.id}>{teamLeader.name}</option>
              {
                teamLeads.map((lead) => (
                  <option value={JSON.stringify({ id: lead._id, name: lead.name })} key={lead._id}>{lead.name}</option>
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

import { CreateUserComp } from '../headerMenuItems/MenuItemUsers';
const UserCreateForm = ()=> {
  return (
    <CreateUserComp />
  );
}

import AddTeamMembers from '../modals/AddTeamMembers';
import TaskCreateForm from './TaskCreateForm';
import LabelCreateForm from './LabelCreateForm';
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
                type === "task" ? <TaskCreateForm /> :
                  type === "user" ? <UserCreateForm /> : 
                  type === "label" ? <LabelCreateForm /> : '' }
        </form>
      </div>
    </div>
  )
}

export default CreateFormComp;