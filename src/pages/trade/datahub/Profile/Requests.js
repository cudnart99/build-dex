import BaseResponsive from "@components/base/BaseResponsive";
import TradeButton from "@components/TradeButton";
import { assetStatusDatamarket, DatahubNotiTypeEnum } from "@constants/index";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import useCustomState from "@hook/useCustomState";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { CustomSearch } from "@pages/trade/components/styled";
import { getLengthAddressByWindowScreen } from "@utils/";
import { strings } from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ModalConfirmRequest from "./components/ModalConfirmRequest";
import ModalSuccessNoti from "./components/ModalSuccessNoti";
import ModalWaitingConfirm from "./components/ModalWaitingConfirm";
import { RequestWrapper } from "./styled";

const rejectClassName = [
  "text__inline",
  "ant-btn ant-btn-default d-flex align-items-center ",
];
const Requests = () => {
  //hook
  const [state, setState] = useCustomState({
    // table page size
    page: 0,
    size: 10,
    // 0 for received, 1 for made
    tableType: 0,
    // Modal confirm
    isShowModalConfirm: false,
    isShowModalWaiting: false,
    isShowModalSuccessNoti: false,
    columns: [],
  });

  const [dataSearch, setDataSearch] = useState(null);

  const { create: createNoti } = useDispatch()["datahubNotifications"];
  const { scrWidth } = useSelector((state) => state?.global);
  const { location } = useHistory();

  const {
    ownerListReceivedRequests,
    buyerListSentRequests,
    responsePeriod,
    owner,
    buyer,
  } = useSelector((state) => state?.datasharing);

  const { address } = useSelector((state) => state?.contracts);

  const {
    ownerGetListReceivedRequests,
    ownerGetResponsePeriod,
    ownerAcceptRequest,
    ownerDeclineRequest,
    buyerGetListSentRequests,
  } = useDispatch()?.datasharing;

  const { patch: updateAssetBe, search: getAssetFromBe } =
    useDispatch()?.datahub;

  //effect
  useEffect(() => {
    if (owner && buyer) {
      fetchData();
    }
  }, [owner, buyer]);
  const { width } = useDebounceWindowResize();
  const fetchData = async () => {
    setState({ loading: true });
    await ownerGetListReceivedRequests();
    await ownerGetResponsePeriod();
    await buyerGetListSentRequests();
    setState({ loading: false });
  };
  //column

  //function
  const handleShowModalConfirm = (record) => {
    setState({
      isShowModalConfirm: true,
      currentTime: record?.createdAt?.hexToNumber(),
      currentRequestId: record.requestId,
      currentRequestData: record,
    });
  };
  const getColumns = () => {
    return [
      {
        title: "#",
        dataIndex: "stt",
        key: "stt",
        render: (data, dataObject, index) => {
          return state.page * state.size + index + 1;
        },
        width: "5%",
      },
      {
        title: strings("requests.title-1"),
        dataIndex: "dataCid",
        key: "dataCid",
        width: "20%",
        render: (dataCid) => (
          <AddressTooltip
            address={dataCid || ""}
            getLengthAddress={getLengthAddressByWindowScreen(dataCid, width)}
          />
        ),
        sm: 12,
        ignoreTitle: true,
        contentBold: true,
      },
      {
        title: strings("component.price"),
        dataIndex: "tokenAmount",
        key: "tokenAmount",
        width: "10%",
        render: (tokenAmount) => tokenAmount?.hexToDecimal(),
        sm: 24,
        contentBold: true,
        widthLeft: {
          ipad: 30,
        },
      },
      {
        title: state.tableType ? strings("requests.title-2") : strings("component.from"),
        dataIndex: "buyer",
        key: "buyer",
        width: "20%",
        render: (buyer, obj) => (
          <AddressTooltip
            address={(state.tableType ? obj.dataOwner : buyer) || ""}
            getLengthAddress={getLengthAddressByWindowScreen(
              state.tableType ? obj.dataOwner : buyer,
              width
            )}
          />
        ),
        sm: 24,
        contentBold: true,
        widthLeft: {
          ipad: 30,
        },
      },
      {
        title: strings("requests.title-4"),
        dataIndex: "createdAt",
        key: "createdAt",
        width: "15%",
        render: (createdAt) => {
          return moment
            .unix(createdAt?.hexToNumber() + responsePeriod)
            .format("DD-MM-YYYY HH:mm:ss");
        },
        sm: 24,
        contentBold: true,
        widthLeft: {
          ipad: 30,
        },
      },

      {
        title: strings("component.status"),
        dataIndex: "status",
        key: "status",
        width: "10%",
        sm: 24,
        contentBold: true,
        widthLeft: {
          ipad: 30,
        },
        render: (status, record) => {
          switch (status) {
            case 0:
              return state.tableType ? (
                <>{strings("requests.txt")}</>
              ) : (
                <TradeButton
                  content={strings("component.confirm")}
                  type="gradient"
                  onClick={() => {
                    handleShowModalConfirm(record);
                  }}
                />
              );
            case 1:
              return <span style={{ color: "red" }}>{strings("requests.Rejected")}</span>;
            case 2:
              return <span style={{ color: "#0A9921" }}>{strings("requests.Accepted")}</span>;
            case 3:
              return <span style={{ color: "#C6C6C6" }}>{strings("requests.Reported")}</span>;
            case 4:
              return <span style={{ color: "#C6C6C6" }}>{strings("requests.Expired")}</span>;
            case 5:
              return <span style={{ color: "#C6C6C6" }}>{strings("requests.Accused")}</span>;
            default:
              break;
          }
        },
      },
    ];
  };
  const handleCloseModalConfirm = (event) => {
    if (rejectClassName.includes(event.target.className)) {
      setState({
        isShowModalWaiting: true,
        isShowModalConfirm: false,
      });
      ownerDeclineRequest({ requestId: state.currentRequestId })
        .then((res) => {
          setState({
            isShowModalSuccessNoti: true,
          });
        })
        .catch((err) => {
          console.log("err", err);

          snackbarUtils.error(
            `${strings("requests.error-content")} ${
              err?.reason || strings("requests.error-content-1")
            }`
          );
        })
        .finally((err) => {
          ownerGetListReceivedRequests();
          setState({
            isShowModalWaiting: false,
            isShowModalConfirm: false,
          });
        });
    } else {
      setState({
        isShowModalConfirm: false,
      });
    }
  };
  const handleConfirm = async (event) => {
    console.log("CONFIRM");
    setState({
      isShowModalWaiting: true,
      isShowModalConfirm: false,
    });
    let detailInfo = ((await DatahubAssetProvider.search({
      id: state.currentRequestData?.dataCid,
    })?.data?.data) || [])[0];
    ownerAcceptRequest({ requestId: state.currentRequestId })
      .then(async (res) => {
        // update tradingStatus in BE
        let body = {
          tradingStatus: assetStatusDatamarket.GRANTED,
          buyer: state.currentRequestData?.buyer,
          id: state.currentRequestData?.dataCid,
          grantedTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        await updateAssetBe(body);

        createNoti({
          type: DatahubNotiTypeEnum.WHEN_OWNER_ACCEPTED_REQUEST_ACCESS_DATA,
          fromUser: address,
          toUser: state.currentRequestData?.buyer,
          dataName: detailInfo?.displayCId,
          assetCId: state.currentRequestData?.dataCid,
        });

        setState({
          isShowModalSuccessNoti: true,
        });
      })
      .catch((err) => {
        console.log("err", err);
        createNoti({
          type: DatahubNotiTypeEnum.WHEN_OWNER_REJECTED_REQUEST_ACCESS_DATA,
          fromUser: address,
          toUser: state.currentRequestData?.buyer,
          dataName: detailInfo?.displayCId,
          assetCId: state.currentRequestData?.dataCid,
        });
        snackbarUtils.error(
          `${strings("requests.error-content-2")} ${
            err?.reason || strings("requests.error-content-1")
          }`
        );
      })
      .finally((err) => {
        ownerGetListReceivedRequests();

        setState({
          isShowModalWaiting: false,
          isShowModalConfirm: false,
        });
      });
  };
  const handleCloseModalSuccessNoti = () => {
    setState({
      isShowModalSuccessNoti: false,
    });
  };
  const handleDebounceSearch = (e) => {
    let dataFilter = null;
    let value = e?.target?.value;
    if (state.tableType) {
      dataFilter = buyerListSentRequests;
    } else {
      dataFilter = ownerListReceivedRequests;
    }
    dataFilter = dataFilter
      .filter(function (str) {
        return str.dataCid.toLowerCase().includes(value.toLowerCase());
      })
      ?.sort((a, b) => {
        return (
          moment.unix(b?.createdAt._hex).unix() -
          moment.unix(a?.createdAt._hex).unix()
        );
      });
    setDataSearch(dataFilter);
    if (!value) {
      setDataSearch(null);
    }
  };
  const updateDataSource = () => {
    let columns = getColumns();
    setTimeout(() => {
      let dataSource =
        dataSearch === null
          ? (state.tableType
              ? buyerListSentRequests
              : ownerListReceivedRequests
            )?.sort((a, b) => {
              return (
                moment.unix(b?.createdAt._hex).unix() -
                moment.unix(a?.createdAt._hex).unix()
              );
            })
          : dataSearch;
      getAssetFromBe({
        ids: dataSource?.reduce((a, b) => [...a, b.dataCid], [])?.join(","),
        page: 0,
        size: 99999,
      })
        .then((res) => {
          if (res?.data?.code === 200) {
            let data = res?.data?.data;

            setState({
              dataSource: dataSource?.map((item) => {
                return {
                  ...item,
                  dataCid: data?.find(
                    (subItem) => subItem?.assetCId == item?.dataCid
                  )?.displayCId,
                };
              }),
              loading: false,
              columns,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };
  useEffect(() => {
    updateDataSource();
  }, [
    dataSearch,
    state.tableType,
    buyerListSentRequests,
    ownerListReceivedRequests,
  ]);
  return (
    <RequestWrapper>
      <div className="search-header text-right mb-2 d-flex justify-content-end">
        <CustomSearch
          placeholder={strings("component.searchByName")}
          width={scrWidth > 1200 ? "33%" : scrWidth > 992 ? "50%" : "100%"}
          allowClear={true}
          onChange={handleDebounceSearch}
        />
      </div>
      <div className="tab-change-header mb-3 d-flex justify-content-space-between">
        <MultipleButtonSelect
          options={[
            {
              text: `${strings("requests.MultipleButtonSelect-option-1")} ${
                ownerListReceivedRequests
                  ? ownerListReceivedRequests?.length
                  : ""
              }`,
            },
            {
              text: `${strings("requests.MultipleButtonSelect-option-2")} ${
                buyerListSentRequests ? buyerListSentRequests?.length : ""
              }`,
            },
          ]}
          onChange={(item, index) => {
            console.log("index--------", index);
            setState({
              tableType: index,
              dataSource: [],
              loading: true,
            });
          }}
        />
        <div className="pagination-top"></div>
      </div>
      <div className="requests-table mt-4">
        <BaseResponsive
          loading={state.loading}
          columns={state.columns}
          dataSource={state.dataSource}
          clientSearch={true}
          rowKey={"requestId"}
          callbackWhenSearch={(data = {}) => {
            console.log("data-----------", data);
            setState({ ...data });
          }}
        />
      </div>
      <ModalConfirmRequest
        open={state.isShowModalConfirm}
        onCancel={handleCloseModalConfirm}
        onOk={handleConfirm}
        responsePeriod={responsePeriod}
        currentTime={state.currentTime}
        data={state.currentRequestData}
      />
      <ModalWaitingConfirm open={state.isShowModalWaiting} />
      <ModalSuccessNoti
        open={state.isShowModalSuccessNoti}
        onCancel={handleCloseModalSuccessNoti}
        data={state.currentRequestData}
      />
    </RequestWrapper>
  );
};

export default Requests;
