import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { BannerProfile } from "../../../component/banner/profile/BannerProfile";
import { BsPeople } from "react-icons/bs";
import { BarChart } from "../../../component/chart/profile/BarChart";
import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai";
import user from "../../../Images/user/user.jpg";
import ktp from "../../../Images/user/user-ktp.jpg";

export const Downliner = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);

  const handleModalAdd = () => setModalAdd(!modalAdd);
  const handlemodalDetail = () => setModalDetail(!modalDetail);

  return (
    <Container className="container-fluid">
      <div className="col-sm-10 mx-auto pb-5" style={{ marginTop: 25 }}>
        <BannerProfile />
        <Content className="mt-5 align-items-baseline pt-4">
          <div className="col-sm-3 justify-content-center text-center">
            <h4>Arya Stark</h4>
          </div>
          <div className="row justify-content-between pr-3 my-3 mb-5 col-sm-5">
            <Overview className="col-sm-10">
              Downliner
              <Title>888</Title>
              <button
                className="btn btn-warning text-white"
                onClick={handleModalAdd}
              >
                + Add New Downliner
              </button>
            </Overview>
            <Dollar className="bg-primary text-white p-2 h-30">
              <BsPeople size={20} />
            </Dollar>
          </div>
        </Content>
        <div className="border border-bottom-0 rounded shadow-sm">
          <div className="row justify-content-between align-items-center align-self-center mx-auto col-sm-10 py-4 border-bottom">
            <div className=" row col-sm-5">
              <img
                src={user}
                alt="user"
                style={{ borderRadius: 60, width: 80, height: 80 }}
              />
              <div className="col-sm-8 ">
                <b>John Michael</b> <br />
                Downliner : 5
              </div>
            </div>
            <div>
              <button
                className="btn btn-warning text-white"
                onClick={handlemodalDetail}
              >
                Details
              </button>
            </div>
          </div>
          <div className="row justify-content-between align-items-center align-self-center mx-auto col-sm-10 py-4">
            <div className=" row col-sm-5">
              <img
                src={user}
                alt="user"
                style={{ borderRadius: 60, width: 80, height: 80 }}
              />
              <div className="col-sm-8 ">
                <b>John Michael</b> <br />
                Downliner : 5
              </div>
            </div>
            <div>
              <button
                className="btn btn-warning text-white"
                onClick={handlemodalDetail}
              >
                Details
              </button>
            </div>
          </div>
        </div>
        <Modal
          show={modalDetail}
          onHide={handlemodalDetail}
          backdrop={true}
          keyboard={false}
          size="lg"
        >
          <div className="p-5">
            <AiOutlineClose
              size={30}
              onClick={handlemodalDetail}
              className="text-right float-right"
            />
            <div className="row p-5">
              <div className="col-sm-5 row">
                <img
                  src={user}
                  alt="user"
                  style={{ borderRadius: 60, width: 80, height: 80 }}
                />
                <div className="pl-3">
                  <b>Arya Startk</b>
                  <br />
                  Downliner : <b>8</b>
                </div>
              </div>
              <div className="col-sm-7">
                <BarChart />
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          show={modalAdd}
          onHide={handleModalAdd}
          backdrop={true}
          keyboard={false}
          size="md"
        >
          <div className="p-3 border col-sm-12">
            <AiOutlineClose
              size={30}
              onClick={handleModalAdd}
              className="text-right float-right"
            />
            <div className="border p-1 rounded">
              <div className="d-flex py-5">
                <div className="col-sm-10 text-center justify-content-center">
                  <img src={ktp} alt="ktp" className="img-fluid" />
                  <AiOutlineCamera
                    style={{
                      position: "absolute",
                      left: "45%",
                      top: "40%",
                      backgroundColor: "#fff",
                      padding: 10,
                      borderRadius: "50%",
                    }}
                    size={50}
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <Bold>Full Name</Bold>
                  <Input
                    type="text"
                    value="Arya Stark"
                    className="form-control shadow-sm border border-success text-success"
                    style={{ backgroundColor: "#fff" }}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <Bold>Email Address</Bold>
                  <Input
                    type="email"
                    value="arya@email.com"
                    className="form-control shadow-sm border border-success text-success"
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
                <div className="form-group">
                  <Bold>Gender</Bold>
                  <select className="form-control shadow-sm border border-success text-success">
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>
                <div className="form-group">
                  <Bold>Place Of Birth</Bold>
                  <Input
                    type="text"
                    value="Medan"
                    className="form-control shadow-sm border border-success text-success"
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
                <div className="form-group">
                  <Bold>Date Of Birth</Bold>
                  <Input
                    type="text"
                    value="21 Dec 1990"
                    className="form-control shadow-sm border border-success text-success"
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
                <div className="form-group">
                  <Bold>Profession</Bold>
                  <Input
                    type="text"
                    value="School Teacher"
                    className="form-control shadow-sm border border-success text-success"
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
                <Bold>Address</Bold>
                <div className="pl-2">
                  <div className="form-group">
                    <label className="form-label text-secondary">
                      Province
                    </label>
                    <Input
                      type="text"
                      value="Sumatera Utara"
                      className="form-control shadow-sm border border-success text-success"
                      style={{ backgroundColor: "#fff" }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-secondary">City</label>
                    <Input
                      type="text"
                      value="Medan Kota"
                      className="form-control shadow-sm border border-success text-success"
                      style={{ backgroundColor: "#fff" }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-secondary">
                      District
                    </label>
                    <Input
                      type="text"
                      className="form-control shadow-sm border border-success text-success"
                      style={{ backgroundColor: "#fff" }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-secondary">
                      Sub-District
                    </label>
                    <Input
                      type="text"
                      className="form-control shadow-sm border border-success text-success"
                      style={{ backgroundColor: "#fff" }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-secondary">
                      Postal Code
                    </label>
                    <Input
                      type="text"
                      value="22222"
                      className="form-control shadow-sm border border-success text-success"
                      style={{ backgroundColor: "#fff" }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-secondary">
                      Address Details
                    </label>
                    <Textarea
                      type="text"
                      placeholder="e.g Nomor 88A"
                      color="#000"
                      className="form-control shadow-sm border border-success text-success"
                      style={{ backgroundColor: "#fff" }}
                      rows={5}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <Bold>Referral Code</Bold>
                <Input
                  type="text"
                  value="22222"
                  className="form-control shadow-sm border border-success text-success"
                  style={{ backgroundColor: "#fff" }}
                />
              </div>
              <div className="justify-content-center align-items-center mx-auto col-sm-5 my-5 text-center">
                <button
                  className="btn btn-warning text-white col-sm-7 font-weight-bold"
                  onClick={handleModalAdd}
                >
                  Add
                </button>
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
  height: 110vh;
  padding-top: 150px;
`;

const Content = styled.div`
  padding: 10px 5px;
`;

const Overview = styled.div`
  font-weight: bold;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18pt;
`;

const Dollar = styled.div`
  border-radius: 50%;
  height: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Textarea = styled.textarea`
  &::placeholder {
    color: #28a745;
  }
`;

const Input = styled.input`
  &::placeholder {
    color: #28a745;
  }
`;

const Bold = styled.label`
  font-weight: bold;
`;
