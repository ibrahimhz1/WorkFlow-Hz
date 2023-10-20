import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
    teams: [],
    status: null
}

const BASE_URL = `http://localhost:3500/api`;

export const createTeam = createAsyncThunk(
    'team/create',
    async ({ orgId, projectId, teamId, teamName, teamLeader, members, desc }) => {
        const team = await axios.post(`${BASE_URL}/team/new`, { orgId, projectId, teamId, name: teamName, teamLeader, members, description: desc })
        return team.data;
    }
)


// export const getAllProjectsOfUser = createAsyncThunk(
//     'project/create',
//     async ({ founderId }) => {
//         const projects = await axios.post(`${BASE_URL}/projects`, { userId: founderId });
//         return projects.data.projects;
//     }
// )

// export const getAllProjects = createAsyncThunk(
//     'allProjects/fetch',
//     async () => {
//         const projects = await axios.get(`${BASE_URL}/projects`);
//         return projects.data.projects
//     }
// )

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        addTeamMembers: (state, action) => {
            state.addTeamMembers = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTeam.fulfilled, (state, action)=> {
                state.status = 'idle';
                state.teams.push(action.payload.team);
            })
    }
});

export const { addTeamMembers } = teamSlice.actions;

export default teamSlice.reducer;