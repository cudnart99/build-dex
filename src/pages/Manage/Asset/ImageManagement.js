import { Col, Image } from "antd";
import React from "react";
import { ManagementWrapper } from "./styled";
function importAll(r) {
  return r.keys().map(r);
}
const images1 = importAll(require.context("@images", false, /\.(png|jpe?g)$/));
const images2 = importAll(
  require.context("@images/trade", false, /\.(png|jpe?g)$/)
);
const images3 = importAll(
  require.context("@images/trade/datahub", false, /\.(png|jpe?g)$/)
);
function ImageManagement() {
  return (
    <ManagementWrapper>
      {[...images1, ...images2, ...images3].map((item, index) => {
        return (
          <Col
            span={6}
            key={index}
            style={{ minHeight: "200px", minWidth: "200px" }}
          >
            <Image src={item}></Image>
          </Col>
        );
      })}
    </ManagementWrapper>
  );
}

export default ImageManagement;
