import styled from "styled-components";

export const StyledWrapper = styled.div`
  .liquidity-container {
    color: #ffffff;
    font-weight: 500;
    font-size: 14px;
    width: 500px;
    background: linear-gradient(
      111.68deg,
      rgba(49, 56, 94, 0.29) 7.59%,
      rgba(2, 9, 45, 0.39) 102.04%
    );
    backdrop-filter: blur(11px);
    border-radius: 20px;
    height: 500px;
    margin: auto;
    padding: 20px;
    .header {
      .title {
        width: 80%;
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #ffffff;
      }
      .clock {
        width: 10%;
        text-align: end;
        img {
          width: 21px;
          height: 18px;
        }
      }
      .setting {
        width: 10%;
        text-align: end;
      }
    }
  }
  .button-liquidity {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    width: 90%;
    height: 50px;
    margin: auto;
    text-align: center;
    background: radial-gradient(
        96.92% 1534.99% at 95.38% 91.84%,
        #915fcd 7.32%,
        #ae5297 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    border-radius: 20px;
  }

  .button-liquidity:hover {
    filter: brightness(1.2);
  }
`;
