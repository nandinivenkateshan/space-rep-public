import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import StudyNow from './StudyNow'

function Decks () {
  let array
  const [decks, setDecks] = useState([])
  const [studyDeck, setStudy] = useState('')
  useEffect(() => {
    async function getDataFromDb () {
      let data = await fetch('http://localhost:3000/cards')
      data = await data.json()
      setDecks(data)
    }
    getDataFromDb()
  }, []);

  (function a () {
    array = decks.map(item => item.deck)
    array = Array.from(new Set(array))
  }())

  function handleTotalDeck (e) {
    const deck = e.target.innerText.toLowerCase()
    setStudy(decks.filter(item => item.deck === deck))
  }

  return (
    <Router>
      <div className='decks'>
        <h1 className='decks-heading'>Decks</h1>
        <ul>
          {array.map(item => {
            return (
              <li key={Date.now()}>
                <Link to={`/decks/${item.toLowerCase()}`} onClick={(e) => handleTotalDeck(e)}> {item.toUpperCase()}</Link>
              </li>
            )
          })}
        </ul>
        <Route exact path='/decks/:id'>
          <StudyNow props={studyDeck} />
        </Route>
      </div>
    </Router>
  )
}

export default Decks
