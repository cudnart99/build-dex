import { Tabs } from "antd";
import React from "react";
import AnimationManagement from "./Asset/AnimationManagement";
import ImageManagement from "./Asset/ImageManagement";
import SvgManagement from "./Asset/SvgManagement";
import { ManageWrapper } from "./styled";

function Manage() {
  return (
    <ManageWrapper>
      <h1>Assets management</h1>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `SVGS`,
            key: "1",
            children: <SvgManagement />,
          },
          {
            label: `Animations`,
            key: "2",
            children: <AnimationManagement />,
          },
          {
            label: `Image`,
            key: "3",
            children: <ImageManagement />,
          },
        ]}
      />
    </ManageWrapper>
  );
}

export default Manage;
