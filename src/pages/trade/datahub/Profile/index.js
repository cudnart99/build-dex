import LinearText from "@pages/trade/components/LinearText";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileWrapper, TabItem } from "./styled";

import {
  ArrowDown,
  ArrowUp,
  IconCollected,
  IconDashBoard,
  IconHistory,
  IconLiked,
  RequestIcon,
} from "@assets/svg";
import PriceRange from "@components/PriceRange";
import TradeButton from "@components/TradeButton";
import { connect } from "react-redux";
import { Link, Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SidebarFilter from "../components/SidebarFilter";
import SidebarFilterItem from "../components/SidebarFilterItem";
import DashBoard from "../Profile/DashBoard";
import Collected from "./Collected";
import History from "./History";
import Liked from "./Liked";
import Requests from "./Requests";
import { strings } from "@utils/index";

function Profile({ updateNestedDataSharing, sidebarFilter }) {
  const { search: getAssetFromBE, updateNestedData: updateNestedDatahub } =
    useDispatch()["datahub"];

  const TabContent = [
    {
      component: DashBoard,
      title: strings("Profile.title"),
      icon: <IconDashBoard />,
      path: "/data-hub/profile",
      exact: true,
    },

    {
      component: Collected,
      title: strings("Profile.title1"),
      icon: <IconCollected />,
      path: "/data-hub/profile/collected",
      isShowFilter: true,
    },
    {
      component: Requests,
      title: strings("Profile.title2"),
      icon: <RequestIcon />,
      path: "/data-hub/profile/requests",
    },
    {
      component: History,
      title: strings("Profile.title3"),
      icon: <IconHistory />,
      path: "/data-hub/profile/history",
    },
    {
      component: Liked,
      title: strings("Profile.title4"),
      icon: <IconLiked />,
      path: "/data-hub/profile/liked",
    },
  ];
  const handleResetAllFilter = () => {};
  const [showMore, setShowMore] = useState(0);
  const symbol = useSelector((state) => state.contracts.symbol);
  const listFilter = [
    {
      title: strings("Profile.title5"),
      ItemRender: SidebarFilterItem,
      filterFunction: (data = []) => {
        updateNestedDataSharing({
          sidebarFilter: {
            listStatus: data,
          },
        });
        getAssetFromBE({
          listTradingStatus: data ? data?.join(",") : null,
        });
      },
      type: "multiFilterCollected",
      listOptions: [
        { label: "Buy Now", value: 10 },
        { label: "On Auction", value: 20 },
        { label: "Recently granted", value: 30 },
      ],
    },
    {
      title: strings("Profile.title6"),
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
          imgLink: require("@images/trade/datahub/IHI-icon.png"),
        },
        {
          label: "USDT",
          value: 30,
          imgLink: require("@images/trade/datahub/USDT-icon.png"),
        },
      ],
    },
    {
      title: strings("Profile.title7"),
      ItemRender: SidebarFilterItem,
      filterFunction: () => {},
      AddingChildren: (
        <div className="price-range-containter">
          <PriceRange
            placeholder={["From", "To"]}
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
            value={[sidebarFilter.fromValue, sidebarFilter.toValue]}
          />
        </div>
      ),
      show: true,
    },
  ];
  const { scrWidth } = useSelector((state) => state.global);
  const setNavProfile = useDispatch()?.global?.setNavProfile;
  const { type: typeDataCollected } = useSelector((state) => state?.datahub);
  const onChangeNav = (index) => {
    setNavProfile(index);
    setShowMore(0);
  };

  return (
    <ProfileWrapper>
      {/* <Button onClick={getUserToken}>getUserToken</Button>
      <Button onClick={setupConnectOwner}>setupConnectOwner</Button>

      <Button onClick={ownerRegister}>ownerRegister</Button>
      <Button onClick={ownerMigrate}>ownerMigrate</Button> */}

      <LinearText
        title={strings("Profile.title8")}
        fontSize={scrWidth > 992 ? "50px" : scrWidth > 576 ? "45px" : "40px"}
        lineHeight={scrWidth > 992 ? "55px" : scrWidth > 576 ? "50px" : "45px"}
        margin="10px"
      />

      <div className="content">
        <div className="content__tabs">
          {scrWidth > 992 ? (
            TabContent.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Link to={item.path}>
                    <TabItem
                      key={index}
                      onClick={() => {
                        onChangeNav(index);
                      }}
                      active={window.location.pathname === item.path}
                    >
                      <span className="content__tabs-item">
                        <span className="content__tabs-item-icon">
                          {item.icon}
                        </span>
                        <span>{item.title}</span>
                      </span>
                    </TabItem>
                  </Link>
                  {item?.isShowFilter &&
                    window.location.pathname ===
                      "/data-hub/profile/collected" &&
                    typeDataCollected === 1 &&
                    (showMore === 0 ? (
                      <div className="show-more">
                        <a onClick={() => setShowMore(1)}>{strings("Profile.show-more")}</a>{" "}
                        <ArrowDown />
                      </div>
                    ) : (
                      <>
                        <div className="show-more">
                          <a onClick={() => setShowMore(0)}>{strings("Profile.show-less")}</a>{" "}
                          <ArrowUp />
                        </div>
                        <div className="filter-sidebar__container">
                          <SidebarFilter
                            listFilter={listFilter}
                            handleResetAllFilter={handleResetAllFilter}
                          />
                        </div>
                      </>
                    ))}
                </React.Fragment>
              );
            })
          ) : (
            <div
              gutter={[32, 16]}
              className="content__tabs-mobile overflow-scroll-phong"
            >
              {TabContent.map((item, index) => {
                return (
                  <div key={index}>
                    <Link to={item.path}>
                      <TradeButton
                        style={
                          scrWidth > 576
                            ? {
                                fontSize: "15px",
                                padding: "15px",
                                width: "140px",
                              }
                            : {
                                fontSize: "14px",
                                padding: "18px",
                                width: "140px",
                              }
                        }
                        type={"transparent_white"}
                        icon={item.icon}
                        parentClassName={
                          window.location.pathname === item?.path
                            ? "active-btn"
                            : ""
                        }
                        content={item.title}
                        onClick={() => {
                          onChangeNav(index);
                        }}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="content__data">
          <Switch>
            {TabContent.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
          </Switch>
        </div>
      </div>
    </ProfileWrapper>
  );
}

const mapStateToProps = ({ datasharing: { sidebarFilter } }) => ({
  sidebarFilter,
});
const mapDispatchToProps = ({ datasharing: { updateNestedData } }) => ({
  updateNestedDataSharing: updateNestedData,
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
