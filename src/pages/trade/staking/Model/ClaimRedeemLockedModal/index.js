import { getState } from "@redux";
import { refLoading } from "@src";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BaseModal from "../BaseModal";
import ReadAndAgreeCard from "../ReadAndAgreeCard";
import Summary from "../Summary";
import { ClaimRedeemLockedModalWrapper, FooterClaimWrapper } from "./styled";
// import { refLoading } from "src";

export default function ClaimRedeemLockedModal({
  status,
  openClaimModal,
  setOpenClaimModal,
  data,
  handleOpenSuccessModal,
  handleOpenFailModal,
}) {
  const [checkRequired, setCheckRequired] = useState(false);
  const claimReward = useDispatch()?.staking?.claimReward;
  const claimRewardFlexible = useDispatch()?.staking?.claimRewardFlexible;
  const withdrawTokenStake = useDispatch()?.staking?.withdrawTokenStake;
  const withdrawTokenStakeFlexible =
    useDispatch()?.staking?.withdrawTokenStakeFlexible;

  var bonus = getState()?.staking?.bonus;
  var claimSuccess = getState()?.staking?.claimSuccess;
  useEffect(() => {
    console.log(data, "Data truyền vào claim");
  }, [data, claimSuccess, bonus]);
  return (
    <>
      <BaseModal
        width={900}
        openModal={openClaimModal}
        setOpenModal={setOpenClaimModal}
        // handleOpenModal={handleOpenSuccessModal}
        titleModal={status === 1 ? "Redeem" : "Claim reward"}
        buttonFooter={status === 1 ? "Redeem token" : "Claim reward"}
        arrowBack={true}
        checkRequired={checkRequired}
        footerClaim={
          <FooterClaimWrapper>
            {status === 1 ? (
              <Button
                disabled={!checkRequired}
                className="button-footer"
                onClick={() => {
                  refLoading.current && refLoading.current.show();
                  data?.stakeTime?.text === "Flexible"
                    ? withdrawTokenStakeFlexible({
                        IDStake: data?.IDStake,
                        // receivedRedeem: data?.yourBalance,
                        // receivedClaim: data?.tokenCanClaimed,
                      })
                        .then((res) => {
                          console.log(res, "res cua redeem");
                          handleOpenSuccessModal();
                          // successClaimOff();
                        })
                        .catch((err) => {
                          console.log(err, "err của redeem");
                          handleOpenFailModal();
                        })
                        .finally(() => {
                          refLoading.current && refLoading.current.hide();
                        })
                    : withdrawTokenStake({
                        IDStake: data?.IDStake,
                        receivedRedeem: data?.yourBalance,
                        receivedClaim: data?.tokenCanClaimed,
                      })
                        .then((res) => {
                          console.log(res, "res cua redeem");
                          handleOpenSuccessModal();
                          // successClaimOff();
                        })
                        .catch((err) => {
                          console.log(err, "err của redeem");
                          handleOpenFailModal();
                        })
                        .finally(() => {
                          refLoading.current && refLoading.current.hide();
                        });
                }}
              >
                Redeem token
              </Button>
            ) : (
              <Button
                disabled={!checkRequired}
                className="button-footer"
                onClick={() => {
                  refLoading.current && refLoading.current.show();
                  data?.stakeTime?.text === "Flexible"
                    ? claimRewardFlexible({
                        IDStake: data?.IDStake,
                      })
                        .then((res) => {
                          console.log(res, "res cua claim");
                          handleOpenSuccessModal();
                          // successClaimOff();
                        })
                        .catch((err) => {
                          console.log(err, "err của claim");
                          handleOpenFailModal();
                        })
                        .finally(() => {
                          refLoading.current && refLoading.current.hide();
                        })
                    : claimReward({
                        IDStake: data?.IDStake,
                        receivedClaim: data?.tokenCanClaimed,
                      })
                        .then((res) => {
                          console.log(res, "res cua claim");
                          handleOpenSuccessModal();
                          // successClaimOff();
                        })
                        .catch((err) => {
                          console.log(err, "err của claim");
                          handleOpenFailModal();
                        })
                        .finally(() => {
                          refLoading.current && refLoading.current.hide();
                        });
                }}
              >
                Claim reward
              </Button>
            )}
          </FooterClaimWrapper>
        }
        content={
          <ClaimRedeemLockedModalWrapper>
            <div className="left-path">
              {status === 1 ? (
                <div className="redeem-container">
                  <div className="redeem-title">Redemption amount</div>
                  <div className="value-redeem">
                    <img src={require("@images/icon-ivi.png")} />
                    <span>
                      <b>
                        {(
                          data?.yourBalance + data?.tokenCanClaimed
                        )?.formatCurrency()}
                      </b>{" "}
                      {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                    </span>
                  </div>
                  <div className="calculate-amount">
                    <div className="math-function">=</div>
                    <div className="princial block-contain">
                      <div className="text">Principal Amount</div>
                      <div className="value">
                        <span>{data?.yourBalance?.formatCurrency()}</span>{" "}
                        {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                      </div>
                    </div>
                    <div className="math-function">+</div>
                    <div className="earned block-contain">
                      <div className="text">Earned Interest</div>
                      <div className="value">
                        <span>{data?.tokenCanClaimed?.formatCurrency()}</span>{" "}
                        {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="claimable-container">
                  <div className="text">Reward claimable</div>
                  <div className="value">
                    <img src={require("@images/icon-ivi.png")} />
                    <span>
                      <b>{data?.tokenCanClaimed?.formatCurrency()}</b>{" "}
                      {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                    </span>
                  </div>
                </div>
              )}

              <div className="info-container">
                <div className="flex">
                  <div className="key">Staked amount</div>
                  <div className="value">
                    <img src={require("@images/icon-ivi.png")} />
                    <span>
                      <b>{data?.yourBalance?.formatCurrency()}</b>{" "}
                      {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <div className="key">APR</div>
                  <div className="value">
                    <span className="apr">{data?.stakeTime?.apr}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-path">
              <Summary type="claim" dataClaim={data} />
              <ReadAndAgreeCard
                checkNeeded={false}
                setCheckRequired={setCheckRequired}
              />
            </div>
          </ClaimRedeemLockedModalWrapper>
        }
      />
    </>
  );
}
