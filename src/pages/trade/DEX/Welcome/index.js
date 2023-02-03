import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";

export default function Welcome() {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  return (
    <StyledWrapper>
      <div className="row-content">
        <div className="content">
          <div className="small-text">Happiness and health makes up IVIRSE</div>
          <LinearText
            title={"TRADE, EARN"}
            className="big-text"
            fontSize={width > 1280 ? "60px" : width > 1023 ? "40px" : "30px"}
            lineHeight={width > 1280 ? "70px" : width > 1023 ? "45px" : "35px"}
            margin="0px"
          />
          <LinearText
            title={"AND WIN CRYPTO"}
            className="big-text"
            fontSize={width > 1280 ? "60px" : width > 1023 ? "40px" : "30px"}
            lineHeight={width > 1280 ? "70px" : width > 1023 ? "45px" : "35px"}
            margin="0px"
          />
          <div className="small-line"></div>
          <div className="small-text">
            on the most convenient decentralized platform in the Milky Way
          </div>
        </div>
        <div className="img-side">
          <img src={require(`@images/dex/dex-welcome-1.png`)} alt="" />
        </div>
      </div>

      <div className="margin-auto">
        {width > 425 ? (
          <>
            <div className="img-side">
              <img
                className="img-2"
                src={require(`@images/dex/dex-welcome-2.png`)}
                alt=""
              />
            </div>
            <div className="content-2 margin-auto">
              <LinearText
                title={"SWAP ANYTHING"}
                className="big-text"
                fontSize={
                  width > 1280 ? "60px" : width > 1023 ? "40px" : "30px"
                }
                lineHeight={
                  width > 1280 ? "70px" : width > 1023 ? "45px" : "35px"
                }
                margin="0px"
              />
              <div className="small-line"></div>
              <div className="small-text">
                no hustle, no registration needed. Start with any BNB Smart
                Chain token through connecting your wallet
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="content-2 margin-auto">
              <LinearText
                title={"SWAP ANYTHING"}
                className="big-text"
                fontSize={
                  width > 1280 ? "60px" : width > 1023 ? "40px" : "30px"
                }
                lineHeight={
                  width > 1280 ? "70px" : width > 1023 ? "45px" : "35px"
                }
                margin="0px"
              />
              <div className="small-line"></div>
              <div className="small-text">
                no hustle, no registration needed. Start with any BNB Smart
                Chain token through connecting your wallet
              </div>
            </div>
            <div className="img-side">
              <img
                className="img-2"
                src={require(`@images/dex/dex-welcome-2.png`)}
                alt=""
              />
            </div>
          </>
        )}
      </div>

      <div className="row-content">
        <div className="content">
          <LinearText
            title={"EARN EASILY"}
            className="big-text"
            fontSize={width > 1280 ? "60px" : width > 1023 ? "40px" : "30px"}
            lineHeight={width > 1280 ? "70px" : width > 1023 ? "45px" : "35px"}
            margin="0px"
          />
          <div className="small-line"></div>
          <div className="small-text">
            no hustle, no registration needed. Receive passive income through
            providing liquidity to IVIswap
          </div>
        </div>
        <div className="img-side">
          <img
            className="img-3"
            src={require(`@images/dex/dex-welcome-3.png`)}
            alt=""
          />
        </div>
      </div>
    </StyledWrapper>
  );
}
