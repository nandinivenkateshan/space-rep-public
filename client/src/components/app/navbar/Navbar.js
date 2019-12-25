import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import logo from '../../img/logo.jpeg'
import { Link } from 'react-router-dom'
import url from '../../config'

function Navbar () {
  const [account, setAccount] = useState('')
  const sid = JSON.parse(window.localStorage.getItem('session'))

  useEffect(() => { 
    async function getDataFromDb () {
      let data = await window.fetch(`${url}/checkAccount/?sid=${sid}`)
      data = await data.json()
      if (data.user) setAccount(data.user)
    }
    getDataFromDb()
  }, [])

  return (
    <>

      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/loggedIn'>
            <img src={logo} alt='logo' />
            <label className='logo-text'>SpaceRep</label>
          </Link>

          <Link role='button' className='navbar-burger' aria-label='menu' aria-expanded='false'>
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </Link>
        </div>

        <div className='navbar-menu'>
          <div className='navbar-start'>
            <Link className='navbar-item' to='/decks'> Decks</Link>
            <Link className='navbar-item' to='/add'> Add</Link>
          </div>

          <div className='navbar-end'>
            <Link className='navbar-item' to='/decks'>Account- {account}</Link>
            <Link className='navbar-item' to='/login'>  Log Out</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
