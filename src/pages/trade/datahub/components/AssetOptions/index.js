import { EyeOutlined } from "@ant-design/icons";
import { MediumThreeDot, MintCoinIcon } from "@assets/svg";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import { strings } from "@utils/index";
import { Button, Dropdown, Switch } from "antd";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import ConfirmDeactiveModal from "../../AssetDetail/components/ConfirmDeactiveModal";
import "./style.scss";
const AssetOptions = ({ data, handleShowModalPriceChange, ...props }) => {
  const { search: getAssetFromBE } = useDispatch()["datahub"];

  const deactiveModalRef = useRef();
  const handleSwitchShowData = (value, e) => {
    e.stopPropagation();
    DatahubAssetProvider.patch(data?.publicDetail?.assetCId, {
      isShowOnMarket: value,
    })
      .then((res) => {
        if (res?.data?.code === 200) {
          getAssetFromBE();
          deactiveModalRef.current.close();
        } else {
          throw new Error(res?.message);
        }
      })
      .catch((err) => {
        console.log("switch show error", err?.message);
      });
  };
  const onShowModalDeactive = (value, e) => {
    console.log(value, e);
    e.stopPropagation();
    deactiveModalRef.current.show();
  };
  return (
    <>
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        dropdownRender={() => (
          <div className="asset-options-menu">
            {data?.publicDetail?.tradingStatus === 10 && (
              <Button onClick={handleShowModalPriceChange}>
                <MintCoinIcon />
                <span>{strings("modal.AssetOptions.txt1")}</span>
              </Button>
            )}

            <div className="display-option">
              <EyeOutlined /> <span>{strings("modal.AssetOptions.txt2")}</span>
              <Switch
                checked={data?.publicDetail?.isShowOnMarket}
                color="#007817"
                className="button__green"
                onChange={
                  data?.publicDetail?.isShowOnMarket
                    ? onShowModalDeactive
                    : handleSwitchShowData
                }
              />
            </div>
          </div>
        )}
        overlayClassName="asset-options-btn"
        {...props}
      >
        <MediumThreeDot />
      </Dropdown>
      <ConfirmDeactiveModal
        dataCid={data?.publicDetail?.displayCId}
        dataOwner={data?.publicDetail?.owner}
        price={data?.publicDetail?.price}
        ref={deactiveModalRef}
        onOk={(e) => {
          e.stopPropagation();
          handleSwitchShowData(false, e);
        }}
      />
    </>
  );
};

export default AssetOptions;
