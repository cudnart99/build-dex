import styled from "styled-components";

export const SummaryWrapper = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  .ant-steps-vertical.ant-steps-dot
    .ant-steps-item
    > .ant-steps-item-container
    > .ant-steps-item-tail {
    top: -2px;
    left: -8.2px;
  }
  .ant-steps-vertical > .ant-steps-item .ant-steps-item-content {
    min-height: 37px;
  }
  .ant-steps-vertical
    > .ant-steps-item
    > .ant-steps-item-container
    > .ant-steps-item-tail {
    height: 154%;
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #61ca96;
  }
  .ant-steps-item-finish
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot,
  .ant-steps-item-process
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot,
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail:after {
    background: #61ca96;
  }
  .ant-steps-item-title {
    width: 100%;
  }
  .ant-steps.ant-steps-vertical.ant-steps-dot {
    padding-left: 2px;
  }
  .process-container {
    margin-top: 10px;
    max-height: 150px;
    overflow: scroll;
  }
  .process-container::-webkit-scrollbar {
    display: none;
  }
  .title-container {
    padding-top: 7px;
    width: 100%;
    display: flex;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    .name-process {
      width: 70%;
    }
    .claim-ivi {
      text-align: end;
      width: 30%;
    }
  }
  .main-title-container {
    justify-content: space-between;
    .title {
      width: 50%;
    }
    .button-change-container {
      width: 20%;
      span {
        cursor: pointer;
      }
      .list-icon {
        width: 30px;
        height: 25px;
      }
      .graph-icon {
        width: 30px;
        height: 30px;
      }
    }
  }
`;
