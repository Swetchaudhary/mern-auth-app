import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import RefreshHandler from './RefreshHandler'

export default function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(false);

  const PrivateRoute = (({element})=>{
    return isAuthenticated ? element : <Navigate to="/login" />
  })

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes >
        <Route path='/' element={<Navigate to='/login' /> }  />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/Home' element={<PrivateRoute element={<Home/>} />} />
      </Routes>
    </div>
  )
}
