import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../features/user/userSlice";
import orgSlice from '../features/organisation/orgSlice';
import projectSlice from '../features/project/projectSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        org: orgSlice,
        project: projectSlice,
    },
    devTools: true,
});

