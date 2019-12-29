import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import logo from '../../img/logo.jpeg'
import { Link } from 'react-router-dom'
import url from '../../url/config'
import { getSession } from '../../util'
import { fetchGet } from '../../fetch'
import NetworkErr from '../NetworkError'
import styled from 'styled-components'

const StyledNav = styled.nav`
background-color: rgb(212, 198, 198);
  text-decoration: none;
  color: rgb(20, 20, 90);
  font-weight: bold;
  font-size: 17px;
  padding: 10px;
`
const Logo = styled.img`
  border-radius: 50%;
`
const LogoText = styled.label`
color: rgb(20, 20, 90);
  text-shadow: 3px 3px 3px rgb(201, 129, 129);
`

function Navbar () {
  let sid
  const session = getSession()
  if (session) sid = session.sid
  const [account, setAccount] = useState('')
  const [netErr, setNetErr] = useState(false)

  async function accountName () {
    const response = await fetchGet(`${url}/checkAccount/?sid=${session.sid}`)
    if (response.err) {
      setNetErr(true)
    } else {
      const data = await response.json()
      if (data.user) setAccount(data.user)
    }
  }

  useEffect(() => {
    accountName()
  }, [])

  const handleLogOut = async () => {
    const response = await window.fetch(`${url}/logout/?sid=${sid}`)
    const result = await response.json()
    window.localStorage.setItem('session', JSON.stringify(result))
  }

  return (
    <>
      {netErr && <NetworkErr />}
      {!netErr &&
        <StyledNav className='navbar' role='navigation' aria-label='main navigation'>
          <div className='navbar-brand'>
            <Link className='navbar-item' to='/decks'>
              <Logo src={logo} alt='logo' />
              <LogoText className='logo-text'>SpaceRep</LogoText>
            </Link>
          </div>

          <div className='navbar-menu is-active'>
            <div className='navbar-start'>
              <Link className='navbar-item' to='/decks'> Decks</Link>
              <Link className='navbar-item' to='/add'> Add</Link>
            </div>

            <div className='navbar-end'>
              <Link className='navbar-item' to='/decks'>Account- {account}</Link>
              <Link className='navbar-item' to='/login' onClick={handleLogOut}>  Log Out</Link>
            </div>
          </div>
        </StyledNav>}
    </>
  )
}

export default Navbar
