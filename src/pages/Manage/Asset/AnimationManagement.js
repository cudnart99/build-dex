import * as ANIMATION from "@assets/animation";
import { copyToClipBoard } from "@utils/index";
import { Col } from "antd";
import React from "react";
import { ManagementWrapper } from "./styled";
function AnimationManagement() {
  const svgData = Object.keys(ANIMATION)
    .filter((key) => typeof ANIMATION[key] == "function")
    .map((item) => ({ key: item, component: ANIMATION[item] }));
  return (
    <ManagementWrapper>
      {svgData.map((item, index) => {
        let Svg = item.component;
        return (
          <Col
            span={6}
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

export default AnimationManagement;
