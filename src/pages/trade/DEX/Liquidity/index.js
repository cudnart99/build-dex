import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";

export default function Welcome() {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  return <StyledWrapper>swap</StyledWrapper>;
}
