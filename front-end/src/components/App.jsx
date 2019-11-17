import React from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import AddCard from './Addcard'
import Decks from './Decks'
import NavBar from './NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App () {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/add' component={AddCard} />
        <Route path='/decks' component={Decks} />
      </Switch>
    </Router>
  )
}

export default App
