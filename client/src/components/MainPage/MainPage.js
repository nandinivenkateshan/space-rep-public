import React, { useState, useEffect } from 'react'
import obj from '../config'
import { Redirect } from 'react-router-dom'

function MainPage () {
  const [isLoggedIn, setLog] = useState()
  if (obj.sid) {
    checkUserLogout()
  }

  async function checkUserLogout () {
    const response = await window.fetch(`${obj.url}/checkAccount/?sid=${obj.sid}`)
    const data = await response.json()
    console.log('useefct', data.isLoggedIn)
    if (data.isLoggedIn) await setLog(true)
  }

  console.log(isLoggedIn)
  // useEffect(() => {
  //   if (sid) {
  //     checkUserLogout()
  //   }
  // }, [])

  return (
    <>
      {isLoggedIn && <Redirect to='/decks' />}
      <Redirect to='/about' />
    </>
  )
}

export default MainPage
