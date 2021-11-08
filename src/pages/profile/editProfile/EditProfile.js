import React, { useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { BannerProfile } from "../../../component/banner/profile/BannerProfile";
import styled from "styled-components";
import { Context } from "../../../Context/Context";
import Select from 'react-select'
import { getCity, getProvince } from "../../../services/API/location";
import { AddNewListAddress } from "../../../services/API/account";
import { ModalResetPass } from "./component/ModalResetPass";

export const EditProfile = () => {
  const [show, setShow] = useState(false);
  const { arrUserInfo } = useContext(Context)
  const [inputRegister, setInputReister] = useState({
    province: "",
    city: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    addressDetail: ""
  })
  const [options, setOptions] = useState({
    province: [],
    city: []
  })
  const [dataCity, setDataCity] = useState([])
  const [showReset, setShowReset] = useState(false)

  const handleShowReset = (type) => {
    if (type === 'open') {
      setShowReset(true)
    }
    else {
      setShowReset(false)

    }
  }

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



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const btnAddNewAddress = () => {
    const body = {
      address: `${inputRegister.addressDetail} - ${inputRegister.province.label} - ${inputRegister.city.label} - ${inputRegister.district} - ${inputRegister.subDistrict} - ${inputRegister.postalCode}`,
      receiver_name: arrUserInfo.full_name,
      phone_number: arrUserInfo.phone_number,
      main: false
    }

    AddNewListAddress(body)
      .then(res => {
        console.log({
          addNew: res
        })
        handleClose()
        if (res.success) {
          alert(`${res.success.message}`)
          window.location.reload()
        }
      })
  }


  return (
    <Container className="container-fluid">
      {/* Modal */}
      <ModalResetPass show={showReset} onHide={() => handleShowReset('tutup')} />
      {/*end Modal  */}
      <div className="col-sm-10 mx-auto" style={{ marginTop: 25 }}>
        <BannerProfile screen="Edit" />
        <Body className="col-sm-5">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              readOnly
              value={arrUserInfo.username}
              className="form-control shadow-sm"
              style={{ backgroundColor: "#fff" }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Address List</label>
            <ul>
              {
                arrUserInfo.member_detail && arrUserInfo.member_detail.registered_delivery_address.length > 0 ? arrUserInfo.member_detail.registered_delivery_address.map((item) => (
                  <li>{item.address} {item.main && `(Main Address)`} </li>
                ))
                  : "No Adress Register"
              }
              <li style={{ listStyle: "none" }}>
                <button
                  className="btn btn-warning btn-sm text-white"
                  onClick={handleShow}
                >
                  &#43; Add new address
                </button>
              </li>
            </ul>
            <div style={{ fontWeight: "bold", cursor: "pointer", color: 'blue' }} onClick={() => handleShowReset('open')}>
              Reset Password
            </div>
          </div>
          <button className="btn btn-warning col-sm-3 text-white">Save</button>
        </Body>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop={true}
          keyboard={false}
          size="lg"
        >
          <div className="p-3">
            <div className="d-flex d-flex-row justify-content-between py-5">
              <div className="col-sm-10 text-center">
                <Label>Address</Label>
              </div>
              <AiOutlineClose size={30} onClick={handleClose} />
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
              <button className="btn btn-warning text-white col-sm-7 font-weight-bold" onClick={btnAddNewAddress}>
                Add
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* background:gray; */
  height: 110vh;
  padding-top: 150px;
`;

const Body = styled.div`
  padding: 120px 0;
`;

const Textarea = styled.textarea`
&::placeholder{
    color:#28a745
}
`

const Input = styled.input`
&::placeholder{
    color:#28a745
}
`

const Label = styled.label`
  font-weight: bold;
  font-size: large;
  text-align: center;
`;
