import { strings } from "@utils/index";
import React from "react";
import { ProfileRecordWrapperStyled } from "./styled";

function ProfileRecord({ data, dataResult, dataDetail, ...props }) {
  return (
    <ProfileRecordWrapperStyled>
      <div className="profile">
        <div className="profile-avatar">
          {
            <img
              src={
                data?.avatar ||
                require("@images/trade/datahub/connect-wallet-logo.png")
              }
              alt=""
            />
          }
        </div>
        <div className="profile-content">
          {/* <h2>{data?.patientName}</h2> */}
          <p className="profile-content-detail">
            <span className="profile-content-detail-left">{strings("modal.ProfileRecord.txt")}:</span>
            <span className="profile-content-detail-right">
              {data?.gender === "MALE" ? strings("modal.ProfileRecord.men") : strings("modal.ProfileRecord.women")}, {data?.age}
            </span>
          </p>
          <p className="profile-content-detail">
            <span className="profile-content-detail-left">{strings("modal.ProfileRecord.txt1")}:</span>
            <span className="profile-content-detail-right">
              {data?.patientId}
            </span>
          </p>
          <p className="profile-content-detail">
            <span className="profile-content-detail-left">{strings("modal.ProfileRecord.txt2")}:</span>
            <span className="profile-content-detail-right">
              {data?.patientDocument}
            </span>
          </p>
        </div>
      </div>
    </ProfileRecordWrapperStyled>
  );
}

export default ProfileRecord;
