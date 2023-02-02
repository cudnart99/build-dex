import { CloseOutlined } from "@ant-design/icons";
import TradeButton from "@components/TradeButton";
import React from "react";
import { ModalBaseWrapper } from "./styled";
import { CorrectLine, WrongLine } from "@assets/animation";
import { strings } from "@utils/index";

const ModalNotification = ({
  modalAddingCssClass = "",
  footerAddingCssClass = "",
  visible,
  onCancel = () => {},
  onOk = () => {},
  type,
  content,
  title,
  actionContent = strings("modal.ModalNotification.ok"),
  closeContent = strings("modal.ModalNotification.cancel"),
  ...props
}) => {
  return (
    <ModalBaseWrapper
      className={`notification-modal ${modalAddingCssClass}`}
      open={visible}
      onCancel={onCancel}
      title={title}
      closeIcon={<CloseOutlined />}
      footer={
        <div
          className={`notification-modal__footer d-flex justify-content-end ${footerAddingCssClass}`}
        >
          {type === "success" ? (
            <>
              <TradeButton
                type="gradient"
                content={closeContent}
                onClick={onCancel}
              />
            </>
          ) : (
            <>
              <TradeButton
                type="transparent_gray"
                content={closeContent}
                onClick={onCancel}
              />
              <TradeButton
                type="gradient"
                content={actionContent}
                onClick={onOk}
              />
            </>
          )}
        </div>
      }
      {...props}
    >
      <div className="modal-notifi-content__wrapper">
        <div className="modal-icon-noti">
          {type === "success" ? <CorrectLine /> : <WrongLine />}
        </div>
        <p className="modal-notifi-content text-center mt-4">{content}</p>
      </div>
    </ModalBaseWrapper>
  );
};

export default ModalNotification;
