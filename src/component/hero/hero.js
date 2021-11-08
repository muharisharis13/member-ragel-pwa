import React from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'
import ImageHero from '../../Images/hero/hero_overlay.jpg'

export const Hero = () => {
  return (
    <Container>
      <Row1>
        <Title>
          All Natural <br />
          Skin Remedies
        </Title>
        <Desc>
          A healthier you from the inside out. We’ve sourced the cleanest ingredients to create a <br />
          line of clean skin care treatments that leave you feeling your best
        </Desc>
      </Row1>
      <Row2>
        <div>
          <ButtonShopProduct>Shop Product</ButtonShopProduct>
        </div>
      </Row2>
      <Row3>
        <Col3>
          <InputSearch type="text" id="search-hero" /> <IconSearch />
        </Col3>
      </Row3>
    </Container>
  )
}

const Col3 = styled.div`
width:30%;
position: relative;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`

const IconSearch = styled(FaSearch)`
position:absolute;
right: 5%;
`

const InputSearch = styled.input`
width: 100%;
background-color: transparent;
border: 1px solid #fff;
outline: none;
padding: 5px 10px;
color:#fff;
`


const Row3 = styled.div`
margin-top:5%;
width:100%;
display: flex;
justify-content: center;
align-items: center;
@media only screen and (min-width: 320px) and (max-width:425px){
display: none;
}
`

const ButtonShopProduct = styled.div`
display: flex;
border:1px solid white;
padding:5px 30px;
cursor:pointer;
transition:450ms;
font-weight:bold;
&:hover {
  background-color: #fff;
  color:#000;
}
`

const Row2 = styled.div`
display: flex;
flex-direction: column;
width: 100%;
align-items: flex-start;
justify-content: flex-start;
margin-top: 25px;
@media only screen and (min-width: 320px) and (max-width:425px){

  align-items: center;
justify-content: center;
}
`

const Desc = styled.p`

`

const Title = styled.p`
font-weight: 900;
font-size: 30pt;
@media only screen and (min-width: 320px) and (max-width:425px){
  font-weight: 700;
font-size: 20pt;
}
`

const Row1 = styled.div`
display: flex;
flex-direction: column;
width: 100%;
align-items: flex-start;
justify-content: flex-start;
`

const Container = styled.div`
background-image: url(${ImageHero});
width: 100%;
height:100vh;
background-repeat: no-repeat;
background-size: cover;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color:#fff;
padding:0px 60px;
padding-top: 150px;
background-position: center;

@media only screen and (min-width: 320px) and (max-width:425px){
  padding:0px 10px;
}
`
