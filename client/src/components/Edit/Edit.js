import React, { useState, useEffect } from 'react'
import EditCard from '../Add/AddCard'
import { useParams } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import obj from '../config'

function Edit () {
  const { id } = useParams()
  const [editCard, setEditCard] = useState('')
  const session = JSON.parse(window.localStorage.getItem('session'))
  const sid = session.sid

  async function getDataFromDb () {
    const res = await window.fetch(`${obj.url}/getCards/?sid=${sid}`)
    const data = await res.json()
    const card = data.filter(item => item.id === Number(id))
    setEditCard(card)
  }

  useEffect(() => {
    getDataFromDb()
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
