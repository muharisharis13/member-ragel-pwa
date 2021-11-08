import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
import Select from 'react-select'
import { AiOutlineClose } from "react-icons/ai";
import { addNewAddress, getCity, getProvince } from '../../../services/API/location';
import { Get_UserInfo } from '../../../services/API/userInfo';
import { Context } from '../../../Context/Context';


export const ModalAddAlamat = ({ onHide, show }) => {

  const [options, setOptions] = useState({
    province: [],
    city: []
  })
  const [inputRegister, setInputReister] = useState({
    province: "",
    city: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    addressDetail: ""
  })
  const [dataCity, setDataCity] = useState([])
  const { arrUserInfo } = useContext(Context)

  useEffect(() => {
    getProvince()
      .then(res => {
        if (res.success) {
          setOptions({
            ...options, province: res.success.list_provinsi.map((item) => ({ value: item.province_id, label: item.province }))
          })
        }
      })


  }, [])


  useEffect(() => {
    if (inputRegister.province.value) {
      getCity(inputRegister.province.value)
        .then(res => {
          console.log({
            city: res.success.list_kota
          })
          if (res.success) {
            setOptions({
              ...options, city: res.success.list_kota.map((item) => ({ value: item.city_id, label: item.city_name }))
            })
            setDataCity(res.success.list_kota)
          }
        })

    }
  }, [inputRegister.province])

  useEffect(() => {
    if (inputRegister.city.value) {
      setInputReister({
        ...inputRegister, postalCode: dataCity.filter(id => `${id.city_id}` === `${inputRegister.city.value}`)[0].postal_code
      })

    }

  }, [inputRegister.city])


  const onChangValueRegister = ({ type, e }) => {
    switch (type) {
      case 'province':
        setInputReister({ ...inputRegister, province: e })
        break;
      case 'city':
        setInputReister({ ...inputRegister, city: e })
        break;
      case 'district':
        setInputReister({ ...inputRegister, district: e })
        break;
      case 'subDistrict':
        setInputReister({ ...inputRegister, subDistrict: e })
        break;
      case 'postalCode':
        setInputReister({ ...inputRegister, postalCode: e })
        break;
      case 'addressDetail':
        setInputReister({ ...inputRegister, addressDetail: e })
        break;

      default:
        break;
    }
  }

  const btnAdd = () => {
    const body = {
      address: `${inputRegister.addressDetail} - ${inputRegister.province.label} - ${inputRegister.city.label} - ${inputRegister.district} - ${inputRegister.subDistrict} - ${inputRegister.postalCode}`,
      main: true,
      phone_number: arrUserInfo.phone_number,
      receiver_name: arrUserInfo.full_name
    }
    console.log(body)
    addNewAddress(body)
      .then(res => {
        console.log({
          add_new: res
        })
        if (res.success) {
          alert(`${res.success.message}`)
        }
      })
  }
  // console.log('ini user info', arrUserInfo)

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop={true}
      keyboard={false}
      size="lg"
    >
      <div className="p-3">
        <div className="d-flex d-flex-row justify-content-between py-5">
          <div className="col-sm-10 text-center">
            <Label>Address</Label>
          </div>
          <AiOutlineClose size={30} onClick={onHide} />
        </div>
        <div>
          <div className="form-group">
            <label className="form-label text-secondary">Province</label>
            <Select
              options={options.province}
              value={inputRegister.province}
              onChange={(e) => onChangValueRegister({ type: 'province', e: e })}
            />

          </div>
          <div className="form-group">
            <label className="form-label text-secondary">City</label>
            <Select
              options={options.city}
              value={inputRegister.city}
              onChange={(e) => onChangValueRegister({ type: 'city', e: e })}
            />

          </div>
          <div className="form-group">
            <label className="form-label text-secondary">District</label>
            <Input
              type="text"
              value={inputRegister.district}
              onChange={(e) => onChangValueRegister({ type: 'district', e: e.target.value })}
              className="form-control shadow-sm border border-success text-success"
              style={{ backgroundColor: "#fff" }}
            />
          </div>
          <div className="form-group">
            <label className="form-label text-secondary">Sub-District</label>
            <Input
              type="text"
              value={inputRegister.subDistrict}
              onChange={(e) => onChangValueRegister({ type: 'subDistrict', e: e.target.value })}
              className="form-control shadow-sm border border-success text-success"
              style={{ backgroundColor: "#fff" }}
            />
          </div>
          <div className="form-group">
            <label className="form-label text-secondary">Postal Code</label>
            <Input
              type="text"
              value={inputRegister.postalCode}
              onChange={(e) => onChangValueRegister({ type: 'postalCode', e: e.target.value })}
              className="form-control shadow-sm border border-success text-success"
              style={{ backgroundColor: "#fff" }}
            />
          </div>
          <div className="form-group">
            <label className="form-label text-secondary">Address Details</label>
            <Textarea
              type="text"
              placeholder="e.g Nomor 88A"
              color="#000"
              value={inputRegister.addressDetail}
              onChange={(e) => onChangValueRegister({ type: 'addressDetail', e: e.target.value })}
              className="form-control shadow-sm border border-success text-success"
              style={{ backgroundColor: "#fff" }}
              rows={5}
            />
          </div>
        </div>
        <div className="justify-content-center align-items-center mx-auto col-sm-5 my-5 text-center">
          <button className="btn btn-warning text-white col-sm-7 font-weight-bold" onClick={() => btnAdd()} >
            Add
          </button>
        </div>
      </div>
    </Modal>
  )
}


const Label = styled.label`
  font-weight: bold;
  font-size: large;
  text-align: center;
`;

const Input = styled.input`
&::placeholder{
    color:#28a745
}
`

const Textarea = styled.textarea`
&::placeholder{
    color:#28a745
}
`
