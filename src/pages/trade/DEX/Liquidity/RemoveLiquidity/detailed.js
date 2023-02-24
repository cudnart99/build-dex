import React from "react";
import { DetailedWrapper } from "./styled";
import LiquidityInput from "../LiquidityCommon/LiquidityInput";

export default function Detailed({ state, setState }) {
  return (
    <DetailedWrapper>
      <LiquidityInput state={state} setState={setState} type={"sp"} />
      <div className="text-center">
        <img className="icon" src={require("@images/dex/Arrow-down.png")} />
      </div>
      <LiquidityInput
        state={state}
        setState={setState}
        type={1}
        checkbox={true}
      />
      <div className="text-center plus">+</div>
      <LiquidityInput
        state={state}
        setState={setState}
        type={2}
        checkbox={true}
      />
      <div className="part-container">
        <div className="title-part mb-2">PRICE</div>
        <div className="content-part">
          <div className="mb-4">
            <img className="icon" src={state.selectedImgToken1}></img>
            <span>{state.selectedNameToken1}&nbsp;&nbsp;&nbsp;&nbsp;=</span>
            <span className="value">
              {state.priceToken1} {state.selectedNameToken2}
            </span>
          </div>
          <div>
            <img className="icon" src={state.selectedImgToken2}></img>
            <span>{state.selectedNameToken2}&nbsp;&nbsp;&nbsp;&nbsp;=</span>
            <span className="value">
              {state.priceToken2} {state.selectedNameToken1}
            </span>
          </div>
        </div>
      </div>
    </DetailedWrapper>
  );
}
