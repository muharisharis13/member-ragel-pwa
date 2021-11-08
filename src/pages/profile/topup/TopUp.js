import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { BiTime } from 'react-icons/bi';
import { BannerProfile } from "../../../component/banner/profile/BannerProfile";
import bca from "../../../Images/bank/bca.svg";
import { Context } from "../../../Context/Context";
import { currency, inputCurrency } from '../../../utl/currency-format/index'
import { RequestTopUpDepo, TopUpDepoHistori } from "../../../services/API/deposit";

export const TopUp = () => {
  const [show, setShow] = useState(false);
  const { arrUserInfo } = useContext(Context)
  const [amount, setAmount] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});
  const [uploaded, setUpload] = useState(false);


  // useEffect(() => {
  //   TopUpDepoHistori()
  //     .then(res => {
  //       console.log(res)
  //     })
  // }, [])

  const handleChange = (event) => {
    setFiles(URL.createObjectURL(event.target.files[0]));
    setUpload(true);
  };

  const btnProcess = () => {
    const body = {
      pay_gate_id: 1,
      amount: amount
    }
    RequestTopUpDepo({ body: body })
      .then(res => {
        console.log(res)
        if (res.error) {
          alert(`${res.error}`)
        }
        else if (res.success) {
          alert(`Silahkan Transfer ke bank ${res.success.account_number} A/N ${res.success.account_name}`)
          window.location.reload()
        }
      })
  }

  return (
    <Container className="container-fluid">
      <div className="col-sm-10 mx-auto" style={{ marginTop: 25 }}>
        <BannerProfile />
        <Content className="mt-5 align-items-baseline pt-4">
          <div className="col-sm-3 justify-content-center text-center">
            <h4>Arya Stark</h4>
          </div>
          <div className="row">
            <div className="col-sm-3 justify-content-center text-center">
              <label>Ragel Deposit</label>
              <br />
              <Bold>{currency(arrUserInfo.member_detail ? arrUserInfo.member_detail.balance : "0")}</Bold>
            </div>
            <div className="col-sm-5">
              <small>Top Up Amount</small>
              <div className="form-inline">
                <Input
                  type="text"
                  className="form-control shadow-sm border border-success text-success col-sm-8"
                  placeholder="Rp. "
                  value={inputCurrency(amount)} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]+/g, ''))}
                />
                <button className="btn btn-warning text-white mx-2" onClick={btnProcess}>
                  Proceed
                </button>
              </div>
            </div>
            {
              uploaded ?
                <div className="col-sm-3"><b>Top Up Status</b><br /><b>Rp 110.000</b><div className="pt-2"><div className="align-middle align-items-center justify-content-center"><Rounded><BiTime size={25} /></Rounded> <b> PENDING</b></div></div></div>
                : null
            }
          </div>
        </Content>

        {/* modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop={true}
          keyboard={false}
          size="lg"
        >
          <div className="p-3">
            <h3 style={{ textAlign: "center" }}>Rp 880.000</h3>
          </div>
          <div className="container py-5">
            <div className="row justify-content-between">
              <div className="col-sm-6 align-items-center text-center">
                <div className="d-flex flex-column justify-content-center align-items-center text-center">
                  <label>Transfer to</label>
                  <ImageExp src={bca} className="img-fluid" alt="BCA" />
                  <h3>576890097</h3>
                  <small>a/n: PT. Ragel Indonesia</small>
                </div>
              </div>
              <div className="col-sm-6">
                <div
                  style={{ height: "100%" }}
                  className="justify-content-center align-items-center text-center vertical-align-middle d-flex d-inline-flex w-100"
                >
                  {!uploaded ? (
                    <button
                      style={{ cursor: "pointer" }}
                      type="button"
                      className="btn btn-warning text-white"
                    >
                      <b>Upload Receipt Transfer</b>
                    </button>
                  ) : (
                    <ImgPreview src={files} alt="Receipt" />
                  )}
                </div>
                <FormField
                  type="file"
                  ref={fileInputField}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* background:gray; */
  height: 100vh;
  padding-top: 150px;
`;

const Content = styled.div`
  padding: 10px 5px;
`;

const Input = styled.input`
  &::placeholder {
    color: #28a745;
  }
`;

const Bold = styled.label`
  font-weight: bold;
  font-size: 20pt;
`;

const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;


const Rounded = styled.div`
  background-color:#ff26ec;
  color:#fff;
  padding:4px;
  border:2px dashed #fff;
  border-radius:60px;
  display:inline-block;
  align-items:center;
  margin-right:25px;
  justify-content:center;
`

const ImgPreview = styled.img`
width:50%;
height:auto;
object-fit : contain;
`


const Title = styled.span`
  font-size: 20pt;
`;

const ImageProduct = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
`;

const ImageExp = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const BgGray = styled.span`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 3px 10px;
`;