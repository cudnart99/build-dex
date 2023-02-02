import {
  BitcoinConvertIcon,
  ButtonX,
  CategoryIcon,
  FilterTransfer,
  HeartIcon,
  StatsIcon
} from "@assets/svg";
import ICD10DropDownFilter from "@components/ICD10DropDownFilter";
import PriceRange from "@components/PriceRange";
import TradeButton from "@components/TradeButton";
import { TradeSelect } from "@components/TradeInputStyled";
import TradePagination from "@components/TradePagination";
import useCustomState from "@hook/useCustomState";
import { refLoading } from "@src";
import { strings } from "@utils/index";
import { debounce, isEmpty } from "lodash";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import GlobalIcons from "../components/GlobalIcons";
import MultipleButtonSelect from "../components/MultipleButtonSelect";
import { CustomSearch } from "../components/styled";
import FilterDrawerDatahub from "./components/FilterDrawerDatahub";
import GroupItem from "./components/GroupItem";
import { StaticComponent } from "./components/MainPageComponents";
import SidebarFilter from "./components/SidebarFilter";
import SidebarFilterItem from "./components/SidebarFilterItem";
import ButtonFilterCollected from "./Profile/components/ButtonFilterCollected";
import { DataHubMainWrapper } from "./styled";
const DataHub = ({
  buyerListPostedDataToMarketplace,
  updateDataSharing,
  changeLike,
  buyer,
  buyerGetListSentRequests,
  buyerListSentRequests,
  refreshDatahubFlag,
  navigatePageFlag,
  t,
}) => {
  const userAddress = useSelector((state) => state?.contracts?.address);
  const { scrWidth } = useSelector((state) => state.global);
  const {
    listData: listAssets,
    params,
    totalElements,
  } = useSelector((state) => state.datahub);
  const { sidebarFilter } = useSelector((state) => state.datasharing);

  const { search: getAssetFromBE, setParams } = useDispatch()["datahub"];
  const {
    buyerGetPostDataToMarketplace,
    updateNestedData: updateNestedDataSharing,
  } = useDispatch()["datasharing"];

  const [state, setState] = useCustomState({
    size: 12,
    filterData: [],
    filterCId: "",
    isVisibleFilterDrawer: false,
    listAssetRequest: [],
    filterNew: {
      filterCurrencies: null,
      fromValue: null,
      toValue: null,
      filterStatus: [],
      filterDate: null,
    },
    showFilter: {
      filterCurrencies: true,
      filterStatus: true,
      filterDate: false,
    },
    sort: null,
  });
  const { sort } = state;

  const handleResetFilter = () => {
    updateNestedDataSharing({
      sidebarFilter: {
        fromValue: null,
        toValue: null,
        listStatus: [],
        tokens: null,
        isResetPriceFilter: !sidebarFilter.isResetPriceFilter,
      },
    });
    setParams({ medicalSpecialties: [], icdCodes: [] });

    getAssetFromBE({
      priceRange: null,
      listTradingStatus: "10,20,30",
      currencies: null,
    });
  };
  const symbol = useSelector((state) => state.contracts.symbol);

  const listFilter = [
    {
      title: strings("marketplace.filter.sidebar-filter-status"),
      ItemRender: SidebarFilterItem,
      filterFunction: (data = []) => {
        updateNestedDataSharing({
          sidebarFilter: {
            listStatus: data,
          },
        });
        getAssetFromBE({
          listTradingStatus: data?.length >= 1 ? data?.join(",") : "10,20,30",
        });
      },
      type: "multiFilterCollected",
      listOptions: [
        { label: strings("marketplace.filter.buy-now"), value: 10 },
        { label: strings("marketplace.filter.on-auction"), value: 20 },
        // { label: "Recently granted", value: 30 },
      ],
    },
    {
      title: strings("marketplace.filter.sidebar-filter-token"),
      ItemRender: SidebarFilterItem,
      filterFunction: (data = null) => {
        updateNestedDataSharing({
          sidebarFilter: {
            tokens: data,
          },
        });
        getAssetFromBE({
          currencies: data ? data : null,
        });
      },
      type: "oneFilterCollected",
      listOptions: [
        {
          label: symbol,
          value: 10,
          imgLink: require("@images/trade/datahub/IVI-icon.png"),
        },
        {
          label: "IHI",
          value: 20,
          imgLink: require("@images/trade/datahub/IHI-currency.png"),
        },
        {
          label: "USDT",
          value: 30,
          imgLink: require("@images/trade/datahub/usdt-currency.png"),
        },
      ],
      AddingChildren: (
        <div className="price-range-containter">
          <PriceRange
            t={t}
            placeholder={[strings("marketplace.filter.min"), strings("marketplace.filter.max")]}
            handleChangeValue={(fromValue, toValue) => {
              updateNestedDataSharing({
                sidebarFilter: {
                  fromValue,
                  toValue,
                },
              });
              getAssetFromBE({
                priceRange: `${fromValue || ""},${toValue || ""}`,
              });
            }}
            value={[
              params?.priceRange?.split(",")?.[0],
              params?.priceRange?.split(",")?.[1],
            ]}
          />
        </div>
      ),
    },

    {
      title: strings("marketplace.filter.sidebar-filter-ICD"),
      ItemRender: SidebarFilterItem,
      AddingChildren: (
        <ICD10DropDownFilter
          onChange={(data) => {
            handleChangeICDFilter(data);
          }}
          defaultActiveData={params?.icdCodes}
        />
      ),
    },

    // {
    //   title: t("sidebarFilter-title-4"),
    //   ItemRender: SidebarFilterItem,
    //   AddingChildren: (
    //     <CategoryPicker
    //       onChange={(arr) => {
    //         handleChangeMedicalSpecialtiesFilter(arr);
    //       }}
    //       defaultArrState={params?.medicalSpecialties}
    //     />
    //   ),
    // },
  ];

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

  const handleDebounceSearch = debounce((e) => {
    getAssetFromBE({
      displayCId: e?.target?.value,
    });
  }, 300);
  const handleChangeICDFilter = debounce((icdCodes) => {
    getAssetFromBE({
      icdCodes,
    });
  }, 300);

  const handleChangeMedicalSpecialtiesFilter = debounce(
    (medicalSpecialties) => {
      getAssetFromBE({
        medicalSpecialties,
      });
    },
    300
  );
  const handleChangeTabData = (selection) => {
    if (selection.value) {
      getAssetFromBE({
        sort: [`${selection?.value},desc`],
      });
    } else {
      getAssetFromBE({
        sort: null,
      });
    }
  };

  const removeMedicalTag = (text) => {
    let newMedi = Object.assign([], params.medicalSpecialties);
    newMedi.splice(newMedi.indexOf(text), 1);
    setParams({ medicalSpecialties: newMedi });
  };

  const removeIcdTag = (text) => {
    let newIcd = Object.assign([], params.icdCodes);
    newIcd.splice(newIcd.indexOf(text), 1);
    setParams({ icdCodes: newIcd });
  };
  useEffect(() => {
    if (userAddress) {
      refLoading.current.show();
    }
  }, [userAddress]);
  // Data from blockchain

  useEffect(() => {
    if (buyer) {
      buyerGetPostDataToMarketplace(sort);
    }
  }, [buyer, refreshDatahubFlag]);
  // Data from BE

  useEffect(() => {
    if (userAddress) {
      getAssetFromBE({
        userAddress,
        isShowOnMarket: 1,
        listTradingStatus: "10,20,30",
        owner: null,
      });
    }
  }, [getAssetFromBE, userAddress, changeLike]);

  // Scroll when search effect
  useEffect(() => {
    localStorage.setItem("datahubFirst", true);

    return () => {
      localStorage.removeItem("datahubFirst");
    };
  }, []);
  useEffect(() => {
    if (buyerListPostedDataToMarketplace && listAssets) {
      let dataSource = mergeDataFromRequest(
        buyerListPostedDataToMarketplace,
        listAssets
      );
      setState({ dataSource });
      refLoading.current.hide();
    }
  }, [buyerListPostedDataToMarketplace, listAssets]);

  return (
    <DataHubMainWrapper size={state.size}>
      <StaticComponent />
      <div id="data-hub-market-place">
        <div className="market-place-head d-flex align-items-center">
          <h1>{strings("marketplace.body.title")}</h1>
          <img src="" alt="" />
          <div className="overflow-scroll-phong multi-button">
            <MultipleButtonSelect
              options={[
                { icon: <CategoryIcon />, text: strings("marketplace.filter.explore"), value: "" },
                { icon: <HeartIcon />, text: strings("marketplace.filter.favorites"), value: "numLikes" },
                { icon: <StatsIcon />, text: strings("marketplace.filter.popular"), value: "viewsCount" },
              ]}
              onChange={handleChangeTabData}
            />
          </div>
        </div>

        <div className="market-place-search text-right d-flex align-items-center justify-content-end">
          <CustomSearch
            width={scrWidth > 1200 ? "33%" : scrWidth > 992 ? "50%" : "100%"}
            placeholder={strings("component.searchByName")}
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
        <br />

        <div
          className={`d-flex align-items-center ${
            scrWidth > 1200 ? "justify-content-end" : "justify-content-start"
          }`}
        >
          <div style={{ width: "270px" }}>
            {" "}
            <TradeSelect
              icon={<BitcoinConvertIcon />}
              tag={strings("marketplace.filter.sort-by")}
              options={[
                { value: "price,asc", label: strings("marketplace.filter.price-asc") },
                { value: "price,desc", label: strings("marketplace.filter.price-desc") },
                { value: "create_at,desc", label: strings("marketplace.filter.recently-listed") },
                { value: "granted", label: strings("marketplace.filter.recently-granted") },
              ]}
              onChange={(value) => {
                if (value === "granted") {
                  getAssetFromBE({
                    sort: ["update_at,desc"],
                    tradingStatus: 30,
                    listTradingStatus: null,
                  });
                } else {
                  getAssetFromBE({
                    sort: [value],
                    listTradingStatus: "10,20",
                  });
                }
              }}
            />
          </div>
        </div>
        <div className="market-place-body d-flex">
          {scrWidth > 992 && (
            <div className="filter-sidebar__container">
              <SidebarFilter
                listFilter={listFilter}
                handleResetAllFilter={handleResetFilter}
              />
            </div>
          )}
          <div className="group-items">
            <div className="group-items__head d-flex justify-content-space-between">
              <div className="result-number" id="emr-result-checkpoint">
                <span>EMR: </span>
                <span>{"  "}</span>
                <span>{`(${strings("result")} ${totalElements || 0})`}</span>
              </div>
              <div className="page-info-top d-flex">{}</div>
            </div>
            <div className="d-flex align-items-center mt-2 button-filter flex-wrap">
              {(sidebarFilter?.fromValue ||
                sidebarFilter?.toValue ||
                sidebarFilter?.tokens) && (
                <ButtonFilterCollected content={sidebarFilter} type="one" />
              )}
              {sidebarFilter?.listStatus?.map((item,index) => (
                <ButtonFilterCollected content={item} type="multi" key={index} />
              ))}

              {(params?.medicalSpecialties || []).map((item) => {
                return (
                  <div className="d-flex text-white gap-10 text-tag mr-2">
                    {item}
                    <div>
                      <ButtonX
                        className="hover-pointer"
                        style={{ width: "12px", height: "12px" }}
                        onClick={() => {
                          removeMedicalTag(item);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              {(params.icdCodes || []).map((item) => {
                return (
                  <div className="d-flex text-white gap-10 text-tag mr-2">
                    {item}
                    <div>
                      <ButtonX
                        className="hover-pointer"
                        style={{ width: "12px", height: "12px" }}
                        onClick={() => {
                          removeIcdTag(item);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              {(sidebarFilter?.tokens ||
                sidebarFilter?.listStatus?.length > 0 ||
                sidebarFilter?.fromValue ||
                sidebarFilter?.toValue ||
                !isEmpty(params.medicalSpecialties) ||
                !isEmpty(params.icdCodes)) && (
                <TradeButton
                  content={strings("marketplace.body.btn-clear-all")}
                  type={"gradient"}
                  onClick={() => {
                    updateNestedDataSharing({
                      sidebarFilter: {
                        fromValue: null,
                        toValue: null,
                        listStatus: [],
                        tokens: null,
                        isResetPriceFilter: !sidebarFilter.isResetPriceFilter,
                      },
                    });
                    setParams({ medicalSpecialties: [], icdCodes: [] });

                    getAssetFromBE({
                      priceRange: null,
                      listTradingStatus: "10,20,30",
                      currencies: null,
                    });
                  }}
                />
              )}
            </div>

            <div className="group-items__body">
              <GroupItem
                // data={mergeDataFromRequest(
                //   state?.filterData?.slice(
                //     state.page * state.size,
                //     state.page * state.size + state.size
                //   ),
                //   listAdditionData
                // )?.filter((item) => item?.publicDetail?.isShowOnMarket)}
                data={state?.dataSource}
              />

              <TradePagination
                className="mt-3"
                pageSizeOptions={[1, 3, 6, 9, 12, 15, 18]}
                defaultPageSize={12}
                total={totalElements}
                page={params.page}
                current={params.page + 1}
                pageSize={params.size}
                onChange={(page, size) => {
                  getAssetFromBE({ page: page - 1, size });
                  updateDataSharing({
                    navigatePageFlag: navigatePageFlag + 1,
                  });
                  localStorage.setItem("datahubFirst", false);
                }}
                showSizeChanger={true}
              />
              <FilterDrawerDatahub
                open={state?.isVisibleFilterDrawer}
                onClose={() => {
                  setState({
                    isVisibleFilterDrawer: false,
                  });
                }}
                listFilter={listFilter}
                handleResetFilter={handleResetFilter}
              />
            </div>
          </div>
        </div>
      </div>

      <GlobalIcons />
    </DataHubMainWrapper>
  );
};

const mapStateToProps = ({
  datasharing: {
    buyerListSentRequests,
    buyerListPostedDataToMarketplace,
    listDataAddress,
    listAdditionData,
    changeLike,
    buyer,
    refreshDatahubFlag,
    navigatePageFlag,
  },
}) => {
  return {
    buyerListSentRequests,
    buyerListPostedDataToMarketplace,
    listDataAddress,
    listAdditionData,
    changeLike,
    buyer,
    refreshDatahubFlag,
    navigatePageFlag,
  };
};

const mapDispatchToProps = ({
  datasharing: { buyerGetListSentRequests, updateData },
}) => ({
  updateDataSharing: updateData,
  buyerGetListSentRequests,
});

export default connect(mapStateToProps, mapDispatchToProps)(DataHub);
