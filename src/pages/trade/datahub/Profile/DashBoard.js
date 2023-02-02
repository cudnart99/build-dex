import React, { useEffect } from "react";
import { WrapperDashBoard } from "./styled";

import { BitcoinLogo, DolaIcon } from "@assets/svg";
import DotIcon from "@components/DotIcon";
import FilterTime from "@components/FilterTime";
import { TradeSelect } from "@components/TradeInputStyled";
import useCustomState from "@hook/useCustomState";
import { Divider } from "@pages/trade/vesting/components/styled";
import { Select } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../components/BarChart";
import MultiLinesChart from "../components/MultiLinesChart";
import PieChartProfile from "../components/PieChartProfile";
import { TIME_PICKER } from "./dataProfile";
import { strings } from "@utils/index";
const { OptGroup, Option } = Select;
const colors = [
  { label: strings("DashBoard.label"), value: "#1B76FF" },
  { label: strings("DashBoard.label1"), value: "#DE71C9" },
  { label: strings("DashBoard.label2"), value: "#8C3CF4" },
  { label: strings("DashBoard.label3"), value: "#f43c98" },
];
function DashBoard() {
  const {
    ownerGetCollectedData,
    ownerGetListAcceptedReceivedRequests,
    getLineChartData,
  } = useDispatch()?.datasharing;

  const {
    flag,
    owner,
    buyer,
    ownerListPostedData,
    ownerListMigrateDataBySignature,
    buyerListAcceptRequest,
    ownerListReportRequest,
    earnChart,
    depositData,
    withdrawData,
    purchaseData,
    salesData,
  } = useSelector((state) => state.datasharing);

  const { scrWidth } = useSelector((state) => state.global);

  const migrateDataIgnorePostedData = (
    ownerListMigrateDataBySignature
      ? Object.keys(ownerListMigrateDataBySignature)
          ?.map((key) => ownerListMigrateDataBySignature[key])
          ?.filter((item) => {
            return ownerListPostedData.every(
              (subItem) => subItem?.dataCid !== item?.metadataCid
            );
          })
      : []
  ).filter((item) => !!item);

  const pieData = [
    {
      name: strings("DashBoard.pieData-listed"),
      assets: ownerListPostedData?.length || 0,
    },
    {
      name: strings("DashBoard.pieData-owner"),
      assets: migrateDataIgnorePostedData?.length || 0,
    },
    {
      name: strings("DashBoard.pieData-granted"),
      assets: buyerListAcceptRequest?.length || 0,
    },
    {
      name: strings("DashBoard.pieData-reported"),
      assets: ownerListReportRequest?.length || 0,
    },
  ];

  useEffect(() => {}, [
    ownerListPostedData,
    migrateDataIgnorePostedData,
    buyerListAcceptRequest,
    ownerListReportRequest,
  ]);

  const total =
    pieData.reduce((sum, item) => {
      return sum + item.assets;
    }, 0) || 0;

  const Legend = [
    {
      color: "linear-gradient(146.05deg, #1CAD98 20.12%, #59D2D0 80.17%)",
    },
    {
      color: "linear-gradient(146.05deg, #726FCE 20.12%, #6A4FF0 80.17%)",
    },
    {
      color: "linear-gradient(146.05deg, #F39550 20.12%, #D56F81 80.17%)",
    },
    {
      color: "linear-gradient(146.05deg, #DC66E7 20.12%, #FFCAC5 80.17%)",
    },
  ];
  const convertData = () => {
    let value = state.active.subValue;
    let type = state.active.type;
    let currentTime = moment();
    let startTime = moment().subtract(value, type);
    let mergeData = [];
    if (state?.barRanger?.[1]) {
      let startTime = state?.barRanger?.[0];
      let endTime = state?.barRanger?.[1];
      let diffDay = endTime.diff(startTime, "days") + 1;
      for (let index = 0; index < diffDay; index++) {
        let date = startTime;
        mergeData.push({
          name: date.format("DD-MM-YYYY"),
          data: earnChart?.filter(
            (item) =>
              moment.unix(item.createdAt._hex).format("DD-MM-YYYY") ==
              date.format("DD-MM-YYYY")
          ),
          total:
            earnChart
              ?.filter(
                (item) =>
                  moment.unix(item.createdAt._hex).format("DD-MM-YYYY") ==
                  date.format("DD-MM-YYYY")
              )
              ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) || 0,
          IVI:
            earnChart
              ?.filter(
                (item) =>
                  moment.unix(item.createdAt._hex).format("DD-MM-YYYY") ==
                  date.format("DD-MM-YYYY")
              )
              ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) || 0,
          IHI: 0,
          USDT: 0,
        });
        startTime.add(1, "days");
      }
    } else {
      if (value) {
        if (value === 1) {
          if (type === "days") {
            for (let index = 0; index < 24; index++) {
              let date = startTime;
              mergeData.push({
                name: date.format("HH") + ":00:00",
                data: earnChart?.filter(
                  (item) =>
                    moment.unix(item.createdAt._hex).format("DD-MM-YYYY HH") ==
                    date.format("DD-MM-YYYY HH")
                ),
                total:
                  earnChart
                    ?.filter(
                      (item) =>
                        moment
                          .unix(item.createdAt._hex)
                          .format("DD-MM-YYYY HH") ==
                        date.format("DD-MM-YYYY HH")
                    )
                    ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) ||
                  0,
                IVI:
                  earnChart
                    ?.filter(
                      (item) =>
                        moment
                          .unix(item.createdAt._hex)
                          .format("DD-MM-YYYY HH") ==
                        date.format("DD-MM-YYYY HH")
                    )
                    ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) ||
                  0,
                IHI: 0,
                USDT: 0,
              });
              startTime.add(1, "hours");
            }
          } else {
            let numMonth = currentTime.diff(startTime, "days");

            for (let index = 0; index < numMonth; index++) {
              let date = startTime;
              mergeData.push({
                name: date.format("DD-MM-YYYY"),
                data: earnChart?.filter(
                  (item) =>
                    moment.unix(item.createdAt._hex).format("DD-MM-YYYY") ==
                    date.format("DD-MM-YYYY")
                ),
                total:
                  earnChart
                    ?.filter(
                      (item) =>
                        moment.unix(item.createdAt._hex).format("DD-MM-YYYY") ==
                        date.format("DD-MM-YYYY")
                    )
                    ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) ||
                  0,
                IVI:
                  earnChart
                    ?.filter(
                      (item) =>
                        moment.unix(item.createdAt._hex).format("DD-MM-YYYY") ==
                        date.format("DD-MM-YYYY")
                    )
                    ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) ||
                  0,
                IHI: 0,
                USDT: 0,
              });
              startTime.add(1, "days");
            }
          }
        } else {
          for (let index = 0; index < value; index++) {
            let date = startTime;
            if (type == "days") {
              mergeData.push({
                name: date.format("DD-MM-YYYY"),
                data: earnChart?.filter(
                  (item) =>
                    moment.unix(item.createdAt._hex).format("DD-MM-YYYY") ==
                    date.format("DD-MM-YYYY")
                ),
                total:
                  earnChart
                    ?.filter(
                      (item) =>
                        moment.unix(item.createdAt._hex).format("DD-MM-YYYY") ==
                        date.format("DD-MM-YYYY")
                    )
                    ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) ||
                  0,
                IVI:
                  earnChart
                    ?.filter(
                      (item) =>
                        moment.unix(item.createdAt._hex).format("DD-MM-YYYY") ==
                        date.format("DD-MM-YYYY")
                    )
                    ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) ||
                  0,
                IHI: 0,
                USDT: 0,
              });
            } else {
              mergeData.push({
                name: date.format("MM-YYYY"),
                data: earnChart?.filter(
                  (item) =>
                    moment.unix(item.createdAt._hex).format("MM-YYYY") ==
                    date.format("MM-YYYY")
                ),
                total:
                  earnChart
                    ?.filter(
                      (item) =>
                        moment.unix(item.createdAt._hex).format("MM-YYYY") ==
                        date.format("MM-YYYY")
                    )
                    ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) ||
                  0,
                IVI:
                  earnChart
                    ?.filter(
                      (item) =>
                        moment.unix(item.createdAt._hex).format("MM-YYYY") ==
                        date.format("MM-YYYY")
                    )
                    ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) ||
                  0,
                IHI: 0,
                USDT: 0,
              });
            }
            startTime.add(1, type);
          }
        }
      } else {
        let years = [
          ...new Set(
            earnChart.map((item) =>
              moment.unix(item.createdAt._hex).format("YYYY")
            )
          ),
        ];
        years.sort((a, b) => Number(a) - Number(b));
        mergeData = years.map((year) => ({
          name: year,
          total:
            earnChart
              ?.filter(
                (item) =>
                  moment.unix(item.createdAt._hex).format("YYYY") == year
              )
              ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) || 0,
          IVI:
            earnChart
              ?.filter(
                (item) =>
                  moment.unix(item.createdAt._hex).format("YYYY") == year
              )
              ?.reduce((a, b) => a + b.tokenAmount?.hexToDecimal(), 0) || 0,
          IHI: 0,
          USDT: 0,
        }));
      }
    }

    setState({ barData: mergeData });
  };

  const [state, setState] = useCustomState({
    active: TIME_PICKER[0],
    lineStatus: 0,
  });
  // Effects

  useEffect(() => {
    let container = document.querySelector(".wrapper-container");
    container.scrollTo(0, 0);
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!flag && owner && buyer) {
      getLineChartData();
      ownerGetCollectedData();
      ownerGetListAcceptedReceivedRequests({});
    }
  }, [owner, buyer]);
  const convertLineChartData = () => {
    let mergeData = [];
    let dataSource = [];
    if (!state.lineStatus) {
      dataSource = [
        ...purchaseData.map((item) => ({ ...item, type: 1 })),
        ...salesData.map((item) => ({ ...item, type: 2 })),
        ...depositData.map((item) => ({ ...item, type: 3 })),
        ...withdrawData.map((item) => ({ ...item, type: 4 })),
      ];
      if (state?.barRanger?.[1]) {
        let startTime = state?.barRanger?.[0];
        let endTime = state?.barRanger?.[1];
        let diffDay = endTime.diff(startTime, "days") + 1;
        for (let index = 0; index < diffDay; index++) {
          let date = startTime;
          mergeData.push({
            name: date.format("DD-MM-YYYY"),
            type1:
              dataSource
                ?.filter(
                  (item) =>
                    item.time.format("DD-MM-YYYY") ===
                      date.format("DD-MM-YYYY") && item.type === 1
                )
                ?.reduce((a, b) => a + b.price, 0) || 0,
            type2:
              dataSource
                ?.filter(
                  (item) =>
                    item.time.format("DD-MM-YYYY") ===
                      date.format("DD-MM-YYYY") && item.type === 2
                )
                ?.reduce((a, b) => a + b.price, 0) || 0,
            type3:
              dataSource
                ?.filter(
                  (item) =>
                    item.time.format("DD-MM-YYYY") ===
                      date.format("DD-MM-YYYY") && item.type === 3
                )
                ?.reduce((a, b) => a + b.price, 0) || 0,
            type4:
              dataSource
                ?.filter(
                  (item) =>
                    item.time.format("DD-MM-YYYY") ===
                      date.format("DD-MM-YYYY") && item.type === 4
                )
                ?.reduce((a, b) => a + b.price, 0) || 0,
          });
          startTime.add(1, "days");
        }
      } else {
        let value = state.active.subValue;
        let type = state.active.type;
        let currentTime = moment();
        let startTime = moment().subtract(value, type);

        if (value) {
          if (value === 1) {
            if (type === "days") {
              for (let index = 0; index < 24; index++) {
                let date = startTime;
                mergeData.push({
                  name: date.format("HH") + ":00:00",
                  type1:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY HH") ===
                            date.format("DD-MM-YYYY HH") && item.type === 1
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type2:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY HH") ===
                            date.format("DD-MM-YYYY HH") && item.type === 2
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type3:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY HH") ===
                            date.format("DD-MM-YYYY HH") && item.type === 3
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type4:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY HH") ===
                            date.format("DD-MM-YYYY HH") && item.type === 4
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                });
                startTime.add(1, "hours");
              }
            } else {
              let numMonth = currentTime.diff(startTime, "days");

              for (let index = 0; index < numMonth; index++) {
                let date = startTime;
                mergeData.push({
                  name: date.format("DD-MM-YYYY"),
                  type1:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ===
                            date.format("DD-MM-YYYY") && item.type === 1
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type2:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ===
                            date.format("DD-MM-YYYY") && item.type === 2
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type3:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ===
                            date.format("DD-MM-YYYY") && item.type === 3
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type4:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ===
                            date.format("DD-MM-YYYY") && item.type === 4
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                });
                startTime.add(1, "days");
              }
            }
          } else {
            for (let index = 0; index < value; index++) {
              let date = startTime;
              if (type === "days") {
                mergeData.push({
                  name: date.format("DD-MM-YYYY"),
                  type1:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ===
                            date.format("DD-MM-YYYY") && item.type === 1
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type2:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ===
                            date.format("DD-MM-YYYY") && item.type === 2
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type3:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ===
                            date.format("DD-MM-YYYY") && item.type === 3
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type4:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ===
                            date.format("DD-MM-YYYY") && item.type === 4
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                });
              } else {
                mergeData.push({
                  name: date.format("MM-YYYY"),
                  type1:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("MM-YYYY") ===
                            date.format("MM-YYYY") && item.type === 1
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type2:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("MM-YYYY") ===
                            date.format("MM-YYYY") && item.type === 2
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type3:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("MM-YYYY") ===
                            date.format("MM-YYYY") && item.type === 3
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                  type4:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("MM-YYYY") ===
                            date.format("MM-YYYY") && item.type === 4
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                });
              }
              startTime.add(1, type);
            }
          }
        } else {
          let years = [
            ...new Set(dataSource.map((item) => item.time.format("YYYY"))),
          ];
          years.sort((a, b) => Number(a) - Number(b));
          mergeData = years.map((year) => ({
            name: year,
            type1:
              dataSource
                ?.filter(
                  (item) => item.time.format("YYYY") === year && item.type === 1
                )
                ?.reduce((a, b) => a + b.price, 0) || 0,
            type2:
              dataSource
                ?.filter(
                  (item) => item.time.format("YYYY") === year && item.type === 2
                )
                ?.reduce((a, b) => a + b.price, 0) || 0,
            type3:
              dataSource
                ?.filter(
                  (item) => item.time.format("YYYY") === year && item.type === 3
                )
                ?.reduce((a, b) => a + b.price, 0) || 0,
            type4:
              dataSource
                ?.filter(
                  (item) => item.time.format("YYYY") === year && item.type === 4
                )
                ?.reduce((a, b) => a + b.price, 0) || 0,
          }));
        }
      }
    } else {
      switch (state.lineStatus) {
        case 1:
          dataSource = purchaseData;
          break;
        case 2:
          dataSource = salesData;
          break;
        case 3:
          dataSource = depositData;
          break;
        case 4:
          dataSource = withdrawData;
          break;
        default:
          dataSource = [];
          break;
      }
      let globalType = state.lineStatus;
      if (state?.barRanger?.[1]) {
        let startTime = state?.barRanger?.[0];
        let endTime = state?.barRanger?.[1];
        let diffDay = endTime.diff(startTime, "days") + 1;
        for (let index = 0; index < diffDay; index++) {
          let date = startTime;
          mergeData.push({
            name: date.format("DD-MM-YYYY"),
            [`type${globalType}`]:
              dataSource
                ?.filter(
                  (item) =>
                    item.time.format("DD-MM-YYYY") == date.format("DD-MM-YYYY")
                )
                ?.reduce((a, b) => a + b.price, 0) || 0,
          });
          startTime.add(1, "days");
        }
      } else {
        let value = state.active.subValue;
        let type = state.active.type;
        let currentTime = moment();
        let startTime = moment().subtract(value, type);

        if (value) {
          if (value === 1) {
            if (type === "days") {
              for (let index = 0; index < 24; index++) {
                let date = startTime;
                mergeData.push({
                  name: date.format("HH") + ":00:00",
                  [`type${globalType}`]:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY HH") ==
                          date.format("DD-MM-YYYY HH")
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                });
                startTime.add(1, "hours");
              }
            } else {
              let numMonth = currentTime.diff(startTime, "days");

              for (let index = 0; index < numMonth; index++) {
                let date = startTime;
                mergeData.push({
                  name: date.format("DD-MM-YYYY"),
                  [`type${globalType}`]:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ==
                          date.format("DD-MM-YYYY")
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                });
                startTime.add(1, "days");
              }
            }
          } else {
            for (let index = 0; index < value; index++) {
              let date = startTime;
              if (type === "days") {
                mergeData.push({
                  name: date.format("DD-MM-YYYY"),
                  [`type${globalType}`]:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("DD-MM-YYYY") ==
                          date.format("DD-MM-YYYY")
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                });
              } else {
                mergeData.push({
                  name: date.format("MM-YYYY"),
                  [`type${globalType}`]:
                    dataSource
                      ?.filter(
                        (item) =>
                          item.time.format("MM-YYYY") == date.format("MM-YYYY")
                      )
                      ?.reduce((a, b) => a + b.price, 0) || 0,
                });
              }
              startTime.add(1, type);
            }
          }
        } else {
          let years = [
            ...new Set(dataSource.map((item) => item.time.format("YYYY"))),
          ];
          years.sort((a, b) => Number(a) - Number(b));
          mergeData = years.map((year) => ({
            name: year,
            [`type${globalType}`]:
              dataSource
                ?.filter((item) => item.time.format("YYYY") === year)
                ?.reduce((a, b) => a + b.price, 0) || 0,
          }));
        }
      }
    }
    console.log(mergeData);
    setState({ lineChartData: mergeData });
  };
  useEffect(() => {
    if (depositData) convertLineChartData();
  }, [depositData, state.active, state.lineStatus, state.barRanger]);

  useEffect(() => {
    if (earnChart) convertData();
  }, [earnChart, state.barRanger, state.active]);
  return (
    <React.Fragment>
      <div className="d-flex justify-content-end mb-2">
        <FilterTime
          value={state?.active?.value}
          options={TIME_PICKER}
          onChange={(a, b) => {
            let exist = TIME_PICKER.find((item) => item.value === a);
            setState({
              active: b,
              ...(exist ? { barRanger: null } : {}),
            });
          }}
          onTimeChange={(ranger) => {
            setState({ barRanger: ranger });
          }}
        />
      </div>{" "}
      <WrapperDashBoard>
        <div className="chart-container">
          <div className="piechart-container">
            <div className="piechart-total">
              <span>{strings("DashBoard.txt")}</span>
              <span>{total}</span>
            </div>
            <div className="piechart-item">
              <div className="piechart-item-left">
                <PieChartProfile
                  data={pieData}
                  keyValue={"assets"}
                  chartName={""}
                />
              </div>

              <div className="piechart-item-right">
                {pieData.map((item, index) => {
                  return (
                    <div key={index} className="content-right">
                      {/* <LegendPoint background={Legend[index].color} /> */}
                      <DotIcon color={Legend[index].color} />
                      <span className="content-right-legend">
                        <span className="content-right-legend-left">
                          {item.name}
                        </span>
                        <span>{item.assets}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="barchart-container">
            <div className="barchart-total">
              <span>{strings("DashBoard.txt2")}</span>
            </div>

            <div style={{ overflowX: "scroll" }}>
              <BarChart data={state?.barData || []} />
            </div>
          </div>
        </div>
        <div className="line-chart-container">
          <div className="line-chart-left">
            <div className="d-flex justify-content-space-between">
              {" "}
              <h2 className="line-chart-left-title">
                {strings("DashBoard.txt3")}{" "}
              </h2>
            </div>
            <div className="line-chart-filter">
              <div className="line-chart-filter__item">
                <TradeSelect
                  tag={strings("DashBoard.tag")}
                  icon={<DolaIcon className="cutom-css-icon" />}
                  onChange={(lineStatus) => {
                    setState({ lineStatus });
                  }}
                  value={state.lineStatus}
                >
                  <OptGroup label={strings("DashBoard.label4")}>
                    {[
                      { label: strings("DashBoard.label5"), value: 0 },
                      { label: strings("DashBoard.label"), value: 1 },
                      { label: strings("DashBoard.label1"), value: 2 },
                      { label: strings("DashBoard.label2"), value: 3 },
                      { label: strings("DashBoard.label3"), value: 4 },
                    ].map((item, index) => {
                      return (
                        <Option
                          key={index}
                          value={item.value}
                          style={{
                            background:
                              item.value === state.lineStatus && item.value
                                ? colors[item.value - 1].value
                                : "white",
                            color:
                              item.value === state.lineStatus && item.value
                                ? "white"
                                : "black",
                          }}
                        >
                          {item.label}
                        </Option>
                      );
                    })}
                  </OptGroup>
                </TradeSelect>
              </div>

              <div className="line-chart-filter__item">
                <TradeSelect
                  tag={"Token: "}
                  icon={<BitcoinLogo className="cutom-css-icon" />}
                  defaultValue={0}
                >
                  <OptGroup label={strings("DashBoard.label4")}>
                    {[
                      { label: "All", value: 0 },
                      { label: process.env.REACT_APP_STABLE_TOKEN_SYMBOL, value: 1 },
                    ].map((item, index) => {
                      return (
                        <Option key={index} value={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </OptGroup>
                </TradeSelect>
              </div>
            </div>

            <div className="line-chart-wrapper">
              <MultiLinesChart data={state.lineChartData || 0} />
            </div>
          </div>
          {scrWidth < 992 && (
            <Divider marginTop={60} marginBottom={scrWidth > 576 ? 45 : 20} />
          )}
          <div className="line-chart-right">
            <h2 className="line-chart-right-title">{strings("DashBoard.txt4")}</h2>
            <div className="line-chart-right-item ">
              <img
                className="line-chart-right-item-img"
                src={require("@images/trade/datahub/IVI-currency.png")}
              />
              <div className="line-chart-right-item-content">
                <div className="content-up">
                  <span> {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}</span>
                  <span>
                    {state?.lineChartData
                      ?.reduce(
                        (a, b) =>
                          a +
                          (b.type1 || 0) +
                          (b.type2 || 0) +
                          (b.type3 || 0) +
                          (b.type4 || 0),
                        0
                      )
                      ?.formatCurrency()}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                gap: "10px",
                paddingRight: "50px",
              }}
            >
              {colors.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex justify-content-space-between"
                  >
                    <DotIcon color={item.value} />
                    <span className="content-right-legend">
                      <span className="content-right-legend-left">
                        {item.label}
                      </span>
                      <span>{item.assets}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </WrapperDashBoard>
    </React.Fragment>
  );
}

export default DashBoard;
