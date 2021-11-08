import React from 'react'
import styled from 'styled-components'
import { MdError } from 'react-icons/md'

export const NotFound = () => {
  return (
    <Container>
      <IconContainer>
        <MdError />
      </IconContainer>
      <H1>Not Found !</H1>
    </Container>
  )
}

const H1 = styled.h1`
color:#ffc107;
font-weight:400;
`

const IconContainer = styled.div`
font-size:200px;
color : #ffc107;
`

const Container = styled.div`
display: flex;
flex-direction: column;
align-items:center;
justify-content: center;
text-align:center;
width: 100%;
height: 100vh;
background-color: #f6f6f6;
`
