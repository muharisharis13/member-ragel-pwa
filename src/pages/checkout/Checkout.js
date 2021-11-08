import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { Table, Modal } from "react-bootstrap";
import { BiTime } from 'react-icons/bi';
import product from "../../Images/product/WhatsApp Image 2021-06-22 at 22.09.57.jpeg";
import jne from "../../Images/ekspedisi/JNE.png";
import jnt from "../../Images/ekspedisi/jnt.png";
import ninja from "../../Images/ekspedisi/Ninja Xpress.png";
import bca from "../../Images/bank/bca.svg";
import { Context } from "../../Context/Context";
import { currency } from "../../utl/currency-format";
import { CheckOutOrder, GetShippingList } from "../../services/API/order";
import { GetPaymentGetway } from "../../services/API/payment";
import { Get_UserInfo } from "../../services/API/userInfo";
import { ModalAddAlamat } from "./modal/addAlamat";
import { getProvince } from "../../services/API/location";

export const Checkout = (props) => {
  const dataProps = props.location.state.keranjang
  const totalSemua = props.location.state.total
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { cart } = useContext(Context)


  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});
  const [uploaded, setUpload] = useState(false);
  const [data, setData] = useState({
    method: '',
    payment_method: "deposit",
    shipping: {}
  })
  const [BalanceUser, setBalanceUser] = useState("0")
  const [parnetShip, setParnetShip] = useState([])
  const [showMorePartner, setShowMorePartner] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [paymentGetway, setPaymentGetway] = useState([])
  const [selectPay_get_id, setSelect_pay_get_id] = useState("")
  const [modalAlamat, setModalAlamat] = useState(false)




  const btnSelectMethod = ({ type, e }) => {

    if (type === 'pickup') {
      setData({ ...data, method: e.target.value })
    }
    else if (type === 'delivery') {
      setData({ ...data, method: e.target.value })
    }
  }

  const btnPaymentMethod = ({ type, e, id_pay_gate }) => {

    if (type === 'deposit') {
      setData({ ...data, payment_method: e.target.value })
      setSelect_pay_get_id(id_pay_gate)
    }
    else if (type === 'transfer') {
      setData({ ...data, payment_method: e.target.value })
      setSelect_pay_get_id(id_pay_gate)
    }
  }

  useEffect(() => {
    GetShippingList()
      .then(res => {
        if (res.success) {
          setParnetShip(res.success)
        }
        console.log({
          listShipping: res
        })
      })

    Get_UserInfo()
      .then(res => {
        console.log({
          user_info: res.success
        })
        if (res.success) {
          setBalanceUser(res.success.member_detail.balance)

          setUserInfo(res.success)
        }
      })

    GetPaymentGetway()
      .then(res => {
        console.log({
          paymentGetway: res.success
        })
        if (res.success) {
          setPaymentGetway(res.success.data)
        }
      })

  }, [])






  const grandTotal = cart.reduce((prev, current) => {
    return prev + + current.total
  }, 0)

  const btnCheckOut = () => {
    // console.log(data.shipping.shipping_fee)

    const body = {
      delivery_address: JSON.stringify(userInfo.member_detail.main_delivery_address),
      detail_order: JSON.stringify(cart),
      total_amount: parseInt(totalSemua) + parseInt(data.shipping.shipping_fee),
      shipping_id: data.shipping.shipping_id,
      pay_gate_id: selectPay_get_id
    }

    console.log(body)
    if (!userInfo.member_detail.main_delivery_address) {
      alert('belum ada alamat')
      setModalAlamat(true)
    }
    else if (userInfo.member_detail.main_delivery_address) {
      CheckOutOrder({ databody: body })
        .then(res => {
          console.log({
            checkoutorder: res
          })
          if (res.success) {
            alert(`success membuat orderan ! ${selectPay_get_id === 1 && `Harap Melakukan Pemmbayaran Sebesar ${currency(res.success.order_info.amount)} Ke ${res.success.order_info.account_number} A/N ${res.success.order_info.account_name}`}`)
            window.location.href = "/home"

          }
          else {
            alert('error hit API')
          }
        })

    }
    else {
      alert('Please Select Payment Method !')
    }
  }


  const handleChange = (event) => {
    setFiles(URL.createObjectURL(event.target.files[0]));
    setUpload(true)

    const body = {
      delivery_address: JSON.stringify(userInfo.member_detail.main_delivery_address),
      detail_order: cart,
      total_amount: grandTotal,
      shipping_id: data.shipping.shipping_id,
      pay_gate_id: selectPay_get_id
    }

    console.log('ini data yang dikirim', body)
    CheckOutOrder({ databody: body })
      .then(res => {
        console.log(res)
        if (res.success) {
          console.log({
            checkoutorder: res
          })

        }
        else {
          alert('error hit API')
        }
      })

  }


  const showItemPartner = showMorePartner ? parnetShip.length : 5

  const btnShowMore = () => setShowMorePartner(!showMorePartner)

  const btnSelectShipping = (id) => {
    setData({ ...data, shipping: parnetShip.filter(id2 => `${id2.shipping_id}` === `${id}`)[0] })
    // console.log(parnetShip.filter(id2 => `${id2.shipping_id}` === `${id}`))
  }

  return (
    <Container className="container-fluid">
      <ModalAddAlamat show={modalAlamat} onHide={() => setModalAlamat(false)} />
      <div className="col-sm-10 mx-auto ">
        <Title>Products</Title>
        <Table responsive borderless className="my-3">
          <thead className="shadow-sm p-3 mb-5 bg-white rounded border rounded">
            <tr>
              <th>&nbsp;</th>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              dataProps.map((item, index) => (
                <tr className="border-bottom justify-content-center align-items-center" key={index}>
                  <td>&nbsp;</td>
                  <td className="align-middle">
                    <ImageProduct
                      src={item.product_pic_url}
                      className="img-fluid rounded"
                      alt="Product"
                    />{" "}
                    <b>{item.product_name}</b>
                  </td>
                  <td className="align-middle">
                    <b>{currency(item.selling_price)}</b>
                  </td>
                  <td className="align-middle">
                    <div
                      style={{
                        display: "inline-flex",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BgGray>{item.qty}</BgGray>
                    </div>
                  </td>
                  <td className="align-middle">
                    <b>{currency(parseInt(item.qty) * parseInt(item.selling_price))}</b>
                  </td>
                </tr>

              ))
            }
            <tr className="border-bottom justify-content-center align-items-center">
              <td colSpan="1">
                <p>Shipping Method</p>
              </td>
              <td>
                <div className="d-flex flex-column">
                  <div className="form-check">
                    <input id="pickup" className="form-check-input" value="pickup" type="radio" name="method_shipping" onClick={(e) => btnSelectMethod({ type: 'pickup', e: e })} />
                    <label className="form-check-label" for="pickup">
                      Pickup at Ragel Office
                    </label>
                  </div>
                </div>
                <div className="form-check">
                  <input id="delivery" className="form-check-input" value="delivery" type="radio" name="method_shipping" onClick={(e) => btnSelectMethod({ type: 'delivery', e: e })} />
                  <label className="form-check-label" for="delivery">
                    Delivery (use profile location)
                  </label>
                </div>
                <div className="form-check">
                  <b>
                    <a href="#">Choose shipping location</a>
                  </b>
                </div>
              </td>
            </tr>
            {
              data.method === 'delivery' ?
                <tr className="border-bottom justify-content-center align-items-center">
                  <td colSpan="1">
                    <p>Shipping Partner</p>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      {
                        parnetShip.slice(0, showItemPartner).filter(cat => cat.shipping_category === "Delivery").map((item, index) => (
                          <div className="form-check align-items-center d-flex" key={index}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="ekspedisi"
                              value={item.shipping_id}
                              id={`${item.shipping_id}`}
                              onClick={() => btnSelectShipping(item.shipping_id)}
                            />
                            <ImageExp src={item.shipping_pic} className="img-fluid" alt={item.shipping_name} />
                            <div className="col-sm-6 ml-5">
                              <label className="form-check-label" for={`${item.shipping_id}`}>
                                <b>{currency(item.shipping_fee)}</b>
                                <br />
                                <small className="text-muted">Estimated 2-3 days</small>
                              </label>
                            </div>
                          </div>

                        ))
                      }
                      <button className="btn btn-warning text-white col-sm-5" onClick={btnShowMore}>ShowMore</button>

                    </div>
                  </td>
                </tr>
                : data.method === 'pickup' ?
                  <tr className="border-bottom justify-content-center align-items-center">
                    <td colSpan="1">
                      <p>Shipping Partner</p>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        {
                          parnetShip.filter(cat => cat.shipping_category === "Take At Office").map((item, index) => (
                            <div className="form-check align-items-center d-flex" key={index}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="ekspedisi"
                                value={item.shipping_id}
                                id={`${item.shipping_id}`}
                                onClick={() => btnSelectShipping(item.shipping_id)}
                              />
                              <ImageExp src={item.shipping_pic} className="img-fluid" alt={item.shipping_name} />
                              <div className="col-sm-6 ml-5">
                                <label className="form-check-label" for={`${item.shipping_id}`}>
                                  <b>{currency(item.shipping_fee)}</b>
                                  <br />
                                  <small className="text-muted">Estimated 2-3 days</small>
                                </label>
                              </div>
                            </div>

                          ))
                        }
                        {/* <button className="btn btn-warning text-white col-sm-5" onClick={btnShowMore}>ShowMore</button> */}
                      </div>
                    </td>
                  </tr>
                  : null
            }


            <tr className="justify-content-center align-items-center">
              <td colSpan="3">&nbsp;</td>
              <td>Shipping</td>
              <td>{currency(data.shipping.shipping_fee)}</td>
            </tr>

            <tr className="border-bottom justify-content-center align-items-center">
              <td colSpan="3">&nbsp;</td>
              <td>
                <b>Grand Total</b>
              </td>
              <td>
                <b>{currency(parseInt(totalSemua) + parseInt(data.shipping.shipping_fee))}</b>
              </td>
            </tr>
            <tr className="border-bottom justify-content-center align-items-center">
              {/* <td colSpan="3">&nbsp;</td> */}
              <td>
                User Info
              </td>
              <td>
                <div className="form-check align-items-center d-block col-sm-12 justify-content-between">
                  <tr>
                    <th>Address</th>
                    <td>{userInfo.member_detail ? userInfo.member_detail.main_delivery_address.address : null}</td>
                  </tr>
                  <tr>
                    <th>Full Name</th>
                    <td>{userInfo.full_name}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{userInfo.phone_number}</td>
                  </tr>
                </div>
              </td>
            </tr>
            <tr className="justify-content-center align-items-center">
              <td>Payment Method</td>
              <td colSpan="2">
                {
                  paymentGetway.map((item, index) => (

                    <div className="form-check align-items-center d-flex col-sm-7 justify-content-between" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment_method"
                        id={item.pay_gate_category === "Balance" ? "ragel_deposit" : "manual_transfer"}
                        value={item.pay_gate_category === "Balance" ? "deposit" : "transfer"}
                        onClick={(e) => btnPaymentMethod({ type: item.pay_gate_category === "Balance" ? "deposit" : "transfer", e: e, id_pay_gate: item.id })}
                        disabled={parseInt(totalSemua) > parseInt(BalanceUser) && item.pay_gate_category === "Balance" ? true : false}
                      />
                      <label className="form-check-label" for={item.pay_gate_category === "Balance" ? "ragel_deposit" : "manual_transfer"}>
                        {item.pay_gate_category}
                      </label>

                      <b>{item.pay_gate_category === "Balance" ? currency(parseInt(BalanceUser)) : null}</b>
                    </div>
                  ))
                }
              </td>
            </tr>

            {
              uploaded ?
                <tr>
                  <td><b>Payment Status</b></td>
                  <td><div className="align-middle align-items-center justify-content-center"><Rounded><BiTime size={25} /></Rounded> <b>PAYMENT PENDING</b></div></td>
                  <td colSpan="1">&nbsp;</td>
                  <td><b>Ragel Deposit</b> <br /> <small>03 August 2021 - 12.30 PM</small></td>
                  <td>
                    <b>Rp 110.000</b>
                  </td>
                </tr> :
                <tr className="justify-content-center align-items-center">
                  <td colSpan="3">&nbsp;</td>
                  <td colspan="2"><button className="btn btn-warning text-white col-sm-10" onClick={btnCheckOut}>Checkout</button></td>

                </tr>
            }


          </tbody>
        </Table>

        {/* Modal */}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop={true}
          keyboard={false}
          size="lg"

        >
          <div className="p-3">
            <h3 style={{ textAlign: 'center' }}>{currency(grandTotal)}</h3>
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
                <div style={{ height: '100%' }} className="justify-content-center align-items-center text-center vertical-align-middle d-flex d-inline-flex w-100">
                  {
                    !uploaded ?
                      <button style={{ cursor: 'pointer' }} type="button" className="btn btn-warning text-white"  ><b>Upload Receipt Transfer</b></button> :
                      <ImgPreview src={files} alt="Receipt" />
                  }

                </div>
                {/* <input type="file" className="btn btn-warning text-white"/> */}
                <FormField type="file" ref={fileInputField} onChange={(e) => handleChange(e)} />
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

