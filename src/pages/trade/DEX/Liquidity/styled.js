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
  .button-liquidity {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    width: 70%;
    height: 50px;
    margin: auto;
    text-align: center;
    background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #915fcd 7.32%,
      #ae5297 100%
    );
    border-radius: 30px;
  }

  .button-liquidity:hover {
    filter: brightness(1.2);
  }
  .button-liquidity-inactive {
    /* cursor: not-allow; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    width: 70%;
    height: 50px;
    margin: auto;
    text-align: center;
    background: #9b5fcc;
    opacity: 0.2;
    border-radius: 30px;
  }
`;
