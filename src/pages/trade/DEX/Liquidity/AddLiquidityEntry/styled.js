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
    padding-bottom: 10px;
    border-bottom: 0.5px solid #c6c6c6;
  }
`;
export const AddLiquidityEntryWrapper = styled.div`
  margin: 0px 5%;
  display: flex;
  justify-content: space-between;
  .left-part {
    margin: auto;
    width: 45%;
  }
  .main-part {
    margin: auto;
    width: 30%;
  }
  .test {
    position: absolute;
    bottom: -50px;
    left: 0;
  }
`;

export const SubTextBoxWrapper = styled.div`
  margin-top: 20px;
  color: white;
  background: linear-gradient(
    111.68deg,
    rgba(49, 56, 94, 0.29) 7.59%,
    rgba(2, 9, 45, 0.39) 102.04%
  );
  backdrop-filter: blur(11px);
  border-radius: 20px;
  /* margin: auto; */
  padding: 20px;
  .icon {
    display: inline-block;
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;
