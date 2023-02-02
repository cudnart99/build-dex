import { CorrectLine } from "@assets/animation";
import {
  LineChartIcon,
  ProgramingArrows,
  RegionChartIcon,
  TicketCircleIcon,
  XIcon,
} from "@assets/svg";
import BaseModal from "@components/base/BaseModal";
import TradeButton from "@components/TradeButton";
import LinearText from "@pages/trade/components/LinearText";
import snackbarUtils from "@utils/snackbar-utils";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { ethers } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import MultipleLinesChart from "./MultipleLinesChart";
import PieChart from "./PieChart";
import IVIAreaChart from "./RegionChart";
import SaleTable from "./SaleTable";
import {
  ClaimWrapper,
  Divider,
  LegendPoint,
  LineItem,
  SwitchButtonStyled,
} from "./styled";
const Claim = ({
  data = [],
  totalTokenUnlock = 0,
  pieData = [],
  privateTokenCanClaim,
  seedTokenCanClaim,
  releasePrivateToken,
  releasePublicToken,
  releasePublicTokenByIndex,
  releasePrivateByIndex,
  transferOwnership,
  arrTimeLock = [],
  currentVesting = {},
  getAllSmartContract = () => {},
}) => {
  const { setCurrentTime } = useDispatch()?.vesting;
  const [dataChart, setDataChart] = useState(data);

  const handleChangeMonth = (month) => {
    if (month == 1) {
      setDataChart(data);
    } else {
      const newData = [];
      const integralPartOfMonth = parseInt(data?.length / month);
      const remainderPartOfMonth =
        data?.length - parseInt(data?.length / month) * month;
      if (month == 6) {
        for (let i = 0; i < integralPartOfMonth; i++) {
          let newObj = {
            amountPrivate:
              data[6 * i].amountPrivate +
              data[6 * i + 1].amountPrivate +
              data[6 * i + 2].amountPrivate +
              data[6 * i + 3].amountPrivate +
              data[6 * i + 4].amountPrivate +
              data[6 * i + 5].amountPrivate,
            amountSeed:
              data[6 * i].amountSeed +
              data[6 * i + 1].amountSeed +
              data[6 * i + 2].amountSeed +
              data[6 * i + 3].amountSeed +
              data[6 * i + 4].amountSeed +
              data[6 * i + 5].amountSeed,
            date: data[6 * i + 5].date,
            index: i,
            status: data[6 * i + 5].status,
            total:
              data[6 * i].total +
              data[6 * i + 1].total +
              data[6 * i + 2].total +
              data[6 * i + 3].total +
              data[6 * i + 4].total +
              data[6 * i + 5].total,
          };
          newData.push(newObj);
        }
      } else if (month == 3) {
        for (let i = 0; i < integralPartOfMonth; i++) {
          let newObj = {
            amountPrivate:
              data[3 * i].amountPrivate +
              data[3 * i + 1].amountPrivate +
              data[3 * i + 2].amountPrivate,
            amountSeed:
              data[3 * i].amountSeed +
              data[3 * i + 1].amountSeed +
              data[3 * i + 2].amountSeed,
            date: data[3 * i + 2].date,
            index: i,
            status: data[3 * i + 2].status,
            total:
              data[3 * i].total + data[3 * i + 1].total + data[3 * i + 2].total,
          };
          newData.push(newObj);
        }
      }

      var remainderObj = {
        amountPrivate: 0,
        amountSeed: 0,
        date: "",
        index: 0,
        status: 0,
        total: 0,
      };
      for (let i = remainderPartOfMonth; i > 0; i--) {
        remainderObj.amountPrivate += data[data?.length - i].amountPrivate;
        remainderObj.amountSeed += data[data?.length - i].amountSeed;
        remainderObj.date = data[data?.length - 1].date;
        remainderObj.index = data[data?.length - 1].index;
        remainderObj.status = data[data?.length - 1].status;
        remainderObj.total += data[data?.length - i].total;
      }
      newData.push(remainderObj);
      setDataChart(newData);
    }
  };

  const [state, _setState] = useState({
    status: 0,
    chartToggle: 1,
  });
  const [filterData, setFilterData] = useState(data);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  let seedAmountIsZero = data.every((item) => !item.amountSeed);
  let privateAmountIsZero = data.every((item) => !item.amountPrivate);

  const handleResetFilter = () => {
    setState({
      status: 0,
    });
    setFilterData(data);
  };
  const handleChangeFilter = (filterName, value) => {
    if (filterName === "status" && value === 0) {
      setFilterData(data);
    } else {
      let resultData = [...data]?.filter((item) => item[filterName] === value);
      setFilterData(resultData);
    }
  };
  useEffect(() => {
    const handleScreenSwidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleScreenSwidth);
    return () => {
      window.removeEventListener("resize", handleScreenSwidth);
    };
  });

  useEffect(() => {
    setFilterData(data);
  }, [data]);
  const SwitchButton = ({ displayy = "block" }) => {
    return (
      <SwitchButtonStyled test={displayy}>
        <div className="d-flex switch-chart">
          <TradeButton
            parentClassName={state.chartToggle === 1 ? "active-btn" : ""}
            type={"transparent_white"}
            content={"Line Chart"}
            icon={<LineChartIcon />}
            onClick={() => {
              setState({
                chartToggle: 1,
              });
            }}
          />
          <TradeButton
            parentClassName={state.chartToggle === 2 ? "active-btn" : ""}
            type={"transparent_white"}
            content={"Region Chart"}
            icon={<RegionChartIcon />}
            onClick={() => {
              setState({
                chartToggle: 2,
              });
            }}
          />
        </div>
      </SwitchButtonStyled>
    );
  };
  const transferOwnershipModalRef = useRef();
  const [form] = Form.useForm();

  return (
    <ClaimWrapper>
      <div className="parent-wrapper">
        <LinearText
          className=" mt-7"
          title={"Token Vesting"}
          fontSize={screenWidth > 576 ? "50px" : "40px"}
          lineHeight={screenWidth > 576 ? "70px" : "55px"}
        />{" "}
        <div className="text-white font-italic">
          * All transactions are timed in GMT +7
        </div>
        <div className="d-flex justify-content-end mb-2">
          <TradeButton
            icon={<ProgramingArrows />}
            parentClassName="d-flex justify-content-center"
            content={"Transfer Ownership"}
            type="gradient"
            onClick={() => {
              transferOwnershipModalRef?.current?.show({
                submit: form.submit,
              });
            }}
          />{" "}
        </div>
        <div className="d-flex justify-content-space-between mb-4">
          <div className="reset-btn-wrapper">
            <Button
              className="d-flex align-items-center"
              onClick={handleResetFilter}
            >
              <XIcon />
              <span>Reset filter</span>
            </Button>
          </div>
          <div className="d-flex gap-10">
            {" "}
            {arrTimeLock?.length > 1 && (
              <div className="filter-group2">
                <div className="custom-select-wrapper">
                  <div className="select-prefix">
                    <TicketCircleIcon className="custom-css-icon" />
                    <span style={{ left: "125px" }}>
                      {currentVesting?.smcAddress.substring(0, 4) +
                        "..." +
                        currentVesting?.smcAddress.substring(
                          currentVesting?.smcAddress?.length - 4,
                          currentVesting?.smcAddress?.length
                        )}{" "}
                    </span>
                  </div>
                  <Select
                    optionLabelProp="label"
                    defaultValue={currentVesting?.smcAddress}
                    value={currentVesting?.smcAddress}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setCurrentTime(
                        arrTimeLock.find((item) => item.smcAddress === value)
                      );
                    }}
                  >
                    {arrTimeLock?.map((item, key) => {
                      let text =
                        item?.smcAddress.substring(0, 4) +
                        "..." +
                        item?.smcAddress.substring(
                          item?.smcAddress?.length - 4,
                          item?.smcAddress?.length
                        );
                      return (
                        <Select.Option
                          key={key}
                          value={item.smcAddress}
                          label={item.total + ` ${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                        >
                          <span>{text}</span>
                          <span>{item.total + ` ${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`} </span>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
            )}
            <div className="filter-group">
              <div className="custom-select-wrapper">
                <div className="select-prefix">
                  <TicketCircleIcon className="custom-css-icon" />
                  <span>Status: </span>
                </div>
                <Select
                  onChange={(val) => {
                    setState({ status: val });
                    handleChangeFilter("status", val);
                  }}
                  value={state.status}
                  style={{ width: "100%" }}
                  options={[
                    { label: "All", value: 0 },
                    { label: "Coming soon", value: 1 },
                    { label: "Claim", value: 3 },
                    { label: "Claimed", value: 2 },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <SaleTable
          data={filterData}
          totalTokenUnlock={totalTokenUnlock}
          seedTokenCanClaim={seedTokenCanClaim}
          privateTokenCanClaim={privateTokenCanClaim}
          releasePrivateToken={releasePrivateToken}
          releasePublicToken={releasePublicToken}
          releasePublicTokenByIndex={releasePublicTokenByIndex}
          releasePrivateByIndex={releasePrivateByIndex}
        />
        <Divider display={screenWidth > 991 ? "none" : "block"} />
        <div className="pie-chart-group-container d-flex">
          <div className="group-legend">
            <div className="legend-item">
              <LegendPoint background="linear-gradient(146.05deg, #1CAD98 20.12%, #59D2D0 80.17%)" />
              <span>Claimable</span>
            </div>
            <div className="legend-item">
              <LegendPoint background="linear-gradient(294.51deg, #726FCE 26.67%, #6A4FF0 74.82%)" />
              <span>Claimed</span>
            </div>
            <div className="legend-item">
              <LegendPoint background="linear-gradient(139.08deg, #F39550 31.07%, #D56F81 79.41%)" />
              <span>Coming soon</span>
            </div>
          </div>
          <Row className="chart-section">
            {[
              { keyValue: "seed", chartName: "Seed Sale" },
              { keyValue: "private", chartName: "Private Sale" },
              { keyValue: "total", chartName: "Total" },
            ].map((item, inx) => {
              let isNotShow = !(inx != 2
                ? pieData.some((record) => record[item.keyValue])
                : pieData.some((record) => record.seed) &&
                  pieData.some((record) => record.private));
              return isNotShow ? (
                <React.Fragment key={inx}></React.Fragment>
              ) : (
                <Col xl={8} xs={24} className="pie-chart-wrapper" key={inx}>
                  <PieChart
                    data={pieData}
                    keyValue={item.keyValue}
                    chartName={item.chartName}
                    width={350}
                    height={400}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
        <Divider display={screenWidth > 991 ? "none" : "block"} />
        <h1 className="line-chart-section-openning">Allocating Schedule</h1>
        <div className="line-chart-button-switch">
          <SwitchButton displayy={screenWidth < 991 ? "block" : "none"} />
        </div>
        <div className="line-and-area-chart-container">
          <div className="mb-4 d-flex header-function justify-content-space-between">
            <SwitchButton displayy={screenWidth > 991 ? "block" : "none"} />
            <div className="month-filter">
              <Button
                className={`month-filter__item`}
                onClick={() => handleChangeMonth(1)}
              >
                1m
              </Button>
              <Button
                className={`month-filter__item`}
                onClick={() => handleChangeMonth(3)}
              >
                3m
              </Button>
              <Button
                className={`month-filter__item`}
                onClick={() => handleChangeMonth(6)}
              >
                6m
              </Button>
            </div>
          </div>
          <Row>
            <Col span={24} className="lines-chart-wrapper">
              {state.chartToggle === 1 ? (
                <MultipleLinesChart data={dataChart} />
              ) : (
                <IVIAreaChart data={dataChart} />
              )}
            </Col>
            <div className="custom-chart-legend d-flex">
              {!privateAmountIsZero && (
                <div className="custom-chart-legend__item">
                  <LineItem color="#1B76FF" />
                  <span>Private sale</span>
                </div>
              )}
              {!seedAmountIsZero && (
                <div className="custom-chart-legend__item">
                  <LineItem color="#DE71C9" />
                  <span>Seed sale</span>
                </div>
              )}
              {state.chartToggle === 1 &&
                !(privateAmountIsZero || seedAmountIsZero) && (
                  <div className="custom-chart-legend__item">
                    <LineItem color="#8C3CF4" />
                    <span>Total</span>
                  </div>
                )}
            </div>
          </Row>
        </div>
      </div>
      <BaseModal
        ref={transferOwnershipModalRef}
        title="Transfer ownership"
        ignoreCancel={true}
        renderForm={() => {
          return (
            <Form
              layout="vertical"
              form={form}
              onFinish={(values) => {
                transferOwnership(values).then(() => {
                  snackbarUtils.success(
                    "Transfer successfull!",
                    <CorrectLine />
                  );
                  transferOwnershipModalRef.current.hide();
                  getAllSmartContract();
                });
              }}
            >
              <Form.Item
                label={"New owner address"}
                name={"address"}
                rules={[
                  {
                    require: true,
                    message: "Please input new owner address!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value && ethers.utils.isAddress(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Invalid address!"));
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          );
        }}
      />
    </ClaimWrapper>
  );
};

export default Claim;
