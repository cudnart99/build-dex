import { SelectDown } from "@assets/svg";
import {
  TransparentCheckBox,
  TransparentRadioGroup,
} from "@components/base/baseStyled";
import { Checkbox, Radio } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SidebarFilterItemWrapper } from "./styled";

const SidebarFilterItem = ({
  title,
  listOptions,
  filterFunction,
  type,
  AddingChildren,
  keyFilter,
  actived,
  filterNew = [""],
  show,
  // setShowFilter = () => {},
}) => {
  const [showFilter, setShowFilter] = useState(true);
  const filter = useSelector((state) => state?.datasharing?.sidebarFilter);
  const activeTokenList = useSelector(
    (state) => state?.datasharing?.sidebarFilter.tokens
  );
  const activeCheckbox = useSelector(
    (state) => state?.datasharing?.sidebarFilter.listStatus
  );
  return (
    <SidebarFilterItemWrapper
      show={show}
      activedList={activeTokenList}
      activeCheckbox={activeCheckbox}
    >
      <div
        onClick={() => {
          setShowFilter(!showFilter);
          // setShowFilter({ [keyFilter]: !show });
        }}
        className="d-flex justify-content-start  align-items-center hover-pointer mb-3"
      >
        <SelectDown className={`${showFilter === false ? "rotate90" : ""}`} />

        <label className="filter-group__title">{title}</label>
      </div>
      {type === "multiFilterCollected" && showFilter && (
        <div>
          {listOptions.map((item, index) => (
            <div
              className="d-flex gap-10 mb-1 hover-pointer"
              key={index}
              onClick={() => {
                let checked = activeCheckbox.includes(item?.value);
                if (checked) {
                  let vitri = activeCheckbox.findIndex(
                    (val) => val === item.value
                  );
                  activeCheckbox.splice(vitri, 1);
                  filterFunction([...activeCheckbox]);
                } else {
                  filterFunction([...activeCheckbox, item?.value]);
                }
              }}
            >
              <TransparentCheckBox
                checked={activeCheckbox.includes(item?.value)}
              />
              {item.label}
            </div>
          ))}
        </div>
      )}
      {type === "oneFilterCollected" && showFilter && (
        <TransparentRadioGroup
          options={listOptions.map((item, index) => ({
            ...item,
            label: (
              <>
                <img className="mr-2" src={item.imgLink} alt="" />
                {item.label}
              </>
            ),
            // disabled: index !== 0,
          }))}
          defaultValue={10}
          onChange={(e) => {
            let value = e.target.value;
            if (activeTokenList === value) {
              filterFunction();
            } else {
              filterFunction(value);
            }
          }}
          value={activeTokenList}
        />
        // <div>
        //   {listOptions.map((item, index) => (
        //     <div
        //       className={`${
        //         activeTokenList === item.value ? "actived" : ""
        //       } item-filter mb-2 hover-pointer d-flex align-items-center`}
        //       onClick={() => {
        //         if (activeTokenList === item.value) {
        //           filterFunction();
        //         } else {
        //           filterFunction(item.value);
        //         }
        //       }}
        //     >
        //       <img className="mr-2" src={item.imgLink} alt="" />
        //       {item.label}
        //     </div>
        //   ))}
        // </div>
      )}
      {type === "multiple" && showFilter && (
        <Checkbox.Group
          options={listOptions}
          onChange={filterFunction}
          className="filter-checkbox"
        />
      )}
      {type === "one" && showFilter && (
        <Radio.Group
          options={listOptions}
          onChange={filterFunction}
          className="filter-radio"
        />
      )}
      {showFilter && (
        <div>
          {type === "newOne" && (
            <div className="d-flex-column hover-pointer ">
              {listOptions.map((item, index) => (
                <div
                  className="padding-item"
                  onClick={() => {
                    if (keyFilter === "filterStatus") {
                      if (filterNew.includes(item?.value)) {
                        let vitri = filterNew.findIndex(
                          (val) => val === item.value
                        );
                        filterNew.splice(vitri, 1);
                        filterFunction({ [keyFilter]: [...filterNew] });
                      } else
                        filterFunction({
                          [keyFilter]: [...filterNew, item?.value],
                        });
                    } else {
                      if (actived === index + 1)
                        filterFunction({ [keyFilter]: null });
                      else filterFunction({ [keyFilter]: item?.value });
                    }
                  }}
                >
                  <div
                    className={`padding-top hover-pointer mb-1 ${
                      keyFilter === "filterStatus" &&
                      actived.includes(index + 1)
                        ? "actived"
                        : ""
                    } ${
                      actived - 1 === index ? "actived" : ""
                    } item-filter d-flex align-items-center`}
                    key={index}
                  >
                    <img className="mr-2" src={item.imgLink} />
                    {item?.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          {AddingChildren && AddingChildren}
          <hr className="filter-group-divider" />
        </div>
      )}
    </SidebarFilterItemWrapper>
  );
};

export default SidebarFilterItem;
