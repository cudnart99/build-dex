import { CloseOutlined } from "@ant-design/icons";
import { CorrectLine, WrongLine } from "@assets/animation";
import jsonData from "@assets/json/iviicd10.json";
import {
  DepositIcon,
  HeartBrightIcon,
  HomeDataHUb,
  IviCurrency,
  IviCurrencyDisable,
  WalletIcon,
} from "@assets/svg";
import BaseModal from "@components/base/BaseModal";
import TradeButton from "@components/TradeButton";
import RandomWaitingModal from "@components/WaitingRandom";
import { getStatusByCode } from "@constants";
import { DatahubNotiTypeEnum } from "@constants/index";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import useCustomState from "@hook/useCustomState";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import ModalChangePrice from "@pages/trade/components/ModalChangePrice";
import { getLengthAddress, strings, toDecimal } from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import { Col } from "antd";
import React, { useEffect, useRef } from "react";
import CurrencyInput from "react-currency-input-field";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ListingModal from "../AssetDetail/ListingModal";
import ModalConfirmRequest from "../components/ModalConfirmRequest";
import { ButtonSwapToken, tokens } from "../deposit";
import ModalSwap from "../deposit/components/ModalSwap";
import AssetOptions from "./AssetOptions";
import "./cloneScss.scss";
import ModalWaitingConfirm from "./ModalComponent/ModalConfirm";
import { AssetItemWrapper } from "./styled";

const preIcdData = jsonData.reduce((a, b) => [...a, ...b.child], []);

const CustomBadge = ({ bgColor, text, textColor }) => {
  return (
    <span
      className="custom-badge"
      style={{
        display: "inline-block",
        backgroundColor: bgColor,
        border: "none",
        borderRadius: "10px",
        color: textColor,
        fontWeight: 400,
        fontSize: "11px",
        lineHeight: "14px",
        padding: "4px",
        height: "fit-content",
        // maxHeight: "32px",
      }}
    >
      {text}
    </span>
  );
};

const GrantedOverLay = () => {
  return (
    <div className="granted-overlay">
      <div className="granted d-flex align-items-center justify-content-center">
        <div>
          <p>{strings("asset-item.component.granted")}</p>
          <p>{strings("asset-item.component.sorry")}</p>
        </div>
      </div>
    </div>
  );
};

const GrantedOverLayOwner = () => {
  return (
    <div className="granted-overlay-owner">
      <div className="granted-owner d-flex align-items-center justify-content-center">
        <div>
          <p>{strings("asset-item.component.granted")}</p>
          {/* <p>we 're sorry</p> */}
        </div>
      </div>
    </div>
  );
};

const AssetItem = ({
  buyer,
  data,
  ownerDecryptDataFromOwnedMetadataCid,
  buyerDecryptDataFromOwnedMetadataCid,
  colResponsiveProps,
  type,
  statusItem,
  updateDataSharing,
  changeLike,
  handleLiked = () => {},
  buyerWithDrawable,
  buyerWithdrawable,
  buyerDeposit,
  buyerListSentRequests,
  buyerGetListSentRequests,
  refreshDatahubFlag,
  navigatePageFlag,
  getStatisticData,
}) => {
  const CollectedAfterSignDetailData = useSelector(
    (state) => state?.datasharing[`ownerCollectedAfterSignDetailData`]
  );
  const dataResult = CollectedAfterSignDetailData?.result
    ? JSON.parse(CollectedAfterSignDetailData?.result)
    : "";
  // const dataResult = jsTest
  const dataDetail = CollectedAfterSignDetailData?.resultDetail
    ? JSON.parse(CollectedAfterSignDetailData?.resultDetail)
    : "";
  let {
    code,
    status,
    metadataCid,
    dataCid,
    tokenAmount,
    requestId,
    owner,
    dataOwner,
    price,
    id,
    hashKey,
  } = data || {};

  let displayCId = data?.publicDetail?.displayCId || "";
  let assetCId = data?.publicDetail?.assetCId;
  const history = useHistory();

  const { address, chainId } = useSelector((state) => state.contracts);
  const listingRef = useRef();
  const buyerAccuseResponse = useDispatch()?.datasharing?.buyerAccuseResponse;
  const buyerRequestData = useDispatch()?.datasharing?.buyerRequestData;
  const setAmountDeposit = useDispatch()?.datahub?.setAmountDeposit;
  const { create: createNoti } = useDispatch().datahubNotifications;

  const amountDeposit = useSelector((state) => state?.datahub?.amountDeposit);
  const nameId = type ? dataCid : metadataCid || dataCid || assetCId;

  const { scrWidth } = useSelector((state) => state?.global);

  const { patch: updateAssetBe } = useDispatch()?.datahub;

  const modalChangePriceRef = useRef();

  const [state, setState] = useCustomState({
    isShowModalConfirm: false,
    methodToken: 1,
    currentToken: tokens[0],
    currentTokenIndex: 0,
    // modal swap
    isOpenModalSwap: false,
    // amount:input
    amount: 0,
    // modal waiting
    isOpenModalWaiting: false,
    isShowIcon: false,

    // check user requested
    isRequested: false,
  });
  let { isRequested } = state;
  let cid = type ? requestId : metadataCid || dataCid;

  const depositRef = useRef();
  const successRef = useRef();

  const functionConfirm = () => {
    buyerAccuseResponse({ requestId: requestId })
      .then(async (res) => {
        let body = {
          id: cid,
          tradingStatus: 40,
        };

        await updateAssetBe(body);

        createNoti({
          type: DatahubNotiTypeEnum[
            "WHEN_THE_REPORT_RESULTS_CONFIRM_A_DATA_ERROR_(REPORT_SUCCESSFULLY)"
          ],
          fromUser: address,
          buyerAddress: address,
          toUser: data?.publicDetail?.owner,
          dataName: data?.publicDetail?.displayCId,
          assetCId: data?.publicDetail?.assetCId,
        });

        snackbarUtils.success(
          strings("asset-item.notify.buyer-accuse-success"),
          <div>
            <CorrectLine />
          </div>
        );
      })
      .catch((err) => {
        createNoti({
          type: DatahubNotiTypeEnum[
            "WHEN_THE_REPORT_RESULTS_CONFIRM_THERE’S_NO_DATA_ERROR_(REPORT_FAILED)"
          ],
          fromUser: address,
          buyerAddress: address,
          toUser: data?.publicDetail?.owner,
          dataName: data?.publicDetail?.displayCId,
          assetCId: data?.publicDetail?.assetCId,
        });
        snackbarUtils.error(
          strings("asset-item.notify.buyer-accuse-error"),
          <div>
            <WrongLine />
            <div className="text-center">
              {strings("asset-item.notify.buyer-accuse-error-content")}
            </div>
          </div>
        );
      })
      .finally(() => {
        createNoti({
          type: DatahubNotiTypeEnum.WHEN_RECEIVED_DATA_REPORT_RESULT,
          fromUser: address,
          buyerAddress: address,
          toUser: data?.publicDetail?.owner,
          dataName: data?.publicDetail?.displayCId,
          assetCId: data?.publicDetail?.assetCId,
        });
      });
  };

  const handleUpdateViews = (assetCId) => {
    let body = { assetCId };
    DatahubAssetProvider.updateViews(body)
      .then((res) => {
        // if (res && res?.data?.code === 200) {
        // }
        if (res && res?.data?.code === 400) {
          throw new Error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("error update views", err);
      });
  };

  const handleShowModalConfirm = (record) => {
    setState({
      isShowModalConfirm: true,
    });
  };

  const handleCloseModalConfirm = (e) => {
    e?.stopPropagation();
    setState({
      isShowModalConfirm: false,
    });
  };

  const getButtonFromStatus = (statusItem) => {
    switch (statusItem) {
      case 1:
        return <></>;
      case 2:
        return (
          <TradeButton
            content={strings("asset-item.component.btn-list-data")}
            type="gradient"
            className={"w-full text-center"}
            onClick={async (e) => {
              e.stopPropagation();
              let cid = type ? requestId : metadataCid || dataCid;
              let action = type
                ? buyerDecryptDataFromOwnedMetadataCid
                : ownerDecryptDataFromOwnedMetadataCid;
              await action({
                cid,
              });
              icdRefFlag.current = 0;
              listingRef?.current?.show();
            }}
          />
        );
      case 3:
        return (
          <TradeButton
            content={strings("asset-item.component.btn-report-data")}
            type="gradient"
            className={"w-full text-center"}
            style={{ border: "1px solid #FFFFFF", background: "transparent" }}
            onClick={(e) => {
              e.stopPropagation();

              snackbarUtils.confirm({
                title: strings("asset-item.component.report-data-title"),
                content: strings("asset-item.component.report-data-content"),
                onOk: () => {
                  functionConfirm();
                },
              });
            }}
          />
        );
      case 4:
        return <></>;
      default:
        return data?.owner === address || status === "GRANT" ? (
          <></>
        ) : (
          <TradeButton
            disabled={state?.isRequested}
            content={
              state?.isRequested
                ? strings("asset-item.component.btn-requested")
                : strings("asset-item.component.btn-request-access")
            }
            type="gradient"
            className={"w-full text-center hover-123"}
            onClick={(e) => {
              e.stopPropagation();
              handleShowModalConfirm();
            }}
          />
        );
    }
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

  const handleSubmit = async () => {
    if (Number(amountDeposit) !== 0) {
      handleOpenModalWaiting();
      buyerDeposit()
        .then(() => {
          buyerWithdrawable();
          handleCloseModalWaiting();
          createNoti({
            type: DatahubNotiTypeEnum.WHEN_USER_DEPOSIT_TO_SMART_CONTRACT_BALANCE_SUCCESSFULLY,
            fromUser: address,
            toUser: address,
            price: Number(amountDeposit),
          });
          snackbarUtils.success(
            strings("asset-item.notify.handle-submit-success"),
            <div>
              <CorrectLine />
            </div>,
            () => {
              buyerRequestAsset();
            },
            strings("asset-item.notify.handle-submit-success-2")
          );
        })
        .catch((err) => {
          console.log(err);
          handleCloseModalWaiting();
          snackbarUtils.confirm({
            title: strings("asset-item.notify.handle-submit-fail"),
            content: (
              <div>
                <WrongLine />
              </div>
            ),
            onOk: () => {
              handleSubmit();
            },
            okText: strings("asset-item.notify.handle-submit-fail-ok"),
            cancelText: strings("asset-item.notify.handle-submit-fail-cancel"),
            closable: true,
            closeIcon: <CloseOutlined />,
            wrapClassName: "wrapper-confirm-modal",
            icon: null,
          });
        });
    } else {
      snackbarUtils.error(strings("asset-item.notify.handle-submit-error"));
    }
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

  const buyerRequestAsset = (e) => {
    handleOpenModalWaiting();
    console.log("send request      ");
    buyerRequestData({ cid: dataCid, amount: tokenAmount })
      .then((res) => {
        getStatisticData();
        setState({ hash: res.hash });
        console.log("taoj noti");
        createNoti({
          type: DatahubNotiTypeEnum.WHEN_USER_RECEIVED_REQUEST_ACCESS_TO_DATA_BY_ANY_PURCHASER,
          fromUser: address,
          toUser: data?.publicDetail?.owner,
          dataName: data?.publicDetail?.displayCId,
          assetCId: data?.publicDetail?.assetCId,
        });
        successRef?.current?.show({
          callback: () => {
            setState({ isShowModalConfirm: false });
          },
        });
      })
      .catch((err) => {
        snackbarUtils.error(
          `${strings("asset-item.notify.buyer-request-error")} ${
            err?.reason || strings("asset-item.notify.buyer-request-error-2")
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

  const handleShowModalChangePrice = (e) => {
    e.stopPropagation();
    modalChangePriceRef.current.show({ id, hashKey, dataCid });
  };

  useEffect(() => {
    buyerGetListSentRequests();
  }, [buyer, refreshDatahubFlag, navigatePageFlag]);

  useEffect(() => {
    let listCidRequested = buyerListSentRequests
      ?.filter((item) => item?.status === 0)
      ?.map((item) => item?.dataCid);
    setState({
      isRequested: listCidRequested?.includes(nameId),
    });
  }, [buyer, buyerListSentRequests, refreshDatahubFlag, navigatePageFlag]);
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
          // label: strings("component.profile"1),
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

  return (
    <Col {...colResponsiveProps}>
      <AssetItemWrapper
        className={`trade-item ${status === "DB03" ? "status-granted" : ""}`}
        onClick={(e) => {
          e.stopPropagation();

          let cid = type ? requestId : metadataCid || dataCid;
          if (statusItem) {
            let action = type
              ? buyerDecryptDataFromOwnedMetadataCid
              : ownerDecryptDataFromOwnedMetadataCid;
            action({
              cid,
            }).then((res) => {
              handleUpdateViews(nameId);
              history.push({
                pathname: `/data-hub/asset-detail/${nameId}`,
                search: `role=${type ? "buyer" : "owner"}${
                  requestId ? `&requestId=${requestId}` : ""
                }`,
                state: {
                  page: statusItem,
                  cid: nameId,
                  accusseCid: requestId,
                  owner: owner || dataOwner,
                  isRequested: isRequested,
                },
              });
            });
          } else {
            handleUpdateViews(nameId);
            history.push({
              pathname: `/data-hub/asset-detail/${nameId}`,
              search: `role=${
                data?.owner?.toLowerCase() == address?.toLowerCase()
                  ? "owner"
                  : "buyer"
              }`,
              state: {
                page: statusItem,
                cid: nameId,
                accusseCid: requestId,
                owner: owner || dataOwner,
                isRequested: isRequested,
              },
            });
          }
        }}
      >
        <div
          className={`trade-item__image ${getStatusByCode(
            statusItem
          )?.toLowerCase()} d-flex align-items-center justify-content-center`}
        >
          <img
            className="trade-item__image-card"
            src={require("@images/trade/datahub/item-example-image.png")}
            alt=""
          />
          {/* {status === "GRANT" && <GrantedOverLay />} */}
          {data?.owner === address && status === "GRANT" ? (
            <GrantedOverLayOwner />
          ) : (
            status === "GRANT" && <GrantedOverLay />
          )}

          {/* <img
            className="avatar"
            src={require("@images/trade/datahub/item-example-avatar.png")}
            alt=""
          /> */}
        </div>
        <div
          className="name-and-like-count d-flex align-items-center"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className="name "
            // style={{ width: "100%", lineBreak: "anywhere" }}
          >
            <AddressTooltip
              className="AddressTooltip-card"
              address={displayCId || nameId || ""}
              getLengthAddress={`${displayCId || nameId}
                `}
            />
          </div>
          <div className="ml-3" style={{ marginTop: "16px" }}>
            <CustomBadge
              bgColor="#1B76FF"
              textColor={"white"}
              text="BSC"
              className={"name-and-like-count-badge"}
            />
            {statusItem !== 2 && (
              <div className="like-count d-flex align-items-center mt-2">
                <HeartBrightIcon
                  className={`${
                    data?.publicDetail?.isLikedByCurrentUser && "user-liked"
                  } like-icon `}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLiked({
                      cid: data?.publicDetail?.assetCId || data?.assetCId,
                      address,
                      network: chainId,
                    })
                      ?.then((res) => {
                        if (res?.data?.code === 200) {
                          updateDataSharing({
                            changeLike: !changeLike,
                          });
                        }
                      })
                      .catch((err) => {
                        console.log("Liked action", err?.message);
                      });
                  }}
                />
                <span>{data?.publicDetail?.numLikes || ""}</span>
              </div>
            )}
          </div>
        </div>
        <div className="code d-flex">
          <span className="code-value">{code}</span>
        </div>
        {getStatusByCode(statusItem)?.toLowerCase() !== "reported" ? (
          <div className="current-bid d-flex justify-content-space-between">
            {scrWidth > 576 && <span>{strings("component.price")}</span>}
            <div className="current-bid__value d-flex align-items-center">
              {data?.owner === address && status === "GRANT" ? (
                <span
                  className="currency-value d-flex align-items-center "
                  style={{ color: "#6E6E6E" }}
                >
                  <IviCurrencyDisable className="ivi-currency mr-2" />-{" "}
                  {process.env.REACT_APP_STABLE_TOKEN_SYMBOL}
                </span>
              ) : (
                <span className="currency-value d-flex align-items-center ">
                  <IviCurrency className="ivi-currency mr-2" />
                  {statusItem !== 3
                    ? data?.tokenAmount?.hexToDecimal()?.notFloatingComma() ||
                      data?.publicDetail?.price ||
                      price
                    : "-"}{" "}
                  {process.env.REACT_APP_STABLE_TOKEN_SYMBOL}
                </span>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}

        {getStatusByCode(statusItem)?.toLowerCase() !== "reported"
          ? window.location.pathname === "/data-hub/profile/collected" &&
            address === data?.publicDetail?.owner &&
            statusItem !== 3 && (
              <AssetOptions
                onClick={(e) => {
                  console.log("ok");
                  e.stopPropagation();
                }}
                handleShowModalPriceChange={handleShowModalChangePrice}
                data={data}
              />
            )
          : ""}
        <div className="expired-in-and-request-accept ">
          {getButtonFromStatus(statusItem)}
        </div>
      </AssetItemWrapper>
      <ModalWaitingConfirm open={false} />
      <ModalConfirmRequest
        dataCid={displayCId}
        tokenAmount={toDecimal(tokenAmount)}
        dataOwner={owner}
        open={state.isShowModalConfirm}
        onCancel={handleCloseModalConfirm}
        onOk={(e) => {
          e.stopPropagation();
          handleCloseModalConfirm(e);
          if (buyerWithDrawable >= tokenAmount?.hexToDecimal()) {
            buyerRequestAsset();
          } else {
            setAmountDeposit({
              amount: tokenAmount?.hexToDecimal() - buyerWithDrawable,
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
        title={strings("asset-item.notify.random-waiting-modal")}
      />
      <BaseModal
        ref={depositRef}
        title={strings("asset-item.component.base-modal.title")}
        renderForm={() => {
          return (
            <>
              <p>{strings("asset-item.component.base-modal.txt")}</p>
              <p>
              {strings("asset-item.component.base-modal.txt2")}{" "}
                <strong>
                  {tokenAmount?.hexToDecimal() - buyerWithDrawable}
                </strong>{" "}
                {strings("asset-item.component.base-modal.txt3")}
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
                  <strong>{strings("asset-item.component.base-modal.txt4")}</strong>
                  <DepositIcon />
                  <HomeDataHUb className="fill-black" />
                  <strong>{strings("asset-item.component.base-modal.txt5")}</strong>
                </div>
                <div className="d-flex justify-content-center gap-10">
                  <p>*** {strings("asset-item.component.base-modal.txt6")}</p>
                </div>
                <div>
                  <div className="d-flex justify-content-space-between mb-4">
                    <div>
                      <ButtonSwapToken
                        handleOpenModalSwap={handleOpenModalSwap}
                        state={state}
                      />
                      <div className="token-amount mt-2">
                        <CurrencyInput
                          className="currency-input"
                          placeholder={strings("asset-item.component.base-modal.currency-input")}
                          style={{ width: "100%" }}
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
        submitText={strings("component.deposit")}
      />
      <ListingModal
        topics={topics}
        ref={listingRef}
        cid={cid}
        data={data?.publicDetailData}
        getDetailData={() => {}}
        dataDraft={""}
        dataResult={dataResult}
        dataDetail={dataDetail}
        CollectedAfterSignDetailData={CollectedAfterSignDetailData}
        icdNames={state?.icdNames}
      />
      <BaseModal
        ignoreCancelButton={true}
        ref={successRef}
        title={strings("asset-item.component.base-modal.title2")}
        submitText={strings("asset-item.component.base-modal.submit")}
        renderForm={() => {
          return (
            <>
              <p>
                {strings("asset-item.component.base-modal.txt7")}{" "}
                <strong style={{ wordBreak: "break-word" }}>
                  {displayCId}
                </strong>{" "}
                {strings("asset-item.component.base-modal.txt8")}
              </p>

              <p>
              {strings("asset-item.component.base-modal.txt9")}
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
                    <span>{strings("asset-item.component.base-modal.txt10")}</span>
                    <span>
                      <strong>
                        {" "}
                        <AddressTooltip
                          address={displayCId || ""}
                          getLengthAddress={getLengthAddress(
                            displayCId || "",
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
                    <span>{strings("component.price")}</span>
                    <span>
                      {" "}
                      <strong>
                        {" "}
                        {`${tokenAmount?.hexToDecimal()} ${
                          process.env.REACT_APP_STABLE_TOKEN_SYMBOL
                        }`}
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
                    <span>{strings("component.owner")}</span>
                    <span>
                      {" "}
                      <AddressTooltip
                        address={owner}
                        getLengthAddress={getLengthAddress(
                          owner,
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
                    <span>{strings("component.status")}</span>
                    <span style={{ color: "#0A9921" }}>{strings("component.complete")}</span>
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>{strings("asset-item.component.base-modal.txt11")}</span>
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
      <ModalChangePrice ref={modalChangePriceRef} data={data} />
    </Col>
  );
};

const mapStateToProps = ({
  datasharing: {
    changeLike,
    buyerListSentRequests,
    buyer,
    refreshDatahubFlag,
    navigatePageFlag,
  },
}) => ({
  changeLike,
  buyerListSentRequests,
  buyer,
  refreshDatahubFlag,
  navigatePageFlag,
});
const mapDispatchToProps = ({
  datasharing: { updateData, buyerGetListSentRequests, getStatisticData },
}) => ({
  updateDataSharing: updateData,
  buyerGetListSentRequests,
  getStatisticData,
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetItem);
