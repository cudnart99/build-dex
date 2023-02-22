import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import BaseLiquidity from "../../Common/BaseLiquidity";
import BaseSelect from "../../Common/BaseSelect";
import SelectTokenModal from "../../Common/SelectTokenModal";
import { Button } from "antd";

export default function ImportPool({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  useEffect(() => {
    setState({
      selectedNameToken1: "",
      selectedNameToken2: "",
    });
  }, []);
  const [test, setTest] = useState(false);
  return (
    <BaseLiquidity
      width={"400px"}
      title={"Import Pool"}
      arrowBack={true}
      allowButton={false}
      callbackButton={() => {}}
      callbackArrow={() => setState({ page: "YourLiquidity" })}
      subTitle={"Import an existing pool"}
      buttonName={"Add Liquidity"}
      content={
        <StyledWrapper>
          <BaseSelect state={state} setState={setState} type={1} />
          <div className="text-center">
            <b>+</b>
          </div>
          <BaseSelect state={state} setState={setState} type={2} />
          <div className="instruction d-flex mt-7">
            {state?.selectedNameToken1 == "" ||
            state?.selectedNameToken2 == "" ? (
              <div> Select a token to find your liquidity</div>
            ) : test ? (
              <div className="instruct-child">
                <div className="mb-4 text-center">No pair found</div>
                <div
                  onClick={() => setState({ page: "CreateNewPair" })}
                  className="button-liquidity pointer"
                >
                  Create pair
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  You don't have liquidity in this pair yet.
                </div>
                <div
                  onClick={() => setState({ page: "AddLiquidityEntry" })}
                  className="button-liquidity pointer"
                >
                  Add Liquidity
                </div>
              </div>
            )}
          </div>
          <Button
            className="test"
            type="primary"
            onClick={() => setTest(!test)}
          >
            Đổi giữa đã có pool và chưa có pool
          </Button>
          <SelectTokenModal state={state} setState={setState} />
        </StyledWrapper>
      }
    />
  );
}
