import TradeButton from "@components/TradeButton";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress } from "@utils/";
import { strings } from "@utils/index";
import React from "react";
import { ModalSuccessNotiWrapper } from "./styled";

const ModalSuccessNoti = ({ visible, onOk, onCancel, data }) => {
  return (
    <ModalSuccessNotiWrapper
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={strings("modal.modalSuccessNoti.header")}
      footer={
        <div className="success-noti-footer d-flex justify-content-end">
          <TradeButton type="gradient" content={strings()} onClick={onCancel} />
        </div>
      }
    >
      <p className="noti-text-1">
        {strings("modal.modalSuccessNoti.text1")}{" "}
        <span>
          <AddressTooltip
            address={data?.dataCid || ""}
            getLengthAddress={getLengthAddress(
              data?.dataCid,
              window.innerWidth
            )}
          />
        </span>
        {strings("modal.modalSuccessNoti.text2")}
      </p>
      <div className="info-success">
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">
            <span>
              {/* <AddressTooltip
                address={data?.dataCid || ""}
                getLengthAddress={getLengthAddress(
                  data?.dataCid,
                  window.innerWidth
                )}
              /> */}
              {strings("modal.modalSuccessNoti.text3")}
            </span>
          </div>
          <div className="info-value" id="dataId">
            <AddressTooltip
              address={data?.dataCid || ""}
              getLengthAddress={getLengthAddress(
                data?.dataCid,
                window.innerWidth
              )}
            />
          </div>
        </p>
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">{strings("modal.modalSuccessNoti.text4")}</div>
          <div className="info-value" id="price">
            {data?.tokenAmount?.hexToDecimal()}{" "}
            {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}
          </div>
        </p>
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">{strings("modal.modalSuccessNoti.text5")}</div>
          <div className="info-value" id="requester">
            <AddressTooltip
              address={data?.buyer || ""}
              getLengthAddress={getLengthAddress(
                data?.buyer,
                window.innerWidth
              )}
            />
          </div>
        </p>
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">{strings("modal.modalSuccessNoti.text6")}</div>
          <div className={`info-value ${"completed"}`}>{strings("modal.modalSuccessNoti.text7")}</div>
        </p>
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">{strings("modal.modalSuccessNoti.text8")}</div>
          <div className="info-value">
            <AddressTooltip
              address="0x3861ef67037411B41922259104566D91b635a396"
              getLengthAddress={getLengthAddress(
                "0x3861ef67037411B41922259104566D91b635a396",
                window.innerWidth
              )}
            />
          </div>
        </p>
      </div>
    </ModalSuccessNotiWrapper>
  );
};

export default ModalSuccessNoti;
