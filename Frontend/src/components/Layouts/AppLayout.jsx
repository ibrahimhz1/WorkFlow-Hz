import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import Sidebar from '../Sidebar';
import AppHeader from '../AppHeader';

import { useSelector, useDispatch } from 'react-redux';
import { getOrgsOfFounder } from '../../features/organisation/orgSlice'
import { getAllProjectsOfUser } from "../../features/project/projectSlice";
import { getAllProjectManagers, getAllTeamMembers } from '../../features/user/userSlice';

const AppLayout = () => {
  const dispatch = useDispatch();
  const founderId = useSelector((state) => state.user.loggedInUser._id) || " ";

  useEffect(() => {
    dispatch(getOrgsOfFounder({ founderId }));
    dispatch(getAllProjectsOfUser({ founderId }));
    dispatch(getAllProjectManagers());
    dispatch(getAllTeamMembers());
  }, [])

  return (
    <div id='AppLayout'>
      <AppHeader />
      <div id='content'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout;