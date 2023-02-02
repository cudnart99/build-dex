import { ButtonX } from "@assets/svg";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ButtonFilterCollectedWrapper } from "./styled";

function ButtonFilterCollected({ content, type = "" }) {
  const { search: getAssetFromBE } = useDispatch()["datahub"];

  const updateNestedDataDispatch = useDispatch()?.datasharing?.updateNestedData;
  const activeCheckbox = useSelector(
    (state) => state?.datasharing?.sidebarFilter.listStatus
  );

  const handleClickFilter = () => {
    if (type === "one") {
      updateNestedDataDispatch({
        sidebarFilter: {
          tokens: null,
          fromValue: null,
          toValue: null,
          listStatus: activeCheckbox,
        },
      });
      getAssetFromBE({
        currencies: null,
        priceRange: null,
        listTradingStatus:
          window.location.pathname === "/data-hub"
            ? activeCheckbox?.join(",") || "10,20,30"
            : activeCheckbox?.join(","),
      });
    } else if (type === "multi") {
      let vitri = activeCheckbox.findIndex((val) => val === content);
      activeCheckbox.splice(vitri, 1);
      console.log(activeCheckbox);
      updateNestedDataDispatch({
        sidebarFilter: {
          listStatus: activeCheckbox,
        },
      });
      getAssetFromBE({
        listTradingStatus:
          window.location.pathname === "/data-hub"
            ? activeCheckbox?.join(",") || "10,20,30"
            : activeCheckbox?.join(","),
      });
    }
  };
  return (
    <ButtonFilterCollectedWrapper className="hover-pointer">
      <div className="d-flex align-items-center">
        {type === "multi" && (
          <span className="mr-2 min-width40">
            {content === 10
              ? "Buy Now"
              : content === 20
              ? "On Auction"
              : content === 30
              ? "Recently Granted"
              : ""}
          </span>
        )}
        {content?.fromValue && (
          <span className="mr-1">{`Min ${content.fromValue}`}</span>
        )}
        {content?.toValue && (
          <span className="mr-1">{`${
            content?.fromValue && content?.toValue ? ", " : ""
          }Max ${content.toValue}`}</span>
        )}
        {content?.tokens && (
          <span className="mr-2 min-width40">
            {content?.tokens === 10
              ? `${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`
              : content?.tokens === 20
              ? "IHI"
              : content?.tokens === 30
              ? "USDT"
              : ""}
          </span>
        )}
        {(content?.fromValue || content?.toValue || content?.tokens) &&
          type === "one" && (
            <ButtonX className="buttonX" onClick={handleClickFilter} />
          )}
        {type === "multi" && (
          <ButtonX className="buttonX" onClick={handleClickFilter} />
        )}
      </div>
    </ButtonFilterCollectedWrapper>
  );
}

export default ButtonFilterCollected;
