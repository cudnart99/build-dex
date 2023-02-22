import styled from "styled-components";

export const StyledWrapper = styled.div`
  .icon {
    display: inline-block;
    margin-top: -3px;
    width: 20px;
    height: 20px;
  }
  .common-token-container {
    .manual-input {
      position: relative;
      display: inline-block;
      .rate-icon {
        position: absolute;
        top: 2px;
        right: 5px;
        font-weight: 500;
        font-size: 16px;
      }
    }
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
  .settings-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #2b2b2b;
  }
`;
