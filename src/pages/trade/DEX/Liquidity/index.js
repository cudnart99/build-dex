import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import YourLiquidity from "./YourLiquidity";
import useCustomState from "@hook/useCustomState";
import ImportPool from "./ImportPool";
import CreateNewPair from "./CreateNewPair";
import AddLiquidityEntry from "./AddLiquidityEntry";
import RemoveLiquidity from "./RemoveLiquidity";
import AddLiquidity from "./AddLiquidity";

export default function Liquidity() {
  const { width } = useDebounceWindowResize();
  const [state, setState] = useCustomState({
    page: "RemoveLiquidity",
    openSelectTokenModal: false,
  });
  useEffect(() => {
    console.log(width, "width");
    console.log(state?.page, "page");
  }, [state, width]);
  return (
    <StyledWrapper>
      {state?.page == "YourLiquidity" && (
        <YourLiquidity state={state} setState={setState} />
      )}
      {state?.page == "ImportPool" && (
        <ImportPool state={state} setState={setState} />
      )}
      {state?.page == "CreateNewPair" && (
        <CreateNewPair state={state} setState={setState} />
      )}
      {state?.page == "AddLiquidityEntry" && (
        <AddLiquidityEntry state={state} setState={setState} />
      )}
      {state?.page == "RemoveLiquidity" && (
        <RemoveLiquidity state={state} setState={setState} />
      )}
      {state?.page == "AddLiquidity" && (
        <AddLiquidity state={state} setState={setState} />
      )}
    </StyledWrapper>
  );
}
