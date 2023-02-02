import data from "@assets/json/iviicd10.json";
import { ArrowBottom, ArrowDown, ArrowTop, ArrowUp } from "@assets/svg";
import useCustomState from "@hook/useCustomState";
import { strings } from "@utils/index";
import { Checkbox, Menu, Tooltip } from "antd";
import React, { memo, useEffect, useRef } from "react";
import { ICD10DropDownWrapper } from "./styled";
function ICD10DropDownFilter({
  title = "",
  onChange = () => {},
  defaultActiveData,
}) {
  const refFlag = useRef(0);
  const [state, setState] = useCustomState({
    activeData: [],
    show: false,
  });
  useEffect(() => {
    if (defaultActiveData) {
      setState({ activeData: defaultActiveData });
    }
  }, [defaultActiveData]);
  useEffect(() => {
    if (refFlag.current) {
      onChange(state.activeData);
    }
  }, [state.activeData]);

  useEffect(() => {
    refFlag.current++;
  }, []);

  const handleCheckParentMenu = (item) => {
    let checked = item.child.every((subItem) =>
      state.activeData.includes(subItem.code)
    );

    let newActiveData = Object.assign([], state.activeData);
    if (checked) {
      for (let i = 0; i < item.child?.length; i++) {
        let element = item.child[i].code;
        newActiveData.splice(newActiveData.indexOf(element), 1);
      }
    } else {
      newActiveData = [
        ...newActiveData,
        ...item.child.map((subItem) => subItem.code),
      ];
    }

    setState({
      activeData: newActiveData,
    });
  };

  const handleCheckChildrenMenu = (subItem) => {
    let checked = state.activeData.includes(subItem.code);

    let newActiveData = Object.assign([], state.activeData);
    if (checked) {
      newActiveData.splice(newActiveData.indexOf(subItem.code), 1);
    } else {
      newActiveData.push(subItem.code);
    }
    setState({
      activeData: newActiveData,
    });
  };

  const customExpandIcon = (props) => {
    if (props.isOpen) {
      return (
        <ArrowUp
          onClick={(e) => {
            let newOpenKeys = Object.assign([], state.openKeys);
            newOpenKeys.splice(newOpenKeys.indexOf(props.eventKey), 1);
            setState({ openKeys: newOpenKeys });
          }}
        />
      );
    } else {
      return (
        <ArrowDown
          onClick={(e) => {
            let newOpenKeys = Object.assign([], state.openKeys);
            newOpenKeys.push(props.eventKey);
            setState({ openKeys: newOpenKeys });
          }}
        />
      );
    }
  };
  return (
    <ICD10DropDownWrapper>
      <h1 className="filter-group__title">{title}</h1>
      <Menu
        expandIcon={(props) => customExpandIcon(props)}
        items={data.slice(0, state.show ? data?.length : 5).map((item) => {
          let checked = item.child.every((checkItem) =>
            state.activeData.includes(checkItem.code)
          );
          return {
            label: (
              <Tooltip title={`${item.code} - ${item.viName}`}>
                <div
                  className="d-flex gap-10"
                  onClick={(event) => {
                    handleCheckParentMenu(item);
                  }}
                >
                  <Checkbox checked={checked} />
                  <span
                    className="break-line"
                    // style={{ color: checked ? "white" : "#C6C6C6" }}
                    style={{ color:"white"}}
                  >{`${item.code} - ${item.viName}`}</span>
                </div>
              </Tooltip>
            ),
            key: item.code,
            children: item.child
              .sort((a, b) => {
                let result = a.code.substring(0, 1) < b.code.substring(0, 1);
                if (result) return -1;
                if (result) return 1;
                return 0;
              })
              .map((subItem) => {
                let checked = state.activeData.includes(subItem.code);
                return {
                  label: (
                    <Tooltip title={`${subItem.code} - ${subItem.viName}`}>
                      <div
                        className="d-flex gap-10"
                        onClick={(event) => {
                          handleCheckChildrenMenu(subItem);
                        }}
                      >
                        <Checkbox checked={checked} />
                        <span
                          className="break-line"
                          style={{ color: checked ? "white" : "#C6C6C6" }}
                        >{`${subItem.code} - ${subItem.viName}`}</span>
                      </div>
                    </Tooltip>
                  ),
                  key: subItem.code,
                };
              }),
          };
        })}
        mode="inline"
        openKeys={state.openKeys || []}
      ></Menu>
      {
        <div
          onClick={() => {
            setState({ show: !state.show });
          }}
        >
          {state.show ? (
            <div>
              <span className="show">{strings("modal.ICD10DropDownFilter.show-less")}</span>
              <span>
                {" "}
                <ArrowTop />
              </span>
            </div>
          ) : (
            <div>
              <span className="show">{strings("modal.ICD10DropDownFilter.show-more")}</span>
              <span>
                {" "}
                <ArrowBottom />{" "}
              </span>{" "}
            </div>
          )}
        </div>
      }
    </ICD10DropDownWrapper>
  );
}

export default memo(ICD10DropDownFilter);
