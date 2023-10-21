import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../features/user/userSlice";
import orgSlice from '../features/organisation/orgSlice';
import projectSlice from '../features/project/projectSlice';
import teamSlice from "../features/team/teamSlice";
import taskSlice from "../features/task/taskSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        org: orgSlice,
        project: projectSlice,
        team: teamSlice,
        task: taskSlice
    },
    devTools: true,
});

