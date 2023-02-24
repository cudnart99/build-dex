import React, { useEffect, useState } from "react";
import { SimpleWrapper } from "./styled";
import LiquidityInput from "../LiquidityCommon/LiquidityInput";
import { Slider } from "antd";

export default function Simple({ state, setState }) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    setState({ valueSlider: 0 });
  }, []);
  const listRate = [{ rate: 25 }, { rate: 50 }, { rate: 75 }, { rate: 100 }];
  const onChange = (value) => {
    setValue(value);
    console.log("onChange: ", value);
  };
  return (
    <SimpleWrapper>
      <div className="slider-container">
        <div className="value-slider">{value}%</div>
        <Slider
          onChange={onChange}
          value={value}
          tooltip={{
            open: false,
          }}
        />
        <div className="select-rate-container d-flex mt-4">
          {listRate.map((item, index) => {
            return (
              <div
                className={selected == index ? "block-selected" : "block"}
                onClick={() => {
                  setSelected(index);
                  setValue(item.rate);
                }}
              >
                {item.rate}%
              </div>
            );
          })}
        </div>
      </div>

      <div className="d-flex justify-content-space-between mt-3 mid-container">
        <div className="part-container">
          <div className="title-part mb-2">RECEIVE</div>
          <div className="content-part">
            <div className="mb-4">
              {check1 ? (
                <div
                  onClick={() => setCheck1(!check1)}
                  className="checkbox-check pointer"
                >
                  <img src={require("@images/dex/v-icon.png")} />
                </div>
              ) : (
                <div
                  onClick={() => setCheck1(!check1)}
                  className="checkbox pointer"
                ></div>
              )}
              <img className="icon" src={state.selectedImgToken1}></img>
              <span>{state.selectedNameToken1}</span>
              <span className="value">{state.receiveToken1}</span>
            </div>
            <div>
              {check2 ? (
                <div
                  onClick={() => setCheck2(!check2)}
                  className="checkbox-check pointer"
                >
                  <img src={require("@images/dex/v-icon.png")} />
                </div>
              ) : (
                <div
                  onClick={() => setCheck2(!check2)}
                  className="checkbox pointer"
                ></div>
              )}
              <img className="icon" src={state.selectedImgToken2}></img>
              <span>{state.selectedNameToken2}</span>
              <span className="value">{state.receiveToken2}</span>
            </div>
          </div>
        </div>
        <div className="part-container">
          <div className="title-part mb-2">PRICE</div>
          <div className="content-part">
            <div className="mb-4">
              <img className="icon" src={state.selectedImgToken1}></img>
              <span>{state.selectedNameToken1} &nbsp;&nbsp;&nbsp;&nbsp;=</span>
              <span className="value">
                {state.priceToken1} {state.selectedNameToken2}
              </span>
            </div>
            <div>
              <img className="icon" src={state.selectedImgToken2}></img>
              <span>{state.selectedNameToken2} &nbsp;&nbsp;&nbsp;&nbsp;=</span>
              <span className="value">
                {state.priceToken2} {state.selectedNameToken1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SimpleWrapper>
  );
}
