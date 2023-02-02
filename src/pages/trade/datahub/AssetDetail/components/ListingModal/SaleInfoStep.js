import AgreementBox from "@components/Agreement";
import useCustomState from "@hook/useCustomState";
import { ButtonSwapToken, tokens } from "@pages/trade/datahub/deposit";
import ModalSwapToken from "@pages/trade/datahub/deposit/components/ModalSwap";
import { strings } from "@utils/index";
import { Col, Row } from "antd";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { GeneralStyleWrapper, SaleInfoStepWrapper } from "../styled";
import "./style.scss";

const SaleInfoStep = ({ assetCId, setState, state }) => {
  const [componentState, setComponentState] = useCustomState({
    currentToken: tokens[0],
    currentTokenIndex: 0,
    // modal swap
    isOpenModalSwap: false,
  });
  const handleCloseModalSwap = ({ tokenIdx }) => {
    tokenIdx =
      tokenIdx === undefined ? componentState.currentTokenIndex : tokenIdx;
    setComponentState({
      isOpenModalSwap: false,
      currentTokenIndex: tokenIdx,
    });
  };
  const handleOpenModalSwap = () => {
    setComponentState({
      isOpenModalSwap: true,
    });
  };

  const handleCheckout = (e) => {
    setState({
      isCheckout: e?.target?.checked,
    });
  };
  return (
    <GeneralStyleWrapper>
      <SaleInfoStepWrapper>
        <p className="asset-name">
          <span className="line-title">{strings("modal.SaleInfoStep.name")}</span>
          <span className="line-value">{state?.displayCId || ""}</span>
        </p>
        <Row
          className="price-and-expired-field d-flex justify-content-space-between"
          gutter={[16, 16]}
        >
          <Col
            md={12}
            lg={12}
            sm={24}
            xs={24}
            className="price-field mt-4 mb-4"
          >
            <p className="line-title">{strings("modal.SaleInfoStep.txt")}</p>
            <div className="price-field__wrapper">
              <ButtonSwapToken
                handleOpenModalSwap={handleOpenModalSwap}
                state={componentState}
              />
              <CurrencyInput
                className="input-listing-price"
                placeholder={"Please input asset amount!"}
                decimalSeparator={"."}
                groupSeparator={","}
                allowNegativeValue={false}
                decimalsLimit={8}
                value={state?.toValue}
                onValueChange={(value) => {
                  setState({
                    toValue: value,
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <AgreementBox
          onChange={handleCheckout}
          checkBoxContent={strings("modal.SaleInfoStep.txt2")}
          content={strings("modal.SaleInfoStep.txt3")}
        />
      </SaleInfoStepWrapper>
      <ModalSwapToken
        open={componentState.isOpenModalSwap}
        onOk={() => {}}
        onCancel={handleCloseModalSwap}
        tokenLists={tokens}
        currentToken={tokens[componentState.currentTokenIndex]}
      />
    </GeneralStyleWrapper>
  );
};

export default SaleInfoStep;
