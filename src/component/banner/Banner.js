import React from 'react'
import leftbanner from '../../Images/banner/57-577113_photo-wallpaper-makeup-shadows-cosmetics-blush-backgrounds-makeup.png'
import rightbanner from '../../Images/banner/Image 3.png'
import styled from 'styled-components'

export const Banner = () => {
  return (
    <div className="container-fluid">
      <Row className="row">
        <Col className="col-md-6 col-sm-12 col-lg-6">
          <Image src={leftbanner} alt="banner1" />
        </Col>
        <Col className="col-md-6 col-sm-12 col-lg-6">
          <Image src={rightbanner} alt="banner1" />

        </Col>
      </Row>

    </div>
  )
}

const Col = styled.div`
padding:0px;
`


const Row = styled.div`
padding:0px;
justify-content: center;
align-items: center;
`

const Image = styled.img`
width:674px;
height: 40vh;
object-fit: cover;


@media only screen and (min-width: 320px) and (max-width:425px){
width:100%;
}
`
