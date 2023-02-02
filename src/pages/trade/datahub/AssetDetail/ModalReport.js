import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import TradeButton from "@components/TradeButton";
import { strings } from "@utils/index";
import { Checkbox, Input, message, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ModalReportWrapper } from "./styled";
const { TextArea } = Input;

const ModalReport = ({ visible, onOk, onCancel, location }) => {
  const [state, _setState] = useState({
    isAgree: false,
    fileList: [],
  });
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleChangeAgreement = (e) => {
    setState({
      isAgree: e.target.checked,
    });
  };
  return (
    <ModalReportWrapper
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={strings("modal.ModalReport.header")}
      closeIcon={<CloseOutlined />}
      className="modal-report"
      footer={
        <div className="modal-report-footer d-flex justify-content-end">
          <TradeButton
            content={strings("component.cancel")}
            type="transparent_gray"
            onClick={onCancel}
          />
          <TradeButton content={strings("component.report")} type="gradient" onClick={onOk} />
        </div>
      }
    >
      <p className="data-and-token-field d-flex justify-content-space-between">
        <div className="data-field">
          <span className="field-title">{strings("component.data")}</span>
          <span>EMR266851414</span>
        </div>
        <div className="token-field d-flex align-items-center">
          <img
            src={require("@images/trade/datahub/ivi-token-swap.png")}
            style={{
              marginRight: "4px",
            }}
          />
          <span>{process.env.REACT_APP_STABLE_TOKEN_SYMBOL} token</span>
        </div>
      </p>
      <div className="description-field mb-4">
        <p className="field-title">{strings("component.description")}</p>
        <TextArea rows={4} placeholder="Detail your report" />
      </div>
      <div className="upload-image-field">
        <p className="field-title">{strings("modal.ModalReport.txt")}</p>
        <Upload
          listType="picture-card"
          onChange={(fileData) => {
            if (fileData?.file?.status === "done") {
              setState({
                fileList: fileData.fileList,
              });
              message.success(strings("modal.ModalReport.mess-success"));
            }
            if (fileData.fileList?.length === 5) {
              message.info(strings("modal.ModalReport.mess-info"));
            }
          }}
          maxCount={5}
          accept={".png, .jpg, .jpeg"}
          method="get"
          beforeUpload={(file, fileList) => {
            if (file.size > 1024 * 1024 * 20) {
              message.error(
                strings("modal.ModalReport.mess-error")
              );
              return Upload.LIST_IGNORE;
            }
            if (!file.type.includes("image/")) {
              message.error(strings("modal.ModalReport.mess-error"));
              return Upload.LIST_IGNORE;
            }
          }}
          // disabled={state.fileList?.length === 5}
        >
          <TradeButton
            content={strings("modal.ModalReport.add-item")}
            type="transparent_violet_custom"
            icon={<PlusCircleOutlined />}
            fontSize={"16px"}
            fontWeight="500"
            lineHeight="20px"
          />
        </Upload>
      </div>
      <div className="agreement-field">
        <p className="agreement-description">
          <img
            src={require("@images/trade/datahub/warning-icon.png")}
            style={{
              marginRight: "8px",
            }}
          />
          <span>
            {" "}
            {strings("modal.ModalReport.txt2")}
          </span>
        </p>
        <p className="checkbox-agreement">
          <Checkbox onChange={handleChangeAgreement}>{strings("modal.ModalReport.txt3")}</Checkbox>
        </p>
      </div>
    </ModalReportWrapper>
  );
};

export default ModalReport;
