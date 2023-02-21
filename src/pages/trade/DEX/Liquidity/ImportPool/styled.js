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
  .instruction {
    border: 1px solid #6e6e6e;
    height: 130px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  }
  .instruct-child {
    width: 100%;
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
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    border-radius: 30px;
  }

  .button-liquidity:hover {
    filter: brightness(1.2);
  }
  .test {
    position: absolute;
    top: 0;
    left: -300px;
  }
`;
