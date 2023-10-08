import "./App.css";
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layout Components
import Layout from './components/Layouts/Layout';
import AppLayout from './components/Layouts/AppLayout';

// Components
import Dashboard from './features/dashboard/Dashboard.jsx'

// Page Components
import RegisterPage from "./components/Pages/RegisterPage";
import Homepage from './components/Pages/Homepage';
import LoginPage from "./components/Pages/LoginPage";
import SetupPage from "./components/Pages/SetupPage";

const App = () => {
  
  const isLoggedIn = JSON.parse(localStorage.getItem('user'));

  return (
    <Routes>

      {/* General Layout Routing -> register, login, blog, docs etc... <> After Login or Register Redirect to /app */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/registerApp" element={isLoggedIn ? <Navigate to="/app" /> :<RegisterPage />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/app" /> :<LoginPage />} />
        <Route path="/setup" element={<SetupPage />} />
      </Route>

      {/* Application Layout Routing -> application routes etc... <> After Logout Redirect to / */}
      <Route path='/app' element={<AppLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

    </Routes>
  )
}

export default App;