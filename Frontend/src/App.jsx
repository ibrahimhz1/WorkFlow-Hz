import "./App.css";
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Layout Components
import Layout from './components/Layouts/Layout';
import AppLayout from './components/Layouts/AppLayout';

// Components
import Homepage from './components/Pages/Homepage';
import Dashboard from './features/dashboard/Dashboard.jsx'

const App = () => {
  return (
    <Routes>

      {/* General Layout Routing -> register, login, blog, docs etc... <> After Login or Register Redirect to /app */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
      </Route>

      {/* Application Layout Routing -> application routes etc... <> After Logout Redirect to / */}
      <Route path='/app' element={<AppLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    
    </Routes>
  )
}

export default App;