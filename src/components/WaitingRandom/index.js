import { WaitingRequestAnimation } from "@assets/animation";
import { strings } from "@utils/index";
import React from "react";
import { ModalWaitingWrapper } from "./styled";

const RandomWaitingModal = ({ visible, onOk, onCancel, title, content }) => {
  return (
    <ModalWaitingWrapper
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={title}
      footer={null}
    >
      <p>{content || ""}</p>
      <p
        style={{
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "20px",
          color: "#2B2B2B",
        }}
      >
        {strings("modal.RandomWaitingModal.txt")} <a>{strings("modal.RandomWaitingModal.txt2")}</a>
      </p>
      <div className="animation-field">
        <WaitingRequestAnimation />
      </div>

      <p className="text-center">{strings("modal.RandomWaitingModal.txt3")}</p>
    </ModalWaitingWrapper>
  );
};

export default RandomWaitingModal;
