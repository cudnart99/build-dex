import styled from "styled-components";

export const SwapInputWrapper = styled.div`
  .currency-input {
    border: none;
    padding: 4px 16px;
    &:focus-visible {
      border: none;
      outline: none;
    }
    &::placeholder {
      color: #c1c1c1;
      font-style: italic;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
  input {
    border-radius: 20px;
    color: black;
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-size: 16px;
    line-height: 26px;
  }
  .stake-amount-container {
    /* padding: 12px;
    margin-top: 18px;
    background: rgba(161, 225, 202, 0.2);
    border-radius: 10px; */
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 10px;
    }

    .input-container {
      border: 1px solid #9747ff;
      border-radius: 20px;
      padding: 7px 10px;
      background-color: white;

      .ant-input-affix-wrapper-focused,
      .ant-input-affix-wrapper,
      .ant-input-affix-wrapper:focus,
      .ant-input-affix-wrapper::selection,
      input {
        border: none;
      }

      .info-balance {
        display: flex;
        margin-bottom: 10px;
        .stake-icon-container {
          width: 40%;
          display: flex;
          padding: 1px;
          background: #f4f4f4;
          border-radius: 20px;
          position: relative;
          img {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin: 4px 5px 0px 5px;
          }
          .text {
            font-weight: 500;
            font-size: 16px;
            display: inline-block;
            margin-top: 2px;
            /* line-height: 20px; */
          }
          .icon-down-arrow {
            width: 13.5px;
            height: 7px;
            position: absolute;
            top: 7px;
            right: 10px;
          }
        }
        .balance {
          padding: 6px 0px;
          text-align: end;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          width: 60%;
        }
      }
    }
  }
`;
