import React, { useState } from 'react';
import "./LabelCreateForm.css";
import Form from 'react-bootstrap/Form';
import SubmitBtn from '../submitBtn/SubmitBtn';
import Chip from '@mui/material/Chip';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectsOfOrg, emptyProjectsArray, emptyLabelsArray, getLabelsOfProject } from "../../features/task/taskSlice";

import { createLabel } from "../../features/task/taskSlice";
const LabelCreateForm = () => {
    const dispatch = useDispatch();
    const orgs = useSelector((state) => state.org.orgs);
    const projects = useSelector((state) => state.task.projectsOfOrg);
    const labels = useSelector((state) => state.task.labelsOfProject);

    const [org, setOrg] = useState({ id: '', name: '' });
    const [project, setProject] = useState({ id: '', name: '' });
    const [labelId, setLabelId] = useState('');
    const [labelName, setLabelName] = useState('');

    const onSubmitHandler = async () => {
        const response = await dispatch(createLabel({ projectId: project.id, labelId, labelName }));
        if (response.payload) {
            await dispatch(getLabelsOfProject({ projectId: project.id }));
            setLabelId('');
            setLabelName('');
        }
    }

    return (
        <div id='labelCreateFormComp'>
            <div className="labelCreateSection">
                <h3>Create Labels</h3>
                <div className='labelCreateContainer'>
                    <div className="row1">
                        <label htmlFor="organisation">Organisation<span className="requiredSymbol">*</span></label>
                        <Form.Select
                            className="selectTag"
                            aria-label="Default select example"
                            onChange={(e) => {
                                setProject({ id: 'id', name: 'select' });
                                dispatch(emptyProjectsArray());
                                dispatch(emptyLabelsArray());
                                const org = JSON.parse(e.target.value);
                                setOrg({ id: org.id, name: org.name })
                                if (org.id !== "id")
                                    dispatch(getProjectsOfOrg({ orgId: org.id }));
                            }}
                        >
                            <option value={JSON.stringify({ id: 'id', name: 'select' })}>{'select'}</option>
                            {orgs.map((org) => (
                                <option key={org._id} value={JSON.stringify({ id: org._id, name: org.name })}>{org.name}</option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="row2">
                        <label htmlFor="project">Project<span className="requiredSymbol">*</span></label>
                        <Form.Select
                            className="selectTag"
                            aria-label="Default select example"
                            onChange={(e) => {
                                dispatch(emptyLabelsArray());
                                const project = JSON.parse(e.target.value);
                                setProject({ id: project.id, name: project.name })
                                if (project.id !== "id") {
                                    dispatch(getLabelsOfProject({ projectId: project.id }));
                                }
                            }}
                        >
                            <option value={JSON.stringify({ id: 'id', name: 'select' })}>{'select'}</option>
                            {projects.map((project) => (
                                <option key={project._id} value={JSON.stringify({ id: project._id, name: project.name })}>{project.name}</option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="row3">
                        <div className='left'>
                            <label htmlFor="LabelsField">Label ID</label>
                            <Form.Control type="text" placeholder="Label ID" value={labelId} onChange={(e) => setLabelId(e.target.value)} />
                        </div>
                        <div className='right'>
                            <label htmlFor="LabelsField">Label Name</label>
                            <Form.Control type="text" placeholder="Label Name" value={labelName} onChange={(e) => setLabelName(e.target.value)} />
                        </div>
                    </div>
                    <SubmitBtn text={"Create Label"} onSubmitHandler={onSubmitHandler} />
                </div>
            </div>
            <div className="labelListSection">
                <h3> {project.name} Project Labels</h3>
                {labels.map((label) => (
                    <Chip key={label._id} label={label.labelName} style={{color: 'white', border: '1px solid white', margin: '1vmax'}} />
                ))}
            </div>
        </div>
    )
}

export default LabelCreateForm;
