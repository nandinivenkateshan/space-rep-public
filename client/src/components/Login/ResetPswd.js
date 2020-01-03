import React, { useState, useEffect } from 'react'
import './login.css'
import Navbar from '../About/Navbar'
import url from '../../url/config'
import { fetchPost } from '../../fetch'
import NetworkErr from '../NetworkError'

function ResetPswd () {
  const [value, setValue] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [msg, setMsg] = useState({})
  const [netErr, setNetErr] = useState(false)

  useEffect(() => {
    if (isSubmitting) {
      fetchReq(`${url}/resetPswd`, value)
    }
  }, [isSubmitting])

  const fetchReq = async (url, data) => {
    const response = await fetchPost(url, data)
    if (response.err) {
      setNetErr(true)
    } else {
      const result = await response.json()
      setMsg(result.res)
    }
  }

  const handleChange = e => {
    const email = e.target.value
    setValue({ ...value, email })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
  }

  return (
    <>
      {netErr && <NetworkErr />}
      {!netErr &&
        <>
          <Navbar signup='signUp' login='logIn' />
          <section className='login-box'>
            <h1 className='heading'>Reset Password</h1>
            <p className='sub-heading'>If you've forgotten your password,
             please enter your email address to reset your password..
            </p>
            {msg &&
              <p className='err-msg'> {msg.res}
              </p>}
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
              <label htmlFor='email' className='label'>Email</label>
              <input
                type='email' placeholder='Enter your Email'
                id='email' name='user_email' className='input'
                onChange={(e) => handleChange(e)}
                value={value.user_email}
                required
              />
              <button className='login-btn'>Send</button>
            </form>
          </section>
        </>}
    </>
  )
}

export default ResetPswd
