import React, { useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import styled from "styled-components";

export const Calendar = ({ arrayEvent, screen }) => {
  return (
    <Container className="border">
      {/* <Title>{title}</Title> */}
      <DayPicker selectedDays={arrayEvent} />
      {/* {
          screen === "list" ?  <select className="form-control col-sm-7" style={{ fontWeight: "bold" }}>
          <option style={{ fontWeight: "bold" }}>07.00 AM</option>
        </select> : <p style={{fontWeight:'bold'}}>07.00 AM</p>
      } */}
     
    </Container>
  );
};

const Container = styled.div`
  background: #fff;
  display: flex !important;
  align-items: center;
  // justify-content: center;
  border-radius: 7px;
  box-shadow: 3px 1px 4px 0px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  padding: 10px !important;
`;
