import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Members from './pages/Members'
import Album from './pages/Album'
import Login from './pages/Login'
import Admin from './pages/Admin'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/anggota" element={<Members />} />
      <Route path="/album" element={<Album />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={
        <PrivateRoute>
          <Admin />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App