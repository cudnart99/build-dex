import styled, { createGlobalStyle } from "styled-components";

export const TradeSelectStyled = styled.div`
  position: relative;
  padding: 1px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid white;
  border-radius: 20px;
  background-color: transparent;
  width: 100%;
  .select-prefix {
    position: absolute;
    left: 8px;
    display: flex;
    align-items: center;
    color: white;
    svg {
      circle,
      path {
        stroke: white;
      }
    }
    .custom-css-icon {
      width: 20px;
      height: 20px;
      circle,
      path {
        stroke-width: 0.01;
      }
    }
    span {
      margin-left: 4px;
    }
  }
  .ant-select-selector {
    background-color: transparent !important;
    border: none !important;
    &:focus {
      outline: none;
    }
    .ant-select-selection-item {
      color: white;
      position: absolute;
      left: 90px;
      @media screen and (max-width: 576px) {
        left: 75px;
    }
    }
  }
  .ant-select-arrow {
    color: white;
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .ant-select {
    width: 100%;
  }
`;

export const SelectGroupStyle = createGlobalStyle`
  .ant-select-item-group{
    font-family: 'Bai Jamjuree';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height, or 138% */
      
      
    /* Black color */
      
    color: #2B2B2B;
  }
`;
