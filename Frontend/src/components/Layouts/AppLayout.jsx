import React from 'react'

import { Outlet } from 'react-router-dom'

import Sidebar from '../Sidebar';
import AppHeader from '../AppHeader';

const AppLayout = () => {
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