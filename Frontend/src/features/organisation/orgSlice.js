import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
    orgs: [],
    status: null
}

const BASE_URL = `http://localhost:3500/api`;

// action creator with async thunk library
export const getOrgsOfFounder = createAsyncThunk(
    'org/founder',
    async ({ founderId }) => {
        const orgs = await axios.post(`${BASE_URL}/org/founder`, { founderId: founderId });
        return orgs.data.orgs;
    }
)

export const createOrg = createAsyncThunk(
    'org/create',
    async ({ orgId, orgName, desc, dept }) => {
        const newOrg = await axios.post(`${BASE_URL}/org`, { orgId, name: orgName, description: desc, department: dept });
        return newOrg.data.org;
    }
)

// reducer slice
export const orgSlice = createSlice({
    name: "org",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrg.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(createOrg.rejected, (state, action) => {
                state.status = 'idle'
            })
            .addCase(createOrg.fulfilled, (state, action) => {
                state.status = 'idle'
                state.orgs.push(action.payload);
            })
            .addCase(getOrgsOfFounder.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orgs = action.payload;
            })
    }
});

export const { } = orgSlice.actions;

export default orgSlice.reducer;