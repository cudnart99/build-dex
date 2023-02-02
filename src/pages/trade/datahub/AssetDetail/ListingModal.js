import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ModalNotification from "@components/ModalBaseNotifi";
import TradeButton from "@components/TradeButton";
import RandomWaitingModal from "@components/WaitingRandom";
import { DatahubNotiTypeEnum } from "@constants/index";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import AssetLikedProvider from "@data-access/liked-provider";
import useCustomState from "@hook/useCustomState";
import { strings } from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import { Button, Steps } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataInfoStep from "./components/ListingModal/DataInfoStep";
import SaleInfoStep from "./components/ListingModal/SaleInfoStep";
import { ModalListingWrapper } from "./styled";

const { Step } = Steps;

const ListingModal = (
  {
    visible,
    onOk,
    onCancel,
    cid,
    getDetailData = () => {},
    dataDraft,
    data,
    dataResult,
    dataDetail,
    CollectedAfterSignDetailData,
    icdNames,
    topics,
    ...props
  },
  ref
) => {
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ parentModalVisible: true });
    },
  }));
  const [state, setState] = useCustomState({
    currentStep: 0,
    isVisibleSuccess: false,
    isVisibleError: false,
    categoryList: data?.category,
    keywordsList: data?.keywords,
    description: data?.description,
    reason: data?.reason,
    isSaveDraft: false,
    isCheckout: false,
    parentModalVisible: false,
    isVisibleModalWaiting: false,
    assetCId: cid,
    displayCId: cid,
    checkNameValid: true,
  });
  useEffect(() => {
    if (icdNames) {
      setState({ icdNames: icdNames.filter((item) => !!item) });
    }
  }, [icdNames]);
  useEffect(() => {
    if (topics) {
      setState({
        listTopic: topics,
        topics: topics,
      });
    }
  }, [topics]);
  const { address: myAddress, chainId } = useSelector(
    (state) => state.contracts
  );

  const { create: createNoti } = useDispatch()["datahubNotifications"];
  const listStep = [
    {
      title: strings("modal.ListingModal.title"),
      component: (
        <DataInfoStep
          assetCId={state.assetCId}
          setState={setState}
          state={state}
          displayCId={state.displayCId}
          defaultMedicalUnit={state.defaultMedicalUnit}
          data={data}
          dataResult={dataResult}
          dataDetail={dataDetail}
        />
      ),
    },
    {
      title: strings("modal.ListingModal.title2"),
      component: (
        <SaleInfoStep
          assetCId={cid}
          setState={setState}
          state={state}
          displayCId={state.displayCId}
        />
      ),
    },
  ];

  const handleProgressStep = (type) => {
    var currentStep = state.currentStep;
    if (type === "next") {
      currentStep += 1;
    }
    if (type === "previous") {
      currentStep -= 1;
    }
    setState({
      currentStep,
    });
  };
  const handleSaveDraft = async () => {
    let {
      categoryList,
      keywordsList,
      description,
      toValue,
      reason,
      medicalUnit,
      displayCId,
      icdNames,
      topics,
    } = state;
    let body = {
      status: 1,
      category: categoryList,
      keywords: keywordsList,
      price: Number(toValue),
      reason,
      medicalUnit,
      description: description,
      assetCId: cid,
      displayCId: displayCId,
      icdNames,
      topicsIncluded: topics.map((item) => item.value),
    };
    // Lưu vào local
    const localTest = localStorage.getObj("test");
    const vitri = localTest?.findIndex((val) => val.assetCId === body.assetCId);

    if (vitri >= 0) {
      localTest.splice(vitri, 1);
    }

    if (localTest) await localStorage.setObj("test", [...localTest, body]);
    else await localStorage.setObj("test", [body]);
    snackbarUtils.success("modal.ListingModal.draft-success");
  };

  const handleDeleteLocal = () => {
    const localTest = localStorage.getObj("test");
    const vitri = localTest?.findIndex((val) => val.assetCId === cid);

    if (vitri >= 0) {
      localTest.splice(vitri, 1);
      localStorage.setObj("test", [...localTest]);
    }
  };

  const handleCreateBeData = async () => {
    let {
      assetCId,
      categoryList,
      keywordsList,
      description,
      toValue,
      reason,
      medicalUnit,
      displayCId,
      icdNames,
      medicalSpecialties,
      topics,
    } = state;

    let body = {
      status: 0,
      assetCId: cid,
      category: categoryList,
      keywords: keywordsList,
      price: Number(toValue),
      reason: reason,
      medicalUnit: medicalUnit,
      description: description,
      owner: myAddress,
      displayCId,
      icdNames: icdNames,
      icdCodes: icdNames,
      medicalSpecialties: medicalSpecialties,
      topicsIncluded: topics.map((item) => item.label),
      network: chainId,
    };
    return await DatahubAssetProvider.create(body);
  };
  const handleCloseModal = () => {
    new Promise((resolve, reject) => {
      resolve(true);
    })
      .then(() => {
        setState({
          isVisibleModalWaiting: false,
          currentStep: 0,
          isCheckout: false,
        });
        return true;
      })
      .then((res) => {
        setTimeout(() => {
          setState({
            parentModalVisible: false,
          });
        }, 100);
      });
  };

  const ownerPostDataToMarketplace =
    useDispatch()?.datasharing?.ownerPostDataToMarketplace;
  const ownerGetPostDataToMarketplace =
    useDispatch()?.datasharing?.ownerGetPostDataToMarketplace;

  useEffect(() => {
    const dataLocal = JSON.parse(localStorage.getItem("test"))?.find(
      (item) => item.assetCId === cid
    );
    setState({
      categoryList: dataLocal?.category,
      keywordsList: dataLocal?.keywords,
      description: dataLocal?.description,
      toValue: dataLocal?.price,
      reason: data?.reason,
      medicalUnit: dataLocal?.medicalUnit,
      assetCId: dataLocal?.assetCId || cid,
      displayCId: dataLocal?.displayCId || cid,
    });
  }, [cid]);
  useEffect(() => {
    setState({
      defaultMedicalUnit: CollectedAfterSignDetailData?.hospitalName,
      medicalUnit: CollectedAfterSignDetailData?.hospitalName,
    });
  }, [CollectedAfterSignDetailData?.hospitalName]);
  useEffect(() => {
    if (dataDetail?.khoa || dataResult?.kham) {
      let medicalSpecialties = [
        dataDetail?.khoa,
        ...dataResult?.kham?.map((item) => item?.khoa),
      ]
        ?.filter((item) => !!item)
        ?.join(",");

      setState({ medicalSpecialties });
    }
  }, [dataDetail?.khoa, dataResult?.kham]);
  return (
    <ModalListingWrapper
      open={state.parentModalVisible}
      onOk={onOk}
      onCancel={() => {
        setState({
          parentModalVisible: false,
          currentStep: 0,
          isCheckout: false,
        });
      }}
      title={strings("modal.ListingModal.title3")}
      closeIcon={<CloseOutlined />}
      footer={
        <div className="modal-listing__footer d-flex justify-content-space-between">
          <div className="progress-btn d-flex">
            {state.currentStep > 0 && (
              <Button
                onClick={() => {
                  handleProgressStep("previous");
                }}
              >
                <ArrowLeftOutlined />
                <span>{strings("modal.ListingModal.txt")}</span>
              </Button>
            )}
            {state.currentStep < listStep?.length - 1 && (
              <Button
                onClick={() => {
                  handleProgressStep("next");
                }}
              >
                <span>{strings("modal.ListingModal.txt2")}</span>
                <ArrowRightOutlined />
              </Button>
            )}
          </div>
          <div className="save-draft-and-cancel-btn-group d-flex">
            <TradeButton
              content={strings("modal.ListingModal.title4")}
              type="transparent_violet_custom"
              onClick={handleSaveDraft}
              disabled={!state.checkNameValid}
            />
            <TradeButton
              content={strings("modal.ListingModal.title5")}
              type="gradient"
              disabled={
                state?.currentStep === 0 ||
                !state?.isCheckout ||
                !state.checkNameValid
              }
              onClick={() => {
                debugger
                handleCreateBeData()
                  .then(async (res) => {
                    if (res?.data?.code === 201 || res?.data?.code === 200) {
                      setState({ isVisibleModalWaiting: true });
                      ownerPostDataToMarketplace({
                        cid,
                        amount: state.toValue,
                      })
                        .then((res) => {
                          getDetailData();
                          ownerGetPostDataToMarketplace();
                          createNoti({});
                          snackbarUtils.success(strings("modal.ListingModal.list-success"));
                          createNoti({
                            type: DatahubNotiTypeEnum.WHEN_USER_LISTING_DATA_SUCCESSFULLY,
                            fromUser: myAddress,
                            toUser: myAddress,
                            dataName: state?.displayCId,
                            assetCId: cid,
                          });
                          handleDeleteLocal(); // xóa data ở local khi listing thành công
                          handleCloseModal();
                        })
                        .catch((err) => {
                          console.log(err, "adad");
                          // Delete prev create info in NODE BE if blockchain fail
                          let params = {
                            id: cid,
                          };
                          DatahubAssetProvider.delete(params);
                          AssetLikedProvider.delete(params);
                          setState({ isVisibleModalWaiting: false });
                          snackbarUtils.error(strings("modal.ListingModal.list-fail"));
                        });
                    }
                    if (res?.data?.code === 400) {
                      console.log("loi r");
                      snackbarUtils.error(
                        strings("modal.ListingModal.list-fail-content"),
                        <>
                          <div>{res?.data?.message?.slice(0, 24)}</div>
                          <div>
                            {res?.data?.message
                              ?.slice(24)
                              ?.split(",")
                              ?.map((item) => (
                                <div> - {item}</div>
                              ))}
                          </div>
                        </>
                      );
                    }
                  })
                  .catch((err) => {
                    snackbarUtils.error(err?.message);
                  });
              }}
            />
          </div>
        </div>
      }
      {...props}
    >
      <Steps
        className="step-listing__container"
        progressDot
        current={state.currentStep}
      >
        {listStep?.map((item) => (
          <Step key={item?.title} title={item?.title} />
        ))}
      </Steps>
      <div className="step-content__wrapper">
        {listStep[state.currentStep].component}
      </div>
      {/* Success listing */}
      <ModalNotification
        open={state.isShowModalSucess}
        type={"success"}
        onCancel={() => setState({ isShowModalSucess: false })}
        closeContent={"OK"}
        title={strings("modal.ListingModal.txt3")}
        content={strings("modal.ListingModal.txt4")}
      />
      {/* Error listing */}
      <ModalNotification
        open={state.isVisibleError}
        type={"error"}
        onCancel={() => setState({ isVisibleError: false })}
        onOk={() => {
          setState({
            isShowModalSucess: true,
          });
        }}
        content={strings("modal.ListingModal.txt5")}
        title={strings("modal.ListingModal.txt6")}
        closeContent={strings("modal.ListingModal.txt7")}
        actionContent={strings("modal.ListingModal.txt8")}
      />
      <RandomWaitingModal
        open={state.isVisibleModalWaiting}
        title={strings("modal.ListingModal.txt9")}
        // onCancel={() => {
        //   setState({ isVisibleModalWaiting: false });
        // }}
      />
    </ModalListingWrapper>
  );
};

export default forwardRef(ListingModal);
