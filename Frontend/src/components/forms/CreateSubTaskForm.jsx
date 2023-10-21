import React, {useState} from 'react'
import "./TaskCreateForm.css";
import { useTheme } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import SelectLabel from "../selectField/SelectLabel";

const CreateSubTaskForm = () => {
    const theme = useTheme();
    const [reporters, setReporters] = useState([]);
    const [subReporters, setSubReporters] = useState([]);
    const [labels, setLabels] = useState([]);
    const [subLabels, setSubLabels] = useState([]);

    const onSubmitHandler = () => {

    }
    return (
        <div className="subTaskComp">
            <div className="row1">
                <span className="issueHeader">Sub Issue #1</span>
            </div>
            <div className="row5">
                <label htmlFor="issueType">Issue Type<span className="requiredSymbol">*</span></label>
                <Form.Select className="selectTag" aria-label="Default select example">
                    <option>select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </div>
            <div className="row6">
                <label htmlFor="summary">Summary<span className="requiredSymbol">*</span></label>
                <Form.Control
                    className="summaryTextField"
                    placeholder="Task Title / Summary"
                    aria-label="Summary"
                    aria-describedby="basic-addon1"
                />
            </div>
            <div className="row7">
                <label htmlFor="description">Description<span className="requiredSymbol">*</span></label>
                <Form.Control
                    className="descriptionField"
                    as="textarea"
                    placeholder="write your task / issue description"
                />
            </div>
            <div className="row8">
                <div className="left">
                    <label htmlFor="assignee">Assignee<span className="requiredSymbol">*</span></label>
                    <Form.Select className="selectTag" aria-label="Default select example">
                        <option>select</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </div>
                <div className="right">
                    <label htmlFor="issueType">Reporter<span className="requiredSymbol">*</span></label>
                    <Form.Select className="selectTag" aria-label="Default select example">
                        <option>select</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </div>
            </div>
            <div className="row9">
                <label htmlFor="issueType">Priority<span className="requiredSymbol">*</span></label>
                <Form.Select className="selectTag" aria-label="Default select example">
                    <option>select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </div>
            <div className="row10">
                <SelectLabel />
            </div>
        </div>
    )
}

export default CreateSubTaskForm