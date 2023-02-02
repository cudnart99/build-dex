import { string } from "@amcharts/amcharts4/core";
import { CheckCircleOutlined } from "@ant-design/icons";
import { FilterTransfer } from "@assets/svg";
import TradeButton from "@components/TradeButton";
import { TradeSelect } from "@components/TradeInputStyled";
import TradePagination from "@components/TradePagination";
import AssetLikedProvider from "@data-access/liked-provider";
import useCustomState from "@hook/useCustomState";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { CustomSearch } from "@pages/trade/components/styled";
import { strings } from "@utils/index";
import { Row } from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import AssetItem from "../components/AssetItemCard";
import { GroupItemWrapper } from "../styled";
import ButtonFilterCollected from "./components/ButtonFilterCollected";
import FilterDrawerCollected from "./components/FilterDrawerCollected";

const Collected = (props) => {
  const {
    ownerListMigrateDataBySignature,
    ownerListPostedData,
    buyerListAcceptRequest,
    ownerListReportRequest,
    ownerGetCollectedData,
    ownerDecryptDataFromOwnedMetadataCid,
    buyerDecryptDataFromOwnedMetadataCid,
    updateDataSharingNested,
    userAddress,
    flag,
    owner,
    toggleChangeLike,
    sidebarFilterParams,
  } = props;

  const {
    listData: listAsset,
    params,
    totalElements,
    statisticData,
    type,
    listDataFromBC,
  } = useSelector((state) => state.datahub);

  const { scrWidth } = useSelector((state) => state.global);

  const {
    search: getAssetFromBE,
    getStatisticAsset,
    updateData: updateDatahub,
    updateNestedData: updateNestedDatahub,
  } = useDispatch()["datahub"];

  const [state, setState] = useCustomState({
    isVisibleFilterDrawer: false,
    bcParams: {
      page: 0,
      size: 10,
    },
    params: {
      filterCId: "",
      token: null,
      status: null,
      price: null,
      date: null,
    },
  });

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

  const mergeDataFromRequest = (intergration, local) => {
    let mergeData = local?.map((item) => ({
      publicDetail: item,
      ...(intergration?.filter(
        (data) => (data?.dataCid || data?.metadataCid) === item?.assetCId
      ) || [])[0],
      dataCid: item?.assetCId,
      owner: item?.owner,
    }));
    return mergeData;
  };

  const getDataByType = useCallback(
    (type) => {
      switch (type) {
        case 1:
          return ownerListPostedData;
        case 2:
          return migrateDataIgnorePostedData;
        case 3:
          return buyerListAcceptRequest;
        default:
          return ownerListReportRequest;
      }
    },
    [
      ownerListPostedData,
      migrateDataIgnorePostedData,
      buyerListAcceptRequest,
      ownerListReportRequest,
    ]
  );
  const getTradingStatusByType = (type) => {
    switch (type) {
      case 1:
        return 10;
      case 2:
        return null;
      case 3:
        return 30;
      case 4:
        return 40;
      default:
        return null;
    }
  };

  const handleDebounceSearch = debounce((e) => {
    updateNestedDatahub({
      params: {
        displayCId: e?.target?.value,
      },
    });
  }, 500);

  const handleFilterActive = (value) => {
    if (value === 2) {
      getAssetFromBE({
        isShowOnMarket: null,
      });
    } else {
      getAssetFromBE({
        isShowOnMarket: value,
      });
    }
  };

  /**
   * Metamask turn on pop up for user to
   * sign to get owner data from bc
   */
  useEffect(() => {
    if (!flag && owner) {
      ownerGetCollectedData();
    }
  }, [owner]);

  /**
   * Effect to get data from BC if type ==2
   *           get data from BE with the rest
   */
  useEffect(() => {
    // Check nếu có userAddress => blockchain load xong
    //  thì mới gọi API
    if (userAddress) {
      if (type === 1) {
        getAssetFromBE({
          buyer: null,
          userAddress,
          owner: userAddress,
          tradingStatus: null,
          listTradingStatus: null,
          currencies: null,
          priceRange: null,
          page: 0,
        });
      } else if (type === 2) {
      } else if (type === 3) {
        getAssetFromBE({
          userAddress,
          owner: null,
          buyer: userAddress,
          tradingStatus: getTradingStatusByType(type),
          page: 0,
        });
      } else if (type === 4) {
        getAssetFromBE({
          userAddress,
          owner: userAddress,
          buyer: null,
          tradingStatus: getTradingStatusByType(type),
          page: 0,
        });
      }
      getStatisticAsset({ userAddress });
      // Get owner data from BC
      updateDatahub({
        listDataFromBC: getDataByType(type),
      });
    }
  }, [
    type,
    ownerListPostedData,
    toggleChangeLike,
    params.displayCId,
    userAddress,
  ]);

  const chainId = useSelector((state) => state.contracts.chainId);
  const changeLike = (data = {}) => {
    AssetLikedProvider.changeLiked({ ...data, network: chainId });
  };

  return (
    <GroupItemWrapper>
      <div className="search">
        <CustomSearch
          placeholder={strings("component.searchByName")}
          width={scrWidth > 1200 ? "33%" : scrWidth > 992 ? "50%" : "100%"}
          onChange={handleDebounceSearch}
          allowClear={true}
        />
        {scrWidth < 992 && (
          <TradeButton
            type={"transparent_white"}
            icon={<FilterTransfer />}
            onClick={() =>
              setState({
                isVisibleFilterDrawer: true,
              })
            }
            style={{ border: "none" }}
          />
        )}
      </div>
      <div className="category">
        <MultipleButtonSelect
          currentActive={type - 1}
          options={[
            {
              value: 1,
              text: `${strings("collected.Listed")} ${statisticData?.numListed || 0}`,
              handleClick: () => {
                updateDataSharingNested({
                  sidebarFilter: {
                    listStatus: [],
                  },
                });
              },
            },
            {
              value: 2,
              text: `${strings("collected.Owned")} ${
                migrateDataIgnorePostedData?.filter((item) => item !== null)
                  ?.length || 0
              }`,
              handleClick: () => {},
            },
            {
              value: 3,
              text: `${strings("collected.Granted")} ${statisticData?.numGranted || 0}`,
              handleClick: () => {
                updateDataSharingNested({
                  sidebarFilter: {
                    listStatus: [],
                  },
                });
              },
            },
            {
              value: 4,
              text: `${strings("collected.Reported")} ${
                ownerListReportRequest?.filter((item) => item !== null)
                  ?.length || 0
              }`,
              handleClick: () => {},
            },
          ]}
          onChange={(obj) => {
            updateDatahub({
              type: obj.value,
            });
          }}
        />
      </div>
      <div className="group-items__head d-flex justify-content-space-between">
        <div className="result-number">
          <span>EMR</span>
          <span>{"  "}</span>
          <span>
            {strings("collected.result")} {type === 2 ? listDataFromBC?.length : totalElements || 0}
          </span>
        </div>
        <div className="page-info-top"></div>
      </div>
      <div className="page-filter-top mt-3 mb-3">
        {type === 1 && (
          <TradeSelect
            icon={<CheckCircleOutlined />}
            tag="Status"
            options={[
              {
                label: strings("collected.label"),
                options: [
                  {
                    label: strings("collected.option-1"),
                    value: 2,
                  },
                  {
                    label: strings("collected.option-2"),
                    value: 1,
                  },
                  {
                    label: strings("collected.option-3"),
                    value: 0,
                  },
                ],
              },
            ]}
            onChange={handleFilterActive}
          />
        )}
      </div>
      {type === 1 && (
        <div className="d-flex mt-1 button-filter">
          {(sidebarFilterParams?.fromValue ||
            sidebarFilterParams?.toValue ||
            sidebarFilterParams?.tokens) && (
            <ButtonFilterCollected content={sidebarFilterParams} type="one" />
          )}
          {sidebarFilterParams?.listStatus?.map((item) => (
            <ButtonFilterCollected content={item} type="multi" />
          ))}
          {(sidebarFilterParams?.tokens ||
            sidebarFilterParams?.listStatus?.length > 0 ||
            sidebarFilterParams?.fromValue ||
            sidebarFilterParams?.toValue) && (
            <TradeButton
              content={strings("component.clear-all")}
              type={"gradient"}
              onClick={() => {
                updateDataSharingNested({
                  sidebarFilter: {
                    fromValue: null,
                    toValue: null,
                    listStatus: [],
                    tokens: null,
                    isResetPriceFilter: !sidebarFilterParams.isResetPriceFilter,
                  },
                });
                getAssetFromBE({
                  priceRange: null,
                  listTradingStatus: null,
                  currencies: null,
                });
              }}
            />
          )}
        </div>
      )}
      <div className="group-items__body">
        <Row gutter={[16, 16]}>
          {(type === 2
            ? listDataFromBC
            : mergeDataFromRequest(listDataFromBC, listAsset)
          )            ?.map((item, index) => (
              <AssetItem
                key={index}
                data={item}
                colResponsiveProps={{
                  md: 12,
                  lg: 12,
                  xs: 12,
                  sm: 12,
                  xl: 8,
                }}
                ownerDecryptDataFromOwnedMetadataCid={
                  ownerDecryptDataFromOwnedMetadataCid
                }
                buyerDecryptDataFromOwnedMetadataCid={
                  buyerDecryptDataFromOwnedMetadataCid
                }
                type={type === 3}
                statusItem={type}
                handleLiked={changeLike}
              />
            ))}
        </Row>
        {type === 2 ? (
          <TradePagination
            className="mt-3"
            pageSizeOptions={[3, 5, 10, 15, 20]}
            total={listDataFromBC?.length}
            defaultPageSize={999}
            defaultCurrent={0}
            onChange={(page, size) => {
              setState({
                bcParams: {
                  ...state.bcParams,
                  page,
                  size,
                },
              });
            }}
            current={state.bcParams.page + 1}
            pageSize={state.bcParams.size}
            showSizeChanger={true}
          />
        ) : (
          <TradePagination
            className="mt-3"
            pageSizeOptions={[3, 5, 10, 15, 20]}
            total={totalElements}
            defaultPageSize={9}
            defaultCurrent={0}
            onChange={(page, size) => {
              getAssetFromBE({ page: page - 1, size });
            }}
            current={params.page + 1}
            pageSize={params.size}
            showSizeChanger={true}
          />
        )}
      </div>
      <FilterDrawerCollected
        open={state.isVisibleFilterDrawer}
        onClose={() => {
          setState({
            isVisibleFilterDrawer: false,
          });
        }}
        filterFunction={updateDataSharingNested}
        filterNew={sidebarFilterParams}
        setState={setState}
      />
    </GroupItemWrapper>
  );
};

const mapStateToProps = ({
  datasharing: {
    ownerListMigrateDataBySignature,
    ownerListPostedData,
    buyerListAcceptRequest,
    ownerListReportRequest,
    collected: { listAdditionData, listDataAddress },
    flag,
    owner,
    changeLike,
    sidebarFilter,
  },
  contracts: { address },
}) => ({
  ownerListMigrateDataBySignature,
  ownerListPostedData,
  buyerListAcceptRequest,
  ownerListReportRequest,
  listAdditionData,
  listDataAddress,
  userAddress: address,
  flag,
  owner,
  toggleChangeLike: changeLike,
  sidebarFilterParams: sidebarFilter,
});

const mapDispatchToProps = ({
  datasharing: {
    ownerDecryptDataFromOwnedMetadataCid,
    ownerGetMigrateData,
    ownerGetPostDataToMarketplace,
    ownerGetCollectedData,
    buyerDecryptDataFromOwnedMetadataCid,
    updateData,
    updateNestedData,
  },
}) => ({
  ownerDecryptDataFromOwnedMetadataCid,
  ownerGetMigrateData,
  ownerGetPostDataToMarketplace,
  ownerGetCollectedData,
  buyerDecryptDataFromOwnedMetadataCid,
  updateDataSharing: updateData,
  updateDataSharingNested: updateNestedData,
});
export default connect(mapStateToProps, mapDispatchToProps)(Collected);
