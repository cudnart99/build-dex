import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useSelector } from "react-redux";
import { LiquidityInputWrapper } from "./styled";

export default function LiquidityInput({
  setState,
  state,
  type,
  checkbox = false,
}) {
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
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState(0);
  const listRate = [{ rate: 25 }, { rate: 50 }, { rate: 75 }, { rate: 100 }];
  return (
    <LiquidityInputWrapper>
      <div className="stake-amount-container mt-4 mb-4">
        <div className="input-container">
          {type == "sp" ? (
            <div className="info-balance">
              <div className="img-container">
                <img
                  className="icon"
                  src={require("@images/dex/IVI_icon.png")}
                ></img>
                <img
                  className="icon nest"
                  src={require("@images/dex/IHI_icon.png")}
                ></img>
                <div className="text">IVI - IHI</div>
                {/* <img
                  className="icon-copy"
                  src={require("@assets/images/dex/copy-icon.png")}
                /> */}
              </div>
              <div className="balance">
                Balance: <b>{balance.formatCurrency()}</b>
              </div>
            </div>
          ) : (
            <div className="info-balance">
              <div className="d-flex">
                {checkbox && (
                  <>
                    {check ? (
                      <div
                        onClick={() => setCheck(!check)}
                        className="checkbox-check pointer"
                      >
                        <img src={require("@images/dex/v-icon.png")} />
                      </div>
                    ) : (
                      <div
                        onClick={() => setCheck(!check)}
                        className="checkbox pointer"
                      ></div>
                    )}
                  </>
                )}

                <div
                  className="stake-icon-container pointer"
                  onClick={() =>
                    setState({
                      openSelectTokenModal: true,
                      selectedModal: type,
                    })
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
                    className="icon-copy"
                    src={require("@assets/images/dex/copy-icon.png")}
                  />
                </div>
              </div>
              {!checkbox && (
                <div className="balance">
                  Balance: <b>{balance.formatCurrency()}</b>
                </div>
              )}
            </div>
          )}
          <CurrencyInput
            // disabled={state.current === 1 ? true : false}
            className="currency-input"
            placeholder="Enter amount"
            style={{ width: "100%" }}
            decimalSeparator={"."}
            groupSeparator={","}
            decimalsLimit={8}
          />
          {type !== "sp" && (
            <div className="select-rate-container d-flex">
              {listRate.map((item, index) => {
                return (
                  <div
                    className={selected == index ? "block-selected" : "block"}
                    onClick={() => setSelected(index)}
                  >
                    {item.rate}%
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </LiquidityInputWrapper>
  );
}
