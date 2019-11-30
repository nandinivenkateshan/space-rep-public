import React, { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import NavBar from '../navbar/Navbar'
import './decks.css'
import StudyNow from './StudyNow'

function Decks () {
  let array
  const [deckClickTime, setDeckClickTime] = useState('')
  const [display, setDisplay] = useState(true)
  const [decks, setDecks] = useState([])
  const [studyDeck, setStudy] = useState('')

  useEffect(() => {
    async function getDataFromDb () {
      let data = await window.fetch('http://localhost:3000/cards')
      data = await data.json()
      setDecks(data)
    }
    getDataFromDb()
  }, []);

  (function a () {
    array = decks.reduce((acc, cv) => {
      const val = acc.find(item => item.deck === cv.deck)
      if (!val) return acc.concat(cv)
      return acc
    }, [])
  }())

  function handleTotalDeck (e) {
    const deck = e.target.innerText.toLowerCase()
    setDeckClickTime(Date.now())
    setStudy(decks.filter(item => item.deck === deck))
    setDisplay(false)
  }

  return (
    <main>
      <NavBar />
      <section className='decks'>
        {display &&
          <div>
            <h1 className='decks-heading'>Decks</h1>
            <ul>
              {array.map(item => {
                return (
                  <li key={item.id} className='list'>
                    <Link
                      to={`/decks/${item.deck.toLowerCase()}`}
                      onClick={(e) => handleTotalDeck(e)} className='deck'
                    >
                      {item.deck.toUpperCase()}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>}
        <Route exact path='/decks/:id'>
          <StudyNow props={studyDeck} deckClickTime={deckClickTime} />
        </Route>
      </section>
    </main>
  )
}

export default Decks
