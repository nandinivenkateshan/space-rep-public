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
  }, [decks]);

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

  const modifyDeckName = async (url, data) => {
    await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function handleTotalDeck (e) {
    const deck = e.target.innerText.toLowerCase()
    setPath(deck)
    const deckClickTime = Date.now()
    modifyDeckClickTime(`${url}/updateDeckClickTime`, { deck, deckClickTime })
  }

  function handleRename (deckName) {
    const reName = window.prompt('Enter New Name')
    modifyDeckName(`${url}/modifyDeckName`, { reName, deckName })
  }

  async function deleteDeck (url, data) {
    const res = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(res)
  }

  function handleDeleteDeck (deckName) {
    const result = window.confirm('Are You Sure to Delete? This Can\'t be undone.')
    if (result) {
      deleteDeck(`${url}/deleteDeck`, { deckName })
    }
  }

  return (
    <main>
      <NavBar />
      <section className='decks'>
        <h1 className='decks-heading'>Decks</h1>
        <ul>
          {array.map(item => {
            return (
              <li key={item.id} className='list'>
                <label
                  onClick={(e) => handleTotalDeck(e)} className='deck'
                >
                  {item.deck.toUpperCase()}
                </label>

                <div className='dropdown-box'>
                  <label className='dropdown-btn'>ACTION
                  </label>
                  <div className='dropdown-content'>
                    <label onClick={() => handleRename(item.deck)}>Rename</label>
                    <label onClick={() => handleDeleteDeck(item.deck)}>Delete</label>
                  </div>
                </div>
                {isClick && <Redirect to={`/decks/${path}`} />}

              </li>

            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Decks
