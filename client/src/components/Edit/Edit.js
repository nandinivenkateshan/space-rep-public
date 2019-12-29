import React, { useState, useEffect } from 'react'
import EditCard from '../Add/AddCard'
import { useParams } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import url from '../../url/config'
import { getSession } from '../../util'
import { fetchGet } from '../../fetch'
import NetworkErr from '../NetworkError'

function Edit () {
  const session = getSession()
  const sid = session.sid
  const { id } = useParams()
  const [editCard, setEditCard] = useState('')
  const [netErr, setNetErr] = useState(false)

  async function deckNames () {
    const response = await fetchGet(`${url}/getCards/?sid=${sid}`)
    if (response.err) {
      setNetErr(true)
    } else {
      const data = await response.json()
      const card = data.filter(item => item.id === Number(id))
      setEditCard(card)
    }
  }

  useEffect(() => {
    deckNames()
  }, [])

  return (
    <>
      {netErr && <NetworkErr />}
      {!netErr &&
        <main>
          <NavBar />
          {editCard &&
            <EditCard heading='Edit card' id={id} editCard={editCard} />}
        </main>}
    </>
  )
}

export default Edit
