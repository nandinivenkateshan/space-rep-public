import React from 'react'
import './App.css'
import { Switch, Route, Link } from 'react-router-dom'
import StudyNow from './StudyNow'

function JsDeck () {
  return (
    <div>
      <Link className='study-btn' to='/study'>Study Now</Link>
      <Switch>
        <Route exact path='/study'>
          {console.log('kbnkjnmb')}
          <StudyNow />
        </Route>
      </Switch>
    </div>
  )
}

export default JsDeck
