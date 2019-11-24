import React from 'react'
import logo from '../img/logo.jpeg'
import './App.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

function SignUp () {
  return (
    <Router>
      <main className='signup-page'>
        <nav className='signup-nav navbar'>
          <Link to='/' className='logo-items'>
            <label className='logo-text'>SpaceRep</label>
            <img src={logo} alt='logo' width='70' height='30' className='logo' />
          </Link>
          <Link to='/register'>Sign Up</Link>
        </nav>
        <section className='signup-box'>
          <h1 className='heading'>Create a new account</h1>
          <p className='sub-heading'>It's free and always will be.</p>
          <form className='signup-form'>
            <label for='email' className='label'>Your Email</label>
            <input type='email' placeholder='Enter your Email' id='email' name='user_email' className='input' />
            <label for='re-email' className='label'>Re-enter your Email</label>
            <input type='email' placeholder='Enter the same email' id='re-email' name='re_email' className='input' />
            <label for='pswd' className='label'>New Password</label>
            <input type='password' id='pswd' name='pswd' className='input' placeholder='Enter the password' />
            <button className='signup-btn'>Sign Up </button>
          </form>
        </section>
      </main>
    </Router>
  )
}

export default SignUp
