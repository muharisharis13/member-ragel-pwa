import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { currency } from '../../../utl/currency-format'
import BcaIcon from '../../../Images/bank/bca.svg'
import styled from 'styled-components'
import { UploadBuktiTopUp } from '../../../services/API/deposit'

export const UploadBuktiTopup = ({ show, onHide, data }) => {
  const [datainput, setDatainput] = useState("")
  const [input, setInput] = useState({
    name: "",
    number: ""
  })
  const [dataimg, setDataimg] = useState("")
  const reader = new FileReader();

  const onChangeAttach = (e) => {
    reader.onload = () => {
      setDataimg(reader.result)
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
      setDatainput(e.target.files[0])

    }
  }

  const onChangevalue = (type, e) => {
    switch (type) {
      case 'name':
        setInput({ ...input, name: e.target.value })
        break;
      case 'number':
        setInput({ ...input, number: e.target.value })
        break;

      default:
        break;
    }
  }

  const btnUpload = () => {

    const formData = new FormData()

    formData.append('deposit_id', data.id);
    formData.append('proof_pic', datainput);
    formData.append('from_account_name', input.name);
    formData.append('from_account_number', input.number);

    UploadBuktiTopUp({ body: formData })
      .then(res => {
        console.log(res)
        if (res.success) {
          alert(`${res.success}`)
        }
        else {
          console.log('error')
        }
        window.location.reload()
      })
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <FaTimes cursor="pointer" onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-md-12 col-sm-12 col-lg-12">
              <h3>{currency(1230000)}</h3>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 col-sm-12 col-lg-12">
              <strong>Transfer To</strong>
            </div>
            <div className="col-md-12 col-sm-12 col-lg-12 mt-2 text-center">
              <img src={BcaIcon} width={150} alt="" />
              <div><strong>576890097</strong></div>
              <div><small>A/N admin 1</small></div>
            </div>
            <div className="col-md-12 col-sm-12 col-lg-12 mt-2">
              <div className="col-md-12 col-sm-12 text-center">
                <img src={dataimg} alt="" width={300} className="mb-2" />
                {dataimg === "" ?
                  <Label htmlFor="file">Upload Transfer Receipt</Label> : null}
                <input type="file" accept="image/jpg, image/png" name="file" id="file" className="d-none" onChange={onChangeAttach} />
              </div>
              <div className="col-md-12 col-sm-12">
                <div className="mb-2">
                  <label htmlFor="name">Account Name</label>
                  <input type="text" name="" id="name" className="form-control" value={input.name} onChange={(e) => onChangevalue('name', e)} />
                </div>
                <div className="mb-2">
                  <label htmlFor="Number">Account Number</label>
                  <input type="text" name="" id="Number" className="form-control" value={input.number} onChange={(e) => onChangevalue('number', e)} />
                </div>
              </div>
              <div className="col-md-12 col-sm-12">
                {
                  <Button onClick={btnUpload}>Upload</Button>

                }
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const Label = styled.label`
cursor:pointer;
&:hover{
  text-decoration:underline;
}
`

const Button = styled.label`
display:flex;
align-items:center;
justify-content: center;
cursor: pointer;
border:1px solid #ffc107;
padding:7px 10px;
background:#ffc107;
color:#fff;
font-weight : 500;
transition:450ms;
border-radius:5px;
&:hover{
  background-color: transparent;
  color:#000;
}
`
