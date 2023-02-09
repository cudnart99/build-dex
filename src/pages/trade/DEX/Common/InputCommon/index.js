import { Input } from "antd";
import React from "react";
import { InputCommonWrapper } from "./styled";

export default function InputCommon({ placeholder, callback }) {
  return (
    <InputCommonWrapper>
      <div className="asset-input">
        <Input
          className=""
          onChange={(e) => {
            console.log(e.target.value);
            callback(e.target.value);
          }}
          placeholder={placeholder}
        />
      </div>
    </InputCommonWrapper>
  );
}
