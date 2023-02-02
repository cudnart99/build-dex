import { ArrowBottom, ArrowTop } from "@assets/svg";
import CategoryList from "@constants/datahub/category";
import { Checkbox } from "antd";
import React, { memo, useEffect, useRef, useState } from "react";
import { CategoryPickerWrapper } from "./styled";

function CategoryPicker({ onChange = () => {}, defaultArrState }) {
  const refFlag = useRef(0);

  const [arrState, setArrState] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (refFlag.current) {
      onChange(arrState);
    }
  }, [arrState]);

  useEffect(() => {
    if (defaultArrState) {
      setArrState(defaultArrState);
    }
  }, [defaultArrState]);
  useEffect(() => {
    refFlag.current++;
  }, []);

  return (
    <CategoryPickerWrapper>
      <div className="content">
        {CategoryList.slice(0, show ? CategoryList?.length : 5).map(
          (item, key) => {
            return (
              <div
                key={key}
                className="group hover-pointer"
                onClick={() => {
                  let checked = !arrState?.includes(item);
                  let newArrState = Object.assign([], arrState);
                  if (checked) {
                    newArrState.push(item);
                  } else {
                    newArrState.splice(newArrState.indexOf(item), 1);
                  }
                  setArrState(newArrState);
                }}
              >
                <span>
                  <Checkbox checked={arrState.includes(item)} />
                </span>{" "}
                <span className="group__text--white">{item}</span>
              </div>
            );
          }
        )}
      </div>
      <div
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? (
          <div>
            <span className="show">Show less</span>
            <span>
              {" "}
              <ArrowTop />
            </span>
          </div>
        ) : (
          <div>
            <span className="show">Show more</span>
            <span>
              {" "}
              <ArrowBottom />{" "}
            </span>{" "}
          </div>
        )}
      </div>
    </CategoryPickerWrapper>
  );
}

export default memo(CategoryPicker);
