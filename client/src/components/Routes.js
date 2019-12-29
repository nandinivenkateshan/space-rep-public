import React from 'react'
import About from './About/About'
import SignUp from './SignUp/SignUp'
import Login from './Login/Login'
import Decks from './Decks/Decks'
import Add from './Add/Add'
import Deck from './Decks/Deck'
import Edit from './Edit/Edit'
import NotFound from './NotFound'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={About} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/decks' component={Decks} />
        <Route exact path='/add' component={Add} />
        <Route exact path='/decks/:id' component={Deck} />
        <Route exact path='/edit/:id' component={Edit} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
export default routes
