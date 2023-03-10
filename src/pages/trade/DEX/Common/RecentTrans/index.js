import React, { useState } from "react";
import BaseModal from "../BaseModal";
import InputCommon from "../InputCommon";
import { StyledWrapper } from "./styled";

export default function RecentTrans({ state, setState }) {
  const setCloseRecentTransModal = () => {
    setState({
      openRecentTransModal: false,
    });
  };

  const listTransactions = [
    { name: "Add 1000 USDT & 3029 IVI" },
    { name: "Add 1000 USDT & 3029 IVI" },
    { name: "Add 1000 USDT & 3029 IVI" },
    { name: "Add 1000 USDT & 3029 IVI" },
    { name: "Add 1000 USDT & 3029 IVI" },
    { name: "Add 1000 USDT & 3029 IVI" },
    { name: "Add 1000 USDT & 3029 IVI" },
    { name: "Add 1000 USDT & 3029 IVI" },
    { name: "Add 1000 USDT & 3029 IVI" },
  ];

  return (
    <BaseModal
      width={360}
      openModal={state.openRecentTransModal}
      setCloseModal={setCloseRecentTransModal}
      arrowBack={false}
      titleModal={"Recent Transactions"}
      content={
        <StyledWrapper>
          <div className="common-bold-text">Liquidity</div>
          <div className="transaction-container">
            {listTransactions.map((item, index) => {
              return (
                <div className="transaction-item">
                  <img
                    className="icon"
                    src={require("@images/dex/box-transactions.png")}
                  ></img>
                  <a href="https://bscscan.com/" target="_blank">
                    {item.name}
                  </a>
                </div>
              );
            })}
          </div>
        </StyledWrapper>
      }
    />
  );
}
