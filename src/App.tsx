import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import MenuItemDetails from './components/MenuItemDetails'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import Cookies from 'js-cookie'

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  // const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  //   const jwtToken = Cookies.get('jwtToken')
  //   if (!jwtToken) {
  //     return <Navigate to='/login' />
  //   }
  //   return children
  // }

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/login'
          element={!isAuthenticated ? <LoginForm /> : <Navigate to='/' />}
        />
        <Route path='/' element={<Home />} />
        <Route path='/restaurant/:id' element={<MenuItemDetails />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App
