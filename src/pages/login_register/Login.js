import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { FaUserCircle, FaUserLock } from 'react-icons/fa'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import LogoHd from '../../Images/Logo/Logo HD.png'
import { LoginUser } from '../../services/API/auth'


// class Cart {
//   constructor() {
//     this.title = []
//   }

//   add(data) {
//     this.title = data
//     return this.title
//   }

//   remove(item) {
//     let index = this.title.indexOf(item);
//     this.title.splice(index, 1)
//     // this.title.splice(1, index);
//     return this.title
//   }

//   count() {
//     return this.title.length
//   }

//   unique() {
//     let data = [...new Set(this.title)]

//     return data
//   }

//   isTitleSet() {
//     // this.title.push("apple")
//     return this.title
//   }
// }


// const myCart = new Cart()
// console.log({
//   add: myCart.add(["apple", "orange", "lemon", "orange"]),
//   remove: myCart.remove("apple"),
//   trueFalse: myCart.isTitleSet() ? false : true,
//   data: myCart.isTitleSet(),
//   count: myCart.count(),
//   unique: myCart.unique()
// })


export const Login = () => {
  const [dataInput, setDataInput] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const onChangevalue = ({ type, e }) => {

    switch (type) {
      case 'username':
        setDataInput({ ...dataInput, username: e.target.value })
        break;
      case 'password':
        setDataInput({ ...dataInput, password: e.target.value })
        break;

      default:
        break;
    }
  }

  const btnLogin = (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      username: dataInput.username,
      password: dataInput.password
    }
    LoginUser({ databody: data })
      .then(res => {
        // console.log({
        //   login : res
        // })
        if (res.success) {
          Cookies.set('token-user', res.success.token)
          window.location.href = "/home"
        }
        else {
          console.log({
            error_login: res
          })
          alert('error Login')
        }

        setLoading(false)
      })
  }

  if (Cookies.get('token-user')) {
    return window.location.href = "/home"
  }

  return (
    <div className="container" style={{ position: 'relative', height: '100vh' }}>
      <RowForm className="row justify-content-center align-items-center text-center">
        <div className="col-lg-5 col-md-12 col-sm-12">
          <img src={LogoHd} alt="logo" width={100} />
        </div>
      </RowForm>
      <div className="row justify-content-center align-items-center mt-5">
        <ContainerForm className="col-lg-5 col-md-7 col-sm-12">
          <ContainerFluid className="container-fluid">
            <form onSubmit={btnLogin}>
              <div className="row justify-content-center align-items-center">
                <WrapperInput className="col-md-10 col-sm-10">
                  <Icon htmlFor="id">
                    <FaUserCircle />
                  </Icon>
                  <Input type="text" placeholder="Username" className="form-control" id="id"
                    value={dataInput.username} onChange={(e) => onChangevalue({ e: e, type: 'username' })}
                  />
                </WrapperInput>
                <WrapperInput className="col-md-10 col-sm-10 mt-3">
                  <Icon htmlFor="password">
                    <FaUserLock />
                  </Icon>
                  <Input type="password" placeholder="Password" className="form-control" id="password"
                    value={dataInput.password} onChange={(e) => onChangevalue({ e: e, type: 'password' })} />
                </WrapperInput>
                <WrapperInput className="col-md-10 col-sm-10 mt-3">
                  {
                    loading ? 'Loading' :
                      <Button type="submit" onClick={btnLogin}>Login</Button>
                  }
                </WrapperInput>
              </div>

            </form>
          </ContainerFluid>
        </ContainerForm>
      </div>
    </div>
  )
}

const Button = styled.button`
text-decoration: none;
display: inline-flex;
background: #ffbf00;
color:#fff;
font-weight: 700;
text-transform: uppercase;
width: 100%;
text-align: center;
justify-content: center;
align-items: center;
border-radius:7px;
padding:5px 0px;
cursor:pointer;
transition: 850ms;
border:1px solid #ffbf00;

&:hover{
  color: gray;
  background:none;
  border:1px solid #ffbf00;
  padding:5px 0px;
  text-decoration: none;
}
`

const ContainerFluid = styled.form`
padding:70px 30px;
position: relative;
`

const Input = styled.input`
border-radius: 0px 10px 10px 0px;
border-left: none;
transition: 850ms;

&:focus{
  border-color: #ffbf00;
}
`

const Icon = styled.div`
font-size: 16.5pt;
background-color: #FFBF00;
color:#fff;
padding: 6px 10px;
display: flex;
text-align: center;
justify-content: center;
align-items: center;
border-radius: 10px 0px 0px 10px;
`

const WrapperInput = styled.div`
display:inline-flex;
justify-content: center;
align-items: center;
`

const RowForm = styled.div`
position:  relative;
width: 100%;
margin-top:70px;
`


const ContainerForm = styled.div`
background : #fff;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
border-radius:7px;
border: none;
`
