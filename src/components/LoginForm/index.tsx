// src/components/LoginForm/index.tsx
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { AppDispatch, RootState } from '../../redux/store'
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../../redux/reducers/authReducer'
import { loginUser } from '../../api/authApi'
import './index.css'
import Frame from '../../assets/Frame.jpg'
import { useNavigate } from 'react-router-dom'

interface LoginCredentials {
  username: string
  password: string
}

const LoginForm: React.FC = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  const mutation = useMutation<
    { jwt_token: string }, // Response type
    Error, // Error type
    LoginCredentials // Variables type
  >({
    mutationFn: loginUser, // Include mutationFn in the options object
    onMutate: () => {
      dispatch(loginStart())
    },
    onSuccess: data => {
      dispatch(loginSuccess(data.jwt_token))
      Cookies.set('jwtToken', data.jwt_token, { expires: 7 })
      navigate('/')
    },
    onError: (error: Error) => {
      dispatch(loginFailure(error.message))
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ username, password })
  }

  return (
    <div className='login-container'>
      <div className='login-form-container'>
        <form onSubmit={handleSubmit} className='login-form'>
          <img src={Frame} alt='Frame' className='frame-img' />
          <h1 className='login-heading'>Tasty Kitchens</h1>

          <div className='input-field-container'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Username'
            />
          </div>

          <div className='input-field-container'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
            />
          </div>

          <div className='login-button-container'>
            <button type='submit' className='login-button' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {error && <p className='error-message'>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
