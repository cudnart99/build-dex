import styled from "styled-components";

export const StyledWrapper = styled.div`
  .transaction-container {
    max-height: 200px;
    overflow: scroll;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .transaction-item {
      margin: 10px 0px;
      .icon {
        display: inline-block;
        margin-top: -3px;
        margin-right: 8px;
        width: 20px;
        height: 20px;
      }
      span {
        cursor: pointer;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #1b76ff;
      }
    }
  }
`;
