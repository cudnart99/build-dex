import styled from "styled-components";
export const StakeModalWrapper = styled.div`
  font-family: "Bai Jamjuree";
  font-style: normal;
  display: flex;
  .left-path {
    width: 50%;
    padding: 0px 20px 0px 0px;
    border-right: 1px solid #c6c6c6;
    .note {
      /* display: flex; */
      .icon-info {
        margin: 0px 5px;
        position: relative;
        .upper-text {
          visibility: hidden;
          padding: 2px 8px;
          position: absolute;
          top: -5px;
          left: 23px;
          width: 258px;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          background: #f2efff;
          border-radius: 5px;
        }
      }
      .icon-info:hover .upper-text {
        visibility: visible;
      }
    }
    .stake-time-container {
      margin-top: 12px;
      .active {
        /* background: #6e5ac3; */
        background-color: ${(props) =>
          props.current == 1 ? "gray" : "#6e5ac3"};
        border: none;
        color: white;
      }
      .non-active {
        border: 1px solid #c6c6c6;
        .type {
          color: black;
        }
        .apr {
          color: #6e6e6e;
        }
      }
      .select-button {
        cursor: pointer;
        text-align: center;
        padding: 6px 0px;
        border-radius: 5px;
        margin: 0px;
        .type {
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
        }
      }
    }
    .pool-remain {
      margin-top: 10px;
    }
    .red {
      color: red;
    }
  }
  .right-path {
    width: 50%;
    padding: 0px 0px 0px 20px;
  }
`;

export const FooterStakeWrapper = styled.div`
  display: inline-block;
  width: 50%;
  .container {
    float: right;
  }
  .approve-button {
    float: left;
  }
  .stake-button {
  }
  margin-bottom: 10px;
  .ant-btn[disabled],
  .ant-btn[disabled]:active,
  .ant-btn[disabled]:focus,
  .ant-btn[disabled]:hover {
    color: white;
    border: none;
    background: gray;
    text-shadow: none;
    box-shadow: none;
    opacity: 0.3;
    width: 20%;
  }
  .button-footer {
    margin-top: 20px;
    width: 20%;
    background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #915fcd 7.32%,
      #ae5297 100%
    );
    border-radius: 20px;
    color: white;
  }
  .button-footer:hover {
    color: white;
    border: none;
    filter: brightness(1.2);
  }
`;
