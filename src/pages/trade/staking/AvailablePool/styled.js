import styled, { css } from "styled-components";

export const TableStakingWrapper = styled.div`
  .header {
    color: white;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .content {
    background: rgba(43, 43, 43, 0.5);
    border-radius: 10px;
    padding: 10px 0px;
    margin-bottom: 20px;
    .token-name {
      color: white;
      .name-coin {
        font-family: "Bai Jamjuree";
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 25px;
      }
      .img {
        margin-right: 10px;
        img {
          margin: 7px 0px 7px 3px;
        }
      }
      .img-ivi {
        margin-right: 10px;
        img {
          margin: 2px 0px;
        }
      }
      display: flex;
    }
    .remaining {
      justify-content: space-between;
      display: flex;
      .bar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* padding-top: 15px; */
        width: 50%;
        .container {
          width: 100%;
          background-color: rgba(35, 24, 47, 0.4);
          border-radius: 15px;
        }
      }
      .value {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: white;
      }
    }
    .stake-time {
      .active {
        background: #6e5ac3;
        border: none;
      }
      .none-active {
        border: 1px solid #ffffff;
      }
      .time-block {
        cursor: pointer;
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 5px;
        margin: 4px 7px;
        padding: 4px 10px;
        display: inline-block;
        color: white;
        .type {
          text-align: center;
        }
        .apr {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          color: #c6c6c6;
        }
      }
    }
    .est-apr {
      display: flex;
      .apr-value {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 20%;
        font-family: "Bai Jamjuree";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #61ca96;
      }
      .button-stake {
        width: 90%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: end;
        margin-right: 30px;
        button {
          max-width: 100px;
          background: radial-gradient(
            96.92% 1534.99% at 95.38% 91.84%,
            #915fcd 7.32%,
            #ae5297 100%
          );
          border-radius: 20px;
          color: white;
          border: none;
        }
        button:hover {
          color: white;
          border: none;
          filter: brightness(1.2);
        }
      }
    }
  }
`;

export const SlideWrapper = styled.div`
  width: ${(props) => props.width}%;
  ${(props) => {
    switch (props.nameCoin) {
      case process.env.REACT_APP_STABLE_TOKEN_SYMBOL:
        return css`
          background: linear-gradient(
            90deg,
            rgba(0, 222, 139, 0) 0%,
            #079761 101.28%
          );
        `;

      case "BNB":
        return css`
          background: linear-gradient(
            90deg,
            rgba(243, 186, 47, 0) 0%,
            #f3ba2f 101.28%
          );
        `;
    }
  }}
  border-radius: 15px;
  text-align: end;
  position: relative;
  .tooltip {
    color: white;
    position: absolute;
    top: -19px;
    right: -7px;
    font-size: 12px;
  }
  .ivi-icon {
    width: 20px;
    height: 20px;
    transform: scale(1.4);
    margin-bottom: 1px;
  }
  .bnb-icon {
    width: 20px;
    height: 20px;
    transform: scale(1.05);
    margin-bottom: 1px;
  }
`;
