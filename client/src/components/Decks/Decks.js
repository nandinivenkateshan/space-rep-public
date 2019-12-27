import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import './style.css'
import obj from '../config'

function Decks () {
  const sid = obj.sid
  const [decks, setDecks] = useState([])
  const [isClick, setIsClick] = useState(false)
  const [path, setPath] = useState('')
  const [isAction, setAction] = useState(false)

  async function getDataFromDb () {
    let data = await window.fetch(`${obj.url}/getDeckNames/?sid=${obj.sid}`)
    data = await data.json()
    console.log(data)
    setDecks(data)
    setAction(false)
  }

  useEffect(() => {
    getDataFromDb()
  }, [isAction])

  const modifyDeckClickTime = async (url, data) => {
  
    const value = { ...data, sid }
    const res = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) setIsClick(true)
  }

  const modifyDeckName = async (url, data) => {
    const value = { ...data, sid }
    setAction(true)
    await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function handleTotalDeck (e) {
    const deck = e.target.innerText.toLowerCase()
    setPath(deck)
    const deckClickTime = parseInt(Date.now() / 1000)
    modifyDeckClickTime(`${obj.url}/updateDeckClickTime`, { deck, deckClickTime })
  }

  function handleRename (deckName) {
    const reName = window.prompt('Enter New Name')
    if (reName) modifyDeckName(`${obj.url}/modifyDeckName`, { reName, deckName })
  }

  async function deleteDeck (url, data) {
    const value = { ...data, sid }
    setAction(true)
    await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function handleDeleteDeck (deckName) {
    const result = window.confirm('Are You Sure to Delete? This Can\'t be undone.')
    if (result) {
      deleteDeck(`${obj.url}/deleteDeck`, { deckName })
    }
  }

  return (
    <main>
      <NavBar />
      <section className='decks'>
        <h1 className='decks-heading'>Decks</h1>
        <ul>
          {decks.map(item => {
            return (
              <li key={item.id} className='list'>
                <label
                  onClick={(e) => handleTotalDeck(e)} className='deck'
                >
                  {item.deck.toUpperCase()}
                </label>
                <div className='dropdown-box'>
                  <label className='dropdown-btn'>ACTION</label>
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
