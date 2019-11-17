import React from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import './App.css'
import JsDeck from './JsDeck'

function Decks () {
  const { path, url } = useRouteMatch()
  return (
    <div className='decks'>
      <h1 className='decks-heading'>Decks</h1>
      <Link to={`${url}/javascript`}>JavaScript</Link>
      <Switch>
        <Route exact path={`${path}/javascript`} component={JsDeck} />
      </Switch>
    </div>
  )
}

export default Decks
