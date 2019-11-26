import React, { useState } from 'react'
import logo from '../img/logo.jpeg'
import './App.css'
import useForm from './useForm'
import validate from './LoginFormValidation'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

function SignUp () {
  const { handleChange, handleSubmit, values, errors } = useForm(login, validate)

  function login () {
    console.log(values)
  }

  return (
    <Router>
      <main className='signup-page'>
        <nav className='signup-nav navbar'>
          <Link to='/' className='logo-items'>
            <label className='logo-text'>SpaceRep</label>
            <img src={logo} alt='logo' width='70' height='30' className='logo' />
          </Link>
          <Link to='/register' className='signIn'>Sign In</Link>
        </nav>
        <section className='signup-box'>
          <h1 className='heading'>Create a new account</h1>
          <p className='sub-heading'>It's free and always will be.</p>
          <form className='signup-form' onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='username' className='label'>Username</label>
            {console.log(errors.user_name)}
            <input
              type='text' placeholder='Enter your name' id='username'
              name='user_name' className={`input${errors.user_name && 'invalid'}`} required
              onChange={(e) => handleChange(e)}
              value={values.user_name || ''}
            />
            {errors.user_name && (
              <p className='invalid-para'>{errors.user_name}</p>
            )}
            <label htmlFor='email' className='label'>Your Email</label>
            <input
              type='email' placeholder='Enter your Email'
              id='email' name='user_email' className={`input${errors.user_email && 'invalid'}`}
              onChange={(e) => handleChange(e)}
              value={values.user_email || ''}
            />
            {errors.user_email && (
              <p className='invalid-para'>{errors.user_email}</p>
            )}
            <label htmlFor='pswd' className='label'>New Password</label>
            <input
              type='password' id='pswd' name='pswd'
              className={`input${errors.pswd && 'invalid'}`} placeholder='Enter the password'
              onChange={(e) => handleChange(e)}
              value={values.pswd || ''}
              required
            />
            {errors.pswd && (
              <p className='invalid-para'>{errors.pswd}</p>
            )}
            <button className='signup-btn'>Sign Up </button>
          </form>
        </section>
      </main>
    </Router>
  )
}

export default SignUp
