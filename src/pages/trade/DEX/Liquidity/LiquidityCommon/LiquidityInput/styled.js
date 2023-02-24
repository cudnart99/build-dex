import styled from "styled-components";

export const LiquidityInputWrapper = styled.div`
  /* padding: 10px; */
  .currency-input {
    border: none;
    padding: 0px 7px;

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
    font-weight: bold;
    border-radius: 20px;
    color: black;
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-size: 16px;
    line-height: 26px;
  }
  .stake-amount-container {
    /* margin-top: 18px; */
    /* background: rgba(161, 225, 202, 0.2);
    border-radius: 10px; */
    color: black;
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
        justify-content: space-between;
        /* margin-bottom: 10px; */
        padding: 1px;
        .img-container {
          display: flex;
          align-items: center;
          .icon {
            width: 20px;
            height: 20px;
            margin: 0px 5px 0px 5px;
            display: inline-block;
          }
          .nest {
            margin-left: -10px;
          }
          .icon-copy {
            width: 14.5px;
            height: 18.75px;
          }
          .text {
            font-weight: 500;
            font-size: 16px;
            color: black;
            display: inline-block;
            margin: 0px 5px;
          }
        }
        .checkbox {
          border-radius: 20px;
          border: 1px solid #6e6e6e;
          border-radius: 5px;
          width: 20px;
          height: 20px;
          margin-top: 5px;
        }
        .checkbox-check {
          border-radius: 20px;
          background: #6e5ac3;
          border-radius: 5px;
          width: 20px;
          height: 20px;
          margin-top: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 15px;
            height: 11px;
          }
        }
        .stake-icon-container {
          /* width: 35%; */
          display: flex;
          padding: 1px;
          /* background: #f4f4f4; */
          border-radius: 20px;
          /* position: relative; */
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
            color: black;
            margin: 4px 3px 0px 3px;
          }
          .icon-copy {
            width: 14.5px;
            height: 18.75px;
          }
        }
        .balance {
          color: black;
          padding: 6px 0px;
          text-align: end;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          /* width: 65%; */
        }
      }
    }
  }
  .select-rate-container {
    justify-content: end;
    .block {
      cursor: pointer;
      text-align: center;
      width: 50px;
      display: inline-block;
      padding: 5px;
      border: 1px solid #c6c6c6;
      border-radius: 5px;
      color: #c6c6c6;
      margin-right: 5px;
    }
    .block-selected {
      cursor: pointer;
      text-align: center;
      width: 50px;
      display: inline-block;
      padding: 5px;
      border-radius: 5px;
      margin-right: 5px;
      border: none;
      color: white;
      background-color: #6e5ac3;
      font-weight: bold;
    }
  }
`;
