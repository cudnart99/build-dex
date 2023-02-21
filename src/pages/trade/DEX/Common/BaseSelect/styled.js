import styled from "styled-components";

export const StyledWrapper = styled.div`
  .container {
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #f4f4f4;
    height: 45px;
    position: relative;
  }
  .icon {
    margin: 10px;
  }
  .text {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #2b2b2b;
    margin: 13.5px 0px;
  }
  .icon-down-arrow {
    width: 13.5px;
    height: 7px;
    position: absolute;
    top: 20px;
    right: 10px;
  }
  .gray-text {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    padding: 12px 10px;
    color: gray;
  }
`;
