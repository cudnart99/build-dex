import { CloseOutlined } from "@ant-design/icons";
import { CorrectLine, WrongLine } from "@assets/animation";
import jsonData from "@assets/json/iviicd10.json";
import {
  ClockIcon,
  DepositIcon,
  Eye,
  HeartBrightIcon,
  HomeDataHUb,
  IviCurrency,
  Locked,
  RedHeart,
  WalletIcon,
} from "@assets/svg";
import BaseModal from "@components/base/BaseModal";
import ModalNotification from "@components/ModalBaseNotifi";
import TradeButton from "@components/TradeButton";
import RandomWaitingModal from "@components/WaitingRandom";
import BreadCrumMapping from "@constants/breadcrumb";
import { DatahubNotiTypeEnum } from "@constants/index";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import AssetLikedProvider from "@data-access/liked-provider";
import useCustomState from "@hook/useCustomState";
import useQuerySearchParams from "@hook/useQuerySearchParams";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { ShareDataIcon } from "@pages/trade/components/constants";
import ModalChangePrice from "@pages/trade/components/ModalChangePrice";
import { copyToClipBoard, getLengthAddress, strings } from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import { Button, Switch, Tooltip } from "antd";
import { ethers } from "ethers";
import moment from "moment/moment";
import React, { useEffect, useMemo, useRef } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ModalWaitingConfirm from "../components/ModalComponent/ModalConfirm";
import ModalConfirmRequest from "../components/ModalConfirmRequest";
import { ButtonSwapToken, tokens } from "../deposit";
import ModalSwap from "../deposit/components/ModalSwap";
import ConfirmDeactiveModal from "./components/ConfirmDeactiveModal";
import ListingModal from "./ListingModal";
import ModalReport from "./ModalReport";
import RecordDetail from "./RecordDetail";
import RecordDetailNoitru from "./RecordDetailNoitru";
import { CircleBackground, CustomBreadCrumb } from "./StaticComponents";
import { AssetDetailWrapper } from "./styled";
const preIcdData = jsonData.reduce((a, b) => [...a, ...b.child], []);

const AssetDetailPage = (props) => {
  //hooks
  const { id } = useParams();
  const { location } = useHistory();
  const { requestId, role } = useQuerySearchParams();
  const { scrWidth } = useSelector((state) => state.global);
  const { owner, buyer, buyerWithDrawable } = useSelector(
    (state) => state.datasharing
  );
  const myAddress = useSelector((state) => state?.contracts?.address);
  const CollectedAfterSignDetailData = useSelector(
    (state) => state?.datasharing[`${role}CollectedAfterSignDetailData`]
  );
  const {
    navigatePageFlag,
    buyerListSentRequests,
    refreshDatahubFlag,
    dataInfo,
  } = useSelector((state) => state.datasharing);

  const {
    buyerAccuseResponse,
    ownerDecryptDataFromOwnedMetadataCid,
    buyerDecryptDataFromOwnedMetadataCid,
    buyerRequestData,
    buyerDeposit,
    buyerWithdrawable,
    updateData: updateDataSharing,
    buyerGetListSentRequests,
    getDataInfo,
    getStatusByOwnerAndCid,
  } = useDispatch()?.datasharing;

  const setAmountDeposit = useDispatch()?.datahub?.setAmountDeposit;
  const listingRef = useRef();
  const amountDeposit = useSelector((state) => state?.datahub?.amountDeposit);
  const breadCrumbPrev = useSelector((state) => state?.global?.breadcrumb);
  const { patch: updateAssetBe } = useDispatch()?.datahub;
  const { create: createNoti } = useDispatch().datahubNotifications;

  const [state, setState] = useCustomState({
    data: {},
    isVisibleReportModal: false,
    isShowModalSucess: false,
    isShowModalError: false,
    isVisibleListingModal: false,
    publicDetailData: null,
    dataOther: [],
    isShowModalConfirm: false,
    isRequested: false,
  });
  let cid = id;
  let dataOwner = useMemo(() => {
    return state.publicDetailData?.owner;
  }, [state.publicDetailData?.owner]);

  const deactiveModalRef = useRef();
  const depositRef = useRef();
  const successRef = useRef();
  const modalChangePriceRef = useRef();

  const { isVisibleReportModal } = state;

  const handleShowModalChangePrice = () => {
    modalChangePriceRef.current.show({
      id: dataInfo.id,
      dataCid: cid,
      callback: getDetailData,
    });
  };

  const GetButtonFromState = ({ page, tradingStatus }) => {
    switch (page) {
      case 1:
        return tradingStatus === 10 && myAddress === (dataOwner || owner) ? (
          <TradeButton
            content={strings("assetDetail.btn1")}
            className="w-full mb-4 mt-4"
            type="gradient"
            onClick={handleShowModalChangePrice}
          />
        ) : (
          <></>
        );

      case 2:
        return (
          <TradeButton
            content={strings("assetDetail.btn2")}
            type="gradient"
            className="w-full"
            onClick={() => {
              listingRef?.current?.show();
            }}
          />
        );
      case 3:
        return (
          <TradeButton
            content={strings("assetDetail.btn3")}
            type="gradient"
            className="w-full"
            onClick={handleOpenReportModal}
            style={{
              background: "none",
              border: "solid 1px white",
              marginTop: "30px",
            }}
          />
        );
      case 4:
        return <></>;
      default:
        return myAddress === dataOwner ? (
          <></>
        ) : state?.publicDetailData?.tradingStatus === 30 ? (
          <></>
        ) : (
          <TradeButton
            disabled={state?.isRequested}
            content={state?.isRequested ? strings("assetDetail.btn4") : strings("assetDetail.btn5")}
            type="gradient"
            className="w-full text-center"
            style={{ height: "50px" }}
            onClick={(e) => {
              e.stopPropagation();
              handleShowModalConfirm();
            }}
          />
        );
    }
  };
  const handleShowModalConfirm = (record) => {
    setState({
      isShowModalConfirm: true,
    });
  };
  const handleCloseModalWaiting = () => {
    setState({
      isOpenModalWaiting: false,
    });
  };
  const handleOpenModalWaiting = () => {
    setState({
      isOpenModalWaiting: true,
    });
  };
  const onSuccessProc = () => {
    setState({
      amount: 0,
    });
  };

  const handleSubmit = () => {
    if (Number(amountDeposit) !== 0) {
      handleOpenModalWaiting();
      buyerDeposit({ amount: amountDeposit })
        .then(() => {
          buyerWithdrawable();
          onSuccessProc();
          handleCloseModalWaiting();
          createNoti({
            type: DatahubNotiTypeEnum.WHEN_USER_DEPOSIT_TO_SMART_CONTRACT_BALANCE_SUCCESSFULLY,
            fromUser: myAddress,
            toUser: myAddress,
            price: Number(amountDeposit),
          });
          snackbarUtils.success(
            strings("assetDetail.txt1"),
            <div>
              <CorrectLine />
            </div>,
            () => {
              buyerRequestAsset();
            },
            strings("assetDetail.txt2")
          );
        })
        .catch((err) => {
          console.log(err);
          handleCloseModalWaiting();
          snackbarUtils.confirm({
            title: strings("assetDetail.txt3"),
            content: (
              <div>
                <WrongLine />
              </div>
            ),
            onOk: () => {
              handleSubmit();
            },
            okText: strings("assetDetail.txt4"),
            cancelText: strings("assetDetail.txt5"),
            closable: true,
            closeIcon: <CloseOutlined />,
            wrapClassName: "wrapper-confirm-modal",
            icon: null,
          });
        });
    } else {
      snackbarUtils.error(strings("assetDetail.txt6"));
    }
  };
  const buyerRequestAsset = (e) => {
    handleOpenModalWaiting();

    buyerRequestData({
      cid: id,
      amount: ethers.utils.parseEther(
        state?.publicDetailData?.price?.toString()
      ),
    })
      .then((res) => {
        setState({ hash: res.hash });

        console.log("send");
        createNoti({
          type: DatahubNotiTypeEnum.WHEN_USER_RECEIVED_REQUEST_ACCESS_TO_DATA_BY_ANY_PURCHASER,
          fromUser: myAddress,
          toUser: dataOwner,
          dataName: state?.publicDetailData?.displayCId,
          assetCId: state?.publicDetailData?.assetCId,
        });
        successRef?.current?.show({
          callback: () => {
            setState({ isShowModalConfirm: false });
          },
        });
      })
      .catch((err) => {
        snackbarUtils.error(
          `${strings("assetDetail.txt7")} ${
            err?.reason || strings("assetDetail.txt8")
          }`
        );
      })
      .finally(() => {
        handleCloseModalWaiting();
        updateDataSharing({
          refreshDatahubFlag: refreshDatahubFlag + 1,
        });
      });
  };

  const handleOpenModalSwap = () => {
    setState({
      isOpenModalSwap: true,
    });
  };
  const handleCloseModalSwap = ({ tokenIdx }) => {
    tokenIdx = tokenIdx === undefined ? state.currentTokenIndex : tokenIdx;
    setState({
      isOpenModalSwap: false,
      currentTokenIndex: tokenIdx,
    });
  };
  //map data
  const { address } = props;

  const dataResult = CollectedAfterSignDetailData?.result
    ? JSON.parse(CollectedAfterSignDetailData?.result)
    : "";
  // const dataResult = jsTest
  const dataDetail = CollectedAfterSignDetailData?.resultDetail
    ? JSON.parse(CollectedAfterSignDetailData?.resultDetail)
    : "";
  /*

        Function  

   */

  const handleOpenReportModal = () => {
    setState({
      isVisibleReportModal: true,
    });
  };
  const handleCloseModalReport = () => {
    setState({
      isVisibleReportModal: false,
    });
  };
  const handleCloseModalSucess = () => {
    setState({
      isShowModalSucess: false,
    });
  };
  const handleCloseModalError = () => {
    setState({
      isShowModalError: false,
    });
  };

  const getDetailData = async () => {
    let params = {
      id,
      userAddress: address,
    };
    await DatahubAssetProvider.search(params)
      .then((res) => {
        if (res && res?.data?.code === 200) {
          setState({
            publicDetailData: (res?.data?.data || [])[0],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const chainId = useSelector((state) => state.contracts.chainId);

  const handleLiked = () => {
    AssetLikedProvider.changeLiked({ cid, address, network: chainId })
      .then((res) => {
        if (res?.data?.code === 200) {
          getDetailData();
        }
      })
      .catch((err) => {});
  };

  const handleCloseModalConfirm = (e) => {
    e?.stopPropagation();

    setState({
      isShowModalConfirm: false,
    });
  };

  const onShowModalDeactive = () => {
    deactiveModalRef.current.show();
  };

  const handleSwitchShowData = (checked) => {
    DatahubAssetProvider.patch(id, { isShowOnMarket: checked })
      .then((res) => {
        if (res?.data?.code === 200) {
          getDetailData();
          deactiveModalRef.current.close();
        } else {
          throw new Error(res?.message);
        }
      })
      .catch((err) => {
        console.log("switch show error", err?.message);
      });
  };

  const checkStatusDisplay = () => {
    if (
      location.state?.page === 1 &&
      state?.publicDetailData?.tradingStatus === 10 &&
      myAddress === (dataOwner || owner)
    ) {
      if (state.publicDetailData?.isShowOnMarket) {
        return 0;
      } else {
        return 1;
      }
    } else {
      if (
        !state?.isRequested &&
        state?.publicDetailData?.tradingStatus !== 30
      ) {
        return 2;
      } else {
        return 3;
      }
    }
  };
  useEffect(() => {
    if (!CollectedAfterSignDetailData) {
      if (role === "owner" && owner && id) {
        ownerDecryptDataFromOwnedMetadataCid({ cid: id });
      } else if (role == "buyer" && buyer && requestId) {
        buyerDecryptDataFromOwnedMetadataCid({ cid: requestId });
      }
    }
  }, [buyer, owner, role]);
  useEffect(() => {
    if (dataOwner) {
      buyerWithdrawable();
    }
  }, [buyer, dataOwner]);
  const getGrantData = async () => {
    let data = await getStatusByOwnerAndCid({ owner: dataOwner, cid });
    setState({ grantData: data });
  };
  useEffect(() => {
    if (state.publicDetailData?.owner && owner) getDataInfo({ dataOwner, cid });
  }, [state.publicDetailData?.owner, owner]);

  useEffect(() => {
    if (id && address) {
      getDetailData();
    }
  }, [id, address]);

  useEffect(() => {
    if (cid && dataOwner && buyer) {
      getGrantData();
    }
  }, [cid, dataOwner, buyer]);

  // check requested effect

  useEffect(() => {
    if (buyer) buyerGetListSentRequests();
  }, [buyer, refreshDatahubFlag, navigatePageFlag]);

  useEffect(() => {
    let listCidRequested = buyerListSentRequests
      ?.filter((item) => item?.status === 0)
      ?.map((item) => item?.dataCid);
    setState({
      isRequested: listCidRequested?.includes(id),
    });
  }, [buyer, buyerListSentRequests, refreshDatahubFlag, navigatePageFlag]);

  /* Data log để anh Hiếu test, không xóa !*/
  /*----------------------------------------*/
  // console.group("Deleting on production");
  // console.log("/*----------------------------------------*/");
  // let background = "background: red; color: yellow; font-size: 40px";
  // console.log("%cData lớn", background);
  // console.log(CollectedAfterSignDetailData);
  // console.log("%cData Result", background);
  // console.log(dataResult);
  // console.log("%cdata Detail", background);
  // console.log(dataDetail);
  // console.log("/*----------------------------------------*/");
  // console.groupEnd("End data console part!");
  /*----------------------------------------*/

  const withDetailData = (Element, checkedData) => {
    if (checkedData) {
      return Element;
    } else {
      return <div className="text-white p-4">Unknown</div>;
    }
  };
  const icdRefFlag = useRef(0);
  useEffect(() => {
    if (dataDetail && dataResult && !icdRefFlag.current) {
      let icdNames = [
        ...(dataDetail?.chanDoan?.split(";") || []),
        ...(dataResult?.chanDoanRaVien?.split(";") || []),
        ...(dataResult?.chanDoanRaVienChiTiet?.split(";") || []),
        ...(dataResult?.chanDoanRaVienKhac?.split(";") || []),
        ...(dataResult?.chanDoanVaoVien?.split(";") || []),
      ].filter((item) => !!item);
      icdNames = icdNames?.map((item) => item?.split(" - ")?.[0]);
      icdNames = [...new Set(icdNames)];
      icdNames = icdNames
        ?.map((code) =>
          preIcdData?.find((item) =>
            item?.child?.some((subItem) => subItem?.code === code)
          )
        )
        ?.map((item) => item?.code);
      setState({ icdNames });
      icdRefFlag.current++;
    }
  }, [dataDetail, dataDetail]);

  const topics = dataResult?.noiTru
    ? [
        {
          label: strings("component.profile"),
          value: 10,
        },
        {
          label: strings("component.DSDV"),
          value: 20,
        },
        {
          label: strings("component.TTHC"),
          value: 30,
        },
        {
          label: strings("component.TTBA"),
          value: 40,
        },
      ]
    : [
        {
          label: strings("component.profile"),
          value: 10,
        },
        {
          label: strings("component.DSDV"),
          value: 20,
        },
        {
          label: strings("component.KQK"),
          value: 50,
        },
        {
          label: strings("component.KQXN"),
          value: 60,
        },
        {
          label: strings("component.CDHA"),
          value: 70,
        },
        {
          label: strings("component.PT&TT"),
          value: 80,
        },
        {
          label: strings("component.medicine"),
          value: 90,
        },
      ];

  return (
    <AssetDetailWrapper>
      <div className="detail-page__head d-flex">
        <div style={{ marginBottom: 30 }}>
          {scrWidth < 768 && (
            <CustomBreadCrumb
              arrayRouteFromParent={[
                {
                  text: BreadCrumMapping(breadCrumbPrev),
                  link: breadCrumbPrev || "/data-hub",
                },
                {
                  text: `${cid?.slice(0, 8)}`,
                },
              ]}
            />
          )}
        </div>
        <div
          className="head-left d-flex align-items-center justify-content-center"
          style={
            location.state?.page === 3
              ? {
                  background:
                    "linear-gradient(123.23deg, #C4C4C4 -16.4%, #707070 71.36%)",
                }
              : {}
          }
        >
          <img
            className="asset-image"
            src={require("@images/trade/datahub/item-example-image.png")}
            alt=""
          />
          <CircleBackground />
        </div>
        <div className="head-right">
          {scrWidth > 768 && (
            <CustomBreadCrumb
              arrayRouteFromParent={[
                {
                  text: BreadCrumMapping(breadCrumbPrev),
                  link: breadCrumbPrev || "/data-hub",
                },
                {
                  text: `${(
                    state?.publicDetailData?.displayCId ||
                    cid ||
                    ""
                  )?.slice(0, 5)}...${(
                    state?.publicDetailData?.displayCId ||
                    cid ||
                    ""
                  )?.slice(
                    (state?.publicDetailData?.displayCId || cid || "")?.length -
                      5
                  )}`,
                },
              ]}
            />
          )}
          <div className="asset-code-and-like d-flex justify-content-space-between">
            <Tooltip
              className="code hover-pointer"
              title={state?.publicDetailData?.displayCId || cid || ""}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipBoard(address);
              }}
            >
              {state?.publicDetailData?.displayCId || cid || ""}
            </Tooltip>
            <Button
              className={`favorite-btn ${
                state?.publicDetailData?.isLikedByCurrentUser && "is-liked"
              }`}
              onClick={handleLiked}
            >
              <HeartBrightIcon />
            </Button>
          </div>
          <div className="small-asset-detail d-flex">
            <div className="date d-flex align-items-center small-asset-detail__item">
              <ClockIcon />
              <span>
                {state?.publicDetailData?.create_at
                  ? moment(state?.publicDetailData?.create_at)?.format(
                      "DD/MM/YYYY"
                    )
                  : ""}
              </span>
            </div>
            <div className="view d-flex align-items-center small-asset-detail__item">
              <Eye />
              <span>{state?.publicDetailData?.viewsCount}</span>
            </div>
            <div className="liked d-flex align-items-center small-asset-detail__item">
              <RedHeart />
              <span>{state?.publicDetailData?.numLikes}</span>
            </div>
          </div>

          <div>
            <div
              className="current-bid-info"
              style={
                checkStatusDisplay() === 0
                  ? {
                      background:
                        "linear-gradient(90deg, rgba(40,167,121, 0.4) 0%, rgba(6,96,62,0.4) 83.69%)",
                      border: "2px solid #048556",
                    }
                  : checkStatusDisplay() === 1
                  ? {
                      background:
                        "linear-gradient(90deg, rgba(110,110,110, 0.4) 0%, rgba(100,100,119, 0.4) 83.69%)",
                      border: "2px solid #5E4B7E",
                    }
                  : (checkStatusDisplay() === 2 ||
                      checkStatusDisplay() === 3) &&
                    state?.publicDetailData?.tradingStatus !== 30
                  ? {
                      background:
                        "linear-gradient(90deg, rgba(40,167,121, 0.4) 0%, rgba(6,96,62,0.4) 83.69%)",
                      border: "2px solid #048556",
                    }
                  : {}
              }
            >
              <div className="creator d-flex justify-content-space-between">
                <div className="info-name">
                  <div>
                    {state?.publicDetailData?.tradingStatus === 30
                      ? `${strings("assetDetail.txt9")} ${
                          state?.publicDetailData?.grantedTime ||
                          moment
                            .unix(state?.grantData?.grantData?.createdAt?._hex)
                            ?.format("DD-MM-YYYY")
                        }`
                      : strings("component.owner")}
                  </div>

                  <div className="info-name-address">
                    <AddressTooltip
                      address={
                        dataOwner ||
                        (location?.state?.page === 2 && myAddress) ||
                        ""
                      }
                      getLengthAddress={getLengthAddress(
                        dataOwner || myAddress,
                        window.innerWidth
                      )}
                    />
                  </div>
                </div>
                {state?.publicDetailData?.tradingStatus === 30 ? (
                  <></>
                ) : (
                  <div className="info-money">
                    <div className="mb-3">{strings("component.price")}</div>

                    <div className="d-flex align-item-center mb-4">
                      <IviCurrency className="mr-2" />
                      <div className="info-money-price">
                        {state?.publicDetailData?.status === 0
                          ? state?.publicDetailData?.price?.formatCurrency()
                          : ""}{" "}
                        {process.env.REACT_APP_STABLE_TOKEN_SYMBOL}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 mb-3">
                <GetButtonFromState
                  page={location.state?.page}
                  tradingStatus={state?.publicDetailData?.tradingStatus}
                />
              </div>
            </div>
          </div>
          {/* {myAddress === (dataOwner || owner) && ( */}
          {state?.publicDetailData?.tradingStatus !== 30 && (
            <div className="footer-detail">
              <div style={{ marginTop: "10px" }}>
                <span className="d-flex align-items-center">
                  <span
                    className="mr-4"
                    style={
                      checkStatusDisplay() === 1
                        ? {
                            opacity: "0.7",
                            color: "white",
                            fontSize: "16px",
                          }
                        : { fontSize: "16px", color: "white" }
                    }
                  >
                    {strings("component.share")}:
                  </span>
                  <span className="icon-medicDetail">
                    {Object.keys(ShareDataIcon).map((key, index) => {
                      let Icon = ShareDataIcon[key].icon;
                      let ShareButton = ShareDataIcon[key]?.Button;
                      return checkStatusDisplay() === 1 ? (
                        ShareButton ? (
                          <ShareButton
                            className="share-btn"
                            disabled={true}
                            key={index}
                            url={window.location.href}
                            style={{
                              opacity: "0.7",
                            }}
                          >
                            <Icon
                              style={{
                                opacity: "0.7",
                              }}
                            />
                          </ShareButton>
                        ) : (
                          <Button
                            className="share-btn"
                            key={index}
                            disabled={true}
                            // onClick={() => {
                            //   ShareDataIcon[key].onClick({
                            //     link: window.location.href,
                            //   });
                            // }}
                          >
                            <Icon
                              style={{
                                opacity: "0.7",
                              }}
                            />
                          </Button>
                        )
                      ) : ShareButton ? (
                        <ShareButton
                          className="share-btn"
                          key={index}
                          url={window.location.href}
                        >
                          <Icon />
                        </ShareButton>
                      ) : (
                        <Button
                          className="share-btn"
                          key={index}
                          onClick={() => {
                            ShareDataIcon[key].onClick({
                              link: window.location.href,
                            });
                          }}
                        >
                          <Icon />
                        </Button>
                      );
                    })}
                  </span>
                </span>
              </div>
              {myAddress === (dataOwner || owner) && (
                <div className="switch-show-data-btn">
                  <span>{strings("assetDetail.txt10")}</span>
                  <Switch
                    onChange={
                      state.publicDetailData?.isShowOnMarket
                        ? onShowModalDeactive
                        : handleSwitchShowData
                    }
                    checked={state.publicDetailData?.isShowOnMarket}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="detail-page__body-wrapper d-flex">
        <div className="left-body">
          <div className="left-content">
            <div className="detail-body__keyword">
              <h1 className="detail-body__title">{strings("assetDetail.txt11")}</h1>
              {withDetailData(
                <div className="detail-body__content">
                  <span className="type-prop">
                    {`<${
                      state?.publicDetailData?.medicalSpecialties || "Unknown"
                    }>`}
                  </span>
                  <p className="content-line">
                    <span className="type-prop">{strings("assetDetail.txt12")}:</span>
                    <span className="type-value font-bold">
                      {state?.publicDetailData?.medicalUnit ||
                        CollectedAfterSignDetailData?.hospitalName}
                    </span>
                  </p>
                </div>,
                state?.publicDetailData ||
                  CollectedAfterSignDetailData?.hospitalName
              )}
            </div>
            <hr />
            <div className="detail-body__type">
              <h1 className="detail-body__title">{strings("assetDetail.txt13")}</h1>
              {withDetailData(
                <div className="detail-body__content">
                  <ul className="list-content">
                    {(
                      state?.publicDetailData?.icdCodes || state?.icdNames
                    )?.map((code, index) => {
                      let label = preIcdData?.find(
                        (subItem) => subItem.code === code
                      )?.viName;
                      return <li key={index}>{label}</li>;
                    })}
                  </ul>
                </div>,
                state?.publicDetailData?.icdCodes || state?.icdNames
              )}
            </div>
            <hr />
            <div className="detail-body__type">
              <h1 className="detail-body__title">{strings("assetDetail.txt14")}</h1>
              {withDetailData(
                <div className="detail-body__content">
                  <div className="detail-body__content">
                    <ul className="list-content">
                      {topics?.map((item, index) => (
                        <li key={index}>{item?.label}</li>
                      ))}
                    </ul>
                  </div>
                </div>,
                topics
              )}
            </div>
          </div>
          <div className="bottom-content">
            <div className="detail-body__keyword">
              <h1 className="detail-body__title">{strings("component.description")}</h1>
              {withDetailData(
                <div className="detail-body__content">
                  <span className="type-prop">
                    {state?.publicDetailData?.description}
                  </span>
                </div>,
                state?.publicDetailData
              )}
            </div>
          </div>
        </div>
        {!CollectedAfterSignDetailData ? (
          <div className="right-content">
            <div className="detail-body__description">
              <h1 className="detail-body__title">{strings("assetDetail.txt15")}</h1>
              <div className="detail-body__content">
                <div className="detail-content">
                  <Locked className="icon-Locked" />
                  <span className="detail-content__text-header">
                    {strings("assetDetail.locked")}
                  </span>{" "}
                  <br />
                  <span className="detail-content__text-body">
                    {strings("assetDetail.txt16")} <br /> {strings("assetDetail.txt17")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="right-content">
            {dataResult?.noiTru ? (
              <RecordDetailNoitru
                data={CollectedAfterSignDetailData}
                dataResult={dataResult}
                dataDetail={dataDetail}
              />
            ) : (
              <RecordDetail
                data={CollectedAfterSignDetailData}
                dataResult={dataResult}
                dataDetail={dataDetail}
              />
            )}
          </div>
        )}
      </div>

      <ModalReport
        open={isVisibleReportModal}
        onOk={() => {
          buyerAccuseResponse({
            requestId: location?.state?.accusseCid,
          })
            .then(async (res) => {
              let body = {
                id: id,
                tradingStatus: 40,
              };

              await updateAssetBe(body);

              snackbarUtils.success(
                strings("assetDetail.txt18")
              );
            })
            .catch((err) => {
              console.log(err);
              snackbarUtils.error(
                strings("assetDetail.txt19"),
                <div>
                  <WrongLine />
                  <div className="text-center">
                    {strings("assetDetail.txt20")}
                  </div>
                </div>
              );
            });
        }}
        onCancel={handleCloseModalReport}
      />
      <ModalNotification
        open={state.isShowModalSucess}
        type={"success"}
        onCancel={handleCloseModalSucess}
        closeContent={"OK"}
        title={strings("assetDetail.txt21")}
        content={strings("assetDetail.txt22")}
      />
      <ModalNotification
        open={state.isShowModalError}
        type={"error"}
        onCancel={handleCloseModalError}
        onOk={() => {
          setState({
            isShowModalSucess: true,
          });
        }}
        content={strings("assetDetail.txt23")}
        title={strings("assetDetail.txt24")}
        closeContent={strings("component.cancel")}
        actionContent={strings("component.retry")}
      />
      <ListingModal
        topics={topics}
        ref={listingRef}
        cid={id}
        data={state?.publicDetailData}
        getDetailData={getDetailData}
        dataDraft={""}
        dataResult={dataResult}
        dataDetail={dataDetail}
        CollectedAfterSignDetailData={CollectedAfterSignDetailData}
        icdNames={state?.icdNames}
      />
      <ModalWaitingConfirm open={false} />
      <ModalConfirmRequest
        dataCid={state?.publicDetailData?.displayCId}
        tokenAmount={state?.publicDetailData?.price}
        dataOwner={dataOwner}
        open={state.isShowModalConfirm}
        onCancel={handleCloseModalConfirm}
        onOk={(e) => {
          e.stopPropagation();
          handleCloseModalConfirm(e);

          if (buyerWithDrawable >= state?.publicDetailData?.price) {
            buyerRequestAsset();
          } else {
            setAmountDeposit({
              amount: state?.publicDetailData?.price - buyerWithDrawable,
            });

            depositRef?.current?.show({ submit: handleSubmit });
          }
        }}
      />
      <ModalSwap
        open={state.isOpenModalSwap}
        onOk={() => {}}
        onCancel={handleCloseModalSwap}
        tokenLists={tokens}
        currentToken={tokens[state.currentTokenIndex]}
      />
      <RandomWaitingModal
        open={state.isOpenModalWaiting}
        title={strings("assetDetail.txt25")}
      />
      <BaseModal
        ref={depositRef}
        title={strings("assetDetail.txt26")}
        renderForm={() => {
          return (
            <>
              <p>{strings("assetDetail.txt27")}</p>
              <p>
                {strings("assetDetail.txt28")}{" "}
                <strong>
                  {state?.publicDetailData?.price - buyerWithDrawable}
                </strong>{" "}
                {process.env.REACT_APP_STABLE_TOKEN_SYMBOL} to complete your
                purchase
              </p>
              <div
                style={{
                  backgroundColor: "#ecf9f4",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <div className="d-flex justify-content-center gap-10">
                  <WalletIcon className="fill-black" />
                  <strong>{strings("assetDetail.Wallet")}</strong>
                  <DepositIcon />
                  <HomeDataHUb className="fill-black" />
                  <strong>{strings("assetDetail.Datahub")}</strong>
                </div>
                <div className="d-flex justify-content-center gap-10">
                  <p>*** {strings("assetDetail.txt30")}</p>
                </div>
                <div>
                  <div className="d-flex justify-content-space-between mb-4">
                    <div>
                      <ButtonSwapToken
                        handleOpenModalSwap={handleOpenModalSwap}
                        state={state}
                      />
                      <div className="token-amount mt-2 d-flex">
                        <CurrencyInput
                          className="currency-input"
                          placeholder={strings("assetDetail.txt31")}
                          style={{
                            width: "100%",
                            // backgroundColor: "rgba(0,0,0,0.1)",
                            // borderRadius: "5px",
                          }}
                          decimalSeparator={"."}
                          groupSeparator={","}
                          decimalsLimit={8}
                          onValueChange={(value) => {
                            setAmountDeposit({
                              amount: value,
                            });
                          }}
                          value={amountDeposit}
                        />
                        {/* <IviCurrency className="mr-2" /> */}
                      </div>
                    </div>
                    <p className="token-balance">
                    {strings("component.balance")}: {buyerWithDrawable}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        }}
        submitText={strings("assetDetail.txt32")}
      />
      <BaseModal
        ignoreCancelButton={true}
        ref={successRef}
        title={strings("assetDetail.txt33")}
        submitText={strings("assetDetail.txt34")}
        renderForm={() => {
          return (
            <>
              <p>
              {strings("assetDetail.txt35")}{" "}
                <strong style={{ wordBreak: "break-word" }}>
                  {state?.publicDetailData?.displayCId}
                </strong>{" "}
                {strings("assetDetail.txt36")}
              </p>

              <p>
              {strings("assetDetail.txt37")}
              </p>
              <div
                style={{
                  backgroundColor: "#ecf9f4",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                }}
              >
                <div
                  className="img-field"
                  style={{
                    backgroundColor: "#ecf9f4",
                    borderRadius: "10px",
                    padding: "10px",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Data ID</span>
                    <span>
                      <strong>
                        {" "}
                        <AddressTooltip
                          address={state?.publicDetailData?.displayCId || ""}
                          getLengthAddress={getLengthAddress(
                            state?.publicDetailData?.displayCId || "",
                            window.innerWidth
                          )}
                        />
                      </strong>
                    </span>
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>{strings("assetDetail.txt38")}</span>
                    <span>
                      {" "}
                      <strong>
                        {" "}
                        {`${state?.publicDetailData?.price} ${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
                      </strong>
                    </span>
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>{strings("assetDetail.txt39")}</span>
                    <span>
                      {" "}
                      <AddressTooltip
                        address={dataOwner}
                        getLengthAddress={getLengthAddress(
                          dataOwner,
                          window.innerWidth
                        )}
                      />
                    </span>
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>{strings("assetDetail.txt40")}</span>
                    <span style={{ color: "#0A9921" }}>{strings("assetDetail.txt41")}</span>
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>{strings("assetDetail.txt42")}</span>
                    <span>
                      <AddressTooltip
                        address={state.hash}
                        getLengthAddress={getLengthAddress(
                          state.hash,
                          window.innerWidth
                        )}
                      />
                    </span>
                  </p>
                </div>
              </div>
            </>
          );
        }}
      />
      <ModalChangePrice ref={modalChangePriceRef} />
      <ConfirmDeactiveModal
        dataCid={state?.publicDetailData?.displayCId}
        dataOwner={state?.publicDetailData?.owner}
        price={state?.publicDetailData?.price}
        ref={deactiveModalRef}
        onOk={() => {
          handleSwitchShowData(false);
        }}
      />
    </AssetDetailWrapper>
  );
};

export default AssetDetailPage;
