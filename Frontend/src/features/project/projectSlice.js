import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
    projects: [],
    status: null
}

const BASE_URL = `http://localhost:3500/api`;

export const createProject = createAsyncThunk(
    'project/create',
    async () => {
        
    }
)

export const getAllProjectsOfUser = createAsyncThunk(
    'project/create',
    async ({ founderId }) => {
        const projects = await axios.post(`${BASE_URL}/projects`, {userId: founderId});
        return projects.data.projects;
    }
)

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProjectsOfUser.fulfilled, (state, action)=> {
                state.status = 'idle'
                state.projects = action.payload;
            })
    }
})

export default projectSlice.reducer;