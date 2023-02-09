import styled from "styled-components";

export const StyledWrapper = styled.div`
  .container {
    margin: 0px 3%;
    justify-content: space-between;
  }
  .chart {
    width: 65%;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    /* height: 400px; */
    display: inline;
    color: white;
    padding: 15px 20px;
    .header {
      .coin {
        img {
          height: 30px;
          width: auto;
          margin-top: -5px;
        }
        .arrow-2 {
          height: 25px;
          width: auto;
          /* margin-top: -5px; */
        }
        span {
          margin: 0 10px;
          display: inline-block;
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
        }
      }
      .select-date {
        .selected {
          font-weight: 700;
          text-decoration: underline;
        }
        span {
          display: inline-block;
          margin-left: 20px;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
        }
      }
    }
    .price {
      margin-top: 7px;
      span {
        display: inline-block;
        margin-right: 10px;
      }
      .coin-price {
        font-weight: 700;
        font-size: 30px;
        line-height: 22px;
      }
      .name-pair-coin {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
      }
      .rate {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #0c9664;
      }
    }
  }
  .swap-container {
    font-size: 16px;
    width: 30%;
    padding: 20px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    margin: auto;

    .title {
      width: 80%;
      color: white;
      font-weight: 600;
      font-size: 20px;
    }
    .icon {
      cursor: pointer;
      text-align: end;
      width: 10%;
      img {
        width: 25px;
        height: 25px;
      }
    }
    .noChart {
      img {
        width: 25px;
        height: 32px;
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
    .swap-button:hover {
      filter: brightness(1.2);
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
  }
`;
