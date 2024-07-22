import React, { useState } from 'react'
import './index.css'
import Frame from '../../assets/Frame.jpg'
import Cookies from 'js-cookie'

interface UserDetails {
  username: string
  password: string
}

const LoginForm: React.FC = props => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false)
  console.log(props)

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  const onSubmitSucess = (jwtToken: string) => {
    const { history }: any = props
    console.log(jwtToken)
    Cookies.set('jwtToken', jwtToken, { expires: 7 })
    history.replace('/')
  }

  const onSubmitFailure = (errorMsg: string) => {
    console.log(errorMsg)
    setErrorMsg(errorMsg)
    setShowErrorMsg(true)
  }

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userDetails: UserDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',

      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSucess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }

    setUsername('')
    setPassword('')
  }

  const renderUserNameField = () => {
    return (
      <>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          placeholder='Username'
          onChange={onChangeUsername}
          value={username}
          id='username'
        />
      </>
    )
  }

  const renderPasswordField = () => {
    return (
      <>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          placeholder='Password'
          onChange={onChangePassword}
          value={password}
          id='password'
        />
      </>
    )
  }

  return (
    <div className='login-container'>
      <div className='login-form-container'>
        <form onSubmit={onSubmitForm} className='login-form'>
          <img src={Frame} alt='Frame' className='frame-img' />
          <h1 className='login-heading'>Tasty Kitchens</h1>
          <div className='input-field-container'>{renderUserNameField()}</div>
          <div className='input-field-container'>{renderPasswordField()}</div>
          <div className='login-button-container'>
            <button type='submit' className='login-button'>
              Login
            </button>
          </div>
          {showErrorMsg && <p>{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
