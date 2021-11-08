import React from "react";
import styled from "styled-components";
import { BannerProfile } from "../../../component/banner/profile/BannerProfile";
import { FiDollarSign } from "react-icons/fi";
import { Tab, Tabs } from "react-bootstrap";
import user from "../../../Images/user/user.jpg";

export const Profit = () => {
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
              Profit
              <Title>Rp. 88.880.000</Title>
              <span className="text-success">&#43;3.48% </span>
              <small>Since last month</small>
            </Overview>
            <Dollar className="bg-primary text-white p-2 h-30">
              <FiDollarSign size={20} />
            </Dollar>
          </div>
        </Content>
        <Tabs
          defaultActiveKey="1"
          id="uncontrolled-tab-example"
          className="mb-3 text-center mx-auto"
          fill
        >
          <Tab eventKey="1" title="1st Downliner">
            <div className="row justify-content-between align-items-center align-self-center mx-auto col-sm-10">
              <div>88 Downliner</div>
              <div>Rp. 35.880.000</div>
            </div>
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
              <div>Rp. 35.880.000</div>
            </div>
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
              <div>Rp. 35.880.000</div>
            </div>
          </Tab>
          <Tab eventKey="2" title="2nd Downliner">
          <div className="row justify-content-between align-items-center align-self-center mx-auto col-sm-10">
              <div>88 Downliner</div>
              <div>Rp. 35.880.000</div>
            </div>
            <div className="row justify-content-between align-items-center align-self-center mx-auto col-sm-10 py-4 border-bottom">
              <div className=" row col-sm-5">
                <img
                  src={user}
                  alt="user"
                  style={{ borderRadius: 60, width: 80, height: 80 }}
                />
                <div className="col-sm-8 ">
                  <b>John Michael</b> <br />
                  Derived From <br/>
                  <b>Alex Smith</b>
                </div>
              </div>
              <div>Rp. 35.880.000</div>
            </div>
            <div className="row justify-content-between align-items-center align-self-center mx-auto col-sm-10 py-4 border-bottom">
              <div className=" row col-sm-5">
                <img
                  src={user}
                  alt="user"
                  style={{ borderRadius: 60, width: 80, height: 80 }}
                />
                <div className="col-sm-8 ">
                  <b>John Michael</b> <br />
                  Derived From <br/>
                  <b>Alex Smith</b>
                </div>
              </div>
              <div>Rp. 35.880.000</div>
            </div>
          </Tab>
        </Tabs>
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
