import { theme } from "@constants";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/calendar/locale/en_US";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";
// import { refLoading } from "src";
import { ThemeProvider } from "styled-components";
import "../i18n";
import Manage from "./Manage";
import Trade from "./trade";
import SpineFracture from "./trade/datahub/AiDemo/components/SpineFracture";

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

const App = (props) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider locale={enUS}>
        <Switch>
          <Route path={"/svg-management"} component={Manage} exact={true} />
          <Route
            path={"/ai/spine-fracture"}
            component={SpineFracture}
            exact={true}
          />

          <Route path={"/"} component={(props) => <Trade {...props} />} />
        </Switch>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
