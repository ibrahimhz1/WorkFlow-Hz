import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
    tasks: [],
    projectsOfOrg: [],
    projectManagersOfOrg: [],
    teamLeadersOfOrg: [],
    teamMembersOfOrg: [],
    projectManagerOfProject: null,
    teamLeadersOfProject: [],
    teamMembersOfProject: [],
    teamsOfProject: [],
    labelsOfProject: [],
    teamLeaderOfTeam: null,
    teamMembersOfTeam: [],
    projectManagersAssignee: [],
    teamLeadersAssignee: [],
    teamMembersAssignee: [],
    addAssignees: [],
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

// team leader
export const getTeamLeadersOfOrg = createAsyncThunk(
    'teamLeadersOfOrg/fetch',
    async ({ orgId }) => {
        const teamLeaders = await axios.post(`${BASE_URL}/org/teamLeaders`, { orgId });
        return teamLeaders.data;
    }
)

// team members
export const getTeamMembersOfOrg = createAsyncThunk(
    'teamMembersOfOrg/fetch',
    async ({ orgId }) => {
        const teamMembers = await axios.post(`${BASE_URL}/org/teamMembers`, { orgId });
        return teamMembers.data;
    }
)

export const getProjectManagerOfProject = createAsyncThunk(
    'projectManagerOfProject/fetch',
    async ({ projectId }) => {
        const projectMan = await axios.post(`${BASE_URL}/project/projectManager`, { projectId });
        return projectMan.data;
    }
)

export const getTeamLeadersOfProject = createAsyncThunk(
    'teamLeadersOfProject/fetch',
    async ({ projectId }) => {
        const teamLeaders = await axios.post(`${BASE_URL}/project/teamLeaders`, { projectId });
        return teamLeaders.data;
    }
)

export const getTeamMembersOfProject = createAsyncThunk(
    'teamMembersOfProject/fetch',
    async ({ projectId }) => {
        const teamMembers = await axios.post(`${BASE_URL}/project/teamMembers`, { projectId });
        return teamMembers.data;
    }
)

export const getTeamLeaderOfTeam = createAsyncThunk(
    'teamLeaderOfTeam/fetch',
    async ({ teamId }) => {
        const teamLeader = await axios.post(`${BASE_URL}/team/teamLeader`, { teamId });
        return teamLeader.data;
    }
)

export const getTeamMembersOfTeam = createAsyncThunk(
    'teamMembersOfTeam/fetch',
    async ({ teamId }) => {
        const teamMembers = await axios.post(`${BASE_URL}/team/teamMembers`, { teamId });
        return teamMembers.data;
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
        },
        assignProjectManagers: (state, action) => {
            console.log(action.payload);
            state.projectManagersAssignee = action.payload;
        },
        assignTeamLeaders: (state, action) => {
            state.teamLeadersAssignee = action.payload;
        },
        assignTeamMembers: (state, action) => {
            state.teamMembersAssignee = action.payload;
        },
        emptyAssignPM : (state, action)=> {
            state.projectManagersAssignee = [];
        },
        emptyAssignTL : (state, action)=> {
            state.teamLeadersAssignee = [];
        },
        emptyAssignTM : (state, action)=> {
            state.teamMembersAssignee = [];
        },
        addAssignees: (state, action)=> {
            state.addAssignees = action.payload;
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
            .addCase(getProjectManagersOfOrg.fulfilled, (state, action) => {
                state.status = 'idle';
                state.projectManagersOfOrg = action.payload.projectMans;
                state.projectManagersAssignee = action.payload.projectMans;
            })
            .addCase(getTeamLeadersOfOrg.fulfilled, (state, action) => {
                state.status = 'idle';
                state.teamLeadersOfOrg = action.payload.teamLeaders;
                state.teamLeadersAssignee = action.payload.teamLeaders;
            })
            .addCase(getTeamMembersOfOrg.fulfilled, (state, action) => {
                state.status = 'idle';
                state.teamMembersOfOrg = action.payload.teamMembers;
                state.teamMembersAssignee = action.payload.teamMembers;
            })
            .addCase(getProjectManagerOfProject.fulfilled, (state, action) => {
                state.status = 'idle';
                state.projectManagerOfProject = action.payload.projectMan;
                state.projectManagersAssignee = action.payload.projectMan;
            })
            .addCase(getTeamLeadersOfProject.fulfilled, (state, action) => {
                state.status = 'idle';
                state.teamLeadersOfProject = action.payload.teamLeaders;
                state.teamLeadersAssignee = action.payload.teamLeaders;
            })
            .addCase(getTeamMembersOfProject.fulfilled, (state, action) => {
                state.status = 'idle';
                state.teamMembersOfProject = action.payload.teamMembers;
                state.teamMembersAssignee = action.payload.teamMembers;
            })
            .addCase(getTeamLeaderOfTeam.fulfilled, (state, action) => {
                state.status = 'idle';
                state.teamLeaderOfTeam = action.payload.teamLeader;
                state.teamLeadersAssignee = action.payload.teamLeader;
            })
            .addCase(getTeamMembersOfTeam.fulfilled, (state, action) => {
                state.status = 'idle';
                state.teamMembersOfTeam = action.payload.teamMembers;
                state.teamMembersAssignee = action.payload.teamMembers;
            })
    }
});

export const {
    emptyProjectsArray,
    emptyTeamsArray,
    emptyLabelsArray,
    assignProjectManagers,
    assignTeamLeaders,
    assignTeamMembers,
    emptyAssignPM,
    emptyAssignTL,
    emptyAssignTM,
    addAssignees
} = taskSlice.actions;

export default taskSlice.reducer;