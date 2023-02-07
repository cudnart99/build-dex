import React from "react";
import CurrencyInput from "react-currency-input-field";
import { useSelector } from "react-redux";
import { SwapInputWrapper } from "./styled";

export default function SwapInput(
  {
    // setState,
    // state,
  }
) {
  // const [state, setState] = useCustomState({});
  const balance = 40000;
  // console.log(state.amount, "amount");
  return (
    <SwapInputWrapper
    // current={state.current}
    >
      <div className="stake-amount-container">
        {/* <div className="title">Stake amount</div> */}
        <div className="input-container">
          <div className="info-balance">
            <div className="stake-icon-container">
              <img src={require("@images/icon-ivi.png")} />
              <span className="text">
                {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
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
