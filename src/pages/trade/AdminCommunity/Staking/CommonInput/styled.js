import styled from "styled-components";

export const StakingInputWrapper = styled.div`
  .ant-input {
    border-radius: 20px;
  }
  .ant-input:hover {
    border-color: #6e6e6e;
  }
  .ant-input-focused,
  .ant-input:focus {
    border-color: #6e5ac3;
  }
`;
export const StakingSelectWrapper = styled.div`
  .staking-select {
    .ant-select-selector {
      border-radius: 20px;
    }
    .ant-select-selector:hover {
      border-color: #6e6e6e;
    }
  }
  .ant-select-focused {
    .ant-select-selector {
      border-color: #d9d9d9 !important;
      box-shadow: none !important;
    }
    .ant-select-selector:hover {
      border-color: #6e6e6e !important;
      box-shadow: none !important;
    }
  }
  .ant-select-open {
    .ant-select-selector {
      border-color: #6e5ac3 !important;
      box-shadow: none !important;
    }
  }
`;
export const StakingDatePickerWrapper = styled.div`
  .ant-picker {
    border-radius: 20px;
  }
  .ant-picker:hover {
    border-color: #6e6e6e;
  }
  .ant-picker-focused {
    border-color: #6e5ac3 !important;
    box-shadow: none !important;
  }
`;
