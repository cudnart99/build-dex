import TradeButton from "@components/TradeButton";
import { strings } from "@utils/index";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { PriceRangeWrapper } from "./styled";

const PriceRange = ({ placeholder = [], handleChangeValue, value, t }) => {
  const [state, _setState] = useState({
    fromValue: null,
    toValue: null,
    showError: false,
  });
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  useEffect(() => {
    if (
      Number(state.fromValue) > Number(state.toValue) &&
      state.toValue !== null &&
      state.toValue !== ""
    ) {
      setState({
        showError: true,
      });
    } else {
      setState({
        showError: false,
      });
    }
  }, [state.fromValue, state.toValue]);

  useEffect(() => {
    if (value?.every((item) => item === null)) {
      setState({
        fromValue: "",
        toValue: "",
      });
    } else {
      setState({
        fromValue: value[0],
        toValue: value[1],
      });
    }
  }, [value]);

  return (
    <PriceRangeWrapper>
      <div className="price-range-wrapper">
        <CurrencyInput
          placeholder={placeholder[0]}
          allowNegativeValue={false}
          decimalSeparator={"."}
          groupSeparator={","}
          decimalsLimit={8}
          value={state.fromValue}
          onValueChange={(value) => {
            setState({
              fromValue: value,
            });
            // handleChangeValue(value, state.toValue);
          }}
        />
        -
        <CurrencyInput
          placeholder={placeholder[1]}
          allowNegativeValue={false}
          decimalSeparator={"."}
          groupSeparator={","}
          decimalsLimit={8}
          value={state.toValue}
          onValueChange={(value) => {
            setState({
              toValue: value,
            });
            // handleChangeValue(state.fromValue, value);
          }}
        />
      </div>
      {state.showError && (
        <div className="error-text">{strings("modal.PriceRange.error-text")}</div>
      )}
      <TradeButton
        className={`w-full text-center padding-top apply-price ${
          state.showError ? "disable-pointer" : ""
        } `}
        disabled={state?.showError}
        type={"gradient"}
        content={strings("modal.PriceRange.btn-apply")}
        onClick={() => {
          handleChangeValue(state.fromValue, state.toValue);
        }}
        backgroundcolor="#6E5AC3"
      />
    </PriceRangeWrapper>
  );
};

export default PriceRange;
