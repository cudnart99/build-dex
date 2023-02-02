import React, { useState } from "react";
import { StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";

export default function Welcome() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  return (
    <StyledWrapper>
      <div className="d-flex row-content">
        <div className="content">
          <div className="small-text">Happiness and health makes up IVIRSE</div>
          <LinearText
            title={"TRADE, EARN"}
            className="big-text"
            fontSize={screenWidth > 576 ? "40px" : "30px"}
            lineHeight="45px"
            margin="0px"
          />
          <LinearText
            title={"AND WIN CRYPTO"}
            className="big-text"
            fontSize={screenWidth > 576 ? "40px" : "30px"}
            lineHeight="45px"
          />
          <div className="small-text">
            on the most convenient decentralized platform in the Milky Way
          </div>
        </div>
        <div className="img-side">
          <img src={require(`@images/dex/dex-welcome-1.png`)} alt="" />
        </div>
      </div>
    </StyledWrapper>
  );
}
