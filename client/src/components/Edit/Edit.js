import React, { useState, useEffect } from 'react'
import EditCard from '../Add/AddCard'
import { useParams } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import url from '../../url/config'
import { getSession } from '../../util'

function Edit () {
  const session = getSession()
  const sid = session.sid
  const { id } = useParams()
  const [editCard, setEditCard] = useState('')

  async function deckNames () {
    const res = await window.fetch(`${url}/getCards/?sid=${sid}`)
    const data = await res.json()
    const card = data.filter(item => item.id === Number(id))
    setEditCard(card)
  }

  useEffect(() => {
    deckNames()
  }, [])

  return (
    <main>
      <NavBar />
      {editCard &&
        <EditCard heading='Edit card' id={id} editCard={editCard} />}
    </main>
  )
}

export default Edit
