import React, { useEffect, useState } from "react";
import { StyledWrapper, RemoveLiquidityWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import BaseLiquidity from "../../Common/BaseLiquidity";
import PricesAndShare from "../LiquidityCommon/PricesAndShare";
import BaseSelect from "../../Common/BaseSelect";
import LPInWallet from "../LiquidityCommon/LPInWallet";
import SelectTokenModal from "../../Common/SelectTokenModal";
import LiquidityInput from "../LiquidityCommon/LiquidityInput";
import Detailed from "./detailed";
import Simple from "./simple";

export default function RemoveLiquidity({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  useEffect(() => {
    setState({
      selectedNameToken1: "IVI",
      selectedImgToken1: require("@images/dex/IVI_icon.png"),
      priceToken1: "2",
      receiveToken1: "0.24444 (50%)",
      selectedNameToken2: "IHI",
      selectedImgToken2: require("@images/dex/IHI_icon.png"),
      priceToken2: "0.5",
      receiveToken2: "0.24444 (50%)",
    });
  }, []);
  const [changeType, setChangeType] = useState(false);
  return (
    <RemoveLiquidityWrapper>
      <div className="left-part">
        <BaseLiquidity
          arrowBack={true}
          width={"100%"}
          title={`Remove ${state.selectedNameToken1} - ${state.selectedNameToken2} Liquidity`}
          callbackButton={() => {}}
          subTitle={"To receive OME and IVIT"}
          callbackArrow={() => setState({ page: "YourLiquidity" })}
          // buttonName={"Add Liquidity"}
          // fullSizeButton={true}
          allowButton={false}
          content={
            <StyledWrapper>
              <div className="d-flex justify-content-space-between mt-3 title">
                <div className="fw-500 fs-16">AMOUNT</div>
                <div
                  className="fw-400 fs-14 changeText pointer"
                  onClick={() => setChangeType(!changeType)}
                >
                  {changeType ? "Detailed" : "Simple"}
                </div>
              </div>
              {changeType ? (
                <Simple state={state} setState={setState} />
              ) : (
                <Detailed state={state} setState={setState} />
              )}
              <div className="d-flex justify-content-space-between mt-3 slip">
                <div className="fw-400 fs-14">Slippage tolerance</div>
                <div className="fw-700 fs-16">1%</div>
              </div>
              <div className="enable-container d-flex mt-4">
                <div className="button-liquidity mr-2 pointer">Enable IVI</div>
                <div className="button-liquidity ml-2 pointer">Enable IHI</div>
              </div>
            </StyledWrapper>
          }
        />
      </div>
      <LPInWallet state={state} setState={setState} />
      <SelectTokenModal state={state} setState={setState} />
    </RemoveLiquidityWrapper>
  );
}
