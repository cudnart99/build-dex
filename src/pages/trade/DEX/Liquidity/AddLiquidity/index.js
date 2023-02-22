import React, { useEffect, useState } from "react";
import { AddLiquidityWrapper, StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import BaseLiquidity from "../../Common/BaseLiquidity";
import LiquidityInput from "../LiquidityCommon/LiquidityInput";
import PricesAndShare from "../LiquidityCommon/PricesAndShare";
import { Button } from "antd";

export default function AddLiquidity({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  return (
    <AddLiquidityWrapper>
      <div className="left-part">
        <BaseLiquidity
          arrowBack={true}
          width={"100%"}
          title={"IVI - IHI VP"}
          allowButton={false}
          // callbackButton={() => {}}
          subTitle={"Receive LP tokens and earn 0.2% trading fees"}
          callbackArrow={() => setState({ page: "AddLiquidityEntry" })}
          // buttonName={"Add Liquidity"}
          content={
            <StyledWrapper>
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
    </AddLiquidityWrapper>
  );
}
