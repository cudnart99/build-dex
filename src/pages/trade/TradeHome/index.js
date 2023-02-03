import TradeButton from "@components/TradeButton";
import {
  BackIcon,
  ClockIcon,
  ExtensionIcon,
  VideoIcon,
  WalletIcon,
} from "@svg";
import { getBackGroundFromScreen } from "@utils/";
import { strings } from "@utils/index";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LinearText from "../components/LinearText";
import ConnectWalletModal from "./components/ConnectWalletModal";
import ModalError from "./components/ModalError";
import ModalInstallWallet from "./components/ModalInstallWallet";
import VideoModal from "./components/VideoModal";
import { HomeStyled } from "./styled";
import Welcome from "../DEX/Welcome";

const TradeHome = ({ history }) => {
  const connectWalletRef = useRef();
  const modalErrorRef = useRef();
  const videoRef = useRef();
  const installModalRef = useRef();
  const [scrWidth, setScrWidth] = useState(
    getBackGroundFromScreen(window.innerWidth)
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeEvent = window.addEventListener("resize", () => {
      setScrWidth(getBackGroundFromScreen(window.innerWidth));
    });

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  useEffect(() => {
    const resizeId = window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", resizeId);
    };
  }, []);

  const handleShowConnectModal = () => {
    connectWalletRef?.current?.show({
      showErr: handleShowErrorModal,
      showInstall: handleShowInstallModal,
    });
  };

  const handleShowErrorModal = () => {
    modalErrorRef?.current?.show();
    connectWalletRef?.current?.handleCancelConnectModal();
  };

  const handleShowInstallModal = () => {
    installModalRef?.current?.show();
    connectWalletRef?.current?.handleCancelConnectModal();
  };

  const handleCancelInstallModal = () => {
    installModalRef?.current?.handleCancelModal();
  };
  const handleCancelErrorModal = () => {
    modalErrorRef?.current?.handleCancelModal();
  };

  const handleReconnect = () => {
    connectWalletRef?.current?.connect();
  };

  const backModal = () => {
    installModalRef?.current?.handleCancelModal();
    modalErrorRef?.current?.handleCancelModal();
    connectWalletRef?.current?.show({
      showErr: handleShowErrorModal,
      showInstall: handleShowInstallModal,
    });
  };
  const ConnectToWalletTitle = ({ textOption }) => {
    return (
      <div className="d-flex align-items-center">
        <div
          className="d-flex align-items-center hovered hover-pointer"
          style={{ marginRight: "4px" }}
          onClick={backModal}
        >
          <BackIcon />
        </div>
        <span>Connect {textOption}</span>
      </div>
    );
  };
  const ConnectToWalletFooter = ({ type }) => {
    return type === "error" ? (
      <>
        <span
          className="hover-pointer"
          style={{ color: "#6E5AC3" }}
          onClick={backModal}
        >
          Choose another wallet
        </span>
        <TradeButton
          content={"Try again"}
          icon={<ExtensionIcon />}
          type="gradient"
          onClick={handleReconnect}
        />
      </>
    ) : (
      <>
        <TradeButton
          content={"I'll do it later"}
          icon={<ClockIcon />}
          type="transparent_gray"
          onClick={handleCancelInstallModal}
        />
        <a
          href="https://metamask.io/download/"
          target={"_blank"}
          onClick={handleCancelErrorModal}
        >
          <TradeButton
            content={"Install"}
            icon={<ExtensionIcon />}
            type="gradient"
          />
        </a>
      </>
    );
  };
  const handleShowVideoModal = () => {
    videoRef?.current?.show();
  };

  const { t } = useTranslation();

  return (
    <>
      <HomeStyled id="trade-home-page">
        <div className="home-page__background">
          <img
            alt="home_bg"
            src={require(`@images/trade/home_page_bg_${scrWidth}.png`)}
          />
        </div>
        <div className="home-page__header d-flex justify-content-space-between align-items-center">
          <Link to="/">
            <div className="logo-home d-flex align-items-center">
              <img alt="logo-ivi" src={require("@images/trade/logo-ivi.png")} />
            </div>
          </Link>
          {true && (
            <Button
              className="connect-wallet-btn d-flex align-items-center"
              onClick={handleShowConnectModal}
            >
              <WalletIcon />
              <span>Connect Wallet</span>
            </Button>
          )}
        </div>
        <div className="home-page__body">
          <Welcome />
        </div>
        <div
          className={
            screenWidth > 576
              ? "home-page__footer d-flex justify-content-end"
              : "home-page__footer"
          }
        ></div>
      </HomeStyled>
      <ConnectWalletModal history={history} ref={connectWalletRef} />
      {/* <VideoModal ref={videoRef} /> */}
      <ModalError
        title={<ConnectToWalletTitle textOption="error" />}
        ref={modalErrorRef}
        footer={<ConnectToWalletFooter type={"error"} />}
        footerFlex="footer-between "
      />
      <ModalInstallWallet
        title={<ConnectToWalletTitle textOption={"to Metamask"} />}
        footer={<ConnectToWalletFooter type={"install"} />}
        ref={installModalRef}
        footerFlex="footer-right"
      />
    </>
  );
};

export default TradeHome;
