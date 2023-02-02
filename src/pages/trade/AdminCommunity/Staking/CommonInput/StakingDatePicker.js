import { DatePicker } from "antd";
import React from "react";
import { StakingDatePickerWrapper } from "./styled";

export default function StakingDatePicker() {
  return (
    <StakingDatePickerWrapper>
      <DatePicker style={{ width: "100%" }} />
    </StakingDatePickerWrapper>
  );
}
