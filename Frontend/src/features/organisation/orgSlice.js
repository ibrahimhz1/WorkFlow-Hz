import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orgs: [],
    status: null
}

const BASE_URL = `http://localhost:3500/api`;

// action creator with async thunk library
// export const getOrgOfFounder = createAsyncThunk(
//     'org/founder',
//     async(founderId)=> {
//         const response = await axios.
//     }
// )

export const createOrg = createAsyncThunk(
    'org/create',
    async ({ userId, orgId, orgName, desc }) => {
        const newOrg = await axios.post(`${BASE_URL}/org`, { founderId: userId, orgId, name: orgName, description: desc });
        console.log(newOrg.data);
    }
)

// reducer slice
export const orgSlice = createSlice({
    name: "org",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export const { } = orgSlice.actions;

export default orgSlice.reducer;