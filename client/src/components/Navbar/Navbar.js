import React from 'react'
import 'bulma/css/bulma.css'
import logo from '../../img/logo.jpeg'
import { Link } from 'react-router-dom'
import url from '../../url/config'
import { getSession } from '../../util'
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
  let sid, accName
  const session = getSession()
  if (session) {
    sid = session.sid
    accName = session.name
  }

  const handleLogOut = async () => {
    const response = await window.fetch(`${url}/logout/?sid=${sid}`)
    const result = await response.json()
    window.localStorage.setItem('session', JSON.stringify(result))
  }

  return (
    <>
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
            <Link className='navbar-item' to='/decks'>Account- {accName}</Link>
            <Link className='navbar-item' to='/login' onClick={handleLogOut}>  Log Out</Link>
          </div>
        </div>
      </StyledNav>
    </>
  )
}

export default Navbar
