import React from "react";
import styled from "styled-components";
import { Calendar } from "../../../component/calendar/Calendar";
import clinic from "../../../Images/sample/clinic.jpeg";
import {Link} from 'react-router-dom'

export const ListBooking = () => {
  return (
    <Container className="container-fluid">
      <div className="col-sm-10 mx-auto">
        <div className="row">
          <div className="col-sm-4">
              <Label>Choose date &amp; time</Label>
            <Calendar arrayEvent={[]} screen="list"/>
            
          </div>
          <Col2 className="col-sm-4 pb-5">
              <Label>Choose Location</Label>
              <Content className="d-flex flex-row border justify-content-between" to={{
                  pathname: '/detailBooking/2',
                  state : []
              }}>
                    <Image src={clinic} alt="clinic" className="img-fluid"/>
                    <div className="p-1 pl-3">
                        <h4>Ragel Clinic</h4>
                        <p>Jalan Krakatau no.88A, Medan </p>
                    </div>
              </Content>
              <Content className="d-flex flex-row border justify-content-between">
                    <Image src={clinic} alt="clinic" className="img-fluid"/>
                    <div className="p-1 pl-3">
                        <h4>Ragel Clinic</h4>
                        <p>Jalan Krakatau no.88A, Medan</p>
                    </div>
              </Content>
                <Button className="btn btn-warning text-white col-sm-12">Proceed Booking</Button>
          </Col2>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* background:gray; */
  height: 100vh;
  padding-top: 150px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Content = styled(Link) `
border-radius:6px;
box-shadow:2px 1px 4px 0px rgba(0,0,0,.3);
margin-bottom:15px;
color:#000;
&:hover{
    border:1px solid black;
    color:#000;
    text-decoration:none;
}
`

const Button = styled.button `
// position: absolute;
bottom:0;
font-weight:bold;
display:flex;
align-items:center;
justify-content:center;
margin-top:8vh;
`

const Image = styled.img `
width:130px;
border-top-left-radius:6px;
border-bottom-left-radius:6px;
object-fit:cover;
`

const Col2 = styled.div `

@media only screen and (min-width: 320px) and (max-width:425px){
   margin-top : 10px;
    }
`
