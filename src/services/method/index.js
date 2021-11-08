import Cookies from "js-cookie"


const baseApi = process.env.REACT_APP_BASE_API
const token = Cookies.get('token-user')

const headers = {
  "Authorization": `Bearer ${token && token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const headerImg = {
  "Authorization": `Bearer ${token && token}`,
}

export const methodGET = async function ({ endpoint }) {
  return await fetch(
    `${baseApi}${endpoint}`,
    {
      method: 'GET',
      headers: headers,
    }
  )
    .then(res => res.json())
    .catch(err => {
      // alert('error Method check method GET')
      console.error(err)
    })
}

export const methodPost = async ({ endpoint, data }) => {
  return await fetch(
    `${baseApi}${endpoint}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }
  )
    .then(res => res.json())
    .catch(err => {
      // alert('error Method check method POST')
      console.error(err)
    })
}


export const methodPostImage = async ({ endpoint, data }) => {
  return await fetch(
    `${baseApi}${endpoint}`,
    {
      method: 'POST',
      headers: headerImg,
      body: data
    }
  )
    .then(res => res.json())
    .catch(err => {
      // alert('error Method check method POST Image')
      console.error(err)
    })
}