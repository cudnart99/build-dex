import React from "react";
import { SummaryWrapper } from "./styled";
import useCustomState from "@hook/useCustomState";
import { Steps } from "antd";
import moment from "moment/moment";
import { stepSummary, dataStaking } from "../../config";
import StakingGraph from "./Graph";

export default function Summary({ typeStake, amount, apr, dataClaim }) {
  const { Step } = Steps;
  const stepTime = stepSummary;
  const [state, setState] = useCustomState({ graph: 1 });
  return (
    <SummaryWrapper>
      <div className="main-title-container d-flex">
        <div className="title">Summary (UTC+07:00)</div>
        <div className="button-change-container">
          <span onClick={() => setState({ graph: 1 })}>
            {state.graph === 1 ? (
              <img
                className="list-icon"
                src={require("@images/icon-list-black.png")}
              />
            ) : (
              <img
                className="list-icon"
                src={require("@images/icon-list-gray.png")}
              />
            )}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span onClick={() => setState({ graph: 2 })}>
            {state.graph === 2 ? (
              <img
                className="list-icon"
                src={require("@images/icon-graph-black.png")}
              />
            ) : (
              <img
                className="list-icon"
                src={require("@images/icon-graph-gray.png")}
              />
            )}
          </span>
        </div>
      </div>

      {state.graph === 1 ? (
        <div className="process-container">
          {dataClaim ? (
            <>
              {dataClaim?.stakeTime?.text !== "Flexible" ? (
                <Steps
                  progressDot
                  current={Math.floor(
                    (moment().unix() -
                      moment(
                        dataClaim?.stakeDate,
                        "DD-MM-YYYY HH:mm:ss"
                      ).unix()) /
                      60
                  )}
                  direction="vertical"
                >
                  {Array.from(
                    new Array(
                      dataClaim?.stakeTime?.type === 180
                        ? 4
                        : dataClaim?.stakeTime?.type === 360
                        ? 7
                        : 10
                    ),
                    (el, index) => {
                      return (
                        <Step
                          key={index}
                          title={
                            <div className="title-container">
                              <div className="name-process">
                                <span>
                                  {index === 0
                                    ? "Stake date"
                                    : index ===
                                      (dataClaim?.stakeTime?.type === 180
                                        ? 3
                                        : dataClaim?.stakeTime?.type === 360
                                        ? 6
                                        : 9)
                                    ? "Unlock date"
                                    : `Reward ${index}`}
                                </span>{" "}
                                <span>
                                  (
                                  {moment
                                    .unix(
                                      moment(
                                        dataClaim?.stakeDate,
                                        "DD-MM-YYYY HH:mm:ss"
                                      ).unix() +
                                        stepTime * index
                                    )
                                    .format("DD-MM-YYYY HH:mm:ss")}
                                  )
                                </span>
                              </div>
                              <div className="claim-ivi">
                                <b>
                                  {isNaN(dataClaim?.reward)
                                    ? 0
                                    : index === 0
                                    ? 0
                                    : `+${(
                                        dataClaim?.reward /
                                        (dataClaim?.stakeTime?.type === 180
                                          ? 3
                                          : dataClaim?.stakeTime?.type === 360
                                          ? 6
                                          : 9)
                                      ).formatCurrency()}`}
                                </b>{" "}
                                {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}

                              </div>
                            </div>
                          }
                        />
                      );
                    }
                  )}
                </Steps>
              ) : (
                <Steps progressDot current={1} direction="vertical">
                  {Array.from(new Array(2), (el, index) => {
                    return (
                      <Step
                        key={index}
                        title={
                          <div className="title-container">
                            <div className="name-process">
                              <span>
                                {index === 0 ? "Stake date" : `Reward date`}
                              </span>{" "}
                              <span>
                                {index === 0 ? (
                                  <>
                                    {moment
                                      .unix(
                                        moment(
                                          dataClaim?.stakeDate,
                                          "DD-MM-YYYY HH:mm:ss"
                                        ).unix()
                                      )
                                      .format("DD-MM-YYYY HH:mm:ss")}
                                  </>
                                ) : index === 1 ? (
                                  <>
                                    {moment
                                      .unix(moment().unix())
                                      .format("DD-MM-YYYY HH:mm:ss")}
                                  </>
                                ) : (
                                  <>Invalid date</>
                                )}
                              </span>
                            </div>
                            <div className="claim-ivi">
                              <b>
                                {isNaN(dataClaim?.reward)
                                  ? 0
                                  : index === 0
                                  ? 0
                                  : `+${dataClaim?.reward.formatCurrency()}`}
                              </b>{" "}
                              {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}

                            </div>
                          </div>
                        }
                      />
                    );
                  })}
                </Steps>
              )}
            </>
          ) : (
            <Steps progressDot current={0} direction="vertical">
              {typeStake !== "Flexible"
                ? Array.from(
                    new Array(
                      typeStake === 180 ? 4 : typeStake === 360 ? 7 : 10
                    ),
                    (el, index) => {
                      return (
                        <Step
                          key={index}
                          title={
                            <div className="title-container">
                              <div className="name-process">
                                <span>
                                  {index === 0
                                    ? "Stake date"
                                    : index ===
                                      (typeStake === 180
                                        ? 3
                                        : typeStake === 360
                                        ? 6
                                        : 9)
                                    ? "Unlock date"
                                    : `Reward ${index}`}
                                </span>{" "}
                                <span>
                                  (
                                  {moment
                                    .unix(moment().unix() + stepTime * index)
                                    .format("DD-MM-YYYY HH:mm:ss")}
                                  )
                                </span>
                              </div>
                              <div className="claim-ivi">
                                <b>
                                  {isNaN(amount)
                                    ? 0
                                    : index === 0
                                    ? 0
                                    : `+${(
                                        (amount * apr) /
                                        (typeStake === 180
                                          ? 3
                                          : typeStake === 360
                                          ? 6
                                          : 9) /
                                        100
                                      ).formatCurrency()}`}
                                </b>{" "}
                                {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                              </div>
                            </div>
                          }
                        />
                      );
                    }
                  )
                : Array.from(new Array(2), (el, index) => {
                    return (
                      <Step
                        key={index}
                        title={
                          <div className="title-container">
                            <div className="name-process">
                              <span>
                                {index === 0 ? "Stake date" : `Reward date`}
                              </span>{" "}
                              <span>
                                {index === 0 ? (
                                  <>
                                    {moment
                                      .unix(moment().unix())
                                      .format("DD-MM-YYYY HH:mm:ss")}
                                  </>
                                ) : index === 1 ? (
                                  <>
                                    {moment
                                      .unix(moment().unix() + stepTime)
                                      .format("DD-MM-YYYY HH:mm:ss")}
                                  </>
                                ) : (
                                  <>Invalid date</>
                                )}
                              </span>
                            </div>
                            <div className="claim-ivi">
                              <b>
                                {isNaN(amount)
                                  ? 0
                                  : index === 0
                                  ? 0
                                  : `+${(
                                      (amount * apr) /
                                      100
                                    ).formatCurrency()}`}
                              </b>{" "}
                              {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}

                            </div>
                          </div>
                        }
                      />
                    );
                  })}
            </Steps>
          )}
        </div>
      ) : (
        <StakingGraph
          typeStake={typeStake}
          amount={amount}
          apr={apr}
          dataClaim={dataClaim}
        />
      )}
    </SummaryWrapper>
  );
}
