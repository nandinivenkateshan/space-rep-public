import React, { useState, useEffect } from 'react'
import './signUp.css'
import Navbar from '../About/Navbar'
import url from '../../url/config'
import NetworkErr from '../NetworkError'
import { Redirect } from 'react-router-dom'
import { fetchPost } from '../../fetch'

function SignUp () {
  const [values, setValues] = useState({})
  const [status, setStatus] = useState('')
  const [resMsg, setResMsg] = useState({})
  const [netErr, setNetErr] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isSubmitting) {
      fetchReq(`${url}/createAccount`, values)
    }
  }, [isSubmitting])

  const fetchReq = async (url, card) => {
    const response = await fetchPost(url, card)
    if (response.err) {
      setNetErr(true)
    } else {
      const responseMsg = await response.json()
      setStatus(response.ok)
      setResMsg(responseMsg)
    }
  }

  const handleChange = e => {
    e.persist()
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
  }

  return (
    <>
      {netErr &&
        <NetworkErr />}
      {!netErr &&
        <div className='signup-page'>
          <Navbar login='logIn' />
          <section className='signup-box'>
            <h1 className='heading'>Create a new account</h1>
            <p className='sub-heading'>It's free and always will be.</p>
            <form className='signup-form' onSubmit={e => handleSubmit(e)}>
              <label htmlFor='username' className='label'>Username</label>
              <input
                type='text'
                placeholder='Enter your name'
                id='username'
                name='user_name'
                className='input'
                onChange={e => handleChange(e)}
                value={values.user_name || ''}
                pattern='^[a-zA-Z][a-zA-Z0-9_]{3,29}$'
                required
              />
              <label htmlFor='email' className='label'>
            Your Email
              </label>
              <input
                type='email'
                placeholder='Enter your Email'
                id='email'
                name='user_email'
                className='input'
                onChange={e => handleChange(e)}
                value={values.user_email || ''}
                required
              />
              <label htmlFor='pswd' className='label'>
            New Password
              </label>
              <input
                type='password'
                id='pswd'
                name='pswd'
                className='input'
                placeholder='Enter the password'
                onChange={e => handleChange(e)}
                value={values.pswd || ''}
                minLength='6'
                required
              />
              <button className='signup-btn'>Sign Up </button>
            </form>
            {status && resMsg.error && (
              <p className='acc-exist-already'>
            Sorry, an account with this email address already exists.
              </p>
            )}
            {status && resMsg.success && (
              <Redirect to='/login' />
            )}
          </section>
        </div>}
    </>
  )
}

export default SignUp
