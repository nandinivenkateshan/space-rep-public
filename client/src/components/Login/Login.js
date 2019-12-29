import React, { useState, useEffect } from 'react'
import './login.css'
import { Redirect } from 'react-router-dom'
import Navbar from '../About/Navbar'
import url from '../../url/config'
import { getSession, setSession } from '../../util'
import { fetchPost } from '../../fetch'
import NetworkErr from '../NetworkError'

function Login () {
  let active
  const session = getSession()
  if (session) {
    active = session.active
  }

  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [errMsg, setErrMsg] = useState({})
  const [netErr, setNetErr] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      fetchReq(`${url}/login`, values)
    }
  }, [errors])

  const fetchReq = async (url, card) => {
    const response = await fetchPost(url, card)
    if (response.err) {
      setNetErr(true)
    } else {
      const result = await response.json()
      if (result.sid) {
        setSession(result)
        setIsLogin(true)
      } else {
        setErrMsg(result)
      }
    }
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
    if (!/\S+@\S+\.\S+/.test(values.user_email)) {
      errors.user_email = 'Email address is invalid'
    }
    if (!values.user_email) {
      errors.user_email = 'User Email is required'
    }
    if (!values.pswd) errors.pswd = 'Password is required'
    return errors
  }

  return (
    <>
      {netErr && <NetworkErr />}
      {active && <Redirect to='/decks' />}
      {!netErr &&
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
                required
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
                required
              />
              {errors.pswd && (
                <p className='invalid-para'>{errors.pswd}</p>
              )}
              <button className='login-btn'>Login</button>
              {isLogin &&
                <Redirect to='/decks' />}
            </form>
          </section>
        </>}
    </>
  )
}

export default Login
