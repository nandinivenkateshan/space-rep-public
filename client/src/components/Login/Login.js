import React, { useState, useEffect } from 'react'
import './login.css'
import { Redirect } from 'react-router-dom'
import Navbar from '../About/Navbar'
import obj from '../config'

function Login () {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [errMsg, setErrMsg] = useState({})

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      checkUserDetails(`${obj.url}/login`, values)
    }
  }, [errors])

  async function checkUserLogout () {
   // console.log('jbvkjnh')
    // const response = await window.fetch(`${obj.url}/checkAccount/?sid=${obj.sid}`)
    // const data = await response.json()
    // if (data) {
      const response = await window.fetch(`${obj.url}/logout/?sid=${obj.sid}`)
      console.log(response)
    // }
  }

  useEffect(() => {
    if (obj.sid) checkUserLogout()
  }, [])

  const checkUserDetails = async (url, data) => {
    const res = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await res.json()
    if (response.sid) {
      setIsLogin(true)
      window.localStorage.setItem('session', JSON.stringify(response))
    } else setErrMsg(response)
  }

  const handleChange = e => {
    e.persist()
    setValues(values => ({ ...values, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors(validate(values))
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
    <>
      <Navbar signup='signUp' />
      <section className='login-box'>
        <h1 className='heading'>Login</h1>
        <p className='sub-heading'>Log in to an existing account.</p>
        {errMsg &&
          <p className='acc-not-exist-msg'> {errMsg.res}
          </p>}
        <form className='login-form' onSubmit={e => handleSubmit(e)}>
          <label htmlFor='email' className='label'>Email</label>
          <input
            type='email' placeholder='Enter your Email'
            id='email' name='user_email' className={`input${errors.user_email && 'invalid'}`}
            onChange={(e) => handleChange(e)}
            value={values.user_email || ''}
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
            <Redirect to='/decks' />}
        </form>
      </section>
    </>
  )
}

export default Login
