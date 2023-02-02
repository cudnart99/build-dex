import styled from "styled-components";

export const BaseModalTitleWrapper = styled.div`
  .title-modal {
    padding-top: 3px;
    display: inline-block;
    margin-left: 10px;
  }
  .arrow-back {
    cursor: pointer;
    img {
      margin-bottom: 3px;
    }
  }
  .x-button {
    cursor: pointer;
    float: right;
  }
`;

export const BaseModalFooterWrapper = styled.div`
  /* padding-right: 4%; */
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
  }
  .button-footer {
    border-radius: 20px;
  }
  .button-footer-disabled {
    border-radius: 20px;
    color: white;
    width: 30%;
    cursor: not-allowed;
    background-color: gray;
    color: white;
    opacity: 0.3;
  }
  .request:hover {
    color: white;
    border: none;
    filter: brightness(1.2);
  }
  .request {
    background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #915fcd 7.32%,
      #ae5297 100%
    );
    color: white;
    border: none;
  }
  .draft {
    color: #915fcd;
    border: 1px solid #915fcd;
  }
  .draft:hover {
    filter: brightness(1.1);
  }
  .icon-button {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;

export const BaseModalContentWrapper = styled.div`
  .reward-container {
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #6e6e6e;
    .left-content {
      width: 100%;
      .creator-text {
        font-weight: 700;
        color: #2b2b2b;
      }
      .input-container {
        width: 100%;
        margin: 10px 0px;
      }
    }
  }
  .not-reward-container {
    display: flex;
    justify-content: "space-between";
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #6e6e6e;
    .left-content {
      width: 50%;
      border-right: 1px solid #6e6e6e;
      padding-right: 20px;
      .creator-text {
        font-weight: 700;
        color: #2b2b2b;
      }
      .input-container {
        width: 100%;
        margin: 10px 0px;
      }
    }
    .right-content {
      padding-left: 20px;
      width: 50%;
      .add-container {
        border-radius: 3px;
        width: 25px;
        height: 25px;
        background-color: #6e5ac3;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
          width: 80%;
          display: block;
        }
      }
    }
  }
`;
