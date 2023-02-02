import { CalendarIcon } from "@assets/svg";
import TradeDatePicker from "@components/TradeDatePicker";
import useCustomState from "@hook/useCustomState";
import React from "react";
import { FilterTimeWrapper } from "./styled";

function FilterTime({
  options = [],
  onChange = () => {},
  onTimeChange = () => {},
  hasCustom = true,
  customName = "Custom time",
  value,
}) {
  const [state, setState] = useCustomState({ value: null });
  return (
    <FilterTimeWrapper>
      {[
        ...options,
        ...(hasCustom ? [{ name: <CalendarIcon />, value: "pick" }] : []),
      ].map((item) => {
        return (
          <div
            className={`option${
              item.value === (value || item.value) ? " option__active" : ""
            }`}
            key={item.value}
            onClick={() => {
              onChange(item.value, item);
              let newState = { value: item.value, ranges: null };
              if (item.value === "pick") {
                newState.open = true;
              }
              setState(newState);
            }}
          >
            {item.name}
          </div>
        );
      })}
      {hasCustom && (
        <TradeDatePicker
          className="datePicker"
          open={state.open}
          value={state.ranges}
          onChange={(ranges) => {
            setState({ open: false, ranges });
            onTimeChange(ranges);

          }}
        />
      )}
    </FilterTimeWrapper>
  );
}

export default FilterTime;
