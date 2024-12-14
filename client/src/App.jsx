import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'
import Header from './components/layout/Header'
import { Routes, Route } from 'react-router-dom'
import { getSocket, SocketProvider } from './context/socket'
import { Toaster } from 'react-hot-toast'
import { useLoadProfile } from './hooks/api'
import { useSelector } from 'react-redux'
import ProtectRoute from './components/auth/ProtectRoute'
import Attendance from './pages/Attendance'
const App = () => {
  const { user, loader } = useSelector((state) => state.auth)
  useLoadProfile()

  if (loader) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <SocketProvider>
      <div className="">
        <Toaster />
        <Header />
        <Routes>
          <Route element={<ProtectRoute user={user} redirect={'/login'} />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/attendance" element={<Attendance />} />
          </Route>
          <Route element={<ProtectRoute user={!user} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>

      </div>
    </SocketProvider>

  )
}

export default App