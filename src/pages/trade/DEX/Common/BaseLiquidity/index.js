import React from "react";
import { StyledWrapper } from "./styled";
import Settings from "../../Swap/Settings";
import useCustomState from "@hook/useCustomState";

export default function BaseLiquidity({
  width,
  title,
  content,
  callbackButton,
  subTitle,
  buttonName,
  callbackArrow,
  allowButton = true,
  arrowBack = false,
  fullSizeButton = false,
}) {
  const [state, setState] = useCustomState({
    openSettingsModal: false,
  });
  return (
    <StyledWrapper width={width} fullSizeButton={fullSizeButton}>
      <div className="liquidity-container">
        <div className="header d-flex">
          <div className="d-flex">
            {arrowBack && (
              <div
                onClick={() => callbackArrow()}
                className="arrow-back common-icon mr-3"
              >
                <img src={require("@images/dex/arrow-back-icon.png")} />
              </div>
            )}
            <div className="title">{title}</div>
          </div>

          <div className="d-flex">
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
        </div>
        <div className="sub-title mt-5">{subTitle}</div>
        <div className="content mt-4 mb-4">{content}</div>
        {allowButton && (
          <div
            onClick={() => callbackButton()}
            className="button-liquidity pointer"
          >
            {buttonName}
          </div>
        )}
      </div>
      <Settings state={state} setState={setState} />
    </StyledWrapper>
  );
}
