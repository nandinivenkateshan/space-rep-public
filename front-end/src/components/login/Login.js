import React, { useState, useEffect } from 'react'
import logo from '../img/logo.jpeg'
import './login.css'
import { Link, BrowserRouter as Router, Redirect } from 'react-router-dom'

function Login () {
  const [data, setData] = useState()
  const [isExistingMail, setExistingMail] = useState(false)
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/getUserDetails')
      const data = await res.json()
      setData(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsLogin(true)
    }
  }, [errors])

  const handleChange = e => {
    e.persist()
    setValues(values => ({ ...values, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors(validate(values))
  }

  const handleEmail = (e) => {
    const val = e.target.value
    data.map(item => {
      if (item.user_email !== val) setExistingMail(true)
    })
  }

  const validate = values => {
    const errors = {}
    if (!values.user_email) errors.user_email = 'User Email is required'
    else if (!/\S+@\S+\.\S+/.test(values.user_email)) {
      errors.user_email = 'Email address is invalid'
    }
    if (!values.pswd) errors.pswd = 'Password is required'
    return errors
  }

  return (
    <Router>
      <main className='main'>
        <nav className='navbar'>
          <Link to='/' className='logo-items'>
            <label className='logo-text'>SpaceRep</label>
            <img src={logo} alt='logo' width='70' height='30' className='logo' />
          </Link>
          <Link to='/signup' className='signup-btn-nav'>Sign Up</Link>
        </nav>
        <section className='login-box'>
          <h1 className='heading'>Login</h1>
          <p className='sub-heading'>Log in to an existing account.</p>
          {isExistingMail &&
            <p className='acc-not-exist-msg'>Sorry, no account was found with that email address.
            Please check your spelling and try again.
            </p>}
          <form className='login-form' onSubmit={e => handleSubmit(e)}>
            <label htmlFor='email' className='label'>Email</label>
            <input
              type='email' placeholder='Enter your Email'
              id='email' name='user_email' className={`input${errors.user_email && 'invalid'}`}
              onChange={(e) => handleChange(e)}
              value={values.user_email || ''}
              onBlur={(e) => handleEmail(e)}
            />
            {errors.user_email && (
              <p className='invalid-para'>{errors.user_email}</p>
            )}
            <label htmlFor='pswd' className='label'>Password</label>
            <input
              type='password' id='pswd' name='pswd'
              className={`input${errors.pswd && 'invalid'}`} placeholder='Enter the password'
              onChange={(e) => handleChange(e)}
              value={values.pswd || ''}
            />
            {errors.pswd && (
              <p className='invalid-para'>{errors.pswd}</p>
            )}
            <button className='login-btn'>Login</button>
            {isLogin &&
              <Redirect to='/loggedIn' />}
          </form>
          <Link className='reset-pswd' to=''>Reset Password</Link>
        </section>
      </main>
    </Router>
  )
}

export default Login
