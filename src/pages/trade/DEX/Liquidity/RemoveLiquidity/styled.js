import styled from "styled-components";

export const StyledWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  .changeText {
    text-decoration-line: underline;
    color: #1b76ff;
  }
  .slip {
    padding-bottom: 10px;
    border-bottom: 0.5px solid #c6c6c6;
  }
  .enable-container {
    justify-content: space-between;
    .mr-2 {
      margin-right: 8px;
    }
    .ml-2 {
      margin-left: 8px;
    }
  }
`;
export const RemoveLiquidityWrapper = styled.div`
  margin: 0px 5%;
  display: flex;
  justify-content: space-between;
  .left-part {
    width: 45%;
  }
`;

export const DetailedWrapper = styled.div`
  .icon {
    width: 17px;
    height: 21px;
  }
  .plus {
    margin: 15px;
    font-size: 20px;
    font-weight: 700;
  }
  .part-container {
    padding: 10px;
    /* width: 50%; */
    .title-part {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
    .content-part {
      border: 1px solid #6e6e6e;
      border-radius: 10px;
      padding: 10px;
      span {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
      }
      .icon {
        display: inline-block;
        margin-right: 8px;
        margin-top: -5px;
        width: 25px;
        height: 25px;
      }
      .value {
        display: inline-block;
        float: right;
      }
    }
  }
`;

export const SimpleWrapper = styled.div`
  .slider-container {
    background: #ffffff;
    border-radius: 20px;
    padding: 20px;
    margin-top: 20px;
    .value-slider {
      margin-left: 5px;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      color: #000000;
    }
    .ant-slider-track {
      background-color: #6e5ac3;
    }
    .ant-slider-handle {
      top: 1px;
      width: 20px;
      height: 20px;
      border: 2px solid #372291;
      background-color: #6e5ac3;
    }
    .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
      border-color: #372291;
    }
  }
  .mid-container {
    .part-container {
      padding: 10px;
      width: 50%;
      .title-part {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
      }
      .content-part {
        border: 1px solid #6e6e6e;
        border-radius: 10px;
        padding: 10px;
        span {
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
        }
        .icon {
          display: inline-block;
          margin-right: 8px;
          margin-top: -5px;
          width: 25px;
          height: 25px;
        }
        .value {
          display: inline-block;
          float: right;
        }
      }
    }
  }
  .checkbox {
    display: inline-block;
    border-radius: 20px;
    border: 1px solid #6e6e6e;
    border-radius: 5px;
    width: 20px;
    height: 20px;
    margin: 0px 8px -4px 5px;
  }
  .checkbox-check {
    display: inline-block;
    border-radius: 20px;
    background: #6e5ac3;
    border-radius: 5px;
    width: 20px;
    height: 20px;
    margin-top: 5px;
    margin: 0px 8px -4px 5px;
    img {
      display: inline-block;
      margin-left: 2px;
      width: 15px;
      height: 11px;
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
