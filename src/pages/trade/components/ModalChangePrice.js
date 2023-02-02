import { CloseOutlined } from "@ant-design/icons";
import { CorrectLine, WrongLine } from "@assets/animation";
import PriceFieldWithSwap from "@components/PriceFieldWithSwap";
import TradeButton from "@components/TradeButton";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import useCustomState from "@hook/useCustomState";
import { LoadingRef } from "@src/index";
import { parseEther, strings } from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch } from "react-redux";
import { tokens } from "../datahub/deposit";
import { ModalChangePriceWrapper } from "./styled";

const ModalChangePrice = (
  { visible, assetCId, currentPrice, displayCId, data, ...props },
  ref
) => {
  const { updatePrice, ownerGetPostDataToMarketplace } =
    useDispatch()?.datasharing;
  const [state, setState] = useCustomState({
    visible: false,
  });
  const callbackRef = useRef();
  useImperativeHandle(ref, () => ({
    show: onOpen,
    close: onClose,
  }));
  const onOpen = ({ id, hashKey, dataCid, callback = () => {} }) => {
    callbackRef.current = callback;
    setState({
      visible: true,
      id,
      hashKey,
      dataCid,
    });
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };
  return (
    <ModalChangePriceWrapper
      open={state.visible}
      onCancel={onClose}
      title={strings("modal.ModalChangePrice.header")}
      closable={true}
      closeIcon={<CloseOutlined />}
      footer={
        <div className="d-flex flex-end custom-modal">
          <TradeButton
            content={"component.cancel"}
            type="transparent_gray"
            onClick={onClose}
          />
          <TradeButton
            content={strings("modal.ModalChangePrice.txt5")}
            type="gradient"
            onClick={() => {
              LoadingRef.current.show();
              updatePrice({
                id: state.id,
                newTokenAmount: parseEther(state.price.toString()),
              })
                .then(async (res) => {
                  snackbarUtils.success(
                    strings("modal.ModalChangePrice.txt"),
                    <CorrectLine />
                  );
                  await DatahubAssetProvider.patch(state.dataCid, {
                    price: state.price,
                  });
                  callbackRef.current();
                  ownerGetPostDataToMarketplace();
                  onClose();
                })
                .catch((err) => {
                  console.log(err);
                  snackbarUtils.error(strings("modal.ModalChangePrice.txt2"), <WrongLine />);
                })
                .finally(() => {
                  LoadingRef.current.hide();
                });
            }}
          />
        </div>
      }
      {...props}
    >
      <div className="d-flex modal-item">
        <span className="line-title">{strings("modal.ModalChangePrice.txt3")}&nbsp;</span>
        <span className="line-value">{data?.publicDetail?.price}</span>
      </div>
      <div className="price modal-item">
        <p className="line-title">{strings("modal.ModalChangePrice.txt4")}</p>
        <PriceFieldWithSwap
          onChange={(value, token) => {
            setState({ price: value });
          }}
          tokens={tokens}
        />
      </div>
    </ModalChangePriceWrapper>
  );
};

export default forwardRef(ModalChangePrice);
