import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StakingWrapper } from "./styled";
import LinearText from "../components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import useCustomState from "@hook/useCustomState";
import AvailablePool from "./AvailablePool";
import YourPool from "./YourPool";
import { getState } from "@redux";
import { Button } from "antd";
import MultipleButtonSelectStaking from "../components/MultipleButtonSelectStaking";

export default function Staking() {
  const { width } = useDebounceWindowResize();
  const allState = useSelector((state) => state);
  console.log(
    "%cAllState",
    "background: red; color: yellow; font-size: 20px",
    allState
  );
  const initStaking = useDispatch()?.staking?.initStaking;
  const initFlexibleStaking = useDispatch()?.staking?.initFlexibleStaking;
  const getTotalRewardPoolFlexible =
    useDispatch()?.staking?.getTotalRewardPoolFlexible;
  const getPoolCoinData = useDispatch()?.staking?.getPoolCoinData;
  const switchTable = useDispatch()?.staking?.switchTable;
  // useEffect(() => {
  //   switchTable({ type: tableType });
  // }, [tableType]);

  useEffect(() => {
    initStaking()
      .then((res) => {
        console.log(res, "resssssssssss");
      })
      .catch((err) => {
        console.log(err);
      });
    initFlexibleStaking()
      .then((res) => {
        console.log(res, " flexxxxxible");
      })
      .catch((err) => {
        console.log(err);
      });
    getPoolCoinData();
    getTotalRewardPoolFlexible();
  }, [allState?.staking?.tableType]);
  return (
    <StakingWrapper>
      <LinearText
        title={"Staking"}
        fontSize={width > 576 ? "50px" : "40px"}
        lineHeight={width > 576 ? "70px" : "55px"}
      />
      <MultipleButtonSelectStaking
        options={[
          {
            text: `Available pool`,
            icon: (
              <>
                {allState.staking.tableType === 0 ? (
                  <img src={require("@images/available-pool-icon.png")} />
                ) : (
                  <img src={require("@images/available-pool-white.png")} />
                )}
              </>
            ),
          },
          {
            text: `Your pool`,
            icon: (
              <>
                {allState.staking.tableType === 1 ? (
                  <img src={require("@images/your-pool-icon.png")} />
                ) : (
                  <img src={require("@images/your-pool-white.png")} />
                )}
              </>
            ),
          },
        ]}
        onChange={(item, index) => {
          switchTable({ type: index });
        }}
        currentActive={allState.staking.tableType}
      />
      {allState.staking.tableType === 0 ? <AvailablePool /> : <YourPool />}
    </StakingWrapper>
  );
}
