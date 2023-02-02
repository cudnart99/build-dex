import React from "react";
import { SidebarFilterItemWrapper } from "../styled";
import { ICDOptionWrapper } from "./styled";

const ICDOptions = ({ filterFunction, title }) => {
  return (
    <ICDOptionWrapper>
      <h1 className="filter-group__title">{title}</h1>
    </ICDOptionWrapper>
  );
};

export default ICDOptions;
