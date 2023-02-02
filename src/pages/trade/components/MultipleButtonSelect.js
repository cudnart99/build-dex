import React, { memo, useState } from "react";
import { ButtonSelect, MultipleButtonSelectWrapper } from "./styled";

const MultipleButtonSelect = ({
  options = [],
  onChange = () => {},
  content,
  currentActive,
}) => {
  const [activeKey, setActiveKey] = useState(currentActive || 0);
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
