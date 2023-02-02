import { Button, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { BaseModalFooterWrapper, BaseModalTitleWrapper } from "./styled";

export default function BaseModal({
  openModal,
  setOpenModal,
  handleOpenModal,
  width,
  titleModal,
  buttonFooter,
  arrowBack,
  content,
  checkRequired,
  footerStake,
  footerClaim,
  // amount,
  // duration,
}) {
  const handleOk = async () => {
    await getAllStakeUser();
    await refreshData();
    setOpenModal(false);
  };
  const handleCancel = async () => {
    await getAllStakeUser();
    await refreshData();
    setOpenModal(false);
  };
  // const stake = useDispatch()?.staking.stake;
  const switchTable = useDispatch()?.staking?.switchTable;
  const refreshData = useDispatch()?.staking?.refreshData;
  const getAllStakeUser = useDispatch()?.staking?.getAllStakeUser;

  return (
    <Modal
      width={width}
      className="modalWrapper"
      title={
        <BaseModalTitleWrapper>
          {arrowBack && (
            <span onClick={handleCancel} className="arrow-back">
              <img src={require("@images/arrow-to-left.png")} />
            </span>
          )}
          <span className="title-modal">{titleModal}</span>
          <span onClick={handleCancel} className="x-button">
            <img src={require("@images/x-button.png")} />
          </span>
        </BaseModalTitleWrapper>
      }
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <BaseModalFooterWrapper>
          {titleModal ===
          `Stake ${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}` ? (
            <>{footerStake}</>
          ) : titleModal === "Claim reward" ? (
            <>{footerClaim}</>
          ) : titleModal === "Redeem" ? (
            <>{footerClaim}</>
          ) : buttonFooter === "Go to your pool" ? (
            <Button
              onClick={async () => {
                await getAllStakeUser();
                await refreshData();
                await switchTable({ type: 1 });
                await handleCancel();
              }}
              className={"button-footer"}
            >
              {buttonFooter}
            </Button>
          ) : typeof checkRequired === "undefined" ? (
            <Button
              onClick={handleOpenModal ? handleOpenModal : handleCancel}
              className={"button-footer"}
            >
              {buttonFooter}
            </Button>
          ) : (
            <Button
              disabled={!checkRequired}
              onClick={handleOpenModal ? handleOpenModal : handleCancel}
              // onClick={() => stake}
              className={
                checkRequired ? "button-footer" : "button-footer-disabled"
              }
            >
              {buttonFooter}
            </Button>
          )}
        </BaseModalFooterWrapper>
      }
    >
      {content}
    </Modal>
  );
}
