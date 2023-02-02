import { DolaIcon, TicketCircleIcon } from "@assets/svg";
import BaseResponsive from "@components/base/BaseResponsive";
import TradeDatePicker from "@components/TradeDatePicker";
import { TradeSelect } from "@components/TradeInputStyled";
import { filterData } from "@constants/datahub/history";
import useCustomState from "@hook/useCustomState";
import { Col, Row } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HistoryWrapper } from "./styled";
import { SelectType } from "@components/TradeBasicSelect/styled";
import { strings } from "@utils/index";

function History() {
  //Data
  const { history } = useSelector((state) => state.datasharing);
  const { search: getAssetFromBe } = useDispatch()["datahub"];

  const [load, setLoad] = useState(true);
  const [state, setState] = useCustomState({
    mapData: filterData[0],
    status: filterData[0].status[0],
    ranges: [moment().add(-6, "months"), moment()],
  });
  const { mapData, status, ranges, source } = state;
  //Get data & effect
  const { getDataHistory } = useDispatch()?.datasharing;
  useEffect(() => {
    getDataHistory({ mapData });
    setTimeout(() => setLoad(false), 1000);
  }, [mapData]);

  useEffect(() => {
    let data = history;
    if (!isEmpty(ranges)) {
      let startDate = ranges[0];
      let endDate = ranges[1];
      data = history?.filter(
        (item) => item.time >= startDate && item.time <= endDate
      );
    }
    try {
      if (status?.value) {
        setState({
          source: data
            .filter((item) => item.status == status.value)
            ?.map((item, index) => ({ ...item, index: index + 1 })),
        });
      } else {
        setState({
          source: data?.map((item, index) => ({ ...item, index: index + 1 })),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => setLoad(false), 1000);
  }, [history, status, ranges]);

  useEffect(() => {
    let mapValue = mapData.value;
    if ([3, 4, 5].includes(mapValue)) {
      let listAssetCId = source?.map((item) => item?.data);
      if (listAssetCId?.every((item) => item)) {
        getAssetFromBe({
          ids: listAssetCId?.join(","),
          page: 0,
          size: 99999,
        })
          .then((res) => {
            if (res?.data?.code === 200) {
              setState({
                mergeData: state?.source?.map((item) => ({
                  ...item,
                  data:
                    res?.data?.data?.filter(
                      (asset) => asset?.assetCId === item?.data
                    )[0]?.displayCId || item?.data,
                })),
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    setTimeout(() => setLoad(false), 1000);
  }, [source]);

  return (
    <HistoryWrapper>
      <div className="history-container">
        <BaseResponsive
          loading={load}
          action={
            <Row gutter={[24, 24]} className="mb-4">
              <Col sm={5}>
                <TradeSelect
                  className="trade-select-item__1"
                  tag={`${strings("history.type")}:`}
                  icon={<DolaIcon className="cutom-css-icon" />}
                  options={filterData}
                  value={mapData.value}
                  onChange={(value, object) => {
                    setState({
                      mapData: object,
                      status: object?.status?.[0],
                      ranges: [moment().add(-6, "months"), moment()],
                      source: [],
                    });
                    setLoad(true);
                  }}
                />
              </Col>
              {mapData?.status && (
                <Col sm={5}>
                  <TradeSelect
                    className="trade-select-item__2"
                    tag={`${strings("history.status")}:`}
                    icon={<TicketCircleIcon className="cutom-css-icon" />}
                    options={mapData.status}
                    value={status.value}
                    onChange={(value, object) => {
                      setState({ status: object, ranges: null });
                      setLoad(true);
                    }}
                  />
                </Col>
              )}

              <Col sm={7}>
                <TradeDatePicker
                  value={ranges}
                  placeholder={[strings("component.timeFrom"), strings("component.timeTo")]}
                  onChange={(ranges) => {
                    setState({ ranges });
                    setLoad(true);
                  }}
                />
              </Col>
            </Row>
          }
          columns={mapData.columns}
          dataSource={
            [3, 4, 5].includes(mapData.value) ? state?.mergeData : source
          }
          clientSearch={true}
          rowKey={"index"}
        />
      </div>
    </HistoryWrapper>
  );
}

export default History;
