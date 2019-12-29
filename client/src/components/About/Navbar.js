import React from 'react'
import logo from '../../img/logo.jpeg'
import styled from 'styled-components'
import media from 'styled-media-query'
import { Link } from 'react-router-dom'

const StyledNav = styled.nav`
display: flex;
justify-content: space-between;
background-color: rgb(212, 198, 198);
padding: 0px 10px 0px 20px;
margin-bottom: 40px;
`

const StyledLink = styled(Link)`
display: flex;
text-decoration: none;
padding: 10px;
`

const LogoName = styled.label`
font-weight: bold;
font-size: 20px;
align-self: center;
color: rgb(20, 20, 90);
text-shadow: 3px 3px 3px rgb(201, 129, 129);
`

const Logo = styled.img`
  height: 40px;
  width: auto;
  border-radius: 50%;
`

const BtnGroup = styled.aside`
  display: flex;
  align-self: center;
`

const Button = styled(Link)`
padding: 6px;
text-transform: capitalize;
font-weight: bold;
&:hover {
  color: rgb(36, 73, 36);
background-color: rgb(134, 134, 184);
box-shadow: 5px 5px 2px green;
}
${media.greaterThan('425px')`
text-decoration: none;
background-color: rgb(20, 20, 90);
color: rgb(235, 228, 228);
border-radius: 6px;
box-shadow: 5px 5px 2px rgb(179, 125, 125);
text-align: center;
margin: 0px 20px 0px 0px;
`}
`

function Navbar ({ signup, login }) {
  return (
    <StyledNav>
      <StyledLink to='/'>
        <LogoName>SpaceRep</LogoName>
        <Logo src={logo} alt='logo' />
      </StyledLink>
      <BtnGroup>
        {signup && <Button to='/signup'>{signup} </Button>}
        {login && <Button to='/login'> {login}</Button>}
      </BtnGroup>
    </StyledNav>
  )
}

export default Navbar
