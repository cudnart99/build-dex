import { Button, Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  BaseModalTitleWrapper,
  BaseModalFooterWrapper,
  BaseModalContentWrapper,
} from "./styled";

export default function BaseModal({
  openModal,
  setCloseModal,
  width,
  titleModal,
  arrowBack,
  content,
  changeModal,
  setChangeModal,
}) {
  return (
    <Modal
      width={width}
      className="modalWrapper"
      title={
        <BaseModalTitleWrapper>
          {changeModal && (
            <span
              onClick={() => setChangeModal(false)}
              className="arrow-back mr-3"
            >
              <img src={require("@images/arrow-to-left.png")} />
            </span>
          )}
          {arrowBack && (
            <span onClick={setCloseModal} className="arrow-back">
              <img src={require("@images/arrow-to-left.png")} />
            </span>
          )}
          <span className="title-modal">{titleModal}</span>
          <span onClick={setCloseModal} className="x-button">
            <img src={require("@images/x-button.png")} />
          </span>
        </BaseModalTitleWrapper>
      }
      open={openModal}
      onOk={setCloseModal}
      onCancel={setCloseModal}
      footer={
        <BaseModalFooterWrapper>
          {/* <Button className={"button-footer draft"}>
            <div className="d-flex justify-content-center">
              <img
                alt=""
                className="icon-button"
                src={require("@images/save-draft-icon.png")}
              />
              <div>Save draft</div>
            </div>
          </Button>
          <Button className={"button-footer request"}>
            <div className="d-flex justify-content-center">
              <img
                className="icon-button"
                src={require("@images/request-icon.png")}
                alt=""
              />
              <div>Request for approval</div>
            </div>
          </Button> */}
        </BaseModalFooterWrapper>
      }
    >
      <BaseModalContentWrapper>{content}</BaseModalContentWrapper>
    </Modal>
  );
}
