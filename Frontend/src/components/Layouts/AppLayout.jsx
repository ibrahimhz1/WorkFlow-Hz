import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import Sidebar from '../Sidebar';
import AppHeader from '../AppHeader';

import { useSelector, useDispatch } from 'react-redux';
import { getOrgsOfFounder } from '../../features/organisation/orgSlice'
import { getAllProjects } from "../../features/project/projectSlice";
import { getAllProjectManagers, getAllTeamMembers, getAllTeamLeaders } from '../../features/user/userSlice';

const AppLayout = () => {
  const dispatch = useDispatch();
  
  const founderId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    dispatch(getOrgsOfFounder({ founderId }));
    dispatch(getAllProjectManagers());
    dispatch(getAllTeamLeaders());
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