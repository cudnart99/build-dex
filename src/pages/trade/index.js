import { ListBreadCrumb } from "@constants/breadcrumb";
import LoadingIndicator from "@layouts/LoadingIndicator";
// import {
//   // getFirebaseToken,
//   onMessageListener,
//   requestPermissions,
// } from "@utils/firebase-utils";
import { notification } from "antd";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import GlobalIcons from "./components/GlobalIcons";
import { WrapperStyled } from "./styled";
import TradeHome from "./TradeHome";
import Trade from "./tradeRoute";

const App = ({
  loading,
  connect,
  setLoading,
  address,
  history,
  initTimeLockOwnership,
  ...props
}) => {
  const { ethereum, location } = window;
  const updateBreadCrumb = useDispatch()["global"].updateData;
  const { updateData: updateDatahub } = useDispatch()["datahub"];
  const { search: getNotifications } = useDispatch()["datahubNotifications"];

  const { create: createUser } = useDispatch()["datahubUsers"];

  useEffect(() => {
    const reconnect = async () => {
      if (ethereum) {
        var provider = new ethers.providers.Web3Provider(ethereum);
        const isMetaMaskConnected = async () => {
          const accounts = await provider.listAccounts();
          return accounts?.length > 0;
        };
        await isMetaMaskConnected().then((connected) => {
          if (connected && location.pathname !== "/") {
            connect({ type: "metamask" });
          } else if (location.search === "?type=genKey") {
            history.push({
              pathname: location.pathname,
              search: location.search,
            });
          } else {
            history.push("/");
          }
        });
      }
    };
    reconnect();
  }, []);

  useEffect(() => {
    if (ListBreadCrumb?.includes(window.location.pathname)) {
      updateBreadCrumb({
        breadcrumb: window.location.pathname,
      });
    }

  }, [window.location.pathname]);

  // useEffect(() => {
  //   requestPermissions();
  //   getFirebaseToken()
  //     .then((res) => {
  //       if (address) {
  //         createUser({
  //           notiToken: res,
  //           address: address,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Noti token error!", err);
  //     });
  // }, [address]);

  // useEffect(() => {
  //   onMessageListener()
  //     .then((res) => {
  //       notification.open({
  //         message: res?.data?.title,
  //         description: res?.data?.body,
  //       });
  //       getNotifications();
  //     })
  //     .catch((err) => {
  //       console.log("noti error", err);
  //     });
  // });

  return (
    <WrapperStyled>
      <Switch>
        <Route path={"/"} component={TradeHome} exact />

        <Route path={"/"} component={Trade} />
        <Redirect to={"/"} />
      </Switch>

      {loading && <LoadingIndicator alwayDisplay />}
      {window.location.pathname === "/data-hub" ? "" : <GlobalIcons />}
    </WrapperStyled>
  );
};

const mapStateToProps = ({ global: { loading }, contracts: { address } }) => ({
  loading,
  address,
});
const mapDispatchToProps = ({
  global: { setLoading },
  contracts: { connect },
  vesting: { initTimeLockOwnership },
}) => ({ connect, setLoading, initTimeLockOwnership });

export default connect(mapStateToProps, mapDispatchToProps)(App);
