import { ButtonX } from "@assets/svg";
import TradeButton from "@components/TradeButton";
import React from "react";
import FilterDrawerItem from "./FilterDrawerItem";
import { strings } from "@utils/index";
import { FilterDrawerDatahubWrapper } from "./styled";

function FilterDrawerDatahub({
  onClose,
  visible,
  listFilter,
  handleResetFilter,
}) {
  return (
    <FilterDrawerDatahubWrapper
      onClose={onClose}
      open={visible}
      title={
        <div className="d-flex justify-content-space-between">
          <h2 className="filter-header">{strings("modal.FilterDrawerDatahub.header")}</h2>{" "}
          <ButtonX
            className="hover-pointer"
            style={{ width: "20px", height: "20px" }}
            onClick={onClose}
          />
        </div>
      }
    >
      {listFilter?.map((item, index) => {
        return (
          <div className="filter-drawer-datahub" key={index}>
            <FilterDrawerItem
              className="filter-drawer-datahub__item"
              title={item?.title}
              listOptions={item?.listOptions}
              filterFunction={item?.filterFunction}
              type={item?.type}
              AddingChildren={item?.AddingChildren}
              keyFilter={item?.keyFilter}
              actived={item?.actived}
              filterNew={item?.filterNew}
              show={item?.show}
              setShowFilter={item?.setShowFilter}
              onChange={item?.onChange}
            />
          </div>
        );
      })}
      <div className="mt-10" style={{ position: "relative", bottom: "-20px" }}>
        <TradeButton
          fontSize={14}
          content={strings("modal.FilterDrawerDatahub.clear")}
          colorText="#ffff"
          className="reset-button"
          onClick={() => {
            handleResetFilter();
          }}
        />
      </div>
    </FilterDrawerDatahubWrapper>
  );
}

export default FilterDrawerDatahub;
