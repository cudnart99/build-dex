import styled from "styled-components";

export const FilterTimeWrapper = styled.div`
  width: 316px;
  height: 44px;
  background: #3d2575;
  backdrop-filter: blur(11px);
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .custom-picker input {
    visibility: hidden;
  }
  .datePicker {
    visibility: hidden;
    height: 0;
    padding: 0;
    width: 0;
    position: absolute;
  }
  /* gap: 5px; */
  /* padding: 0 1px 0 10px; */
  .option {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;

    /* White color */

    color: #ffffff;
    svg {
      path {
        fill: #ffffff;
      }
    }
    &__active {
      background: #291d53;
      border-radius: 5px;
    }
  }
`;
