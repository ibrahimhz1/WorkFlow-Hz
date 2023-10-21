import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
    allProjects: [],
    projectsOfOrg: [],
    addTeamMembers: [],
    status: null
}

const BASE_URL = `http://localhost:3500/api`;

export const createProject = createAsyncThunk(
    'project/create',
    async ({ org, projectId, projectName, desc, category, projectLead }) => {
        const project = await axios.post(`${BASE_URL}/project/new`, { orgId: org.id, projectId, name: projectName, description: desc, category, projectLead: projectLead.id });
        return project.data;
    }
)

export const getAllProjectsOfUser = createAsyncThunk(
    'projectOfUser/fetch',
    async ({ founderId }) => {
        const projects = await axios.post(`${BASE_URL}/projects`, { userId: founderId });
        return projects.data.projects;
    }
)

export const getAllProjects = createAsyncThunk(
    'allProjects/fetch',
    async () => {
        const projects = await axios.get(`${BASE_URL}/projects`);
        return projects.data.projects
    }
)

export const getProjectsOfOrg = createAsyncThunk(
    'projectsOfOrg/fetch',
    async ({ orgId }) => {
        const projects = await axios.post(`${BASE_URL}/org/projects`, { orgId: orgId });
        console.log(projects);
        return projects.data.projects;
    }
)

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addTeamMembers: (state, action) => {
            state.addTeamMembers = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allProjects = action.payload;
            })
            .addCase(getAllProjectsOfUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.projects = action.payload;
            })
            .addCase(getProjectsOfOrg.fulfilled, (state, action)=> {
                state.status = 'idle';
                state.projectsOfOrg = action.payload;
            })
    }
});

export const { addTeamMembers } = projectSlice.actions;

export default projectSlice.reducer;