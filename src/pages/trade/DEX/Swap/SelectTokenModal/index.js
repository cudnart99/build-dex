import React, { useState } from "react";
import BaseModal from "../../Common/BaseModal";
import InputCommon from "../../Common/InputCommon";
import { StyledWrapper } from "./styled";

export default function SelectTokenModal({ state, setState }) {
  const setCloseSelectTokenModal = () => {
    setState({
      openSelectTokenModal: false,
    });
  };
  const [selectedToken, setSelectedToken] = useState(0);
  const [changeModal, setChangeModal] = useState(false);
  const [inputImportToken, setInputImportToken] = useState("");

  const listToken = [
    {
      name: "IVI",
      fullName: "Ivi token",
      image: require("@images/dex/IVI_icon.png"),
    },
    {
      name: "IHI",
      fullName: "Ihi token",
      image: require("@images/dex/IHI_icon.png"),
    },
    {
      name: "USDT",
      fullName: "TetherUS",
      image: require("@images/dex/USDT_icon.png"),
    },
  ];

  return (
    <BaseModal
      changeModal={changeModal}
      setChangeModal={setChangeModal}
      width={500}
      openModal={state.openSelectTokenModal}
      setCloseModal={setCloseSelectTokenModal}
      arrowBack={false}
      titleModal={changeModal ? "Import token" : "Select a token"}
      content={
        <StyledWrapper>
          {changeModal ? (
            <>
              <div className="common-bold-text mt-2 mb-3">Token import</div>
              <InputCommon
                callback={setInputImportToken}
                placeholder={"0x00000"}
              />
              {inputImportToken === "" ? (
                <div className="token-list-container mt-2">
                  <div className="token-box d-flex pointer">
                    <div className="img-container">
                      <img
                        className="icon"
                        src={require("@images/dex/storage_icon.png")}
                      />
                    </div>
                    <div className="name-container">
                      <div className={"main-text"}>IHI</div>
                      <div className={"sub-text"}>Ihi Token</div>
                    </div>
                    <div className="trash-container">
                      <img
                        className="icon"
                        src={require("@images/dex/trash_icon.png")}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center mt-7">
                  0 token imported/No result
                </div>
              )}
            </>
          ) : (
            <>
              <InputCommon placeholder={"Search name or paste address"} />
              <div className="common-bold-text mt-2">Common tokens</div>
              <div className="common-token-container mt-2">
                {listToken.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        state?.selectedModal === 1
                          ? setState({
                              selectedNameToken1: item?.name,
                              selectedImgToken1: item?.image,
                            })
                          : setState({
                              selectedNameToken2: item?.name,
                              selectedImgToken2: item?.image,
                            });
                        setCloseSelectTokenModal();
                      }}
                      onMouseOver={() => setSelectedToken(index)}
                      onMouseOut={() => setSelectedToken(-1)}
                      key={index}
                      className={
                        selectedToken === index
                          ? "button-token pointer selected-bg"
                          : "button-token pointer"
                      }
                    >
                      <img className="icon" src={item?.image} />
                      <span
                        className={selectedToken === index && "selected-text"}
                      >
                        {item?.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="token-list-container mt-2">
                {listToken?.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        state?.selectedModal === 1
                          ? setState({
                              selectedNameToken1: item?.name,
                              selectedImgToken1: item?.image,
                            })
                          : setState({
                              selectedNameToken2: item?.name,
                              selectedImgToken2: item?.image,
                            });
                        setCloseSelectTokenModal();
                      }}
                      onMouseOver={() => setSelectedToken(index)}
                      onMouseOut={() => setSelectedToken(-1)}
                      className="token-box d-flex pointer"
                    >
                      <div className="img-container">
                        <img className="icon" src={item?.image} />
                      </div>
                      <div className="name-container">
                        <div
                          className={
                            selectedToken === index
                              ? "main-text color-selected"
                              : "main-text"
                          }
                        >
                          {item?.name}
                        </div>
                        <div
                          className={
                            selectedToken === index
                              ? "sub-text color-selected"
                              : "sub-text"
                          }
                        >
                          {item?.fullName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="manage">
                <span onClick={() => setChangeModal(true)} className="pointer">
                  Manage token
                </span>
              </div>
            </>
          )}
        </StyledWrapper>
      }
    />
  );
}
