import { DownOutlined } from "@ant-design/icons";
import useCustomState from "@hook/useCustomState";
import { Button } from "antd";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import ModalSwap from "./ModalSwap";
import PriceFieldWithSwapWrapper from "./styled";

export const ButtonSwapToken = ({ handleOpenModalSwap, state, tokens }) => {
  return (
    <div className="token-swap">
      <Button
        className="token-swap-btn d-flex align-items-center"
        onClick={handleOpenModalSwap}
      >
        <img
          src={tokens[state?.currentTokenIndex]?.Icon}
          className="mr-3"
          alt=""
        />
        <span>{tokens[state?.currentTokenIndex]?.text}</span>
        <DownOutlined />
      </Button>
    </div>
  );
};

const PriceFieldWithSwap = ({ onChange, tokens }) => {
  const [state, setState] = useCustomState({
    visibleModalSwap: false,
    currentToken: tokens[0],
    currentTokenIndex: 0,
  });

  const handleOpenModalSwap = () => {
    setState({
      visibleModalSwap: true,
    });
  };

  const handleCloseModalSwap = ({ tokenIdx }) => {
    tokenIdx = tokenIdx === undefined ? state.currentTokenIndex : tokenIdx;
    setState({
      visibleModalSwap: false,
      currentTokenIndex: tokenIdx,
    });
  };

  return (
    <PriceFieldWithSwapWrapper>
      <ButtonSwapToken
        handleOpenModalSwap={handleOpenModalSwap}
        state={state}
        tokens={tokens}
      />
      <CurrencyInput
        className="input-price"
        placeholder={"Please input asset amount!"}
        decimalSeparator={"."}
        groupSeparator={","}
        allowNegativeValue={false}
        decimalsLimit={8}
        value={state?.toValue}
        onValueChange={(value) => {
          onChange(value, state.currentToken);
        }}
      />
      <ModalSwap
        open={state.visibleModalSwap}
        onOk={() => {}}
        onCancel={handleCloseModalSwap}
        tokenLists={tokens}
        currentToken={tokens[state.currentTokenIndex]}
      />
    </PriceFieldWithSwapWrapper>
  );
};

export default PriceFieldWithSwap;
