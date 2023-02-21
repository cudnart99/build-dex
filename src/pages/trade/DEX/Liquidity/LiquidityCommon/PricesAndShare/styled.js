import styled from "styled-components";

export const StyledWrapper = styled.div`
  width: 50%;
  .container {
    width: 100%;
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    background: linear-gradient(
      111.68deg,
      rgba(49, 56, 94, 0.29) 7.59%,
      rgba(2, 9, 45, 0.39) 102.04%
    );
    backdrop-filter: blur(11px);
    border-radius: 20px;
    /* margin: auto; */
    padding: 20px;
    /* height: 200px; */
    .top-container {
      border: 1px solid #6e6e6e;
      border-collapse: collapse;
      border-radius: 20px;
      .title {
        margin: 15px 20px;
      }
      .top-content {
        font-weight: 700;
        border: 1px solid #6e6e6e;
        border-radius: 20px;
        padding: 15px 10px;
        justify-content: space-around;
      }
    }
    .slip {
      padding-bottom: 10px;
      border-bottom: 1px solid #6e6e6e;
    }
    .enable-container {
      justify-content: space-between;
      .button {
        margin: 10px;
      }
    }
    .supply {
      width: calc(100% - 20px);
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  .sub-text {
    padding: 0px 40px;
    .icon {
      margin-right: 10px;
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    color: #c6c6c6;
  }
`;
