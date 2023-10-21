import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
    tasks: [],
    projectsOfOrg: [],
    projectManagersOfOrg: [],
    teamsOfProject: [],
    labelsOfProject: [],
    status: null
}

const BASE_URL = `http://localhost:3500/api`;

// Projects
export const getProjectsOfOrg = createAsyncThunk(
    'projectsOfOrg/fetch',
    async ({ orgId }) => {
        const projects = await axios.post(`${BASE_URL}/org/projects`, { orgId: orgId });
        return projects.data.projects;
    }
)

// Teams
export const getTeamsOfProject = createAsyncThunk(
    'teamsOfProject/fetch',
    async ({ projectId }) => {
        const teams = await axios.post(`${BASE_URL}/project/teams`, { projectId: projectId });
        return teams.data.teams;
    }
)

// Labels
export const createLabel = createAsyncThunk(
    'label/new',
    async ({ projectId, labelId, labelName }) => {
        const label = await axios.post(`${BASE_URL}/label`, { projectId: projectId, labelId: labelId, labelName: labelName });
        return label.data.success;
    }
);
export const getLabelsOfProject = createAsyncThunk(
    'labelsOfProject/fetch',
    async ({ projectId }) => {
        const labels = await axios.post(`${BASE_URL}/labels/project`, { projectId: projectId });
        return labels.data;
    }
)

// Project Managers
export const getProjectManagersOfOrg = createAsyncThunk(
    'projectManagersOfOrg/fetch',
    async ({ orgId }) => {
        const projectManagers = await axios.post(`${BASE_URL}/org/projectManagers`, { orgId });
        return projectManagers.data;
    }
)

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        emptyProjectsArray: (state, action) => {
            state.projectsOfOrg = [];
        },
        emptyTeamsArray: (state, action) => {
            state.teamsOfProject = [];
        },
        emptyLabelsArray: (state, action) => {
            state.labelsOfProject = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjectsOfOrg.fulfilled, (state, action) => {
                state.status = 'idle';
                state.projectsOfOrg = action.payload;
            })
            .addCase(getTeamsOfProject.fulfilled, (state, action) => {
                state.status = 'idle';
                state.teamsOfProject = action.payload;
            })
            .addCase(getLabelsOfProject.fulfilled, (state, action) => {
                state.status = 'idle';
                state.labelsOfProject = action.payload.labels;
            })
            .addCase(getProjectManagersOfOrg.fulfilled, (state, action)=> {
                state.status = 'idle';
                state.projectManagersOfOrg = action.payload.projectMans;
            })       
    }
});

export const { emptyProjectsArray, emptyTeamsArray, emptyLabelsArray } = taskSlice.actions;

export default taskSlice.reducer;