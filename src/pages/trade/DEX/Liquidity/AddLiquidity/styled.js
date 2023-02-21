import styled from "styled-components";

export const StyledWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  .instruction {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
  .plus {
    /* width: 5%; */
    padding-top: 20px;
  }
  .pair {
    width: 45%;
  }
  .reward {
    padding-bottom:10px;
    border-bottom: 0.5px solid #c6c6c6;
  }
`;
export const AddLiquidityWrapper = styled.div`
  margin: 0px 5%;
  display: flex;
  justify-content: space-between;
  .left-part {
    width: 45%;
  }
`;
