import useCustomState from "@hook/useCustomState";
import { getState } from "@redux";
import { refLoading } from "@src/index";
import { Button, Col, Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../BaseModal";
import ReadAndAgreeCard from "../ReadAndAgreeCard";
import StakeAmountContainer from "../StakeAmountContainer";
import Summary from "../Summary";
import { FooterStakeWrapper, StakeModalWrapper } from "./styled";

export default function StakeModal({
  openStakeModal,
  setOpenStakeModal,
  data,
  activeCol,
  handleOpenSuccessModal,
  handleOpenFailModal,
  // checked,
  // setChecked,
}) {
  const approve = useDispatch()?.staking?.approve;
  const stake = useDispatch()?.staking?.stake;
  const approveFlexible = useDispatch()?.staking?.approveFlexible;
  const stakeFlexible = useDispatch()?.staking?.stakeFlexible;
  const successOff = useDispatch()?.staking?.successOff;
  const getPoolCoinData = useDispatch()?.staking?.getPoolCoinData;
  const { Step } = Steps;
  const [state, setState] = useCustomState({});
  const [checkRequired, setCheckRequired] = useState(false);
  const balance = useSelector((_state) => _state?.contracts?.balance);
  const totalRewardPoolFlexible = getState()?.staking?.totalRewardPoolFlexible;
  useEffect(() => {
    if (typeof activeCol === "undefined") {
      activeCol = 0;
    }
    setState({
      activeSelect: activeCol,
      apr: data?.stakeTime[activeCol]?.apr,
      current: 0,
      type: data?.stakeTime[activeCol]?.type,
    });
  }, [activeCol, data]);
  console.log(
    "%cState",
    "background: Blue; color: yellow; font-size: 20px",
    state
  );
  return (
    <>
      <BaseModal
        width={900}
        openModal={openStakeModal}
        setOpenModal={setOpenStakeModal}
        // handleOpenModal={handleOpenSuccessModal}
        // handleOpenModal={handleOpenFailModal}
        titleModal={`Stake ${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
        buttonFooter={"Confirm Stake"}
        footerStake={
          <FooterStakeWrapper>
            <Steps className="container" current={state.current}>
              <Step title="Approve" />
              <Step title="Stake" />
            </Steps>
            <Button
              disabled={
                state.current !== 0 ||
                !checkRequired ||
                typeof state.amount === "undefined" ||
                parseInt(state.amount) === 0 ||
                state.amount === "" ||
                (state.type === "Flexible"
                  ? false
                  : (state.amount * state.apr) / 100 > data?.remainingSlot) ||
                state.amount > balance ||
                state.amount < 6000
              }
              onClick={() => {
                if (state.type === "Flexible") {
                  refLoading.current && refLoading.current.show();
                  approveFlexible(state.amount)
                    .then((res) => {
                      setState({ current: 1 });
                    })
                    .catch((err) => {
                      console.log(err, "err của approve flexible");
                      handleOpenFailModal();
                    })
                    .finally(() => {
                      refLoading.current && refLoading.current.hide();
                    });
                  setState({ amountAllowance: state.amount });
                } else {
                  refLoading.current && refLoading.current.show();
                  approve(state.amount)
                    .then((res) => {
                      setState({ current: 1 });
                    })
                    .catch((err) => {
                      console.log(err, "err của approve");
                      handleOpenFailModal();
                    })
                    .finally(() => {
                      refLoading.current && refLoading.current.hide();
                    });
                  setState({ amountAllowance: state.amount });
                }
              }}
              className="approve-button button-footer"
            >
              Approve
            </Button>
            <Button
              // disabled={state.current !== 1 || allowance === 0}
              disabled={state.current !== 1}
              onClick={() => {
                console.log(state.type, "click type");
                if (state.type === "Flexible") {
                  refLoading.current && refLoading.current.show();
                  stakeFlexible({
                    amount: state.amountAllowance,
                  })
                    .then((res) => {
                      console.log(res, "res cua stake flexiiiiiiiiiiiible");
                      handleOpenSuccessModal();
                      getPoolCoinData();
                    })
                    .catch((err) => {
                      console.log(err, "err của stake");
                      handleOpenFailModal();
                    })
                    .finally(() => {
                      refLoading.current && refLoading.current.hide();
                    });
                } else {
                  refLoading.current && refLoading.current.show();
                  stake({
                    amount: state.amountAllowance,
                    duration: state.type,
                  })
                    .then((res) => {
                      console.log(res, "res cua stake");
                      handleOpenSuccessModal();
                      // successOff();
                      getPoolCoinData();
                    })
                    .catch((err) => {
                      console.log(err, "err của stake");
                      handleOpenFailModal();
                    })
                    .finally(() => {
                      refLoading.current && refLoading.current.hide();
                    });
                }
              }}
              className="stake-button button-footer"
            >
              Stake
            </Button>
          </FooterStakeWrapper>
        }
        arrowBack={true}
        checkRequired={checkRequired}
        // amount={parseInt(state.amount)}
        // duration={state.type}
        content={
          <StakeModalWrapper current={state.current}>
            <div className="left-path">
              <div className="note">
                <div className="d-flex">
                  <div>Type</div>
                  {state.type !== "Flexible" && (
                    <div className="icon-info">
                      <img src={require("@images/purple-info-icon.png")} />{" "}
                      <div className="upper-text">
                        Note that you can not unstake while staking
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Row
                gutter={[24, 24]}
                justify="center"
                className="stake-time-container"
              >
                {data?.stakeTime?.map((item, index) => {
                  return (
                    <Col key={index} span={6}>
                      <div
                        className={
                          state.activeSelect === index
                            ? "select-button active"
                            : "select-button non-active"
                        }
                        onClick={() => {
                          if (state.current !== 1) {
                            setState({
                              activeSelect: index,
                              type: item.type,
                              apr: item.apr,
                            });
                          }
                        }}
                      >
                        <div className="type">{item.text}</div>
                        {item.text !== "Flexible" ? (
                          <div className="apr">{item.apr}%</div>
                        ) : (
                          <div className="apr">
                            {item.apr}%{item?.unit}
                          </div>
                        )}
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <StakeAmountContainer
                setState={setState}
                state={state}
                remainingSlot={data?.remainingSlot}
              />
              <div className="pool-remain">
                {state.type === "Flexible"
                  ? "Reward per minute"
                  : "Total reward"}
                :{"  "}
                <b style={{ color: "black" }}>
                  {isNaN(state.amount)
                    ? 0
                    : ((state.amount * state.apr) / 100)?.formatCurrency()}{" "}
                  {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                </b>
              </div>
              <div className="pool-remain">
                Pool ‘s remaining reward:{" "}
                {state.type === "Flexible" ? (
                  <b style={{ color: "black" }}>
                    {totalRewardPoolFlexible?.formatCurrency()}{" "}
                    {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                  </b>
                ) : (
                  <b style={{ color: "black" }}>
                    {data?.remainingSlot?.formatCurrency()}{" "}
                    {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                  </b>
                )}
              </div>
              {(state.amount * state.apr) / 100 > data?.remainingSlot && (
                <div className="pool-remain red">
                  Warning: Total reward cannot higher than pool's remaining
                  reward
                </div>
              )}
              {state.amount > balance && (
                <div className="pool-remain red">
                  Warning: Amount input exceed balance
                </div>
              )}
              {state.amount < 6000 && (
                <div className="pool-remain red">
                  Warning: Amount input must be higher than 6000
                </div>
              )}
            </div>
            <div className="right-path">
              <Summary
                type="stake"
                typeStake={state.type}
                amount={state.amount}
                apr={state.apr}
              />
              <ReadAndAgreeCard
                // checked={checked}
                // setChecked={setChecked}
                checkNeeded={true}
                setCheckRequired={setCheckRequired}
              />
            </div>
          </StakeModalWrapper>
        }
      />
    </>
  );
}
