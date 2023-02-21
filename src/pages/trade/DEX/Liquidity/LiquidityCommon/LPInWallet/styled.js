import styled from "styled-components";

export const StyledWrapper = styled.div`
  width: 50%;
  color: #ffffff;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  background: linear-gradient(
    111.68deg,
    rgba(49, 56, 94, 0.29) 7.59%,
    rgba(2, 9, 45, 0.39) 102.04%
  );
  backdrop-filter: blur(11px);
  border-radius: 20px;
  padding: 20px 30px;
  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 22px;
  }
  .key {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
  .value {
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
  .icon-small {
    margin-top: -3px;
    width: 15px;
    height: 15px;
  }
  .nest {
    margin-left: -10px;
  }
  .key2 {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    display: inline-block;
    margin-left: 10px;
  }
  .icon-container {
    position: relative;
    .tooltip {
      position: absolute;
      top: -42px;
      left: 15px;
      width: 300px;
      color: black;
      background: #faf9ff;
      border-radius: 5px;
      padding: 2px 8px;
    }
  }
`;
