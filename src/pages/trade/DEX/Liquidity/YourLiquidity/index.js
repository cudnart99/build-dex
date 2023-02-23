import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import LinearText from "@pages/trade/components/LinearText";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import BaseLiquidity from "../../Common/BaseLiquidity";
import { Button } from "antd";

export default function YourLiquidity({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    console.log(width, "width");
  }, [width]);
  const [test, setTest] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <BaseLiquidity
      width={"400px"}
      title={"Your Liquidity"}
      callbackButton={() => setState({ page: "AddLiquidityEntry" })}
      subTitle={"Remove liquidity to receive tokens back"}
      buttonName={"Add Liquidity"}
      content={
        <StyledWrapper>
          {test ? (
            <>
              <div
                className={
                  open ? "liquidity-pair p-10" : "liquidity-pair p-10-b-50"
                }
                onClick={() => setOpen(!open)}
              >
                <div className="d-flex justify-content-space-between">
                  <div className="img-container">
                    <img
                      className="icon"
                      src={require("@images/dex/IVI_icon.png")}
                    ></img>
                    <img
                      className="icon nest"
                      src={require("@images/dex/IHI_icon.png")}
                    ></img>
                    <span className="name-pair">IVI/IHI</span>
                  </div>
                  <div className="d-flex">
                    <div>
                      <div className="price text-right">1.1414</div>
                      <div className="priceInUSD text-right">(~734.06 USD)</div>
                    </div>
                    {open ? (
                      <img
                        className="icon-arrow"
                        src={require("@images/dex/white-arrow-up.png")}
                      ></img>
                    ) : (
                      <img
                        className="icon-arrow"
                        src={require("@images/dex/white-arrow-down.png")}
                      ></img>
                    )}
                  </div>
                </div>

                {open && (
                  <>
                    <div className="row">
                      <div className="key">
                        Share in Trading Pair{" "}
                        <span className="icon-container">
                          <img
                            onMouseOut={() => setVisible(false)}
                            onMouseEnter={() => setVisible(true)}
                            className="icon-small"
                            src={require("@images/dex/i-icon.png")}
                          ></img>
                          {visible && (
                            <div className="tooltip">
                              Based on last 7 days' performance. Does not
                              account for impermanent loss
                            </div>
                          )}
                        </span>
                      </div>
                      <div className="value">100%</div>
                    </div>
                    <div className="row">
                      <div className="key">Pooled IVI</div>
                      <div className="value">0.245</div>
                    </div>
                    <div className="row">
                      <div className="key">Pooled IHI</div>
                      <div className="value">0.2468</div>
                    </div>
                    <div
                      className="link text-center"
                      onClick={() => setState({ page: "RemoveLiquidity" })}
                    >
                      Remove
                    </div>
                    <div className="instead text-center">
                      + Add liquidity instead
                    </div>
                  </>
                )}
              </div>
              <div className="text-center mt-4 mb-4">
                Don't see a pair you joined?
              </div>
            </>
          ) : (
            <div className="mt-7 mb-7">
              <div className="text-center">No liquidity found</div>
              <div className="text-center">Don't see a pair you joined?</div>
            </div>
          )}
          <div
            onClick={() => {
              setState({ page: "ImportPool" });
            }}
            className="text-center link pointer"
          >
            Find other LP tokens
          </div>
          <Button
            type="primary"
            className="test"
            onClick={() => {
              setTest(!test);
            }}
          >
            Đã có pair hoặc chưa có pair
          </Button>
        </StyledWrapper>
      }
    />
  );
}
