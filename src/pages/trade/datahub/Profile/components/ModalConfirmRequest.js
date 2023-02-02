import { CloseOutlined } from "@ant-design/icons";
import TradeButton from "@components/TradeButton";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress, strings } from "@utils/index";
import { Statistic } from "antd";
import React from "react";
import { ModalConfirmRequestWrapper } from "./styled";

const ModalConfirmRequest = ({
  visible,
  onOk,
  onCancel,
  currentTime,
  responsePeriod,
  data,
}) => {
  return (
    <ModalConfirmRequestWrapper
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={strings("modal.modalConfirmRequest2.header")}
      closable={true}
      closeIcon={<CloseOutlined />}
      footer={
        <div className="modal-request-footer d-flex justify-content-end">
          <TradeButton
            type={"transparent_gray"}
            content={strings("reject")}
            onClick={onCancel}
          />
          <TradeButton type={"gradient"} content={strings("modal.modalConfirmRequest2.accept")} onClick={onOk} />
        </div>
      }
    >
      <p>{strings("modal.modalConfirmRequest2.text-1")}</p>
      <div className="info-field d-flex">
        <div className="img-field">
          <img
            src={require("@images/trade/datahub/example-image.png")}
            alt=""
          />
        </div>
        <div className="text-info-field ml-4">
          <h1>
            <AddressTooltip
              address={data?.dataCid || ""}
              getLengthAddress={getLengthAddress(
                data?.dataCid,
                window.innerWidth
              )}
            />
          </h1>
          <div className="d-flex price-field">
            <div className="token-icon__wrapper">
              <img
                className="token-icon"
                alt=""
                src={require("@images/trade/datahub/ivi-token-swap.png")}
              />
            </div>
            <div>
              <p className="token-value">
                {data?.tokenAmount?.hexToDecimal()}{" "}
                <span> {`${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}</span>
              </p>
              {/* <p className="usdt-value">$869,652</p> */}
            </div>
          </div>
          <div className="requester d-flex">
            <div className="requester-avatar">
              <img
                src={require("@images/trade/datahub/item-example-avatar.png")}
                alt=""
              />
            </div>
            <div className="requester-info">
              <p>Requester</p>
              <p>
                <AddressTooltip
                  address={data?.buyer || ""}
                  getLengthAddress={getLengthAddress(
                    data?.buyer,
                    window.innerWidth
                  )}
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="warning-field">
        <img src={require("@images/trade/datahub/warning-icon.png")} alt="" />{" "}
        The wallet address has requested EHR once, please check the information
        of the sold profile and check it for the same (in case the second
        listing is an updated version)
      </div> */}
      <div className="expired-field mt-2">
        <p>{strings("modal.modalConfirmRequest2.text-3")}</p>
        <Statistic.Countdown
          value={new Date(data?.responseDeadline?.hexToNumber() * 1000)}
          format={"HH [hours] mm [minutes] ss [seconds]"}
        />
        <p>{strings("modal.modalConfirmRequest2.text-4")}</p>
      </div>
    </ModalConfirmRequestWrapper>
  );
};

export default ModalConfirmRequest;
