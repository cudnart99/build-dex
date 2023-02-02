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
      title={strings("modal.ModalWaitingConfirm2.header")}
      footer={null}
    >
      <p>
      {strings("modal.ModalWaitingConfirm2.txt")}
      </p>
      
    </ModalWaitingWrapper>
  );
};

export default ModalWaitingConfirm;
