import styled from "styled-components";
export const ClaimRedeemLockedModalWrapper = styled.div`
  font-family: "Bai Jamjuree";
  font-style: normal;
  display: flex;
  .left-path {
    width: 50%;
    padding: 0px 20px 0px 0px;
    border-right: 1px solid #c6c6c6;
    .claimable-container {
      margin-top: 5px;
      padding: 15px;
      background: rgba(161, 225, 202, 0.2);
      border-radius: 10px;
      .text {
        margin-bottom: 10px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #6e6e6e;
      }
      .value {
        font-size: 20px;
        line-height: 22px;
        img {
          width: 23px;
          height: 23px;
          margin-bottom: 4px;
          margin-right: 6px;
        }
      }
    }
    .redeem-container {
      padding: 0px 15px;
      border-radius: 10px;
      .redeem-title {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
      }
      .value-redeem {
        padding: 13px 5px;
        border-bottom: 1px solid #c6c6c6;
        font-weight: 400;
        font-size: 20px;
        line-height: 22px;
        img {
          margin-right: 5px;
          margin-bottom: 3px;
          width: 24px;
          height: 24px;
        }
        span > b {
          font-weight: 700;
        }
      }
      .calculate-amount {
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
        .math-function {
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 5%;
        }
        .block-contain {
          border-radius: 10px;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #6e6e6e;
          padding: 10px;
          width: 40%;
          .text {
            margin-bottom: 10px;
          }
          .value {
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            span {
              font-weight: 700;
              color: black;
            }
          }
        }
        .princial {
        }
        .earned {
          background: rgba(161, 225, 202, 0.2);
        }
      }
    }
    .info-container {
      margin-top: 10px;
      padding: 15px 15px 5px 15px;
      /* background: rgba(161, 225, 202, 0.2); */
      /* border-radius: 10px; */
      .flex {
        display: flex;
        margin-bottom: 20px;
        .key {
          width: 30%;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
        }
        .value {
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          .apr {
            font-weight: 700;
            text-align: right;
            color: #00945d;
          }
          img {
            padding-bottom: 2px;
            margin-right: 5px;
          }
          width: 70%;
          text-align: end;
        }
      }
    }
  }
  .right-path {
    width: 50%;
    padding: 0px 0px 0px 20px;
  }
`;

export const FooterClaimWrapper = styled.div`
  display: inline-block;
  width: 50%;
  margin-bottom: 10px;
  .ant-btn[disabled],
  .ant-btn[disabled]:active,
  .ant-btn[disabled]:focus,
  .ant-btn[disabled]:hover {
    color: white;
    border: none;
    background: gray;
    text-shadow: none;
    box-shadow: none;
    opacity: 0.3;
    width: 95%;
  }
  .button-footer {
    margin-top: 20px;
    /* margin-left: 0px; */
    width: 95%;
    background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #915fcd 7.32%,
      #ae5297 100%
    );
    border-radius: 20px;
    color: white;
  }
  .button-footer:hover {
    color: white;
    border: none;
    filter: brightness(1.2);
  }
`;
