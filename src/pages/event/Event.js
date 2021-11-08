import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import { Calendar } from "../../component/calendar/Calendar";
import { getDataEvent } from "../../services/API/event";
import moment from "moment";

export const Event = (props) => {
  const [show, setShow] = useState(false);
  const [arrEvent, setArrEvent] = useState([])
  const [dataModal, setDataModal] = useState({})
  const [arrDate, setArrDate] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getDataEvent()
      .then(res => {
        console.log({
          event: res.success
        })
        if (res.success) {
          setArrEvent(res.success)
        }
      })
  }, [])

  useEffect(() => {
    arrEvent.forEach((item) => {
      if (item.hasOwnProperty('event_start_datetime')) {
        arrDate.push(item['event_start_datetime'])
      }
    })
  }, [arrEvent])

  const btnSeeDetail = (index) => {
    handleShow()
    setDataModal(arrEvent[index])
  }

  return (
    <Container className="container-fluid">
      <div className="col-sm-10 mx-auto" style={{ marginTop: 25 }}>
        <div className="row">
          <div className="col-sm-4">
            <Calendar arrayEvent={arrDate.filter(a => new Date(a).getTime() >= new Date().getTime()).map(item => new Date(item))} screen="detail" />

          </div>
          <Content className="col-sm-8 p-3">
            {
              arrEvent.filter(a => new Date(a.event_start_datetime).getTime() >= new Date().getTime()).length > 0 ?
                arrEvent.filter(a => new Date(a.event_start_datetime).getTime() >= new Date().getTime()).map((item, index) => (
                  <Items className="d-flex flex-column" key={index}>
                    <small className="font-weight-bold">
                      {moment(item.event_start_datetime).format('DD MMMM YYYY')} - {moment(item.event_end_datetime).format('DD MMMM YYYY')}
                    </small>
                    <Label className="text-secondary">
                      {item.event_name}
                    </Label>
                    <p>
                      {item.event_description}
                    </p>
                    <button className="btn btn-warning text-white col-sm-2 btn-sm font-weight-bold" onClick={() => btnSeeDetail(index)}>See Details</button>
                  </Items>

                ))
                : <p>No Event</p>
            }

          </Content>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop={true}
            keyboard={false}
            size="lg"
          >
            <div className="p-3">
              <div className="d-flex d-flex-row justify-content-between py-5">
                <Label>
                  {moment(dataModal.event_start_datetime).format('DD MMMM YYYY')} - {moment(dataModal.event_end_datetime).format('DD MMMM YYYY')}
                </Label>
                <AiOutlineClose size={30} onClick={handleClose} />
              </div>
              <Label className="text-secondary">{dataModal.event_name}</Label>
              <p>
                {
                  dataModal.event_description
                }
              </p>
              <div className="justify-content-center align-items-center mx-auto col-sm-5 my-5">

                <button className="btn btn-warning text-white col-sm-12">Save to Calendar</button>
              </div>
            </div>
          </Modal>

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
  font-size: large;
`;

const Content = styled.div`
border-radius:6px;
box-shadow:2px 1px 4px 0px rgba(0,0,0,.3);
margin-bottom:15px;
border:1px solid transparent;
@media only screen and (max-width:600px){
    &{
        margin-top: 2em;
    }
}
`

const Items = styled.div`
border-bottom:.2em solid #eee;
padding-bottom: 1em;

`

const Image = styled.img`
width:130px;
height:auto;
border-top-left-radius:6px;
border-bottom-left-radius:6px;
object-fit:cover;
`
