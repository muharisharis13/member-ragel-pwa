import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Tab, Tabs, Table } from "react-bootstrap";
import { FiThumbsUp } from "react-icons/fi";
import { FaTruck } from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";
import product from "../../../Images/product/WhatsApp Image 2021-06-22 at 22.09.57.jpeg";
import jne from "../../../Images/ekspedisi/JNE.png";
import jnt from "../../../Images/ekspedisi/jnt.png";
import ninja from "../../../Images/ekspedisi/Ninja Xpress.png";
import bca from "../../../Images/bank/bca.svg";
import { GetHistoryOrder } from "../../../services/API/history";

export const History = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    GetHistoryOrder()
      .then(res => {
        console.log({
          history: res
        })
      })
  }, [])
  return (
    <Container className="container-fluid">
      <div className="col-sm-10 mx-auto pb-5" style={{ marginTop: 25 }}>
        <div className="text-center mb-3">
          <b>Shopping History</b>
        </div>
        <Tabs
          defaultActiveKey="1"
          id="uncontrolled-tab-example"
          className="mb-3 text-center mx-auto"
          fill
        >
          <Tab eventKey="1" title="On-going">
            <div
              style={{ backgroundColor: "#fff" }}
              className="border shadow-sm rounded"
            >
              <Table responsive borderless className="my-3">
                <tbody>
                  <tr className="justify-content-center align-items-center text-center">
                    <td>
                      <b>18 Jan 2021</b>
                    </td>
                    <td>07.21 AM</td>
                  </tr>

                  <tr className="justify-content-center align-items-center text-center">
                    {/* <td>&nbsp;</td> */}
                    <td className="align-middle">
                      <ImageProduct
                        src={product}
                        // className="img-fluid rounded"
                        alt="Product"
                      />
                    </td>
                    <td className="align-middle">
                      <b>Ragel Products</b>
                    </td>

                    <td className="align-middle">
                      <b>x1</b>
                    </td>
                    <td className="align-middle">
                      <b>Rp 88,000</b>
                    </td>
                    <td className="align-middle">
                      On-Going <FaTruck />
                    </td>
                  </tr>
                  {/* <tr className="justify-content-center align-items-center">
                    <td>&nbsp;</td>
                    <td className="align-middle">
                      <ImageProduct
                        src={product}
                        className="img-fluid rounded"
                        alt="Product"
                      />{" "}
                      <b>Ragel Products</b>
                    </td>

                    <td className="align-middle">
                      <b>x1</b>
                    </td>
                    <td className="align-middle">
                      <b>Rp 88,000</b>
                    </td>
                    <td className="align-middle">
                      <b className="text-danger">Canceled </b><Circle>&nbsp;</Circle>
                    </td>
                  </tr> */}
                </tbody>
              </Table>
              <div className="row">
                <div className="col-md-7 ml-5 pl-5">
                  <label style={{ fontWeight: 'bold', fontSize: 18, alignItems: 'center' }}><IoCubeOutline size={30} /> RGL-4534532</label>
                  <div className="row">
                    <div className="col-sm-5">
                      <b>Total</b>
                    </div>
                    <div className="col-sm-5">
                      <b>&nbsp;</b>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Order</p>
                    </div>
                    <div className="col-sm-5">
                      <p>Rp. 176.000</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Shipping</p>
                    </div>
                    <div className="col-sm-5">
                      <p>Rp 22.000</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Discount</p>
                    </div>
                    <div className="col-sm-5">
                      <p>Rp. -</p>
                    </div>
                  </div>
                  <div className="row border-bottom pb-3">
                    <div className="col-sm-5">
                      <b>Grand Total</b>
                    </div>
                    <div className="col-sm-5">
                      <b>Rp. 398.000</b>
                    </div>
                  </div>
                  <div className="border-bottom py-2">
                    <label>
                      <b>Payment Method</b>
                    </label>
                    <p>Manual Transfer</p>
                  </div>
                  <div className="border-bottom py-2">
                    <label>
                      <b>Shipping To</b>
                    </label>
                    <p>Jalan Jambi No.22A, Medan Kota, SUMUT,22222</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <img src={jnt} alrt="jnt" className="img-fluid my-3" />
                  <Bulat1>
                    <WraperLinkarangan>
                      <Lingkaran />
                      <Line1 />
                    </WraperLinkarangan>{" "}
                    &nbsp;
                    <p>
                      Order <br />
                      <small>13 agustus 2021 - 08.39</small>
                    </p>
                  </Bulat1>
                  <Bulat1 className="mt-5">
                    <WraperLinkarangan>
                      <Lingkaran />
                      <Line1 />
                    </WraperLinkarangan>{" "}
                    &nbsp;
                    <p>
                      Order <br />
                      <small>13 agustus 2021 - 08.39</small>
                    </p>
                  </Bulat1>
                  <Bulat1 className="mt-5">
                    <WraperLinkarangan>
                      <Lingkaran2 />
                    </WraperLinkarangan>{" "}
                    &nbsp;
                    <p>
                      Order <br />
                      <small>13 agustus 2021 - 08.39</small>
                    </p>
                  </Bulat1>
                </div>
                <div></div>
                <div></div>
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="2"
            title="Canceled"
            style={{ backgroundColor: "#eee", padding: 10 }}
          >
            <div
              style={{ backgroundColor: "#fff" }}
              className="border shadow-sm rounded"
            >
              <Table responsive borderless className="my-3">
                <tbody>
                  <tr className="justify-content-center align-items-center text-center">
                    {/* <td>&nbsp;</td> */}
                    <td className="align-middle">
                      <ImageProduct
                        src={product}
                        // className="img-fluid rounded"
                        alt="Product"
                      />
                    </td>
                    <td className="align-middle">
                      <b>Ragel Products</b>
                    </td>

                    <td className="align-middle">
                      <b>x1</b>
                    </td>
                    <td className="align-middle">
                      <b>Rp 88,000</b>
                    </td>
                    <td className="align-middle">
                      <b className="text-danger">
                        Canceled <Circle>&nbsp;</Circle>
                      </b>
                    </td>
                  </tr>
                  {/* <tr className="justify-content-center align-items-center">
                    <td>&nbsp;</td>
                    <td className="align-middle">
                      <ImageProduct
                        src={product}
                        className="img-fluid rounded"
                        alt="Product"
                      />{" "}
                      <b>Ragel Products</b>
                    </td>

                    <td className="align-middle">
                      <b>x1</b>
                    </td>
                    <td className="align-middle">
                      <b>Rp 88,000</b>
                    </td>
                    <td className="align-middle">
                      <b className="text-danger">Canceled </b><Circle>&nbsp;</Circle>
                    </td>
                  </tr> */}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="3" title="Finished">
            <div
              style={{ backgroundColor: "#fff" }}
              className="border shadow-sm rounded"
            >
              <Table responsive borderless className="my-3">
                <tbody>
                  <tr className="justify-content-center align-items-center text-center">
                    <td>
                      <b>18 Jan 2021</b>
                    </td>
                    <td>07.21 AM</td>
                  </tr>

                  <tr className="justify-content-center align-items-center text-center">
                    {/* <td>&nbsp;</td> */}
                    <td className="align-middle">
                      <ImageProduct
                        src={product}
                        // className="img-fluid rounded"
                        alt="Product"
                      />
                    </td>
                    <td className="align-middle">
                      <b>Ragel Products</b>
                    </td>

                    <td className="align-middle">
                      <b>x1</b>
                    </td>
                    <td className="align-middle">
                      <b>Rp 88,000</b>
                    </td>
                    <td className="align-middle">
                      Finished <FiThumbsUp />
                    </td>
                  </tr>
                  {/* <tr className="justify-content-center align-items-center">
                    <td>&nbsp;</td>
                    <td className="align-middle">
                      <ImageProduct
                        src={product}
                        className="img-fluid rounded"
                        alt="Product"
                      />{" "}
                      <b>Ragel Products</b>
                    </td>

                    <td className="align-middle">
                      <b>x1</b>
                    </td>
                    <td className="align-middle">
                      <b>Rp 88,000</b>
                    </td>
                    <td className="align-middle">
                      <b className="text-danger">Canceled </b><Circle>&nbsp;</Circle>
                    </td>
                  </tr> */}
                </tbody>
              </Table>
              <div className="row">
                <div className="col-md-7 ml-5 pl-5">
                  <label style={{ fontWeight: 'bold', fontSize: 18, alignItems: 'center' }}><IoCubeOutline size={30} /> RGL-4534532</label>
                  <div className="row">
                    <div className="col-sm-5">
                      <b>Total</b>
                    </div>
                    <div className="col-sm-5">
                      <b>&nbsp;</b>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Order</p>
                    </div>
                    <div className="col-sm-5">
                      <p>Rp. 176.000</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Shipping</p>
                    </div>
                    <div className="col-sm-5">
                      <p>Rp 22.000</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Discount</p>
                    </div>
                    <div className="col-sm-5">
                      <p>Rp. -</p>
                    </div>
                  </div>
                  <div className="row border-bottom pb-3">
                    <div className="col-sm-5">
                      <b>Grand Total</b>
                    </div>
                    <div className="col-sm-5">
                      <b>Rp. 398.000</b>
                    </div>
                  </div>
                  <div className="border-bottom py-2">
                    <label>
                      <b>Payment Method</b>
                    </label>
                    <p>Manual Transfer</p>
                  </div>
                  <div className="border-bottom py-2">
                    <label>
                      <b>Shipping To</b>
                    </label>
                    <p>Jalan Jambi No.22A, Medan Kota, SUMUT,22222</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <img src={jnt} alrt="jnt" className="img-fluid my-3" />
                  <Bulat1>
                    <WraperLinkarangan>
                      <Lingkaran />
                      <Line1 />
                    </WraperLinkarangan>{" "}
                    &nbsp;
                    <p>
                      Order <br />
                      <small>13 agustus 2021 - 08.39</small>
                    </p>
                  </Bulat1>
                  <Bulat1 className="mt-5">
                    <WraperLinkarangan>
                      <Lingkaran />
                      <Line1 />
                    </WraperLinkarangan>{" "}
                    &nbsp;
                    <p>
                      Shipped <br />
                      <small>13 agustus 2021 - 08.39</small>
                    </p>
                  </Bulat1>
                  <Bulat1 className="mt-5">
                    <WraperLinkarangan>
                      <Lingkaran2 />
                    </WraperLinkarangan>{" "}
                    &nbsp;
                    <p>
                      Arrived <br />
                      <small>13 agustus 2021 - 08.39</small>
                    </p>
                  </Bulat1>
                </div>
                <div></div>
                <div></div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

const WraperLinkarangan = styled.div`
  display: flex;
  /* background:green; */
  position: relative;
  /* width:10; */
`;

const Line1 = styled.div`
  position: absolute;
  border-left: 2px dotted blue;
  height: 100px;
  margin-top: 45px;
  margin-left: 50%;
`;

const Lingkaran = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid blue;
  background: blue;
  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 1;
`;
const Lingkaran2 = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid blue;
  background: #fff;
  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const Bulat1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background:red; */
  position: relative;
  /* flex-direction: column; */
`;

const Container = styled.div`
  /* background:gray; */
  height: 110vh;
  padding-top: 150px;

  /* @media only screen and (min-width : 320px) and (max-width: 424px){
  padding-top: 150px;
    padding:0;
  } */
`;

const ImageExp = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const Circle = styled.span`
  padding: 0px 8px;
  border-radius: 50%;
  border: 1px solid #000;
  background-color: red;
`;

const ImageProduct = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
`;
