import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import StakeAmountContainer from "@pages/trade/staking/Model/StakeAmountContainer";
import SwapInput from "../Common/SwapInput";

export default function Swap() {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  return (
    <StyledWrapper>
      <div className="swap-container">
        <div className="header d-flex">
          <div className="title">Swap</div>
          <div className="icon">
            <img src={require("@assets/images/dex/chart.png")}></img>
          </div>
          <div className="icon">
            <img src={require("@assets/images/dex/setting.png")}></img>
          </div>
        </div>
        <div className="sub-title">Trade tokens in an instant</div>
        <SwapInput />
        <div className="icon-container">
          <img
            className="circle-arrow"
            src={require("@assets/images/dex/circle-arrow.png")}
          ></img>
        </div>
        <SwapInput />
        <div className="text-right">
          <div className="scan-risk">
            <span>SCAN RISK</span>
            <img src={require("@assets/images/dex/info-icon.png")}></img>
          </div>
        </div>
        <div className="d-flex pair">
          <div className="key">Price</div>
          <div className="value">
            <span>0.0127574 BNB per CAKE</span>
            <img
              className="change-icon"
              src={require("@assets/images/dex/change-icon.png")}
            ></img>
          </div>
        </div>

        <div className="d-flex pair">
          <div className="key">Slippage Tolerance</div>
          <div className="value">
            <span className="green">0.5%</span>
          </div>
        </div>

        <div className="swap-button">Insufficient IVI balance</div>

        <div className="d-flex pair">
          <div className="key">Minimum received</div>
          <div className="value">
            <span>77.99 CAKE</span>
          </div>
        </div>

        <div className="d-flex pair">
          <div className="key">Price Impact</div>
          <div className="value">
            <span className="green">{"<"}0.01%</span>
          </div>
        </div>

        <div className="d-flex pair">
          <div className="key">Liquidity Provider</div>
          <div className="value">
            <span>0.0025 BNB</span>
          </div>
        </div>

        <div className="d-flex pair">
          <div className="key">Fee Route</div>
          <div className="value">
            <span>BNB {"<"} CAKE</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}
