import React, { useState } from 'react'
import logo from '../img/logo.jpeg'
import './App.css'
import useForm from './useForm'
import validate from './SignUPFormValidation'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

function Login () {
  return (
    <Router>
      <main className='signup-page'>
        <nav className='signup-nav navbar'>
          <Link to='/' className='logo-items'>
            <label className='logo-text'>SpaceRep</label>
            <img src={logo} alt='logo' width='70' height='30' className='logo' />
          </Link>
          <Link to='/register' className='signIn'>Sign Up</Link>
        </nav>
        <section className='signup-box'>
          <h1 className='heading'>Login</h1>
          <p className='sub-heading'>Log in to an existing account.</p>
          <form className='signup-form'>
            <label htmlFor='email' className='label'>Email</label>
            <input
              type='email' placeholder='Enter your Email'
              id='email' name='user_email' className='inputundefined'
            />
            <label htmlFor='pswd' className='label'>Password</label>
            <input
              type='password' id='pswd' name='pswd'
              className='inputundefined' placeholder='Enter the password'
              required
            />
            <button className='signup-btn'>Login</button>
          </form>
          <Link className='reset-pswd'>Reset Password</Link>
        </section>
      </main>
    </Router>
  )
}

export default Login
