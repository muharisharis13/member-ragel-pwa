import React from "react";
import styled from "styled-components";
import { Calendar } from "../../../component/calendar/Calendar";
import clinic from "../../../Images/sample/clinic.jpeg";

export const DetailBooking = (props) => {

    // console.log('ini props : ',props.location)
  return (
    <Container className="container-fluid">
      <div className="col-sm-10 mx-auto">
        <div className="row">
          <div className="col-sm-4">
              <Label>Consultation date &amp; time</Label>
            <Calendar arrayEvent={[]} screen="detail"/>
            
          </div>
          <div className="col-sm-4">
              <Label>Consultation Location</Label>
              <Content className="d-flex flex-row  justify-content-between">
                    <Image src={clinic} alt="clinic" className="img-fluid"/>
                    <div className="p-1 pl-3">
                        <h4>Ragel Clinic</h4>
                        <p>Jalan Krakatau no.88A, Medan</p>
                    </div>
              </Content>
              
          </div>
          <div className="col-sm-4">
              <Label>Booking Status</Label>
              <h3 className="text-danger">PENDING</h3>
          </div>
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

const Content = styled.div `
border-radius:6px;
box-shadow:2px 1px 4px 0px rgba(0,0,0,.3);
margin-bottom:15px;
border:1px solid transparent;
transition:450ms;
&:hover{
    border:1px solid black;
    box-shadow:none;
}
`

const Button = styled.button `
position: relative;
bottom:0;
font-weight:bold;
`

const Image = styled.img `
width:130px;
height:auto;
border-top-left-radius:6px;
border-bottom-left-radius:6px;
object-fit:cover;
`
