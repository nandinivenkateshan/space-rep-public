import React, { useState, useEffect } from 'react'
import logo from '../img/logo.jpeg'
import './home.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

function SignUp () {
  return (
    <Router>
      <main className='main'>
        <nav className='navbar'>
          <Link to='/' className='logos'>
            <label className='logo-text'>SpaceRep</label>
            <img src={logo} alt='logo' className='logo' />
          </Link>
          <aside className='btns'>
            <Link to='/register' className='signup-btn'> Sign Up </Link>
            <Link to='/register' className='login-btn'> Log In </Link>
          </aside>
        </nav>
        <section className='about'>
          <p className='first-para'>
            SpaceRep is a free companion to the computer version of Anki. It can
            be used to review online when you don't have access to your home
            computer, and can be used to keep your cards synchronized across
            multiple machines.
          </p>
          <p className='second-para'>
            SpaceRep is intended to be used in conjunction with the computer
            version of Anki. While it is possible to create basic text-only
            cards and review them using only SpaceRep.
          </p>
        </section>
      </main>
    </Router>
  )
}

export default SignUp
