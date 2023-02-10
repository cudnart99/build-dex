import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import BaseLiquidity from "../Common/BaseLiquidity";

export default function Liquidity() {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  return (
    <StyledWrapper>
      <BaseLiquidity
        title={"Your Liquidity"}
        callback={() => {}}
        subTitle={"Remove liquidity to receive tokens back"}
        buttonName={"Add Liquidity"}
        content={<>hello123</>}
      />
    </StyledWrapper>
  );
}
