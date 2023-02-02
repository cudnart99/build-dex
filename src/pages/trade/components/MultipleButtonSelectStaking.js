import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonSelect, MultipleButtonSelectWrapper } from "./styled";

const MultipleButtonSelect = ({
  options = [],
  onChange = () => {},
  content,
}) => {
  const tableType = useSelector((state) => state?.staking?.tableType);
  const [activeKey, setActiveKey] = useState(tableType || 0);
  useEffect(() => {
    setActiveKey(tableType);
  }, [tableType]);
  return (
    <MultipleButtonSelectWrapper>
      {options.map((item, index) => {
        return (
          <ButtonSelect
            key={index}
            onClick={() => {
              setActiveKey(index);
              onChange(item, index);
              if (typeof item?.handleClick == "function") {
                item?.handleClick();
              }
            }}
            active={index === activeKey ? "active" : ""}
          >
            {item.icon} &nbsp;
            <p>
              <span>{item.text}</span>
              {content && <span>{content}</span>}
            </p>
          </ButtonSelect>
        );
      })}
    </MultipleButtonSelectWrapper>
  );
};

export default memo(MultipleButtonSelect);
