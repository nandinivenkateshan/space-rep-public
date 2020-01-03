import React, { useState, useEffect } from 'react'
import './login.css'
import { Redirect, Link } from 'react-router-dom'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [errMsg, setErrMsg] = useState({})
  const [netErr, setNetErr] = useState(false)

  useEffect(() => {
    if (isSubmitting) {
      fetchReq(`${url}/login`, values)
    }
  }, [isSubmitting])

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
    setValues(values =>
      ({ ...values, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
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
              <p className='err-msg'> {errMsg.res}
              </p>}
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
              <label htmlFor='email' className='label'>Email</label>
              <input
                type='email' placeholder='Enter your Email'
                id='email' name='user_email' className='input'
                onChange={(e) => handleChange(e)}
                value={values.user_email || ''}
                required
              />
              <label htmlFor='pswd' className='label'>Password</label>
              <input
                type='password' id='pswd' name='pswd'
                className='input' placeholder='Enter the password'
                onChange={(e) => handleChange(e)}
                value={values.pswd || ''}
                required
              />
              <button className='login-btn'>Login</button>
              {isLogin &&
                <Redirect to='/decks' />}
            </form>
            <Link className='reset-pswd' to='/resetPswd'>Reset Password</Link>
          </section>
        </>}
    </>
  )
}

export default Login
