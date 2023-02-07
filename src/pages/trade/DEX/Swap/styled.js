import styled from "styled-components";

export const StyledWrapper = styled.div`
  .swap-container {
    /* color: white; */
    font-size: 16px;
    width: 30%;
    padding: 20px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    margin: auto;
  }
  .title {
    width: 80%;
    color: white;
    font-weight: 600;
    font-size: 20px;
  }
  .icon {
    text-align: end;
    width: 10%;
    img {
      width: 25px;
      height: 25px;
    }
  }
  .sub-title {
    color: white;
    margin-bottom: 10px;
  }
  .icon-container {
    text-align: center;
    .circle-arrow {
      margin: 10px 0px;
      width: 30px;
      height: 30px;
    }
  }
  .scan-risk {
    margin: 10px 0px;
    display: inline-block;
    border-radius: 30px;
    color: white;
    background-color: #6e5ac3;
    padding: 3px 10px;
    span {
      font-size: 12px;
      font-weight: 600;
    }
    img {
      margin-top: -3px;
      margin-left: 5px;
      display: inline-block;
      width: 18px;
      height: 18px;
    }
  }
  .swap-button {
    background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #915fcd 7.32%,
      #ae5297 100%
    );
    border-radius: 20px;
    color: white;
    font-weight: 600;
    width: 100%;
    text-align: center;
    padding: 10px 0px;
    margin: 10px 0px;
  }

  .pair {
    margin-bottom: 5px;
    color: white;
    justify-content: space-between;
    .key {
      /* width: 35%; */
    }
    .value {
      /* text-align: end; */
      /* width: 65%; */
      font-weight: 600;
      .change-icon {
        margin-top: -3px;
        margin-left: 5px;
        display: inline-block;
        width: 20px;
        height: 20px;
      }
      .green {
        color: #61ca96;
      }
    }
  }
`;
