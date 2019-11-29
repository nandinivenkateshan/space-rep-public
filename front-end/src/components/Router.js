import React from 'react'
import Home from './home/Home'
import SignUp from './sign-up/SignUp'
import Login from './login/Login'
import NavBar from './NavBar'
import Decks from './Decks'
import Addcard from './Addcard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/loggedIn' component={NavBar} />
        <Route path='/decks' component={Decks} />
        <Route path='/add' component={Addcard} />
      </Switch>
    </Router>
  )
}
export default routes
