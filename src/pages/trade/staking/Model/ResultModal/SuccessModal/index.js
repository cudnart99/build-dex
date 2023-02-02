import { CorrectLine } from "@assets/animation";
import useCustomState from "@hook/useCustomState";
import { getState } from "@redux";
import React from "react";
import BaseModal from "../../BaseModal";
import { SuccessModalWrapper } from "./styled";

export default function SuccessModal({
  openSuccessModal,
  setOpenSuccessModal,
  type,
}) {
  const [state, setState] = useCustomState({});
  const amountStake = getState()?.staking?.amountStake;
  const aprStake = getState()?.staking?.aprStake;
  const startDate = getState()?.staking?.startDate;
  const endDate = getState()?.staking?.endDate;
  // const receivedClaim = getState()?.staking?.receivedClaim;
  // const receivedRedeem = getState()?.staking?.receivedRedeem;
  // const dateStake = getState()?.staking?.dateStake;
  return (
    <>
      <BaseModal
        width={450}
        openModal={openSuccessModal}
        setOpenModal={setOpenSuccessModal}
        // handleOpenModal={setOpenSuccessModal}
        titleModal={
          type === "stake"
            ? "Stake successfully"
            : type === "redeem"
            ? "Redeem successfully"
            : "Claimed successfully"
        }
        buttonFooter={"Go to your pool"}
        arrowBack={false}
        content={
          <SuccessModalWrapper>
            <>
              <CorrectLine />
              {type === "stake" ? (
                <div className="info-container">
                  <div className="flex">
                    <div className="key">Staked amount</div>
                    <div className="value">
                      <img src={require("@images/icon-ivi.png")} />
                      <span>
                        <b>{amountStake?.formatCurrency()}</b>{" "}
                        {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="key">APR</div>
                    <div className="value">
                      <span className="apr">{aprStake}%</span>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="key">Stake date</div>
                    <div className="value">{startDate} (UTC+07:00)</div>
                  </div>
                  <div className="flex">
                    <div className="key">Redemption date</div>
                    <div className="value">{endDate} (UTC+07:00)</div>
                  </div>
                </div>
              ) : type === "redeem" ? (
                <div className="container">
                  You redeemed your fund and your reward successfully
                </div>
              ) : (
                <div className="container">
                  You received your reward successfully
                </div>
              )}
            </>
          </SuccessModalWrapper>
        }
      />
    </>
  );
}
