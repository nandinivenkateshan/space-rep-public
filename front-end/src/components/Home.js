import React, { useState, useEffect } from 'react'
import logo from '../img/logo.jpeg'
import './App.css'
import {Route, Link, BrowserRouter as Router } from 'react-router-dom'

function Home () {
  return (
    <Router>
      <main className='signup-page'>
        <nav className='signup-nav navbar'>
          <Link to='/' className='logo-items'>
            <label className='logo-text'>SpaceRep</label>
            <img src={logo} alt='logo' width='70' height='30' className='logo' />
          </Link>
          <Link to='/register' className='signIn'>Log In</Link>
        </nav>
      </main>
    </Router>
  )
}

export default Home
