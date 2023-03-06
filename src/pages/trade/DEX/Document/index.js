// import ViewPdf from "@components/ViewPdf";
// import PdfViewer from "@components/ViewPdf/PdfViewer";
import React, { useState, useEffect, useRef } from "react";
import { WrapperStyled } from "./styled";
import { Menu, Affix, Drawer } from "antd";
import Disclaimer from "./Disclaimer";
import FAQ from "./FAQ";
import PrivacyPolicy from "./PrivacyPolicy";
import Terms from "./Terms";
// import HealthMarket from "./HealthMarket";
// import DigiEco from "./DigiEco";
// import { SecurityScanTwoTone } from "@ant-design/icons";
// import BigPicture from "./BigPicture";
// import DigiEco2 from "./DigiEco2";
// import Roadmap from "./Roadmap";
// import TokenMetrics from "./TokenMetrics";
// import Tokenomics from "./Tokenomics";
// import OurTeams from "./OurTeams";

const Document = (props) => {
  // const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const handleShowDrawer = () => {
    if (openDrawer) {
      onClose();
    } else {
      showDrawer();
    }
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  // const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [openDetail, setOpenDetail] = useState("sub4");
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const previousOpenDetail = useRef(null);
  useEffect(() => {
    if (typeof openDetail === "undefined") {
      console.log("under bux123123");
      setOpenDetail(previousOpenDetail.current);
    }
    previousOpenDetail.current = openDetail;
    console.log(openDetail, "openDetail");
  }, [openDetail]);



  const items = [
    getItem(<div>Introduction</div>, "sub1", null),
    getItem(<div>Protocol Concepts</div>, "sub2", null),
    getItem(<div>Governance</div>, "sub3", null),
    getItem(<div>Disclaimer</div>, "sub4", null),
    getItem(<div>FAQ</div>, "sub5", null),
    getItem(<div>Privacy Policy</div>, "sub6", null),
    getItem(<div>Terms of Services</div>, "sub7", null),
  ];
  const onClick = (e) => {
    console.log("click ", e);
    console.log(e.key, "click");
    setOpenDetail(e.key);
    onClose();
  };
  // const onOpenChange = (keys, ...rest) => {
  //   console.log(keys, rest, "keys");
  //   setOpenDetail(keys[keys.length - 1]);
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };
  return (
    <WrapperStyled>
      <div className="back-to-head">
        <a href="#head">
          <img src={require("@images/icon-up.png")} />
        </a>
      </div>
      <div className="menu-icon-container" onClick={handleShowDrawer}>
        <img src={require("@images/menu-icon.png")} />
      </div>
      <div id="head" className="block-id-head"></div>
      <div className="title">
        <div>Document</div>
      </div>
      <div className="content">
        <div className="menu">
          <div className="menu-container">
            <Menu
              onClick={(e) => onClick(e)}
              style={{
                width: "100%",
              }}
              defaultOpenKeys={["sub1"]}
              // onOpenChange={onOpenChange}
              // openKeys={openKeys}
              mode="inline"
              items={items}
            />
          </div>
        </div>
        <div className="detail">
          {openDetail == "sub1" ? (
            <div>Introduction</div>
          ) : openDetail == "sub2" ? (
            <div>Protocol Concepts</div>
          ) : openDetail == "sub3" ? (
            <div>Governance</div>
          ) : openDetail == "sub4" ? (
            <Disclaimer />
          ) : openDetail == "sub5" ? (
            <FAQ />
          ) : openDetail == "sub6" ? (
            <PrivacyPolicy />
          ) : openDetail == "sub7" ? (
            <Terms />
          ) : (
            <>fail</>
          )}
        </div>
      </div>
      <Drawer placement="left" width={300} onClose={onClose} open={openDrawer}>
        <Menu
          onClick={onClick}
          style={{
            width: "100%",
          }}
          defaultOpenKeys={["sub1"]}
          // onOpenChange={onOpenChange}
          // openKeys={openKeys}
          mode="inline"
          items={items}
        />
      </Drawer>
    </WrapperStyled>
  );
};
export default Document;
