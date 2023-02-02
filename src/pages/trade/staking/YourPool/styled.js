import styled from "styled-components";

export const YourPoolWrapper = styled.div`
  .header {
    text-align: center;
    color: white;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .content {
    background: rgba(43, 43, 43, 0.5);
    border-radius: 10px;
    padding: 10px 0px;
    margin-bottom: 20px;
    .index {
      color: white;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .token-name {
      color: white;
      display: flex;
      .name-coin {
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-family: "Bai Jamjuree";
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 25px;
      }
      .img {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-right: 10px;
        img {
          margin: 7px 0px 7px 4px;
        }
      }
      .img-ivi {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-right: 10px;
      }
    }
    .apr {
      display: flex;
      justify-content: center;
      flex-direction: column;
      .apr-value {
        text-align: center;
        font-family: "Bai Jamjuree";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #61ca96;
      }
    }
    .stake-time {
      display: flex;
      justify-content: center;
      flex-direction: column;
      .text {
        text-align: center;
        font-family: "Bai Jamjuree";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: white;
      }
    }
    .stake-date {
      display: flex;
      justify-content: center;
      flex-direction: column;
      color: white;
      .time {
        text-align: center;
      }
    }
    .coin {
      color: white;
      display: flex;
      justify-content: center;
      .icon-coin {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
      .balance {
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-family: "Bai Jamjuree";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        margin-left: 5px;
      }
    }
    .reward {
      display: flex;
      justify-content: space-between;
      .coin {
        width: 30%;
      }
      .button-stake {
        width: 70%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: end;
        margin-right: 10px;
        button {
          width: 90px;
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
        .disabled {
          opacity: 0.4;
          background: rgba(155, 95, 204, 0.3);
          cursor: not-allowed;
        }
      }
    }
  }
`;
