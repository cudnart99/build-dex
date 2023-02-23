import styled from "styled-components";

export const StyledWrapper = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  .link {
    text-decoration-line: underline;
    color: #1b76ff;
  }
  .link:hover {
    filter: brightness(1.7);
  }
  .test {
    position: absolute;
    top: 0;
    left: -250px;
  }
  .liquidity-pair {
    border: 1px solid #6e6e6e;
    border-radius: 10px;
    margin-top: 28px;
    cursor: pointer;
  }
  .p-10 {
    padding: 10px;
  }
  .p-10-b-50 {
    padding: 10px 10px 50px 10px;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
  .icon-arrow {
    margin: 7px 5px 0px 10px;
    display: block;
    width: 11px;
    height: 7px;
  }
  .nest {
    margin-left: -10px;
  }
  .name-pair,
  .price {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    margin-left: 10px;
  }
  .priceInUSD {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #c6c6c6;
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
  .icon-small {
    margin-top: -3px;
    width: 15px;
    height: 15px;
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
  .instead {
    color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    cursor: not-allowed;
  }
`;
