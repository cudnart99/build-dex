import { Modal } from "antd";
import styled from "styled-components";

export const ConfirmDeactiveModalWrapper = styled(Modal)`
  pointer-events: none;
  .explain-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    /* Black color */

    color: #2b2b2b;
  }
  .ant-modal-header,
  .ant-modal-footer {
    border: none;
  }
  .ant-modal-close-x {
    padding-top: 8px;
  }
  .info-field {
    background: rgba(161, 225, 202, 0.2);
    border-radius: 10px;
    min-height: 100px;
    padding: 12px 12px;
    .img-field {
      background: linear-gradient(123.23deg, #94e0c4 -16.4%, #8bc5b0 71.36%);
      border-radius: 5px;
      padding: 12px;
    }
    .text-info-field {
      h1 {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #2b2b2b;
      }
      .price-field {
        .token-icon__wrapper {
          padding: 8px;
          padding-top: 0px;
          display: flex;
          /* align-items: center; */
          justify-content: center;
          .token-icon {
            width: 24px;
            height: 24px;
          }
        }
        p {
          margin-bottom: 0px;
        }
        .token-value {
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          color: #2b2b2b;
        }
        .usdt-value {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          text-align: right;
          color: #6e6e6e;
        }
      }
      .requester {
        margin-top: 32px;
        .requester-avatar {
          padding: 8px;
          padding-top: 0px;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .requester-info {
          p {
            margin-bottom: 0px;
          }
          p:first-child {
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: #6e6e6e;
          }
          p:last-child {
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #6e6e6e;
          }
        }
      }
    }
  }

  .warning-field {
    margin-top: 8px;
    margin-bottom: 16px;
    border: 1px solid rgba(155, 95, 204, 0.2);
    border-radius: 10px;
    padding: 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    text-align: justify;
    color: #000000;
  }
  .expired-field {
    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #2b2b2b;
    }
    .ant-statistic-content-value {
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
      color: #9b5fcc;
    }
  }
`;
