import React, { useState } from 'react'
import './addcard.css'
import NavBar from '../Navbar/Navbar'
import AddCard from './AddCard'
import { Redirect } from 'react-router-dom'
import { getSession } from '../../util'
import NetworkErr from '../NetworkError'

function Add () {
  const [netErr, setNetErr] = useState(false)
  let active
  const session = getSession()

  if (session) active = session.active

  const handleNetErr = val => setNetErr(val)

  return (
    <>
      {netErr && <NetworkErr />}
      {!active && <Redirect to='/' />}
      {!netErr &&
        <main>
          <NavBar />
          <AddCard heading='Add Card' onNetErr={val => handleNetErr(val)} />
        </main>}
    </>
  )
}

export default Add
