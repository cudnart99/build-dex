import { Select } from "antd";
import React from "react";
import { StakingSelectWrapper } from "./styled";

export default function StakingSelect({ placeholder, options, width }) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <StakingSelectWrapper>
      <Select
        className="staking-select"
        style={{
          width: width,
        }}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
      />
    </StakingSelectWrapper>
  );
}
