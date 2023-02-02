import { DatePicker } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const DatePickerWrapper = styled(DatePicker.RangePicker)`
  position: relative;
  padding: 1px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid white;
  border-radius: 20px;
  background-color: transparent;
  width: 100%;
  height: 100%;
  .ant-picker-input > input::placeholder {
    color: white;
  }

  .ant-picker-input > input {
    color: white;
  }
  .ant-picker-suffix {
    position: absolute;
    right: 30px;
    @media screen and (max-width: 576px) {
      right: 10px;
    }
  }
  .ant-picker-clear {
    background-color: transparent;
    color: white;
  }
  .ant-picker-range-separator {
    svg {
      fill: white;
    }
  }
`;
export const GlobalStyle = createGlobalStyle`
  .ant-picker-panel-container .ant-picker-panels {
    @media screen and (max-width: 576px) {
      flex-direction: column;
    }
  }
  .ant-picker-cell-inner {
  }
  .ant-picker-month-btn, .ant-picker-year-btn {
    font-family: 'Bai Jamjuree' !important;
    font-style: normal !important;
    font-weight: 700 !important;
    font-size: 14px !important;
    line-height: 18px !important;
/* identical to box height */

    text-align: center !important;

/* Black color */

    color: #2B2B2B !important;

  }
  .ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single):before, .ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single):before{
    background: #6E5AC3 !important;
  
  }
  .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
    color: #fff;
    background: #6E5AC3;
    border: none !important;
    padding: 0px !important;
    border-radius: 10px;

  }
  .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner:before {
   border: none;
  }

  .ant-picker-cell.ant-picker-cell-in-view.ant-picker-cell-in-range::before {
      background: #D0C8F3 !important;
    }
  
`;
