import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import './style.css'
import url from '../../url/config'
import { getSession } from '../../util'
import { fetchPost, fetchGet } from '../../fetch'
import NetworkErr from '../NetworkError'

function Decks () {
  const session = getSession()
  let sid, active
  if (session) {
    sid = session.sid
    active = session.active
  }

  const [decks, setDecks] = useState([])
  const [isClick, setIsClick] = useState(false)
  const [path, setPath] = useState('')
  const [isAction, setAction] = useState(false)
  const [netErr, setNetErr] = useState(false)

  const deckNames = async () => {
    const response = await fetchGet(`${url}/getDeckNames/?sid=${sid}`)
    if (response.err) {
      setNetErr(true)
    } else {
      const data = await response.json()
      setDecks(data)
      setAction(false)
    }
  }

  useEffect(() => {
    deckNames()
  }, [isAction])

  const fetchReq = async (url, card, data) => {
    const response = await fetchPost(url, card)
    if (data && response.ok) {
      setIsClick(true)
    }
    if (!data && response.ok) {
      setAction(true)
    }
    if (response.err) {
      setNetErr(true)
    }
  }

  function handleDeck (e) {
    const deck = e.target.innerText.toLowerCase()
    setPath(deck)
    const deckClickTime = parseInt(Date.now() / 1000)
    fetchReq(`${url}/updateDeckClickTime`, { deck, deckClickTime, sid }, 'deck')
  }

  function handleRename (deckName) {
    const reName = window.prompt('Enter New Name')
    if (reName) {
      fetchReq(`${url}/modifyDeckName`, { reName, deckName, sid })
    }
  }

  function handleDeleteDeck (deckName) {
    const result = window.confirm('Are You Sure to Delete? This Can\'t be undone.')
    if (result) {
      fetchReq(`${url}/deleteDeck`, { deckName, sid })
    }
  }

  return (
    <>
      {netErr && <NetworkErr />}

      {!active &&
        <Redirect to='/' />}
      {!netErr &&
        <main>
          <NavBar />
          <section className='decks'>
            <h1 className='decks-heading'>Decks</h1>
            <ul>
              {decks.map(item => {
                return (
                  <li key={item.id} className='list'>
                    <label
                      onClick={(e) => handleDeck(e)} className='deck'
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
        </main>}
    </>
  )
}

export default Decks
