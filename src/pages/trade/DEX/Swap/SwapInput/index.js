import React, { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import { useSelector } from "react-redux";
import { SwapInputWrapper } from "./styled";

export default function SwapInput({ setState, state, type }) {
  // const [state, setState] = useCustomState({});
  const balance = 40000;
  // console.log(state.amount, "amount");
  console.log(type, "type");
  console.log(state?.selectedNameToken1, "state?.selectedNameToken1");
  useEffect(() => {
    setState({
      selectedNameToken1: "IVI",
      selectedImgToken1: require("@images/dex/IVI_icon.png"),
      selectedNameToken2: "IHI",
      selectedImgToken2: require("@images/dex/IHI_icon.png"),
    });
  }, []);
  return (
    <SwapInputWrapper>
      <div className="stake-amount-container">
        {/* <div className="title">Stake amount</div> */}
        <div className="input-container">
          <div className="info-balance">
            <div
              className="stake-icon-container pointer"
              onClick={() =>
                setState({ openSelectTokenModal: true, selectedModal: type })
              }
            >
              <img
                src={
                  type == 1
                    ? state?.selectedImgToken1
                    : state?.selectedImgToken2
                }
              />
              <span className="text">
                {type == 1
                  ? state?.selectedNameToken1
                  : state?.selectedNameToken2}
              </span>
              <img
                className="icon-down-arrow"
                src={require("@assets/images/dex/down-arrow.png")}
              />
            </div>
            <div className="balance">Balance: {balance.formatCurrency()}</div>
          </div>
          <CurrencyInput
            // disabled={state.current === 1 ? true : false}
            className="currency-input"
            placeholder="Enter amount"
            style={{ width: "100%" }}
            decimalSeparator={"."}
            groupSeparator={","}
            decimalsLimit={8}
            // defaultValue={6000}
            // onValueChange={(value) => {
            //   if (value && value > balance) {
            //     setState({ amount: balance });
            //   } else if (value) {
            //     setState({ amount: value });
            //   } else {
            //     setState({ amount: 0 });
            //   }
            // }}
            // value={state.amount}
          />
        </div>
      </div>
    </SwapInputWrapper>
  );
}
