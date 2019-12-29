import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import logo from '../../img/logo.jpeg'
import { Link } from 'react-router-dom'
import url from '../../url/config'
import { getSession } from '../../util'

function Navbar () {
  let sid
  const session = getSession()
  if (session) sid = session.sid
  const [account, setAccount] = useState('')

  async function accountName () {
    let data = await window.fetch(`${url}/checkAccount/?sid=${session.sid}`)
    data = await data.json()
    if (data.user) setAccount(data.user)
  }
  useEffect(() => {
    accountName()
  }, [])

  const handleLogOut = async () => {
    const response = await window.fetch(`${url}/logout/?sid=${sid}`)
    const result = await response.json()
    window.localStorage.setItem('session', JSON.stringify(result))
  }

  return (
    <>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/decks'>
            <img src={logo} alt='logo' />
            <label className='logo-text'>SpaceRep</label>
          </Link>

          {/* <Link role='button' className='navbar-burger' aria-label='menu' aria-expanded='false'>
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </Link> */}
        </div>

        <div className='navbar-menu'>
          <div className='navbar-start'>
            <Link className='navbar-item' to='/decks'> Decks</Link>
            <Link className='navbar-item' to='/add'> Add</Link>
          </div>

          <div className='navbar-end'>
            <Link className='navbar-item' to='/decks'>Account- {account}</Link>
            <Link className='navbar-item' to='/login' onClick={handleLogOut}>  Log Out</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
