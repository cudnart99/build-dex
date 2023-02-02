import styled from "styled-components";

export const TagWrapper = styled.div`
  padding: 4px 10px;
  background: ${(props) => props?.color};
  display: inline-block;
  border-radius: 10px;
`;
export const NameTokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;
export const ActionWrapper = styled.div`
  display: flex;
`;
export const ButtonWrapper = styled.div`
  position: relative;
  .triangle {
    width: 0px;
    height: 0px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 10px solid white;
  }
  .add-icon {
    width: 20px;
    height: 20px;
  }
  .selector {
    width: 100%;
    z-index: 1000;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    position: absolute;
    top: 48px;
    left: 0;
    .select-part {
      display: flex;
      padding: 10px;
      cursor: pointer;
      .proposal-icon {
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }
      .select-text {
        font-weight: 400;
        font-size: 14px;
      }
    }
    .select-part:hover {
      background-color: #f5f5f5;
      border-radius: 10px;
    }
  }
`;
