import React, { useEffect, useState } from 'react'
import { GetAllProduct } from '../../services/API/product/index'
import { Banner } from '../../component/banner/Banner'
import { IndexContent } from '../../component/content'
import { Hero } from '../../component/hero/hero'
import Cookies from 'js-cookie'

export const Home = () => {
  const [dataProduct, setDataProduct] = useState([])

  useEffect(() => {
    GetAllProduct()
      .then(res => {
        if (res.success) {
          setDataProduct(res.success)
        }
        console.log({
          product: res
        })
      })
  }, [])

  // if(!Cookies.get('token-user')){
  //   return window.location.href = "/login"
  // }


  return (
    <div>

      <section id="hero">
        <Hero />
      </section>
      <section id="banner">
        <Banner />
      </section>
      <section id="content">
        <IndexContent dataProduct={dataProduct} />
      </section>
    </div>
  )
}
