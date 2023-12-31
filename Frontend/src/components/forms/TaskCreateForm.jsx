import React, { useEffect, useState } from "react";
import "./TaskCreateForm.css";
import { useTheme } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import SubmitBtn from '../submitBtn/SubmitBtn';
import SelectLabel from "../selectField/SelectLabel";
import LabelSelect from "../selectField/LabelSelect";
import AddAssignees from "../modals/AddAssignees";
import AddReporters from '../modals/AddReporters';

import { useDispatch, useSelector } from "react-redux";
import {
    getProjectsOfOrg,
    getTeamsOfProject,
    emptyProjectsArray,
    emptyTeamsArray,
    emptyLabelsArray,
    getLabelsOfProject,
    getProjectManagersOfOrg,
    getTeamLeadersOfOrg,
    getTeamMembersOfOrg,
    getProjectManagerOfProject,
    getTeamLeadersOfProject,
    getTeamMembersOfProject,
    getTeamLeaderOfTeam,
    getTeamMembersOfTeam,
    emptyAssignPM,
    emptyAssignTL,
    emptyAssignTM,
    emptyAssignMembers
} from "../../features/task/taskSlice";
import CreateSubTask from "./CreateSubTask";

const TaskCreateForm = () => {
    const dispatch = useDispatch();
    const names = useSelector((state) => state.task.labelsOfProject);
    const [selectedNames, setSelectedNames] = useState([]);

    const theme = useTheme();
    const orgs = useSelector((state) => state.org.orgs);
    const teams = useSelector((state) => state.task.teamsOfProject);
    const projects = useSelector((state) => state.task.projectsOfOrg);
    const labels = useSelector((state) => state.task.labelsOfProject);

    // for handling tasks form datas for manipulating form objects
    const projectManagersAssignee = useSelector((state) => state.task.projectManagersAssignee);
    const teamLeadersAssignee = useSelector((state) => state.task.teamLeadersAssignee);
    const teamMembersAssignee = useSelector((state) => state.task.teamMembersAssignee);

    const [org, setOrg] = useState({ id: 'id', name: 'select' });
    const [project, setProject] = useState({ id: 'id', name: 'select' });
    const [team, setTeam] = useState({ id: 'id', name: 'select' });
    const [issueType, setIssueType] = useState('select');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const reporterObj = useSelector((state) => state.user.loggedInUser);

    const [selectedPM, setSelectedPM] = useState(useSelector((state) => state.task.projectManagersAssignee));
    const [selectedTL, setSelectedTL] = useState(useSelector((state) => state.task.teamLeadersAssignee));
    const [selectedTM, setSelectedTM] = useState(useSelector((state) => state.task.teamMembersAssignee));

    const reporter = {
        id: reporterObj._id,
        userId: reporterObj.userId,
        username: reporterObj.username,
        name: reporterObj.name,
        role: reporterObj.role
    }
    const [reporters, setReporters] = useState([]);

    const emptySelectedMembers = () => {
        setSelectedPM([]);
        setSelectedTL([]);
        setSelectedTM([]);
    }

    const onSubmitHandler = () => {

    }


    return (
        <div id="taskCreateFormComp">
            <div className="mainTaskSection">
                <div className="row1">
                    <span className="issueHeader">Create Issue</span>
                </div>
                <div className="row2">
                    <span>Required fields are marked with an asterisk <span className="requiredSymbol">*</span> </span>
                </div>
                <div className="row3">
                    <label htmlFor="organisation">Organisation<span className="requiredSymbol">*</span></label>
                    <Form.Select
                        className="selectTag"
                        aria-label="Default select example"
                        onChange={async (e) => {
                            setProject({ id: 'id', name: 'select' });
                            setTeam({ id: 'id', name: 'select' })
                            dispatch(emptyProjectsArray());
                            dispatch(emptyTeamsArray());
                            dispatch(emptyLabelsArray());
                            dispatch(emptyAssignPM());
                            dispatch(emptyAssignTL());
                            dispatch(emptyAssignTM());
                            dispatch(emptyAssignMembers());
                            emptySelectedMembers();

                            const org = JSON.parse(e.target.value);
                            setOrg({ id: org.id, name: org.name })
                            if (org.id !== "id") {
                                dispatch(getProjectsOfOrg({ orgId: org.id }));
                                dispatch(getProjectManagersOfOrg({ orgId: org.id }));
                                dispatch(getTeamLeadersOfOrg({ orgId: org.id }));
                                dispatch(getTeamMembersOfOrg({ orgId: org.id }));
                            }
                        }}
                    >
                        <option value={JSON.stringify({ id: 'id', name: 'select' })}>{'select'}</option>
                        {orgs.map((org) => (
                            <option key={org._id} value={JSON.stringify({ id: org._id, name: org.name })}>{org.name}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="row4">
                    <div className="left">
                        <label htmlFor="project">Project<span className="requiredSymbol">*</span></label>
                        <Form.Select
                            className="selectTag"
                            aria-label="Default select example"
                            onChange={(e) => {
                                setTeam({ id: 'id', name: 'select' })
                                dispatch(emptyTeamsArray());
                                dispatch(emptyLabelsArray());
                                dispatch(emptyAssignTL());
                                dispatch(emptyAssignTM());
                                dispatch(emptyAssignMembers());
                                emptySelectedMembers();
                                setSelectedNames([]);
                                const project = JSON.parse(e.target.value);
                                setProject({ id: project.id, name: project.name })
                                if (project.id !== "id") {
                                    dispatch(getTeamsOfProject({ projectId: project.id }));
                                    dispatch(getLabelsOfProject({ projectId: project.id }));
                                    dispatch(getProjectManagerOfProject({ projectId: project.id }));
                                    dispatch(getTeamLeadersOfProject({ projectId: project.id }));
                                    dispatch(getTeamMembersOfProject({ projectId: project.id }));
                                }
                            }}
                        >
                            <option value={JSON.stringify({ id: 'id', name: 'select' })}>{'select'}</option>
                            {projects.map((project) => (
                                <option key={project._id} value={JSON.stringify({ id: project._id, name: project.name })}>{project.name}</option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="right">
                        <label htmlFor="team">Team<span className="requiredSymbol">*</span></label>
                        <Form.Select
                            className="selectTag"
                            aria-label="Default select example"
                            onChange={(e) => {
                                dispatch(emptyAssignMembers());
                                emptySelectedMembers();
                                const team = JSON.parse(e.target.value);
                                setTeam({ id: team.id, name: team.name })
                                if (team.id !== "id") {
                                    dispatch(getTeamLeaderOfTeam({ teamId: team.id }));
                                    dispatch(getTeamMembersOfTeam({ teamId: team.id }));
                                }
                            }}
                        >
                            <option value={JSON.stringify({ id: 'id', name: 'select' })}>{'select'}</option>
                            {teams.map((team) => (
                                <option key={team._id} value={JSON.stringify({ id: team._id, name: team.name })}>{team.name}</option>
                            ))}
                        </Form.Select>
                    </div>
                </div>
                <div className="row5">
                    <label htmlFor="issueType">Issue Type<span className="requiredSymbol">*</span></label>
                    <Form.Select
                        className="selectTag"
                        aria-label="Default select example"
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                    >
                        <option value="select">select</option>
                        <option value="task">Task</option>
                        <option value="epicTask">Epic Task</option>
                        <option value="bug">Bug</option>
                        <option value="story">Story</option>
                    </Form.Select>
                </div>
                <div className="divider"></div>
                <div className="row6">
                    <label htmlFor="summary">Summary<span className="requiredSymbol">*</span></label>
                    <Form.Control
                        className="summaryTextField"
                        placeholder="Task Title / Summary"
                        aria-label="Summary"
                        aria-describedby="basic-addon1"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                </div>
                <div className="row7">
                    <label htmlFor="description">Description<span className="requiredSymbol">*</span></label>
                    <Form.Control
                        className="descriptionField"
                        as="textarea"
                        placeholder="write your task / issue description"
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                    />
                </div>
                <div className="row8">
                    <div className="left">
                        <label htmlFor="assignee">Reporter<span className="requiredSymbol">*</span></label>
                        <Form.Select className="selectTag" aria-label="Default select example">
                            <option value={reporter.id}>{reporter.name}</option>
                        </Form.Select>
                    </div>
                    <div className="right">
                        <label htmlFor="issueType">Assginees<span className="requiredSymbol">*</span></label>
                        <AddAssignees
                            selectedPM={selectedPM}
                            setSelectedPM={setSelectedPM}
                            selectedTL={selectedTL}
                            setSelectedTL={setSelectedTL}
                            selectedTM={selectedTM}
                            setSelectedTM={setSelectedTM}
                        />
                    </div>
                </div>
                <div className="row9">
                    <label htmlFor="issueType">Priority<span className="requiredSymbol">*</span></label>
                    <Form.Select className="selectTag" aria-label="Default select example">
                        <option value="select">select</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </Form.Select>
                </div>
                <div className="row10">
                    <SelectLabel names={names} selectedNames={selectedNames} setSelectedNames={setSelectedNames} />
                </div>
                <div className="row11">

                </div>
                <div className="row11">

                </div>
                <div className="row11">

                </div>
            </div>
            <div className="subTaskSection">
                <CreateSubTask reporter={reporter.name} names={names} selectedNames={selectedNames} setSelectedNames={setSelectedNames} />
            </div>
        </div>
    );
}

export default TaskCreateForm;
