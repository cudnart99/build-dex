import { ArrowDown, ArrowUp, X } from "@assets/svg";
import useCustomState from "@hook/useCustomState";
import { Button, Checkbox, Input, Select, Tag, Tooltip } from "antd";
import React, { useEffect } from "react";
import {
  CustomActionIconWrapper,
  DropdownGlobalStyled,
  SelectWidthCheckboxWrapper,
} from "./styled";

const CustomActionIcon = ({
  open,
  openAction,
  clearAction,
  value,
  closeAction,
}) => {
  return (
    <CustomActionIconWrapper>
      <div className="count">{value || 0}</div>
      <div className="clear" onClick={clearAction}>
        <X />
      </div>
      <div className="arrow">
        {open ? (
          <ArrowUp onClick={closeAction} />
        ) : (
          <ArrowDown onClick={openAction} />
        )}{" "}
      </div>
    </CustomActionIconWrapper>
  );
};
const SelectWithCheckbox = ({
  defaultValue = [],
  options = [],
  onChange,
  placeholder,
  type,
  total,
  onSubmit,
  ...props
}) => {
  const [state, setState] = useCustomState({
    open: false,
    arr: defaultValue,
    activeKeys: {},
  });

  const { open, arr, activeKeys } = state;
  const openAction = () => {
    setState({ open: true });
  };

  const closeAction = (e) => {
    e.stopPropagation();
    setState({ open: false });
  };

  const changeValue = (value, parentChecked) => () => {
    let newArr = Object.assign([], arr);
    if (typeof value === "object") {
      if (parentChecked) {
        for (let index = 0; index < value.child?.length; index++) {
          const element = value.child[index];
          newArr.splice(newArr.indexOf(element.code), 1);
        }
      } else {
        for (let index = 0; index < value.child?.length; index++) {
          const element = value.child[index];
          newArr.push(element.code);
        }
      }
    } else {
      if (newArr?.includes(value)) {
        newArr.splice(newArr.indexOf(value), 1);
      } else {
        newArr.push(value);
      }
    }

    setState({ arr: newArr });
  };
  const onFinish = (e) => {
    e.stopPropagation();
    setState({ open: false });

    onSubmit(arr);
  };
  const dataOptions = options?.[0]?.child
    ? options
        ?.reduce((a, b) => [...a, ...b?.child], [])
        ?.map((item) => ({ label: item.code, value: item.code }))
    : options;

  const onChecked = (checked) => {
    if (checked) {
      setState({ arr: dataOptions.map((item) => item.value) });
    } else {
      setState({ arr: [] });
    }
  };

  const onSelectAll = (e) => {
    onChecked(e.target.checked);
  };

  const onClear = () => {
    onChecked(false);
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const customClose = (param) => {
      let newArr = Object.assign([], arr);
      newArr.splice(newArr.indexOf(value), 1);
      setState({ arr: newArr });
      onClose(param);
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={customClose}
        style={{
          marginRight: 3,
          color: "#2B2B2B",
          background: "#f5effa",
        }}
      >
        {label}
      </Tag>
    );
  };
  useEffect(() => {
    if (defaultValue) {
      setState({ arr: defaultValue });
    }
  }, [defaultValue]);

  return (
    <SelectWidthCheckboxWrapper>
      <Select
        maxTagCount={5}
        mode="multiple"
        suffixIcon={null}
        options={dataOptions}
        placeholder={placeholder}
        type={type}
        tagRender={tagRender}
        open={open}
        onClick={openAction}
        value={arr}
        dropdownRender={() => {
          return (
            <div className="dropdown-container">
              <div className="dropdown-container__all">
                <div>
                  <Checkbox onChange={onSelectAll}>Select all</Checkbox>{" "}
                </div>
                <div onClick={onClear}>Clear</div>
              </div>
              <div className="dropdown-container__search">
                <Input placeholder="Search by name..." />
              </div>
              <div className="dropdown-container__items">
                {options.map((item) => {
                  let value = item.value;
                  let label = item.label;
                  let parentChecked = item?.child?.every((item) =>
                    arr.includes(item.code)
                  );
                  return (
                    <>
                      <div
                        className="dropdown-container__items__item mb-2"
                        key={value}
                        onClick={changeValue(item, parentChecked)}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            let newActiveKeys = Object.assign({}, activeKeys);
                            newActiveKeys[value] = !newActiveKeys[value];
                            setState({ activeKeys: newActiveKeys });
                          }}
                        >
                          {activeKeys?.[value] ? (
                            <ArrowUp className="hover-pointer" />
                          ) : (
                            <ArrowDown className="hover-pointer" />
                          )}{" "}
                        </div>

                        <Tooltip title={label}>
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              borderBottom: "0.5px solid #6E6E6E",
                              width: "100%",
                            }}
                          >
                            <Checkbox checked={parentChecked} />
                            <span className="dropdown-container__items__item__text">
                              {" "}
                              {label}
                            </span>
                          </div>
                        </Tooltip>
                      </div>
                      {activeKeys?.[value] &&
                        item?.child?.map((item) => {
                          let value = item.code;
                          let label = `${item.code} - ${item.viName}`;
                          return (
                            <div
                              className="dropdown-container__items__item__subitem hover-pointer"
                              key={value}
                              onClick={changeValue(value)}
                            >
                              <Checkbox checked={arr?.includes(value)} />
                              {label}
                            </div>
                          );
                        })}
                    </>
                  );
                })}
              </div>
              <div className="dropdown-container__footer">
                <div>{`${arr?.length} of ${total}`}</div>
                <div>
                  <Button
                    className="dropdown-container__footer--close"
                    onClick={closeAction}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="dropdown-container__footer--submit"
                    onClick={onFinish}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          );
        }}
        {...props}
      />
      <CustomActionIcon
        value={arr?.length}
        clearAction={onClear}
        openAction={openAction}
        open={open}
        closeAction={closeAction}
      />

      <DropdownGlobalStyled />
    </SelectWidthCheckboxWrapper>
  );
};

export default SelectWithCheckbox;
