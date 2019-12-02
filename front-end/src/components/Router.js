import React from 'react'
import Home from './home/Home'
import SignUp from './sign-up/SignUp'
import Login from './login/Login'
import Navbar from './app/navbar/Navbar'
import Decks from './app/decks/Decks'
import Addcard from './app/addcard/Addcard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import StudyNow from './app/decks/StudyNow'

function routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/loggedIn' component={Navbar} />
        <Route path='/decks/:id' component={StudyNow} />
        <Route path='/decks' component={Decks} />
        <Route path='/add' component={Addcard} />
      </Switch>
    </Router>
  )
}
export default routes
