import { timeStake } from "@pages/trade/staking/config";
import { Button, Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import StakingInput from "../../CommonInput/StakingInput";
import StakingSelect from "../../CommonInput/StakingSelect";
import {
  BaseModalTitleWrapper,
  BaseModalFooterWrapper,
  BaseModalContentWrapper,
} from "./styled";

export default function BaseModalAdminStaking({
  openModal,
  setCloseModal,
  width,
  titleModal,
  arrowBack,
  content,
  effectiveDate,
  poolType,
  rewardAmount,
}) {
  return (
    <Modal
      width={titleModal === "Update reward" ? 400 : 700}
      className="modalWrapper"
      title={
        <BaseModalTitleWrapper>
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
          <Button className={"button-footer draft"}>
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
          </Button>
        </BaseModalFooterWrapper>
      }
    >
      <BaseModalContentWrapper>
        {titleModal === "Update reward" ? (
          <div className="reward-container">
            <div className="left-content">
              <div className="d-flex justify-content-space-between mb-4">
                <div className="creator-title">Creator</div>
                <div className="creator-text">An.pt</div>
              </div>
              <div>Effective date</div>
              <div className="input-container">{effectiveDate}</div>
              <div>Pool's type</div>
              <div className="input-container">{poolType}</div>
              <div>Reward amount ({process.env.REACT_APP_STABLE_TOKEN_SYMBOL})</div>
              <div className="input-container">{rewardAmount}</div>
            </div>
          </div>
        ) : (
          <div className="not-reward-container">
            <div className="left-content">
              <div className="d-flex justify-content-space-between mb-4">
                <div className="creator-title">Creator</div>
                <div className="creator-text">An.pt</div>
              </div>
              <div>Effective date</div>
              <div className="input-container">{effectiveDate}</div>
              <div>Pool's type</div>
              <div className="input-container">{poolType}</div>
              <div>Reward amount ({process.env.REACT_APP_STABLE_TOKEN_SYMBOL})</div>
              <div className="input-container">{rewardAmount}</div>
            </div>
            <div className="right-content">
              <div className="d-flex justify-content-space-between mb-4">
                <div className="staking-time">Stake time</div>
                <div className="add-container" onClick={() => {}}>
                  <img src={require("@images/add-circle.png")} alt="" />
                </div>
              </div>
              <Row gutter={[24]} className="mb-4">
                <Col span={3}></Col>
                <Col span={10}>Type</Col>
                <Col span={10}>APR(%)</Col>
              </Row>
              {[1, 2, 3]?.map((item, index) => {
                return (
                  <Row gutter={[24]} className="mb-4">
                    <Col
                      span={3}
                      className="d-flex-column justify-content-center font-bold"
                    >
                      {index}.
                    </Col>
                    <Col span={10}>
                      <StakingSelect
                        width={"100%"}
                        placeholder={"Time stake"}
                        options={timeStake}
                      />
                    </Col>
                    <Col span={10}>
                      <StakingInput placeholder={"Type"} />
                    </Col>
                  </Row>
                );
              })}
            </div>
          </div>
        )}
      </BaseModalContentWrapper>
    </Modal>
  );
}
