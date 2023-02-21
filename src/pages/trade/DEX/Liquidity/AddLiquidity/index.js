import React, { useEffect, useState } from "react";
import { StyledWrapper, AddLiquidityWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import BaseLiquidity from "../../Common/BaseLiquidity";
import PricesAndShare from "../LiquidityCommon/PricesAndShare";
import BaseSelect from "../../Common/BaseSelect";
import LPInWallet from "../LiquidityCommon/LPInWallet";
import SelectTokenModal from "../../Common/SelectTokenModal";

export default function AddLiquidity({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  useEffect(() => {
    setState({
      selectedNameToken1: "IVI",
      selectedImgToken1: require("@images/dex/IVI_icon.png"),
      selectedNameToken2: "IHI",
      selectedImgToken2: require("@images/dex/IHI_icon.png"),
    });
  }, []);
  return (
    <AddLiquidityWrapper>
      <div className="left-part">
        <BaseLiquidity
          arrowBack={true}
          width={"100%"}
          title={"Add Liquidity"}
          callbackButton={() => {}}
          subTitle={"Receive LP tokens and earn 0.2% trading fees"}
          callbackArrow={() => setState({ page: "ImportPool" })}
          buttonName={"Add Liquidity"}
          fullSizeButton={true}
          content={
            <StyledWrapper>
              <div className="instruction">Choose a valid pair</div>
              <div className="d-flex mt-3 justify-content-space-between">
                <div className="pair">
                  <BaseSelect state={state} setState={setState} type={1} />
                  <div className="d-flex justify-content-space-between mt-3">
                    <div>Balance:</div>
                    <div className="fw-700">0</div>
                  </div>
                  <div className="text-right mt-3">~$0,00</div>
                </div>
                <div className="plus text-center fw-700 fs-20">+</div>
                <div className="pair">
                  <BaseSelect state={state} setState={setState} type={2} />
                  <div className="d-flex justify-content-space-between mt-3">
                    <div>Balance:</div>
                    <div className="fw-700">0</div>
                  </div>
                  <div className="text-right mt-3">~$0,00</div>
                </div>
              </div>
              <div className="d-flex justify-content-space-between mt-3 reward">
                <div>LP reward APR</div>
                <div className="fw-700 fs-16">0.57%</div>
              </div>
            </StyledWrapper>
          }
        />
      </div>
      <LPInWallet state={state} setState={setState} />
      <SelectTokenModal state={state} setState={setState} />
    </AddLiquidityWrapper>
  );
}
