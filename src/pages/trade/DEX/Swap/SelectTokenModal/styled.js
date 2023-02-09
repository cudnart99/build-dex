import styled from "styled-components";

export const StyledWrapper = styled.div`
  .icon {
    display: inline-block;
    margin-top: -3px;
    width: 20px;
    height: 20px;
  }
  .common-token-container {
    .button-token {
      border: 1px solid #c6c6c6;
      border-radius: 20px;
      display: inline-block;
      padding: 3px 15px;
      margin-right: 10px;

      span {
        display: inline-block;
        margin-left: 5px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #c6c6c6;
      }
    }
    .selected-bg {
      background-color: #6e5ac3;
      .selected-text {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
      }
    }
  }
  .token-list-container {
    /* background-color: red; */
    .token-box {
      justify-content: space-between;
      padding: 13px 3px;
      border-bottom: 1.5px dashed #c6c6c6;
      .img-container {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .name-container {
        width: 90%;
        .main-text {
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          color: #2b2b2b;
        }
        .sub-text {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
        }
        .color-selected {
          color: #6e5ac3;
        }
      }
      .trash-container {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .manage {
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #1b76ff;
    margin-top: 30px;
  }
`;
