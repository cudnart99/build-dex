import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import StakeAmountContainer from "@pages/trade/staking/Model/StakeAmountContainer";
import SwapInput from "./SwapInput";
import useCustomState from "@hook/useCustomState";
import styled from "styled-components";
import { set } from "lodash";
import moment from "moment";
import Chart from "./Chart";
import SelectTokenModal from "./SelectTokenModal";
import Settings from "./Settings";

// const ChartWrapper = styled.div`
//   display: ${(props) => (props.appearChart ? "initial" : "none")};
//   /* width: ${(props) => (props.appearChart ? "65%" : "0%")}; */
//   width: 65%;
//   border-radius: 20px;
//   background-color: rgba(0, 0, 0, 0.2);
//   height: 400px;
//   /* visibility: ${(props) => (props.appearChart ? "visible" : "hidden")};
//   opacity: ${(props) => (props.appearChart ? 1 : 0)};
//   transition: visibility 0s, opacity 0.5s linear;
//   transition: width 0.5s; */
//   .chart-content {
//     overflow: hidden;
//     color: white;
//   }
// `;

export default function Swap() {
  const { width } = useDebounceWindowResize();
  // useEffect(() => {
  //   console.log(width, "width");
  // }, [width]);
  const [state, setState] = useCustomState({
    appearChart: true,
    selected: 0,
    openSelectTokenModal: false,
    openSettingsModal: false,
  });
  const listSelect = ["1D", "7D", "1M", "2M", "6M", "12M"];
  console.log(state.chartWidth);

  return (
    <StyledWrapper>
      <div className="d-flex container">
        {state?.appearChart && (
          <div className="chart">
            <div className="header d-flex justify-content-space-between">
              <div className="coin">
                <img
                  className="pair-coin"
                  src={require("@assets/images/dex/BNB-IVI.png")}
                ></img>
                <span>BNB/IVI</span>
                <img
                  className="arrow-2 pointer"
                  src={require("@assets/images/dex/arrow-2.png")}
                ></img>
              </div>
              <div className="select-date">
                {listSelect?.map((item, index) => {
                  return (
                    <span
                      className={
                        state.selected === index
                          ? "pointer selected"
                          : "pointer"
                      }
                      onClick={() => setState({ selected: index })}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="price">
              <span className="coin-price">0.007</span>
              <span className="name-pair-coin">BNB/IVI</span>
              <span className="rate">+0.650 (0.84%)</span>
            </div>
            <div className="date">{moment().format("llll")}</div>

            <Chart />
          </div>
        )}

        <div className="swap-container">
          <div className="header d-flex">
            <div className="title">Swap</div>
            {state?.appearChart ? (
              <div
                onClick={() => {
                  setState({ appearChart: !state.appearChart });
                }}
                className="icon pointer"
              >
                <img src={require("@assets/images/dex/chart.png")}></img>
              </div>
            ) : (
              <div
                onClick={() => {
                  setState({
                    appearChart: !state.appearChart,
                  });
                }}
                className="icon noChart pointer"
              >
                <img src={require("@assets/images/dex/noChart.png")}></img>
              </div>
            )}

            <div
              onClick={() => setState({ openSettingsModal: true })}
              className="icon pointer"
            >
              <img src={require("@assets/images/dex/setting.png")}></img>
            </div>
          </div>
          <div className="sub-title">Trade tokens in an instant</div>
          <SwapInput state={state} setState={setState} type={1} />
          <div className="icon-container">
            <img
              onClick={() =>
                setState({
                  selectedNameToken1: state?.selectedNameToken2,
                  selectedNameToken2: state?.selectedNameToken1,
                  selectedImgToken1: state?.selectedImgToken2,
                  selectedImgToken2: state?.selectedImgToken1,
                })
              }
              className="circle-arrow pointer"
              src={require("@assets/images/dex/circle-arrow.png")}
            ></img>
          </div>
          <SwapInput state={state} setState={setState} type={2} />
          <div className="text-right">
            <div className="scan-risk">
              <span>SCAN RISK</span>
              <img src={require("@assets/images/dex/info-icon.png")}></img>
            </div>
          </div>
          <div className="d-flex pair">
            <div className="key">Price</div>
            <div className="value">
              <span>0.0127574 BNB per CAKE</span>
              <img
                className="change-icon"
                src={require("@assets/images/dex/change-icon.png")}
              ></img>
            </div>
          </div>

          <div className="d-flex pair">
            <div className="key">Slippage Tolerance</div>
            <div className="value">
              <span className="green">0.5%</span>
            </div>
          </div>

          <div className="swap-button pointer">Insufficient IVI balance</div>

          <div className="d-flex pair">
            <div className="key">Minimum received</div>
            <div className="value">
              <span>77.99 CAKE</span>
            </div>
          </div>

          <div className="d-flex pair">
            <div className="key">Price Impact</div>
            <div className="value">
              <span className="green">{"<"}0.01%</span>
            </div>
          </div>

          <div className="d-flex pair">
            <div className="key">Liquidity Provider</div>
            <div className="value">
              <span>0.0025 BNB</span>
            </div>
          </div>

          <div className="d-flex pair">
            <div className="key">Fee Route</div>
            <div className="value">
              <span>BNB {"<"} CAKE</span>
            </div>
          </div>
        </div>
      </div>
      <SelectTokenModal state={state} setState={setState} />
      <Settings state={state} setState={setState} />
    </StyledWrapper>
  );
}
