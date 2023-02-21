import styled from "styled-components";

export const StyledWrapper = styled.div`
  .liquidity-container {
    color: #ffffff;
    font-weight: 500;
    font-size: 14px;
    width: ${(props) => props?.width};
    background: linear-gradient(
      111.68deg,
      rgba(49, 56, 94, 0.29) 7.59%,
      rgba(2, 9, 45, 0.39) 102.04%
    );
    backdrop-filter: blur(11px);
    border-radius: 20px;
    margin: auto;
    padding: 20px;
    line-height: 18px;
    .header {
      justify-content: space-between;
      .title {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #ffffff;
      }
      .clock {
        width: 30px;
        text-align: end;
        img {
          width: 21px;
          height: 18px;
        }
      }
      .setting {
        margin-top: -2px;
        width: 30px;
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
    width: ${(props) => (props?.fullSizeButton ? "100%" : "70%")};
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
`;
