import { CloseOutlined } from "@ant-design/icons";
import TradeButton from "@components/TradeButton";
import useCustomState from "@hook/useCustomState";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress, strings } from "@utils/index";
import { Checkbox } from "antd";
import React, { forwardRef, memo, useImperativeHandle } from "react";
import { ConfirmDeactiveModalWrapper } from "./styled";

const ConfirmDeactiveModal = (
  { onOk, dataOwner, dataCid, price, ...props },
  ref
) => {
  const [state, setState] = useCustomState({
    visible: false,
    checked: false,
  });

  const onCancel = (e) => {
    e.stopPropagation();
    setState({
      visible: false,
      checked: false,
    });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        visible: true,
      });
    },
    close: () => {
      setState({
        visible: false,
        checked: false,
      });
    },
  }));

  return (
    <ConfirmDeactiveModalWrapper
      open={state.visible}
      title={strings("modal.ConfirmDeactiveModal.header")}
      closable={true}
      closeIcon={<CloseOutlined />}
      onCancel={onCancel}
      footer={
        <div className="modal-request-footer d-flex justify-content-end">
          <TradeButton
            type={"transparent_gray"}
            content={strings("component.cancel")}
            onClick={onCancel}
          />
          <TradeButton type={"gradient"} content={strings("component.accept")} onClick={onOk} />
        </div>
      }
    >
      <p>{strings("modal.ConfirmDeactiveModal.txt1")}</p>
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
            <div>
              <p className="token-value">{`${price} ${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`}</p>
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
              <p>{strings("component.owner")}</p>
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
      <div className="warning-field">
        <img src={require("@images/trade/datahub/warning-icon.png")} alt="" />{" "}
        {strings("modal.ConfirmDeactiveModal.txt2")}
      </div>
    </ConfirmDeactiveModalWrapper>
  );
};

export default forwardRef(ConfirmDeactiveModal);
