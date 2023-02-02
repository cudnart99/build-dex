import { CloseOutlined } from "@ant-design/icons";
import TradeButton from "@components/TradeButton";
import useCustomState from "@hook/useCustomState";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress, strings } from "@utils/index";
import { Checkbox } from "antd";
import React from "react";
import { ModalConfirmRequestWrapper } from "./styled";

const ModalConfirmRequest = ({
  visible,
  onOk,
  onCancel,
  currentTime,
  responsePeriod,
  dataCid,
  tokenAmount,
  dataOwner,
}) => {
  const [state, setState] = useCustomState({ checked: false });

  const handleCancel = (e) => {
    onCancel(e);
    setState({ checked: false });
  };

  return (
    <ModalConfirmRequestWrapper
      open={visible}
      onOk={onOk}
      onCancel={(e) => handleCancel(e)}
      title={strings("modal.ModalConfirmRequest.header")}
      closable={true}
      closeIcon={<CloseOutlined />}
      footer={
        <div className="modal-request-footer d-flex justify-content-end">
          <TradeButton
            type={"transparent_gray"}
            content={strings("modal.ModalConfirmRequest.txt1")}
            onClick={(e) => handleCancel(e)}
          />
          <TradeButton
            type={"gradient"}
            content={strings("modal.ModalConfirmRequest.txt2")}
            onClick={onOk}
            disabled={!state.checked}
          />
        </div>
      }
    >
      <p>{strings("modal.ModalConfirmRequest.txt3")}</p>
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
              address={dataCid || ""}
              getLengthAddress={getLengthAddress(dataCid, window.innerWidth)}
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
            <div style={{ marginRight: "5px" }}>
              <p className="token-value">
                {/* {tokenAmount?.hexToDecimal()} */}
                <span>{tokenAmount}</span>
              </p>
              {/* <p className="usdt-value">$869,652</p> */}
            </div>
            <div>
              <p className="token-value">
                {/* {tokenAmount?.hexToDecimal()} */}
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
              <p>Owner</p>
              <p>
                <AddressTooltip
                  address={dataOwner || ""}
                  getLengthAddress={getLengthAddress(
                    dataOwner,
                    window.innerWidth
                  )}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="explain-text mt-2">
        {strings("modal.ModalConfirmRequest.txt4")}
      </p>
      <div className="warning-field">
        <img src={require("@images/trade/datahub/warning-icon.png")} alt="" />{" "}
        {strings("modal.ModalConfirmRequest.txt5")}
        <span>
          {" "}
          {strings("modal.ModalConfirmRequest.txt6")}{" "}
        </span>
        <br />{" "}
        <Checkbox
          className="mt-2"
          checked={state.checked}
          onClick={(e) => {
            e.stopPropagation();
            setState({ checked: !state.checked });
          }}
        >
          {strings("modal.ModalConfirmRequest.txt7")}
        </Checkbox>
      </div>
    </ModalConfirmRequestWrapper>
  );
};

export default ModalConfirmRequest;
