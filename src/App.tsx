import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/home" component={Home} />
        <Redirect to="/login" />  
      </Switch>
    </div>
  );
}

export default App;
