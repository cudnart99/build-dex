import React, { useState } from "react";
import BaseModal from "../../Common/BaseModal";
import InputCommon from "../../Common/InputCommon";
import { StyledWrapper } from "./styled";

export default function Settings({ state, setState }) {
  const setCloseSettingsModal = () => {
    setState({
      openSettingsModal: false,
    });
  };

  const [selectedSpeed, setSelectedSpeed] = useState(0);
  const [selectedSlip, setSelectedSlip] = useState(0);

  const transactionSpeed = [
    {
      name: "RPC Default",
    },
    {
      name: "Standard (5)",
    },
    {
      name: "Fast (6)",
    },
    {
      name: "Instant (7)",
    },
  ];

  const slippageTolerance = [
    {
      rate: "0.1",
    },
    {
      rate: "0.5",
    },
    {
      rate: "1.0",
    },
    {
      rate: "5.0",
    },
  ];

  return (
    <BaseModal
      width={600}
      openModal={state.openSettingsModal}
      setCloseModal={setCloseSettingsModal}
      arrowBack={false}
      titleModal={"Settings"}
      content={
        <StyledWrapper>
          <div className="common-bold-text mt-2">Swaps & Liquidity</div>
          <div className="settings-text mt-2">
            Default Transaction Speed (GWEI)
          </div>
          <div className="common-token-container mt-4 mb-4">
            {transactionSpeed.map((item, index) => {
              return (
                <div
                  onClick={() => setSelectedSpeed(index)}
                  key={index}
                  className={
                    selectedSpeed === index
                      ? "button-token pointer selected-bg"
                      : "button-token pointer"
                  }
                >
                  <span className={selectedSpeed === index && "selected-text"}>
                    {item?.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="settings-text mt-2">Slippage Tolerance</div>
          <div className="common-token-container mt-4">
            {slippageTolerance.map((item, index) => {
              return (
                <div
                  onClick={() => setSelectedSlip(index)}
                  key={index}
                  className={
                    selectedSlip === index
                      ? "button-token pointer selected-bg"
                      : "button-token pointer"
                  }
                >
                  <span className={selectedSlip === index && "selected-text"}>
                    {item?.rate}%
                  </span>
                </div>
              );
            })}
            <div className="manual-input" onClick={() => setSelectedSlip(-1)}>
              <InputCommon type="setting" />
              <span className="rate-icon">%</span>
            </div>
          </div>
        </StyledWrapper>
      }
    />
  );
}
