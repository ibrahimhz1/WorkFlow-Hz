import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loggedInUser: JSON.parse(localStorage.getItem('user')) || undefined,
    status: undefined,
}

const BASE_URL = `http://localhost:3500/api`;

export const loginAdmin = createAsyncThunk(
    'admin/login',
    async({email, password})=> {
        const response = await axios.post(`${BASE_URL}/admin/login`, {email: email, password: password});
        if(response.data.user){
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data.success;
    }
);

export const registerAdmin = createAsyncThunk(
    'admin/register',
    async(credentials)=> {
        const credObj = {
            adminId: credentials.adminId,
            name: credentials.name,
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
            avatar: credentials.avatar,
            role: credentials.role
        }

        const response = await axios.post(`${BASE_URL}/admin/register`, credObj);
        if(response.data.success){
            return response.data.success;
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async({email, password})=> {
        const response = await axios.post(`${BASE_URL}/login`, {email: email, password: password});
        if(response.data.user){
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data.user;
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async(credentials)=> {
        const credObj = {
            userId: credentials.adminId,
            name: credentials.name,
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
            avatar: credentials.avatar,
            role: credentials.role
        }

        const response = await axios.post(`${BASE_URL}/register`, credObj);
        if(response.data.success){
            localStorage.removeItem('user');
            return response.data.success;
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async()=> {
        
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state, action)=> {
                state.status = 'pending';
            })
            .addCase(loginAdmin.rejected, (state, action)=> {
                state.status = 'idle';
                state.error = action.payload
            })
            .addCase(loginAdmin.fulfilled, (state, action)=> {
                state.status = 'idle';
                if(action.payload){
                    state.loggedInUser = action.payload;
                    
                }else{
                    state.loggedInUser = undefined;
                }
            })
            .addCase(registerAdmin.pending, (state, action)=> {
                state.status = 'pending';
            })
            .addCase(registerAdmin.rejected, (state, action)=> {
                state.status = 'idle';
                state.error = action.payload
            })
            .addCase(registerAdmin.fulfilled, (state, action)=> {
                state.status = 'idle'
            })
            .addCase(logout.pending, (state, action)=> {
                state.status = 'pending'
            })
            .addCase(logout.rejected, (state, action)=> {
                state.status = 'idle'
            })
            .addCase(logout.fulfilled, (state, action)=> {
                state.status = undefined,
                state.loggedInUser = undefined
            })
    }
});

export const {} = userSlice.actions;

export default userSlice.reducer;