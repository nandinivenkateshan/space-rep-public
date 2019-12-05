import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import NavBar from '../navbar/Navbar'
import './decks.css'
import config from '../../Config'

function Decks () {
  let array
  const url = config().url
  const [decks, setDecks] = useState([])
  const [isClick, setIsClick] = useState(false)
  const [path, setPath] = useState('')

  useEffect(() => {
    async function getDataFromDb () {
      let data = await window.fetch(`${url}/cards`)
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

  const modifyDeckClickTime = async (url, data) => {
    const res = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) setIsClick(true)
  }

  function handleTotalDeck (e) {
    const deck = e.target.innerText.toLowerCase()
    setPath(deck)
    const deckClickTime = Date.now()
    modifyDeckClickTime(`${url}/updateDeckClickTime`, { deck, deckClickTime })
  }

  return (
    <main>
      <NavBar />
      <section className='decks'>
        <div>
          <h1 className='decks-heading'>Decks</h1>
          <ul>
            {array.map(item => {
              return (
                <li key={item.id} className='list'>
                  <p
                    onClick={(e) => handleTotalDeck(e)} className='deck'
                  >
                    {item.deck.toUpperCase()}
                  </p>
                  {isClick && <Redirect to={`/decks/${path}`} />}
                </li>

              )
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Decks
