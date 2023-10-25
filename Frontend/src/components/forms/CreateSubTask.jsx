import React, { useState } from 'react';
import SubTaskComp from "./SubTaskComp";
import Form from 'react-bootstrap/Form';
import SelectLabel from "../selectField/SelectLabel";

import Button from 'react-bootstrap/Button';

import SubmitBtn from '../submitBtn/SubmitBtn';
import { useSelector } from 'react-redux';

const EditableSubTask = ({ subTask }) => {
    const names = useSelector((state) => state.task.labelsOfProject);
    const [selectedNames, setSelectedNames] = useState([]);

    return (
        <div className="subTaskComp">
            <div className="row1">
                <span className="issueHeader">Sub Issue #1</span>
            </div>
            <div className="row5">
                <label htmlFor="issueType">Issue Type<span className="requiredSymbol">*</span></label>
                <Form.Select
                    className="selectTag"
                    aria-label="Default select example"
                    value={subTask.issueType}
                    onChange={(e) => setSubtaskData({ ...subtaskData, issueType: e.target.value })}
                >
                    <option value={"select"}>select</option>
                    <option value={"task"}>Task</option>
                    <option value={"epicTask"}>Epic Task</option>
                    <option value={"bug"}>Bug</option>
                    <option value={"story"}>Story</option>
                </Form.Select>
            </div>
            <div className="row6">
                <label htmlFor="summary">Summary<span className="requiredSymbol">*</span></label>
                <Form.Control
                    className="summaryTextField"
                    placeholder="Task Title / Summary"
                    aria-label="Summary"
                    aria-describedby="basic-addon1"
                    value={subTask.summary}
                    onChange={(e) => setSubtaskData({ ...subtaskData, summary: e.target.value })}
                />
            </div>
            <div className="row7">
                <label htmlFor="description">Description<span className="requiredSymbol">*</span></label>
                <Form.Control
                    className="descriptionField"
                    as="textarea"
                    placeholder="write your task / issue description"
                    value={subTask.description}
                    onChange={(e) => setSubtaskData({ ...subtaskData, description: e.target.value })}
                />
            </div>
            <div className="row8">
                <div className="left">
                    <label htmlFor="issueType">Reporter<span className="requiredSymbol">*</span></label>
                    <Form.Select
                        className="selectTag"
                        aria-label="Default select example"
                        value={"select"}
                        onChange={() => { }}
                    >
                        <option value="select">{subTask.reporter}</option>
                    </Form.Select>
                </div>
                <div className="right">
                    <label htmlFor="issueType">Priority<span className="requiredSymbol">*</span></label>
                    <Form.Select
                        className="selectTag"
                        aria-label="Default select example"
                        value={subTask.priority}
                        onChange={(e) => setSubtaskData({ ...subtaskData, priority: e.target.value })}
                    >
                        <option value="select">select</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </Form.Select>
                </div>
            </div>
            <div className="row10">
                <SelectLabel names={names} selectedNames={selectedNames} setSelectedNames={setSelectedNames} />
            </div>
        </div>
    )
}


const CreateSubTask = ({ reporter }) => {
    const names = useSelector((state) => state.task.labelsOfProject);
    const [selectedNames, setSelectedNames] = useState([]);
    const [subtasks, setSubtasks] = useState([]);
    const [subtaskData, setSubtaskData] = useState({
        issueType: 'select',
        summary: '',
        description: '',
        reporter: reporter,
        priority: 'select',
        labels: []
    });

    const addSubtask = () => {
        if (subtaskData.issueType && subtaskData.summary && subtaskData.description) {
            setSubtasks([...subtasks, subtaskData]);
            setSubtaskData({
                issueType: 'select',
                summary: '',
                description: '',
                reporter: reporter,
                priority: 'select',
                labels: []
            });
        }
    };

    return (
        <div className='createSubTaskComp'>
            {subtasks.map((subtask, index) => (
                <EditableSubTask key={index} subTask={subtask} />
            ))}
            <SubTaskComp reporter={reporter} subtaskData={subtaskData} setSubtaskData={setSubtaskData} />

            <Button style={{ width: "30vmax" }} variant="outline-light" onClick={addSubtask}>Add Subtask</Button>
        </div>
    );
}




export default CreateSubTask;