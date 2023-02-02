import { WaitingRequestAnimation } from "@assets/animation";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ModalWaitingWrapper } from "./styled";

const BaseWaitingModal = (
  { submitCallback = () => {}, cancelCallback = () => {} },
  ref
) => {
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));
  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    cancelCallback();
    setVisible(false);
  };

  const onOk = () => {
    submitCallback();
    setVisible(false);
  };
  return (
    <ModalWaitingWrapper
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      title="Waiting for processing transaction"
      footer={null}
      maskClosable={false}
    >
      <p>
        To proceed this transaction, you are required to complete a fee (add-on
        gas) transaction. Please confirm it on your wallet and keep this tab
        open until the transaction is completed.
      </p>
      <div className="animation-field">
        <WaitingRequestAnimation />
      </div>
      <p className="text-center">Waiting for blockchain confirmation...</p>
    </ModalWaitingWrapper>
  );
};

export default forwardRef(BaseWaitingModal);
