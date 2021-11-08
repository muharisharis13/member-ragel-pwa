import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import image from '../../../Images/product/WhatsApp Image 2021-06-22 at 22.09.57.jpeg'
import star from '../../../Images/star/star.png'
import love from '../../../Images/star/heart.png'
import love_berisi from '../../../Images/star/heart_berisi.png'
import { FaCartPlus } from 'react-icons/fa'
import { currency } from '../../../utl/currency-format/index'
import { AddtoCart, GetAllCart, RemoveWhislist, WhislistProduk } from '../../../services/API/product'
import { Context } from '../../../Context/Context'
import { Link } from 'react-router-dom'

export const Product = ({ data }) => {
  const { dispatch, cart } = useContext(Context)

  const btnaddWishlist = (product_id, { wishlist }) => {


    if (wishlist === false) {
      WhislistProduk({
        product_id: {
          product_id: product_id
        }
      })
        .then(res => {
          console.log({
            data_add: res
          })
          if (res.success) {
            window.location.reload()
          }
        })

    }
    else {
      RemoveWhislist({
        product_id: {
          product_id: product_id
        }
      })
        .then(res => {
          console.log({
            data_remove: res
          })
          if (res.success) {
            window.location.reload()
          }
        })
    }
  }

  const btnAddToCart = (index) => {
    const body = {
      product_id: index
    }

    // console.log(index)
    AddtoCart({ body })
      .then(res => {
        console.log({ ini_add_cart: res })
        if (res.success) {
          alert(`${res.success.message}`)
          GetAllCart()
            .then(res => {
              dispatch({ type: 'CART', cart: res.success })
            })
        }
      })


  }

  useEffect(() => {
    GetAllCart()
      .then(res => {
        dispatch({ type: 'CART', cart: res.success })
      })
  }, [])

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-baseline">
        {
          data.map((item, index) => (
            <Wrapper key={index} className="col-md-3 col-sm-4 m-2 ">
              <ContainerImage to={`/details/${item.id}`}>
                <ImageProduct src={item.product_pic_url} alt="image" />
              </ContainerImage>
              <ContainerContent>
                <LeftContent>
                  <p style={{ fontSize: '12pt' }}>{item.product_name}</p>
                  <strong>{currency(item.selling_price)}</strong>
                  <div>
                    <img src={star} alt="star" />
                  </div>
                </LeftContent>
                <RightContent>
                  <IconLove onClick={() => btnaddWishlist(item.id, { wishlist: item.wishlist })}>
                    <img src={item.wishlist ? love_berisi : love} alt="love" />
                  </IconLove>
                  <IconCart onClick={() => btnAddToCart(item.id)}>
                    <FaCartPlus />
                  </IconCart>
                </RightContent>
              </ContainerContent>
            </Wrapper>

          ))
        }

      </div>
    </div>
  )
}

const IconLove = styled.div`
cursor: pointer;
`

const IconCart = styled.div`
cursor: pointer;
font-size: 24pt;
`

const ContainerImage = styled(Link)`

`

const RightContent = styled.div`
background-color: #FFBF00;
padding:10px;
justify-content: center;
align-items: center;
text-align:center;
color:#fff;
display: flex;
flex-direction: column;
border-radius: 10px 0px 10px 0px;
position:absolute;
right: 0;
bottom:0;
`

const LeftContent = styled.div`
padding: 10px 10px;
/* background:red; */
width: 100%;
position:relative;
`

const ContainerContent = styled.div`
display: flex;
width: 100%;
position:relative;
height:160px;
`

const ImageProduct = styled.img`
width: 100%;
height: 200px;
object-fit: cover;
border-radius: 10px 10px 0px 0px;
`

const Wrapper = styled.div`
box-shadow: 4px 3px 5px -2px rgba(0,0,0,0.34);
padding:0px;
border-radius: 10px;
display: flex;
flex-direction: column;
background:#fff;
`
