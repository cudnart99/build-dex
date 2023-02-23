import React, { useEffect, useState } from "react";
import {
  StyledWrapper,
  AddLiquidityEntryWrapper,
  SubTextBoxWrapper,
} from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import BaseLiquidity from "../../Common/BaseLiquidity";
import PricesAndShare from "../LiquidityCommon/PricesAndShare";
import BaseSelect from "../../Common/BaseSelect";
import LPInWallet from "../LiquidityCommon/LPInWallet";
import SelectTokenModal from "../../Common/SelectTokenModal";
import { Button } from "antd";

export default function AddLiquidityEntry({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  const [test, setTest] = useState(false);
  useEffect(() => {
    setState({
      selectedNameToken1: "IVI",
      selectedImgToken1: require("@images/dex/IVI_icon.png"),
      selectedNameToken2: "IHI",
      selectedImgToken2: require("@images/dex/IHI_icon.png"),
    });
  }, []);
  return (
    <AddLiquidityEntryWrapper>
      <div className={test ? "left-part" : "main-part"}>
        <div>
          <BaseLiquidity
            arrowBack={true}
            width={"100%"}
            title={"Add Liquidity"}
            callbackButton={() => setState({ page: "AddLiquidity" })}
            subTitle={"Receive LP tokens and earn 0.2% trading fees"}
            callbackArrow={() => setState({ page: "YourLiquidity" })}
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
        <SubTextBoxWrapper>
          <img className="icon" src={require("@images/dex/coin-icon.png")} />
          <span>
            By adding liquidity you'll earn 0.2% of all trades on this pair
            proportional to your share in the trading pair. Fees are added to
            the pair, accrue in real time and can be claimed by withdrawing your
            liquidity.
          </span>
          <Button
            type="primary"
            className="test"
            onClick={() => setTest(!test)}
          >
            Show LP in Token
          </Button>
        </SubTextBoxWrapper>
      </div>
      {test && <LPInWallet state={state} setState={setState} />}
      <SelectTokenModal state={state} setState={setState} />
    </AddLiquidityEntryWrapper>
  );
}
