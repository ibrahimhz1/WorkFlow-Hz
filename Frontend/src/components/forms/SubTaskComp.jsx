import React, { useState } from 'react';
import "./TaskCreateForm.css";
import Form from 'react-bootstrap/Form';
import SelectLabel from "../selectField/SelectLabel";
import { useSelector } from 'react-redux';

const SubTaskComp = ({ reporter, subTask, subtaskData, setSubtaskData }) => {
    const names = useSelector((state) => state.task.labelsOfProject);
    const [selectedNames, setSelectedNames] = useState([]);
    const onSubmitHandler = () => {

    }
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
                    value={subtaskData.issueType} 
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
                    value={subtaskData.summary}
                    onChange={(e) => setSubtaskData({ ...subtaskData, summary: e.target.value })}
                />
            </div>
            <div className="row7">
                <label htmlFor="description">Description<span className="requiredSymbol">*</span></label>
                <Form.Control
                    className="descriptionField"
                    as="textarea"
                    placeholder="write your task / issue description"
                    value={subtaskData.description}
                    onChange={(e) => setSubtaskData({ ...subtaskData, description: e.target.value })}
                />
            </div>
            <div className="row8">
                <div className="left">
                    <label htmlFor="issueType">Reporter<span className="requiredSymbol">*</span></label>
                    <Form.Select
                        className="selectTag"
                        aria-label="Default select example"
                        value={reporter}
                        onChange={() => { }}
                    >
                        <option value="select">{reporter}</option>
                    </Form.Select>
                </div>
                <div className="right">
                    <label htmlFor="issueType">Priority<span className="requiredSymbol">*</span></label>
                    <Form.Select
                        className="selectTag"
                        aria-label="Default select example"
                        value={subtaskData.priority}
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

export default SubTaskComp;