import styled from "styled-components";

export const StakeAmountContainerWrapper = styled.div`
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
    padding: 12px;
    margin-top: 18px;
    background: rgba(161, 225, 202, 0.2);
    border-radius: 10px;
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 10px;
    }

    .input-container {
      border: 1px solid #9747ff;
      border-radius: 20px;
      padding: 7px;
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
        .info-container {
          width: 60%;
          display: flex;
          justify-content: space-between;
          border-right: 1px solid #c6c6c6;
          .icon-container {
            padding: 1px;
            background: #f4f4f4;
            border-radius: 20px;
            width: 30%;

            img {
              text-align: center;
              display: inline-block;
              padding: 4px 7px;
            }
            .text {
              padding: 3px 0px;
              font-weight: 500;
              font-size: 16px;
              line-height: 20px;
            }
          }
          .max {
            cursor: pointer;
            background: ${(props) =>
              props.current == 1 ? "gray" : "rgba(161, 225, 202, 0.2)"};
            /* background: rgba(161, 225, 202, 0.2); */
            border-radius: 5px;
            width: 20%;
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            color: #61ca96;
            color: ${(props) => (props.current == 1 ? "white" : "#61ca96")};
            text-align: center;
            padding: 5px 0px;
            margin-right: 6px;
          }
        }
        .balance {
          padding: 6px 0px;
          text-align: center;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          width: 40%;
        }
      }
    }
  }
`;
