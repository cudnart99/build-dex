import TradePagination from "@components/TradePagination";
import useCustomState from "@hook/useCustomState";
import { getState } from "@redux";
import { convertDate } from "@utils/index";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClaimRedeemLockedModal from "../Model/ClaimRedeemLockedModal";
import FailModal from "../Model/ResultModal/FailModal";
import SuccessModal from "../Model/ResultModal/SuccessModal";
import { YourPoolWrapper } from "./styled";

export default function YourPool() {
  const [state, setState] = useCustomState({
    page: 0,
    size: 10,
  });
  const handleChangePage = (page, pageSize) => {
    setState({
      page: page - 1,
      size: pageSize,
    });
  };
  const { page, size } = state;
  const [openClaimModal, setOpenClaimModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailModal, setOpenFailModal] = useState(false);
  const handleOpenSuccessModal = () => {
    setOpenClaimModal(false);
    setOpenSuccessModal(true);
  };
  const handleOpenFailModal = () => {
    setOpenClaimModal(false);
    setOpenFailModal(true);
  };
  const getAllStakeUser = useDispatch()?.staking?.getAllStakeUser;
  const viewAmountBonusCurrent = useDispatch()?.staking?.viewAmountBonusCurrent;
  const allData = getState()?.staking.allData;
  var refresh = getState()?.staking.refresh;
  var tableType = getState()?.staking.tableType;
  const fetchData = async () => {
    await getAllStakeUser();
  };

  const sortDataByStakeDate = allData?.sort(function (a, b) {
    var keyA = new Date(convertDate(a?.stakeDate)),
      keyB = new Date(convertDate(b?.stakeDate));
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
  useEffect(() => {
    fetchData();
  }, [refresh, tableType]);
  // status = 1 : redeem
  // status = 2 : can claim
  // status = 3 : cannot claim
  const symbol = useSelector((state) => state.contracts.symbol);

  return (
    <YourPoolWrapper>
      <Row gutter={[24, 24]} justify="start" className="header">
        <Col span={1}>#</Col>
        <Col className="token-name" span={2}>
          Token
        </Col>
        <Col span={2}>APR</Col>
        <Col span={3}>Stake time</Col>
        <Col span={3}>
          Stake Date
          <br />
          (UTC+07:00)
        </Col>
        <Col span={3}>
          End Date
          <br />
          (UTC+07:00)
        </Col>
        <Col span={3}>Your balance</Col>
        <Col span={7}>Reward</Col>
      </Row>
      {sortDataByStakeDate
        ?.slice(page * size, page * size + size)
        .map((item, rowIndex) => {
          return (
            <Row
              key={rowIndex}
              gutter={[24, 24]}
              justify="start"
              className="content"
            >
              <Col span={1} className="index">
                <div>{page * size + rowIndex + 1}</div>
              </Col>
              <Col span={2} className="token-name">
                <span className={item?.nameCoin === symbol ? "img-ivi" : "img"}>
                  {item?.nameCoin === symbol ? (
                    <img src={require("@images/IVI-IVI.png")} />
                  ) : (
                    <img src={require("@images/BNB-IVI.png")} />
                  )}
                </span>
                <span className="name-coin">{item?.nameCoin}</span>
              </Col>
              <Col span={2} className="apr">
                <div className="apr-value">{item?.stakeTime?.apr} %</div>
              </Col>
              <Col span={3} className="stake-time">
                <span className="text">{item?.stakeTime?.text}</span>
              </Col>
              <Col span={3} className="stake-date">
                <span className="time">{item?.stakeDate}</span>
              </Col>
              <Col span={3} className="stake-date">
                <span className="time">{item?.endDate}</span>
              </Col>
              <Col span={3} className="coin">
                <span className="icon-coin">
                  <img src={require("@images/ivi-coin.png")} />
                </span>
                <span className="balance">
                  {/* {item?.yourBalance?.formatCurrency()} */}
                  {item?.yourBalance?.formatCurrency()}
                </span>
              </Col>
              <Col span={7} className="reward">
                <div className="coin">
                  <span className="icon-coin">
                    <img src={require("@images/ivi-coin.png")} />
                  </span>
                  <span className="balance">
                    {/* {item?.reward?.formatCurrency()} */}
                    {item?.tokenCanClaimed?.formatCurrency()}
                  </span>
                </div>
                {item?.stakeTime?.text === "Flexible" ? (
                  <div className="d-flex">
                    <div className="button-stake">
                      {item?.status === 1 ? (
                        <Button
                          onClick={() => {
                            setOpenClaimModal(true);
                            getAllStakeUser();
                            setState({
                              modalType: 2,
                              data: item,
                            });
                          }}
                        >
                          Claim
                        </Button>
                      ) : (
                        <Button disabled={true} className="disabled">
                          Claim
                        </Button>
                      )}
                    </div>
                    <div className="button-stake">
                      <Button
                        onClick={() => {
                          setOpenClaimModal(true);
                          getAllStakeUser();
                          setState({
                            modalType: 1,
                            data: item,
                          });
                        }}
                      >
                        Redeem
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="button-stake">
                    {item?.status === 1 ? (
                      <Button
                        onClick={() => {
                          setOpenClaimModal(true);
                          getAllStakeUser();
                          setState({
                            modalType: item?.status,
                            data: item,
                          });
                        }}
                      >
                        Redeem
                      </Button>
                    ) : item?.status === 2 ? (
                      <Button
                        onClick={() => {
                          getAllStakeUser();
                          viewAmountBonusCurrent({ IDStake: item?.IDStake });
                          setOpenClaimModal(true);
                          setState({
                            modalType: item?.status,
                            data: item,
                          });
                        }}
                      >
                        Claim
                      </Button>
                    ) : (
                      <Button disabled={true} className="disabled">
                        Claim
                      </Button>
                    )}
                  </div>
                )}
              </Col>
            </Row>
          );
        })}
      <TradePagination
        pageSizeOptions={[3, 5, 10, 15]}
        defaultCurrent={state.page}
        defaultPageSize={state.size}
        onChange={handleChangePage}
        total={sortDataByStakeDate?.length}
        current={state.page + 1}
      />
      <ClaimRedeemLockedModal
        status={state.modalType}
        openClaimModal={openClaimModal}
        setOpenClaimModal={setOpenClaimModal}
        data={state.data}
        handleOpenSuccessModal={handleOpenSuccessModal}
        handleOpenFailModal={handleOpenFailModal}
      />
      <SuccessModal
        type={state.modalType === 1 ? "redeem" : "claim"}
        openSuccessModal={openSuccessModal}
        setOpenSuccessModal={setOpenSuccessModal}
      />
      <FailModal
        type={state.modalType === 1 ? "redeem" : "claim"}
        openFailModal={openFailModal}
        setOpenFailModal={setOpenFailModal}
      />
    </YourPoolWrapper>
  );
}
