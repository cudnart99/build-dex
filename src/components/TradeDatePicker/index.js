import { CalendarIcon } from "@assets/svg";
import React from "react";
import { DatePickerWrapper, GlobalStyle } from "./styled";

function TradeDatePicker(props) {
  return (
    <React.Fragment>
      <DatePickerWrapper
        format={"DD-MMM-YYYY"}
        suffixIcon={<CalendarIcon />}
        {...props}
      ></DatePickerWrapper>
      <GlobalStyle />
    </React.Fragment>
  );
}

export default TradeDatePicker;
