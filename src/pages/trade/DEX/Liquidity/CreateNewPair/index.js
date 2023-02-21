import React, { useEffect, useState } from "react";
import { CreateNewPairWrapper, StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import BaseLiquidity from "../../Common/BaseLiquidity";
import LiquidityInput from "../LiquidityCommon/LiquidityInput";
import PricesAndShare from "../LiquidityCommon/PricesAndShare";

export default function CreateNewPair({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  return (
    <CreateNewPairWrapper>
      <div className="left-part">
        <BaseLiquidity
          arrowBack={true}
          width={"100%"}
          title={"IVI - IHI VP"}
          allowButton={false}
          // callbackButton={() => {}}
          subTitle={"Receive LP tokens and earn 0.2% trading fees"}
          callbackArrow={() => setState({ page: "ImportPool" })}
          // buttonName={"Add Liquidity"}
          content={
            <StyledWrapper>
              <div className="caution">
                <p>
                  <b>You're the first liquidity provider.</b>
                </p>
                <div>
                  The ratio of tokens you add will set the price of this pair.
                </div>
                <div>
                  Once you are happy with the rate click supply to review.
                </div>
              </div>
              <LiquidityInput state={state} setState={setState} type={1} />
              <div className="plus">
                <b>+</b>
              </div>
              <LiquidityInput state={state} setState={setState} type={2} />
            </StyledWrapper>
          }
        />
      </div>
      <PricesAndShare state={state} setState={setState} />
    </CreateNewPairWrapper>
  );
}
