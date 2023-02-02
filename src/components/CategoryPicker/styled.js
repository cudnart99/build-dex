import styled from "styled-components";

export const CategoryPickerWrapper = styled.div`
  .show {
    text-decoration: underline;
    color: #c6c6c6;
    cursor: pointer;
  }
  .content {
    .group {
      margin-bottom: 10px;
      &&__text {
        &&--white {
          color: white;
          font-size: 14px;
        }
      }
    }
    .ant-checkbox-input:focus + .ant-checkbox-inner,
    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner {
      border-color: white;
    }
    .ant-checkbox-wrapper {
      margin-right: 2px;
    }
    .ant-checkbox-inner {
      background: transparent;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background: white;
      border-color: white;
    }
    .ant-checkbox-checked .ant-checkbox-inner:after {
      border-color: #9b5fcc !important;
    }
  }
`;
