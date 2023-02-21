import React from "react";
import { StyledWrapper } from "./styled";
import SelectTokenModal from "../SelectTokenModal";

export default function BaseSelect({ state, setState, type }) {
  var check;
  if (type === 1) {
    check = state?.selectedNameToken1;
  } else {
    check = state?.selectedNameToken2;
  }
  return (
    <StyledWrapper>
      <div
        className="container pointer "
        onClick={() =>
          setState({ openSelectTokenModal: true, selectedModal: type })
        }
      >
        {check == "" ? (
          <div className="gray-text">Select a token</div>
        ) : (
          <div className="d-flex">
            <div className="common-icon">
              <img
                className="icon"
                src={
                  type == 1 ? state.selectedImgToken1 : state.selectedImgToken2
                }
              ></img>
            </div>
            <div className="text">
              {type == 1 ? state.selectedNameToken1 : state.selectedNameToken2}
            </div>
            <img
              className="icon-down-arrow"
              src={require("@assets/images/dex/down-arrow.png")}
            />
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}
