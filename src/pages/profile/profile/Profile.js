import React, { useContext, useState } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Link, useHistory } from 'react-router-dom'
import styled from "styled-components";
import { VerticalChart } from "../../../component/chart/profile/VerticalChart";
import { BarChart } from "../../../component/chart/profile/BarChart";
import { BannerProfile } from "../../../component/banner/profile/BannerProfile";
import { currency } from '../../../utl/currency-format/index'
import { ModalReqMember } from "../../../component/Modal/Profile/ModalReqMember";

export const Profile = (props) => {
  const navigate = useHistory();
  const data = props.location.state
  const [showUpload, setShowUpload] = useState(false)


  const btnShowUpload = (type) => {
    switch (type) {
      case "buka":
        setShowUpload(true)
        break;
      case "tutup":
        setShowUpload(false)
        break;

      default:
        break;
    }
  }


  return (
    <Container className="container-fluid">
      {/* Modal */}
      <ModalReqMember show={showUpload} onHide={() => btnShowUpload("tutup")} />
      {/* Modal End */}
      <div className="col-sm-10 mx-auto" style={{ marginTop: 25 }}>
        <BannerProfile data={data} />
        <Content className="row mt-5 align-items-baseline">
          <div className="col-sm-3 justify-content-center text-center">
            <h4 className="text-secondary">{data.full_name}</h4>
            <EditProfil to={`/edit/profile/${data.member_id}`}>Edit Profil</EditProfil>
            <p>RBO <br /><b>{data.member_id}</b></p>
            <p>Referall Code <br /> <b>{data.partner_id}</b></p>
          </div>
          <ShopHist>
            <div>
              <label>&nbsp;</label>
              <br />
              <label>&nbsp;</label>
            </div>
            <div>
              <LinkHistory to="/history"><Button className="border border-warning">
                <HiOutlineClipboardList size={20} /> Shopping History
              </Button></LinkHistory>
            </div>
          </ShopHist>
          <div className="col-sm-4 text-center">
            <div>
              <label>Ragel Deposit</label>
              <br />
              <Bold>{currency(parseInt(data.member_detail.balance))}</Bold>
            </div>
            <div className="row justify-content-between px-5 mx-2">
              <Button className="btn btn-warning text-white col-sm-4" disabled={data.member_detail.verified_status === "pending" ? true : false} onClick={data.member_detail.verified_status !== "not" ? () => navigate.push("/topup") : () => btnShowUpload('buka')}> Top Up</Button>

              <Button className="btn btn-warning text-white col-sm-4">
                <LINK to="/topups/history">History</LINK>
              </Button>
            </div>
          </div>
          <div className="col-sm-2 text-center">
            <div>
              <Bold>{data.member_detail.downliner_list}</Bold>
              <br />
              <label>Downliner 1st</label>
            </div>
            <div>
              <Bold>{JSON.parse(data.member_detail.downliner_list2.length)}</Bold>
              <br />
              <label>Downliner 2nd</label>
            </div>
            <div>
              <Link to="/profit">
                <Button className="btn btn-warning text-white" > See Details</Button>
              </Link>
            </div>
          </div>
        </Content>
        <div className="row border-top pt-4">
          <div className="col-sm-6">
            <VerticalChart to="/downliner" />
          </div>
          <div className="d-flex flex-column col-sm-5">
            <Box className="border">
              <div>
                <small className="text-secondary">MOST SOLD PRODUCT</small>
                <p>Lancome Eyeshadow</p>
                <Bold>38</Bold><small className="text-secondary"> Items Sold</small>
              </div>
            </Box>
            <div>
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const LINK = styled(Link)`
color: #fff;
text-decoration: none;

&:hover{
  color: #fff;
text-decoration: none;
}
`

const Container = styled.div`
  /* background:gray; */
  height: 100vh;
  padding-top: 150px;
`;

const Content = styled.div`
  padding: 10px 5px;
`;

const Box = styled.div`

background-color: #fff;
  padding: 10px;
  border-radius: 7px;
  box-shadow: 2px 6px 6px 4px rgba(0, 0, 0, 0.1);
  `

const ShopHist = styled.div`
width: 200;
display: block;
@media only screen and (max-width:600px){
    margin:0 auto;
  }
`

const Button = styled.div`
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  align-items: center;
  transition: .2s ease-in-out;
  &:hover{
      background-color: #ffc107;
      color:#fff;
  }

  @media only screen and (max-width:600px){
    margin:15px 0;
    align-self: center;
  }
`;

const EditProfil = styled(Link)`
text-decoration: none;
font-weight: bold;
&:hover{
    
text-decoration: none;
}
`

const LinkHistory = styled(Link)`
color:#000;
text-decoration: none;
&:hover{   
color:#000;
text-decoration:none;
}
`


const Bold = styled.label`
font-weight: bold;
`
