import * as SVG from "@svg";
import { copyToClipBoard } from "@utils/index";
import { Col } from "antd";
import React from "react";
import { ManagementWrapper } from "./styled";
function SvgManagement() {
  const svgData = Object.keys(SVG)
    .filter((key) => typeof SVG[key] != "function")
    .map((item) => ({ key: item, component: SVG[item] }));
  return (
    <ManagementWrapper>
      {svgData.map((item, index) => {
        let Svg = item.component;
        return (
          <Col
            span={2}
            key={index}
            onClick={() => {
              copyToClipBoard(`<${item.key} />`);
            }}
          >
            <Svg />
          </Col>
        );
      })}
    </ManagementWrapper>
  );
}

export default SvgManagement;
