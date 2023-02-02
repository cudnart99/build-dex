import React from "react";
import { ModalWaitingWrapper } from "./styled";
import { WaitingRequestAnimation } from "@assets/animation";
import { strings } from "@utils/index";

const ModalWaitingConfirm = ({ visible, onOk, onCancel }) => {
  return (
    <ModalWaitingWrapper
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={strings("modal.modalWaitingConfirm.header")}
      footer={null}
    >
      <p>{strings("modal.modalWaitingConfirm.text1")}</p>
      <div className="animation-field">
        <WaitingRequestAnimation />
      </div>
      <p className="text-center">{strings("modal.modalWaitingConfirm.text2")}</p>
    </ModalWaitingWrapper>
  );
};

export default ModalWaitingConfirm;
