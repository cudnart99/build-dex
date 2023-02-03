import { CopyOutlined, DownOutlined } from "@ant-design/icons";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { IviIcon, LogoIcon, ThreeDot } from "@svg";
import { copyToClipBoard } from "@utils";
import { Dropdown, Menu, Popover, Select, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import config from "../../../redux/models/contracts/config";
import { AccountPanelBody, AccountPanelHead } from "./AccountPanel";
import NotificationsBell from "./components/NotificationsBell";
import { TRADE_HEADER_ITEMS } from "./constants";
import DrawerHeader from "./DrawerHeader";
import { HeaderWrapper, TextHeaderWrapper } from "./styled";

const { networkHasCoin } = config;

const Header = (props) => {
  const history = useHistory();
  const {
    coinBalance,
    balance,
    address,
    currentNetworkName,
    type,
    changeNetwork,
    currentContractProperties,
    mint,
    symbol = "",
  } = props;

  const { getTokenBalance } = useDispatch()["contracts"];
  const menuWallet = (
    <Menu
      items={[
        {
          label: <Link to={"/transfer"}>Wallet</Link>,
          key: "0",
        },
        {
          label: <Link to={"/balances"}>Balances</Link>,
          key: "1",
        },
        {
          label: <Link to={"/transfers-scan"}>TransfersScan</Link>,
          key: "3",
        },
      ]}
    />
  );
  const menuWhitepaper = (
    <Menu
      items={[
        {
          label: <Link to={"/whitepaper"}>Whitepaper</Link>,
          key: "0",
        },
        {
          label: <Link to={"/pitching-deck"}>Pitching Deck</Link>,
          key: "1",
        },
      ]}
    />
  );

  const getActiveIndex = () => {
    return Object.keys(TRADE_HEADER_ITEMS).findIndex(
      (key) => TRADE_HEADER_ITEMS[key].path == window.location.pathname
    );
  };
  const [state, _setState] = useState({
    activeIndex: getActiveIndex(),
    drawerVisible: false,
    isShowAccountPanel: false,
  });

  const { pathname } = useLocation();

  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const onOpenDrawer = () => {
    setState({ drawerVisible: true });
  };

  const screenWidth = useDebounceWindowResize()?.width;
  const handleChangeIndex = ({ activeIndex }) => {
    setState({ activeIndex });
  };
  const closePanel = () => {
    setState({
      isShowAccountPanel: false,
    });
  };

  useEffect(() => {
    const indexHeader = Object.keys(TRADE_HEADER_ITEMS).findIndex((key) => {
      return TRADE_HEADER_ITEMS[key].path == pathname;
    });
    setState({ activeIndex: indexHeader });
  }, [pathname]);

  useEffect(() => {
    getTokenBalance();
  }, [window.location.pathname]);

  return (
    <HeaderWrapper className={`${state.showMenu ? "show-menu" : ""}`}>
      <Link to="/tutorial" style={{ color: "white" }}>
        <div className="logo-header">
          <LogoIcon width={120} />
        </div>
      </Link>
      <div className={`routes`}>
        {Object.keys(TRADE_HEADER_ITEMS).map((key, index) => {
          let item = TRADE_HEADER_ITEMS[key];
          return (
            <React.Fragment key={index}>
              {key == "wallet" ? (
                <>
                  <Dropdown menu={menuWallet} trigger={["click"]}>
                    <TextHeaderWrapper
                      active={state.activeIndex == index}
                      onClick={(e) => {
                        e.preventDefault();
                        handleChangeIndex({ activeIndex: index });
                      }}
                    >
                      {item.text} &nbsp;
                      <DownOutlined />
                    </TextHeaderWrapper>
                  </Dropdown>
                </>
              ) : key == "balances" ||
                key == "transferScan" ||
                key == "pitchingdeck" ? (
                <></>
              ) : (
                <Link key={index} to={item.path}>
                  <TextHeaderWrapper
                    active={state.activeIndex == index}
                    onClick={() => {
                      handleChangeIndex({ activeIndex: index });
                    }}
                  >
                    {item.text}
                  </TextHeaderWrapper>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* <NotificationsBell /> */}
      <div className="info-account">
        <div className="network">
          <div className="dot"></div>
          <div className="network-select">
            <Select
              style={{ width: "120px" }}
              disabled={type != "metamask"}
              defaultValue={currentNetworkName?.toUpperCase()}
              onChange={(value) => {
                changeNetwork(value);
              }}
              value={currentContractProperties?.chainId}
              options={networkHasCoin.map((item) => ({
                ...item,
                value: item.chainId,
                label: item.name.toUpperCase(),
              }))}
            />
          </div>
        </div>
        <div className="token-address-text">
          <div className="address">
            <Tooltip title={"Copy"}>
              <CopyOutlined
                onClick={() => {
                  copyToClipBoard(address);
                }}
              />
            </Tooltip>
            <Tooltip title={address}>
              {" "}
              {address?.substring(0, 7)}...
              {address?.substring(address?.length - 3, address?.length)}{" "}
            </Tooltip>
          </div>

          <div className="balance">
            {screenWidth > 576 && <span className="space">-</span>}
            <span className="IVI-icon">
              <IviIcon
                width={screenWidth > 576 ? 24 : 12}
                height={screenWidth > 576 ? 24 : 12}
              />
            </span>
            <span>{`${balance?.formatCurrency() || 0} ${symbol}`}</span>
          </div>
        </div>

        <div className="account">
          <div className="wrapper-account">
            <Popover
              placement="bottomRight"
              trigger="click"
              // open={state?.isShowAccountPanel}
              title={() => (
                <AccountPanelHead
                  currentContractProperties={currentContractProperties}
                  coinBalance={coinBalance}
                  address={address}
                />
              )}
              content={() => (
                <AccountPanelBody
                  onOpenDrawer={onOpenDrawer}
                  mint={mint}
                  history={history}
                  closePanel={closePanel}
                />
              )}
              overlayClassName="account-panel"
            >
              <ThreeDot />
            </Popover>
          </div>
        </div>
      </div>{" "}
      <DrawerHeader onOpenNFT={onOpenDrawer} />
    </HeaderWrapper>
  );
};
const mapStateToProps = ({
  contracts: {
    address,
    balance,
    currentNetworkName,
    type,
    currentContractProperties,
    symbol,
    coinBalance,
  },
}) => ({
  address,
  balance,
  currentNetworkName,
  type,
  currentContractProperties,
  symbol,
  coinBalance,
});

const mapDispatchToProps = ({
  contracts: { connect, disconnect, getBalance, changeNetwork, mint },
}) => ({
  connect,
  disconnect,
  changeNetwork,
  mint,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
