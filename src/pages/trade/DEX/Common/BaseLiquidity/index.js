import React from "react";
import { StyledWrapper } from "./styled";
import Settings from "../../Swap/Settings";
import useCustomState from "@hook/useCustomState";

export default function BaseLiquidity({
  title,
  content,
  callback,
  subTitle,
  buttonName,
}) {
  const [state, setState] = useCustomState({
    openSettingsModal: false,
  });
  return (
    <StyledWrapper>
      <div className="liquidity-container">
        <div className="header d-flex">
          <div className="title">{title}</div>
          <div
            className="common-icon setting"
            onClick={() => setState({ openSettingsModal: true })}
          >
            <img src={require("@assets/images/dex/setting.png")}></img>
          </div>
          <div className="common-icon clock">
            <img src={require("@assets/images/dex/Clock.png")}></img>
          </div>
        </div>
        <div className="sub-title mt-5">{subTitle}</div>
        <div className="content mt-4 mb-4">{content}</div>
        <div onClick={() => callback()} className="button-liquidity pointer">
          {buttonName}
        </div>
      </div>
      <Settings state={state} setState={setState} />
    </StyledWrapper>
  );
}
