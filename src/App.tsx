import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import MenuItemDetails from './components/MenuItemDetails'

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/' component={Home} />
        <Route exact path='/restaurant/:id' component={MenuItemDetails} />
        <Redirect to='/login' />
      </Switch>
    </div>
  )
}

export default App
