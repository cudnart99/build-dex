import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";

export default function LPInWallet({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  const [visible, setVisible] = useState(false);
  return (
    <StyledWrapper>
      <div className="title">LP tokens in your wallet</div>
      <div className="row">
        <div className="img-container">
          <img className="icon" src={require("@images/dex/IVI_icon.png")}></img>
          <img
            className="icon nest"
            src={require("@images/dex/IHI_icon.png")}
          ></img>
          <span className="key2">IVI - IHI LP</span>
        </div>
        <div className="value">0.0234</div>
      </div>
      <div className="row">
        <div className="key">LP reward APR</div>
        <div className="value">6.66%</div>
      </div>
      <div className="row">
        <div className="key">
          Share in Trading Pair{" "}
          <span className="icon-container">
            <img
              onMouseOut={() => setVisible(false)}
              onMouseEnter={() => setVisible(true)}
              className="icon-small"
              src={require("@images/dex/i-icon.png")}
            ></img>
            {visible && (
              <div className="tooltip">
                Based on last 7 days' performance. Does not account for
                impermanent loss
              </div>
            )}
          </span>
        </div>
        <div className="value">100%</div>
      </div>
      <div className="row">
        <div className="key">Pooled IVI</div>
        <div className="value">0.245</div>
      </div>
      <div className="row">
        <div className="key">Pooled IHI</div>
        <div className="value">0.2468</div>
      </div>
    </StyledWrapper>
  );
}
