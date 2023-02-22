import styled from "styled-components";

export const StyledWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;

  .slip {
    padding-bottom: 10px;
    border-bottom: 0.5px solid #c6c6c6;
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
