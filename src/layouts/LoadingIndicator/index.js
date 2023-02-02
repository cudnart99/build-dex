import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import "./style.scss";

const LoadingIndicator = ({ alwayDisplay = false }, ref) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));
  return (
    <div
      id="loading-indicator"
      style={{ display: alwayDisplay ? "block" : visible ? "block" : "none" }}
    >
      <div className="loader">
        <div className="loader-inner">
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(forwardRef(LoadingIndicator));
