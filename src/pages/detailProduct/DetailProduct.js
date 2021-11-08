import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from '../../Images/product/WhatsApp Image 2021-06-22 at 22.09.57.jpeg'
import star from '../../Images/star/star.png'
import user from '../../Images/profile/attractive-beautiful-casual-1082962.png'
import { DetailProduct1, GetAllFeedbacks, AddtoCart } from '../../services/API/product/index'
import { currency } from '../../utl/currency-format/index'

export const DetailProduct = (props) => {
  const [data, setData] = useState({})
  const [dataFeedBack, setDataFeedBack] = useState([])

  useEffect(() => {
    DetailProduct1(props.match.params.id_product)
      .then(res => {
        console.log(res)
        if (res.success) {
          setData(res.success)
        }
      })

    GetAllFeedbacks({
      product_id: props.match.params.id_product,
      page: "1"
    })
      .then(res => {
        console.log({ feedback: res.success })

        if (res.success) {
          setDataFeedBack(res.success.data)
        }
      })
  }, [])

  const btnAddToCart = () => {
    const body = {
      product_id: data.id
    }

    // console.log(index)
    AddtoCart({ body })
      .then(res => {
        console.log({ ini_add_cart: res })
        if (res.success) {
          alert(`${res.success.message}`)
          window.location.href = "/home"
        }
      })


  }
  return (
    <Container className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <WrapperImage>
            <ImageProduct src={data.product_pic_url} alt="image product" />
          </WrapperImage>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <Title>{data.product_name}</Title>
          <div><img src={star} alt="star" /> {data.count_feedback} reviews</div>

          <Harga>{currency(data.selling_price)}</Harga>
          <Details>Details</Details>
          <Desc>
            {data.product_description}
          </Desc>

          <Button onClick={btnAddToCart}>
            Add To Cart
          </Button>
        </div>
      </div>

      <div className="container">

        <Reviews>Reviews</Reviews>
        <div className="row pb-5">
          {
            dataFeedBack.length > 0 ? dataFeedBack.map((item, index) => (
              <ContainerReviews className="col-lg-5 col-md-12 col-sm-12" key={index}>
                <div>
                  <ImageReview src={user} alt="User" />
                </div>
                <WrapperContent>
                  <TitleContent>samanthy</TitleContent>
                  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda illum, distinctio alias asperiores odit magni voluptatibus pariatur tempore provident sint.</div>
                  <div><img src={star} alt="star comment" /></div>
                </WrapperContent>
              </ContainerReviews>

            ))
              :
              <ContainerReviews className="col-lg-5 col-md-12 col-sm-12">
                <div>
                  <ImageReview src={user} alt="User" />
                </div>
                <WrapperContent>
                  <TitleContent>length nya 0</TitleContent>
                  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda illum, distinctio alias asperiores odit magni voluptatibus pariatur tempore provident sint.</div>
                  <div><img src={star} alt="star comment" /></div>
                </WrapperContent>
              </ContainerReviews>
          }
        </div>
      </div>
    </Container>
  )
}

const TitleContent = styled.div`
font-weight: 800;
`

const WrapperContent = styled.div`
background-color: #F6F9FC;
padding:10px 10px;
`

const ContainerReviews = styled.div`
display: flex;
margin-top:20px;
`

const ImageReview = styled.img`
object-fit: cover;
width: 70px;
height: 70px;
border-radius: 100%;
margin:0px 10px;
`

const Reviews = styled.div`
margin-top:50px;
font-weight:700;
`

const Button = styled.div`
display: flex;
width: 50%;
margin-top: 20px;
align-items: center;
justify-content: center;
background-color: #FFBF00;
font-weight: 800;
color:#ffff;
padding:10px 10px;
cursor: pointer;
margin-bottom: 100px;
@media screen and (min-width: 320px) and (max-width:425px){
 
width: 100%;
}
`

const Desc = styled.div`

`

const Details = styled.div`
margin-top: 20px;
font-weight: 700;
`

const Harga = styled.div`
font-size:24pt; 
font-weight: 800;
margin-top:90px;

@media screen and (min-width: 320px) and (max-width:425px){
  margin-top:70px;
}
`

const Title = styled.div`
font-size:20pt; 
font-weight: 700;
`

const WrapperImage = styled.div`
display: flex;
/* background-color: red; */
align-items: center;
justify-content: center;
text-align:center;
`


const ImageProduct = styled.img`
width: 500px;
height:500px;
object-fit: cover;
border-radius: 10px;
`

const Container = styled.div`
/* background:gray; */
height: 100vh;
padding-top:150px;
`
