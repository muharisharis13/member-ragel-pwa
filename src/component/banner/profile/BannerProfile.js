import React, { useContext } from "react";
import banner from "../../../Images/user/banner.jpg";
import user from "../../../Images/user/user.jpg";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";
import { Context } from "../../../Context/Context";

export const BannerProfile = ({ screen, data }) => {
  const { arrUserInfo } = useContext(Context)

  return (
    <div className="container-fluid">
      <Sampul src={arrUserInfo.background_url !== "" ? arrUserInfo.background_url : banner} alt="sampul" />
      <RoundAvatar>
        <RoundAvatar>
          <RoundImage src={arrUserInfo.profil_url === "" ? user : arrUserInfo.profil_url} alt="user" />
          {
            screen == "Edit" ?
              <div style={{ position: 'absolute', padding: 4, bottom: -12, left: '3vw', backgroundColor: '#fff', borderRadius: 60, width: 30, alignItems: 'center', textAlign: 'center' }} className="border">
                <AiOutlineCamera />
              </div> : null
          }
        </RoundAvatar>
      </RoundAvatar>
    </div>
  );
};

const Sampul = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: flex;
`;

const RoundImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  object-fit: cover;
  position: relative;
  border:2px solid #fff;
  box-shadow:2px 2px 3px 2px rgba(0,0,0,.1);
`;
const RoundAvatar = styled.div`
  position: absolute;
  top:19vh;
  left:3vw;
`;
