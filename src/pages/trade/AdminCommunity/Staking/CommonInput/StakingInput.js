import { Input } from "antd";
import React from "react";
import { StakingInputWrapper } from "./styled";

export default function StakingInput({ placeholder }) {
  return (
    <StakingInputWrapper>
      <Input placeholder={placeholder} />
    </StakingInputWrapper>
  );
}
