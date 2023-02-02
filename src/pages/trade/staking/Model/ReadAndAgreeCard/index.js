import React, { useEffect } from "react";
import { ReadAndAgreeCardWrapper } from "./styled";
import useCustomState from "@hook/useCustomState";
import { Checkbox } from "antd";
import { useState } from "react";

export default function ReadAndAgreeCard({
  checkNeeded,
  setCheckRequired,
  // checked,
  // setChecked,
}) {
  // useEffect(() => {
  //   setCheckRequired(checked);
  // }, []);
  const onChange = (e) => {
    // setChecked(!checked);
    console.log(`checked = ${e.target.checked}`);
    setCheckRequired(e.target.checked);
  };
  return (
    <ReadAndAgreeCardWrapper>
      {/* {checkNeeded && (
        <div className="sub-text">
          <img src={require("@images/warning-icon.png")} />
          <span>Please check the Summary before you confirm.</span>
        </div>
      )} */}
      <Checkbox onChange={onChange}>
        Please check the Summary before you confirm.
      </Checkbox>
    </ReadAndAgreeCardWrapper>
  );
}
