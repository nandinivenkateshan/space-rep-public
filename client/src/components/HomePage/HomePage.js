import React from 'react'
import Navbar from './Navbar'
import styled from 'styled-components'

const StyledSection = styled.section`
margin:10px 100px 0px 100px;
`

const StyledPara2 = styled.p`
font-size: 18px;
line-height: 1.5;
`
const StyledPara1 = styled(StyledPara2)`
    margin-bottom: 10px;
`

function Home () {
  return (
    <main className='main'>
      <Navbar signup='signUp' login='logIn' />
      <StyledSection>
        <StyledPara1>
            SpaceRep is a free companion to the computer version of Anki. It can
            be used to review online when you don't have access to your home
            computer, and can be used to keep your cards synchronized across
            multiple machines.
        </StyledPara1>
        <StyledPara2>
            SpaceRep is intended to be used in conjunction with the computer
            version of Anki. While it is possible to create basic text-only
            cards and review them using only SpaceRep.
        </StyledPara2>
      </StyledSection>
    </main>
  )
}

export default Home
