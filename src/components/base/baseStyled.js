import { Checkbox, Radio } from "antd";
import styled from "styled-components";
export const globalColor = "#9b5fcc";
export const TransparentCheckBox = styled(Checkbox)`
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: white;
  }
  .ant-checkbox-wrapper {
    margin-right: 2px;
  }
  .ant-checkbox-inner {
    background: transparent;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background: white;
    border-color: white;
  }
  .ant-checkbox-checked .ant-checkbox-inner:after {
    border-color: ${globalColor} !important;
  }
`;
export const TransparentRadioGroup = styled(Radio.Group)`
  .ant-radio-checked .ant-radio-inner {
    border-color: ${globalColor} !important;
  }

  .ant-radio-checked .ant-radio-inner:after {
    background-color: ${globalColor};
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: ${globalColor};
  }
`;
