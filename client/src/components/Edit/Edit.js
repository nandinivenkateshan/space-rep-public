import React, { useState, useEffect } from 'react'
import EditCard from '../Add/AddCard'
import { useParams } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import url from '../config'

function Edit () {
  const { id } = useParams()
  const [editCard, setEditCard] = useState('')
  const sid = JSON.parse(window.localStorage.getItem('session'))

  async function getDataFromDb () {
    const res = await window.fetch(`${url}/getCards/?sid=${sid}`)
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
