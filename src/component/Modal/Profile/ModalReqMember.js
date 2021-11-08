import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { FaCamera, FaTimes } from 'react-icons/fa'
import { getCity, getProvince } from '../../../services/API/location/index'
import Select from 'react-select'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { FillRegisToMember } from '../../../services/API/account'

// data.append('address', address);
// data.append('ktp', ktp);
// data.append('no_ktp', no_ktp);
// data.append('gender', gender);
// data.append('birth_date', birth_date);
// data.append('job', job);
// data.append('contact_wa', contact_wa);
// data.append('contact_ig', contact_ig);
// data.append('contact_tele', contact_tele);

export const ModalReqMember = ({ onHide, show = false }) => {
  const [datainput, setdatainput] = useState({
    address: "",
    imgKtp: "",
    no_ktp: "",
    gender: "",
    birth_date: new Date(),
    job: "",
    contact_wa: "",
    contact_ig: "",
    contact_tele: "",
    subdistrict: "",
    postal_code: "",
  })
  const [optPronvince, setOptProvince] = useState([])
  const [optCity, setOptCity] = useState([])
  const optGender = ([
    { value: "Male", label: 'Male' },
    { value: "Female", label: 'Female' }
  ])
  const [selected, setSelected] = useState({
    province: "",
    city: "",
    gender: ''
  })
  const [dataImg, setDataImage] = useState("")

  useEffect(() => {
    getProvince()
      .then(res => {
        console.log(res.success)
        if (res.success) {
          setOptProvince(res.success.list_provinsi.map(item => ({
            value: item.province_id, label: item.province
          })))
        }
      })
  }, [])

  // city options
  useEffect(() => {
    if (selected.province.value) {
      getCity(selected.province.value)
        .then(res => {
          console.log(res.success)

          if (res.success) {
            setOptCity(res.success.list_kota.map(item => ({
              value: item.city_id, label: item.city_name
            })))
          }
        })

    }
  }, [selected.province])


  const onChangeValue = ({ type, e }) => {

    switch (type) {
      case 'address':
        setdatainput({ ...datainput, address: e })
        break;
      case 'subdistrict':
        setdatainput({ ...datainput, subdistrict: e })
        break;
      case 'postal_code':
        setdatainput({ ...datainput, postal_code: e })
        break;
      case 'imgKtp':
        setdatainput({ ...datainput, imgKtp: e })
        break;
      case 'no_ktp':
        setdatainput({ ...datainput, no_ktp: e })
        break;
      case 'gender':
        setdatainput({ ...datainput, gender: e })
        break;
      case 'birth_date':
        setdatainput({ ...datainput, birth_date: e })
        break;
      case 'job':
        setdatainput({ ...datainput, job: e })
        break;
      case 'contact_wa':
        setdatainput({ ...datainput, contact_wa: e })
        break;
      case 'contact_ig':
        setdatainput({ ...datainput, contact_ig: e })
        break;
      case 'contact_tele':
        setdatainput({ ...datainput, contact_tele: e })
        break;

      default:
        break;
    }

  }

  const onChangeAttach = (e) => {

    const reader = new FileReader();
    reader.onload = () => {
      setDataImage(reader.result)
    }

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
      onChangeValue({ e: e.target.files[0], type: 'imgKtp' })

    }


  }

  const btnJoin = () => {

    const formData = new FormData()
    formData.append('ktp', datainput.imgKtp);
    formData.append('address', `${datainput.address} - ${datainput.postal_code} - ${datainput.subdistrict} - ${selected.city.label} - ${selected.province.label}`);
    formData.append('no_ktp', datainput.no_ktp);
    formData.append('gender', selected.gender.value);
    formData.append('birth_date', moment(datainput.birth_date).format('YYYY-MM-DD'));
    formData.append('job', datainput.job);
    formData.append('contact_wa', datainput.contact_wa);
    formData.append('contact_ig', datainput.contact_ig);
    formData.append('contact_tele', datainput.contact_tele);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    FillRegisToMember({ FormData: formData })
      .then(res => {
        console.log(res)
        if (res.success) {
          alert(`${res.success.message}`)
        }
      })
  }


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <FaTimes cursor="pointer" onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="mb-3">
                <strong>Member Info</strong>
              </div>
              <div className="mb-3 justify-content-center align-items-center text-center">
                {
                  dataImg ?
                    <img src={dataImg} alt="" width={400} /> :
                    <LabelImgKtp htmlFor="imgKtp">
                      <FaCamera />
                    </LabelImgKtp>
                }
                <InputImgKtp type="file" name="imgKtp" id="imgKtp" onChange={(e) => onChangeAttach(e)} accept="image/*" />
              </div>
              <div className="mb-3">
                <label htmlFor="NIK">NIK</label>
                <input type="text" name="NIK" id="NIK" maxLength={16} className="form-control" value={datainput.no_ktp} onChange={(e) => onChangeValue({ type: 'no_ktp', e: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="Full_name">Full Name</label>
                <input type="text" name="Full_name" id="Full_name" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="phone_number">Phone Number</label>
                <input type="email" name="phone_number" id="phone_number" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="gender">Gender</label>
                <Select options={optGender} id="gender" value={selected.gender} onChange={(e) => setSelected({ ...selected, gender: e })} />
              </div>

              <div className="mb-3">
                <label htmlFor="date">Birth Date</label>
                <DatePicker className="form-control" selected={datainput.birth_date} onChange={(e) => onChangeValue({ type: 'birth_date', e: e })} />
              </div>

              <div className="mb-">
                <label htmlFor="job">Job</label>
                <input type="text" className="form-control" value={datainput.job} onChange={(e) => onChangeValue({ type: "job", e: e.target.value })} />
              </div>


              {/* member address */}

              <div className="mb-2 mt-5">
                <strong>Member Address</strong>
              </div>

              <div className="mb-3">
                <label htmlFor="province">Province</label>
                <Select options={optPronvince} value={selected.province} onChange={(e) => setSelected({ ...selected, province: e })} />
              </div>
              <div className="mb-3">
                <label htmlFor="district">District</label>
                <Select options={optCity} value={selected.city} onChange={(e) => setSelected({ ...selected, city: e })} />
              </div>
              <div className="mb-3">
                <label htmlFor="subdistric">Sub-District</label>
                <input type="text" className="form-control" id="subdistric" value={datainput.subdistrict} onChange={(e) => onChangeValue({ type: "subdistrict", e: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="postalcode">Postal code</label>
                <input type="text" className="form-control" id="postalcode" value={datainput.postal_code} onChange={(e) => onChangeValue({ type: "postal_code", e: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" value={datainput.address} onChange={(e) => onChangeValue({ type: "address", e: e.target.value })} />
              </div>


              {/* social media */}

              <div className="mb-2 mt-5">
                <strong>Social Media Contact</strong>
              </div>
              <div className="mb-3">
                <label htmlFor="wa">Contact Wa</label>
                <input type="text" className="form-control" id="wa" value={datainput.contact_wa} onChange={(e) => onChangeValue({ type: "contact_wa", e: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="ig">Contact Instagram</label>
                <input type="text" className="form-control" id="ig" value={datainput.contact_ig} onChange={(e) => onChangeValue({ type: "contact_ig", e: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="tele">Contact Telegram</label>
                <input type="text" className="form-control" id="tele" value={datainput.contact_tele} onChange={(e) => onChangeValue({ type: "contact_tele", e: e.target.value })} />
              </div>
            </div>

            <div className="col-md-12 col-sm-12 mt-5 pt-3 pb-4">
              <BtnJoin onClick={btnJoin}>Join</BtnJoin>
            </div>


          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const BtnJoin = styled.div`
border:1px solid transparent;
display: flex;
background-color: #febf01;
color:#fff;
font-weight: 600;
padding:7px 10px;
border-radius: 5px;
align-items:center;
justify-content: center;
transition:450ms;
cursor:pointer;

&:hover{
  border : 1px solid #febf01;
  background:transparent;
  color:#000;
}
`

const InputImgKtp = styled.input`
display:none;
`
const LabelImgKtp = styled.label`
border : 0.1px solid black;
display: flex;
justify-content: center;
align-items: center;
padding:10px 20px;
width:75%;
height:100px;
text-align:center;
margin-left:12.5%;
cursor:pointer;
font-size:25pt;
`
