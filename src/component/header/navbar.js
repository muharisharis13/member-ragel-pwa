import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaBars, FaBell, FaPowerOff, FaTimes, FaUser } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import LogoRagel from '../../Images/Logo/Logo HD.png'
import { Link, NavLink } from 'react-router-dom'
import { Logout } from '../../services/API/auth'
import { Context } from '../../Context/Context'
import { Get_UserInfo } from '../../services/API/userInfo/index'
import { GetAllCart } from '../../services/API/product'
import Cookies from 'js-cookie'


const navTitle = [
  {
    to: "/home",
    name: "Shopping"
  },
  {
    to: "/listBooking",
    name: "Consultation"
  },
  {
    to: "/event",
    name: "Event"
  },
  {
    to: "/about",
    name: "About Us"
  },
  {
    to: "/contact",
    name: "Contact Us"
  },
]

export const Navbar = () => {
  const [nav, seNav] = useState(false)
  const [popUser, setPopUser] = useState(false)
  const [bgNav, setBgNav] = useState(false)
  const [selected, setSelected] = useState("")
  const { cart, dispatch } = useContext(Context)
  const [user_info, setUser_info] = useState({})



  const changebackground = () => {
    if (window.scrollY >= 80) {
      setBgNav(true)
    }
    else {
      setBgNav(false)
    }
  }

  window.addEventListener('scroll', changebackground)

  const btnSelected = ({ to }) => {
    setSelected(to.split("/")[1])
  }

  const btnLogOut = () => {
    Logout()
      .then(res => {
        console.log({
          logout: res.success
        })
      })
  }

  useEffect(() => {
    Get_UserInfo()
      .then(res => {
        console.log({
          user_info: res
        })
        if (res.success) {
          setUser_info(res.success)
          dispatch({
            type: 'USER_INFO',
            arrUserInfo: res.success
          })
        }
        else {
          Cookies.remove("token-user")
          window.location.href = "/login"
        }

      })
    GetAllCart()
      .then(res => {
        dispatch({ type: 'CART', cart: res.success })
      })
  }, [])




  return (
    <Container id="wrappernav" className={bgNav && 'active'}>
      <Row1St>
        <ContainerNotif>
          <RowNotif>
            <ColNotif bgNav={bgNav} selected={selected} className={bgNav && 'activeText'}>
              <DotNotif >0</DotNotif>
              <FaBell />
            </ColNotif>
          </RowNotif>
        </ContainerNotif>
        <ContainerLogo>
          <img width={70} src={LogoRagel} alt="logo" id="logoragel" name="logoragel" />
        </ContainerLogo>
        <ContainerUser>
          <RowUser>
            <ColUser1 selected={selected} to="/cart" onClick={() => btnSelected({ to: "/cart" })} className={bgNav && 'activeText'}>
              {cart.length > 0 ?
                <DotNotif >{cart.length}</DotNotif>
                : null

              }
              <FiShoppingCart />
            </ColUser1>
            <ColUser2 selected={selected} className={bgNav && 'activeText'}>
              <FaUser onClick={() => setPopUser(!popUser)} />
              <ContainerPopUpUser popuser={popUser}>
                <Ul>
                  <Li onClick={() => btnSelected({ to: `/profile/${user_info.username}` })}><LinkUser to={{
                    pathname: `/profile/${user_info.username}`,
                    state: user_info
                  }}>Profile</LinkUser></Li>
                  <Li onClick={btnLogOut}>Log Out</Li>
                </Ul>
              </ContainerPopUpUser>
            </ColUser2>
            <ColUser3>
              <FaBars onClick={() => seNav(!nav)} />
            </ColUser3>
          </RowUser>
        </ContainerUser>
      </Row1St>
      <Row2nd>
        {
          navTitle.map((item, index) => (
            <Col2nd activeStyle={{ color: "#FFBF00" }} className={bgNav && 'activeText'} selected={selected} to={item.to} onClick={() => btnSelected({ to: item.to })} key={index} >{item.name}</Col2nd>

          ))
        }
        {/* <Col2nd to="/listBooking" onClick={() => setSelected("listBooking")} activeStyle={{ color: '#FFBF00' }}>Consultation</Col2nd>
        <Col2nd to="/event" activeStyle={{ color: '#FFBF00' }}>Event</Col2nd>
        <Col2nd to="">About Us</Col2nd>
        <Col2nd to="">Contact Us</Col2nd> */}
      </Row2nd>

      {/* ==========MOBILE================= */}



      <ContainerMobile nav={nav}>
        <RowMobile1>
          <ColIconClose>
            <FaTimes onClick={() => seNav(!nav)} />
          </ColIconClose>
          <ColIconClose>
            <FaPowerOff />
          </ColIconClose>
        </RowMobile1>
        <RowMobile>
          <ColMobile>Shopping</ColMobile>
          <ColMobile>Consultation</ColMobile>
          <ColMobile>Event</ColMobile>
          <ColMobile>About Us</ColMobile>
          <ColMobile>Contact Us</ColMobile>
        </RowMobile>
      </ContainerMobile>


      {/* ==========END MOBILE================= */}
    </Container>
  )
}

const LinkUser = styled(Link)`
color:#000;

&:hover{
  color:#000;
}
`

const RowMobile1 = styled.div`
display: flex;
width: 100%;
justify-content:space-between;
padding:10px 10px;
`

const Li = styled.li`
    border: 1px solid rgba(0,0,0,.125);
    padding:10px 20px;
    color:#000 !important;
    transition: 250ms;
    &:hover{
      background-color: red;
      color:#fff;
    }
`

const Ul = styled.ul`
list-style-type: none;
padding:0;
background:#f8f9fa;
width:150px;
`

const ContainerPopUpUser = styled.div`
position:absolute;
margin: 10px -60px;
font-size:12pt;
transition:850ms;
display: ${({ popuser }) => (popuser ? 'flex' : 'none')};
`

const ColMobile = styled.div`
margin:10px 0px;
font-weight:700;
color:#fff;
`

const RowMobile = styled.div`
display: none;
@media only screen and (min-width: 320px) and (max-width:425px){
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align:center;
  margin-top: 30%;
  
}
`

const ColIconClose = styled.div`
display: none;
@media only screen and (min-width: 320px) and (max-width:425px){
  font-size:15pt;
  align-items: flex-end;
  justify-content: flex-end;
  display: unset;
  padding:0px 20px;
}
 `

const ContainerMobile = styled.div`
     display: none;


      @media only screen and (min-width: 320px) and (max-width:425px){
        display: flex;
      background:#8d99ae;
      flex-direction:column;
      width: 100%;
      height: 100vh;
      position:absolute;
      top:-1000px;
      left:0;
      transition:850ms;

      top:${({ nav }) => (nav ? 0 : '-1000px')};
}

      `

const DotNotif = styled.div`
      display:flex;
      background-color: red;
      color:#fff;
      font-weight:700;
      align-items: center;
      justify-content: center;
      padding:0px 7px;
      font-size: 12pt;
      border-radius: 100%;
      position: absolute;
      right:0;
      top:0;
      `

const Col2nd = styled(NavLink)`
      padding:0px 15px;
      font-weight: 700;
      color: ${({ selected, bgNav }) => window.location.pathname.split("/")[1] === "home" || window.location.pathname.split("/")[1] === "" ? "#fff" : "#000"};
      /* color: ${window.location.pathname.split("/")[1] === "home" ? "#fff" : "#000"}; */
      transition: 450ms;
      &:hover{
        color:#FFBF00;
      text-decoration: none;
}
      `

const ColNotif = styled.div`
      padding:0px 10px;
      font-size: 16pt;
      cursor: pointer;
      position:relative;

      color: ${({ selected, bgNav }) => window.location.pathname.split("/")[1] === "home" || window.location.pathname.split("/")[1] === "" ? "#fff" : "#000"};
      /* color: ${window.location.pathname.split("/")[1] === "home" ? "#fff" : "#000"}; */
      `
const ColUser1 = styled(Link)`
      padding:0px 10px;
      font-size: 16pt;
      cursor: pointer;
      position:relative;
      color: ${({ selected, bgNav }) => window.location.pathname.split("/")[1] === "home" || window.location.pathname.split("/")[1] === "" ? "#fff" : "#000"};
      /* color: ${window.location.pathname.split("/")[1] === "home" ? "#fff" : "#000"}; */


      `
const ColUser2 = styled.div`
      padding:0px 10px;
      font-size: 16pt;
      cursor: pointer;
      position:relative;
      color: ${({ selected, bgNav }) => window.location.pathname.split("/")[1] === "home" || window.location.pathname.split("/")[1] === "" ? "#fff" : "#000"};
      /* color: ${window.location.pathname.split("/")[1] === "home" ? "#fff" : "#000"}; */


      @media only screen and (min-width: 320px) and (max-width:425px){
        display: none;
}
      `
const ColUser3 = styled.div`
      display: none;

      @media only screen and (min-width: 320px) and (max-width:425px){
        padding:0px 10px;
      font-size: 16pt;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      display: flex;
}
      `

const RowNotif = styled.div`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-align: center;
      width: 100%;
      `

const RowUser = styled.div`
      display: flex;
      justify-content: flex-end;
      align-items: center;
      text-align: center;
      width: 100%;
      `

const ContainerUser = styled.div`
      display: flex;
      width: 30%;
      `
const ContainerLogo = styled.div`
      display: flex;
      width: 30%;
      align-items: center;
      justify-content: center;
      `
const ContainerNotif = styled.div`
      display: flex;
      width: 30%;
      `

const Row2nd = styled.div`
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      text-align:center;
      margin:7px 0px;

      @media only screen and (min-width: 320px) and (max-width:425px){
        display: none;
}
      `
const Row1St = styled.div`
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      text-align:center;
      `

const Container = styled.div`
      background:${window.scrollTo(0, 200) ? 'red' : 'transparent'};
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding:10px 0px;
      position:fixed;
      top:0;
      width: 100%;
      /* color: ${window.location.pathname.split("/")[1] === "" ? '#fff' : '#000'}; */
      z-index:2;
      `
