import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default App
