import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";

export default function PricesAndShare({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  return (
    <StyledWrapper>
      <div className="container">
        <div className="top-container">
          <div className="title">Price and Share</div>
          <div className="top-content d-flex">
            <div>
              <div className="text-center mb-2">0.248443</div>
              <div className="text-center">IVI per IHI</div>
            </div>
            <div>
              <div className="text-center mb-2">0.248443</div>
              <div className="text-center">IHI per IVI</div>
            </div>
            <div>
              <div className="text-center mb-2">0%</div>
              <div className="text-center">Share in Trading Pair</div>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-4 d-flex justify-content-space-between slip">
          <div lassName="fw-400">Slippage Tolerance</div>
          <div className="fs-18 fw-700">0.5%</div>
        </div>
        <div className="enable-container d-flex">
          <div className="button-liquidity-inactive button pointer">
            Enable IVI
          </div>
          <div className="button-liquidity-inactive button pointer">
            Enable IHI
          </div>
        </div>
        <div className="button-liquidity supply">Supply</div>
      </div>
      <div className="sub-text mt-5">
        <img className="icon" src={require("@images/dex/coin-icon.png")} />
        <span>
          By adding liquidity you'll earn 0.2% of all trades on this pair
          proportional to your share in the trading pair. Fees are added to the
          pair, accrue in real time and can be claimed by withdrawing your
          liquidity.
        </span>
      </div>
    </StyledWrapper>
  );
}
