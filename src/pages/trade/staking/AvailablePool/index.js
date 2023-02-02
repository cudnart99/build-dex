import useCustomState from "@hook/useCustomState";
import { getState } from "@redux";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dataStaking } from "../config";
import FailModal from "../Model/ResultModal/FailModal";
import SuccessModal from "../Model/ResultModal/SuccessModal";
import StakeModal from "../Model/StakeModel";
import { TableStakingWrapper } from "./styled";

// import { useDispatch } from "react-redux";

export default function AvailablePool() {
  const [state, setState] = useCustomState({});
  // useEffect(() => {}, []);
  const [openStakeModal, setOpenStakeModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailModal, setOpenFailModal] = useState(false);
  // const [checked, setChecked] = useState(true);
  // const toggleChecked = () => {
  //   setChecked(false);
  // };
  const handleOpenSuccessModal = () => {
    setOpenStakeModal(false);
    setOpenSuccessModal(true);
  };
  const handleOpenFailModal = () => {
    setOpenStakeModal(false);
    setOpenFailModal(true);
  };
  const maxRewardPool = getState()?.staking?.maxRewardPool;
  const balanceStakingPool = getState()?.staking?.balanceStakingPool;

  const data = [
    {
      nameCoin: symbol,
      fullName: `${symbol} Token`,
      remainingSlot: maxRewardPool,
      fullSlot: balanceStakingPool,
      stakeTime: dataStaking,
    },
    // {
    //   nameCoin: "BNB",
    //   fullName: "Binance Coin",
    //   remainingSlot: 7450000,
    //   fullSlot: 10000000,
    //   stakeTime: [
    //     { text: "30 days", type: 180, apr: 6.3 },
    //     { text: "60 days", type: 360, apr: 7.3 },
    //     { text: "90 days", type: 540, apr: 8.3 },
    //   ],
    // },
  ];
  const symbol = useSelector((state) => state.contracts.symbol);

  return (
    <TableStakingWrapper data={data}>
      {/* <Timeline/> */}
      <Row gutter={[24, 24]} justify="start" className="header">
        <Col span={8}>Token</Col>
        {/* <Col span={6}>Remaining slot:</Col> */}
        <Col span={8} style={{ marginLeft: "7px" }}>
          Choose stake :
        </Col>
      </Row>
      {data.map((itemRow, rowIndex) => {
        return (
          <Row
            key={rowIndex}
            gutter={[24, 24]}
            justify="start"
            className="content"
          >
            <Col span={8} className="token-name">
              <div className={itemRow.nameCoin === symbol ? "img-ivi" : "img"}>
                {itemRow.nameCoin === symbol ? (
                  <img src={require("@images/IVI-IVI.png")} />
                ) : (
                  <img src={require("@images/BNB-IVI.png")} />
                )}
              </div>
              <div>
                <div className="name-coin">{itemRow.nameCoin}</div>
                <div>{itemRow.fullName}</div>
              </div>
            </Col>

            <Col span={8} className="stake-time">
              {itemRow.stakeTime.map((item, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    className={
                      state.activeCol === colIndex &&
                      state.activeRow === rowIndex
                        ? "time-block active"
                        : "time-block none-active"
                    }
                    onClick={() => {
                      setState({
                        activeCol: colIndex,
                        activeRow: rowIndex,
                        data: itemRow,
                      });
                    }}
                  >
                    <div className="type">{item?.text}</div>
                    {item?.text !== "Flexible" ? (
                      <div className="apr">{item?.apr}%</div>
                    ) : (
                      <div className="apr">
                        {item?.apr}%{item?.unit}
                      </div>
                    )}
                  </div>
                );
              })}
            </Col>
            <Col className="est-apr" span={8}>
              <div className="button-stake">
                <Button
                  onClick={() => {
                    // toggleChecked();
                    setState({ data: itemRow });
                    setOpenStakeModal(true);
                  }}
                >
                  Stake Now
                </Button>
              </div>
            </Col>
          </Row>
        );
      })}
      <StakeModal
        data={state.data}
        activeCol={state.activeCol}
        // rowIndex={state.activeRow}
        openStakeModal={openStakeModal}
        setOpenStakeModal={setOpenStakeModal}
        handleOpenSuccessModal={handleOpenSuccessModal}
        handleOpenFailModal={handleOpenFailModal}
        // checked={checked}
        // setChecked={setChecked}
      />
      <SuccessModal
        type="stake"
        openSuccessModal={openSuccessModal}
        setOpenSuccessModal={setOpenSuccessModal}
      />
      <FailModal
        type="stake"
        openFailModal={openFailModal}
        setOpenFailModal={setOpenFailModal}
      />
    </TableStakingWrapper>
  );
}
