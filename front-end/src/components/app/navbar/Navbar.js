import React from 'react'
import './navbar.css'
import logo from '../../img/logo.jpeg'
import { Link } from 'react-router-dom'

function Navbar () {
  const sid = JSON.parse(window.localStorage.getItem('session'))
  console.log(sid)
  return (
    <nav className='navbar'>
      <Link className='navbar-brand' to='/'>
        <label className='logo-text'>SpaceRep</label>
        <img src={logo} alt='logo' className='logo' />
      </Link>

      <div className='navbar-menu-start'>
        <Link className='navbar-item' to='/decks'> Decks</Link>
        <Link className='navbar-item' to='/add'> Add</Link>
      </div>

      <div className='navbar-menu-end'>
        <Link className='navbar-item' to=''> Account</Link>
        <Link className='navbar-item' to='/loggedout'> Log Out</Link>
      </div>
    </nav>
  )
}

export default Navbar
