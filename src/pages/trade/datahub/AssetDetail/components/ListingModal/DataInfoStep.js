import ICD10Json from "@assets/json/iviicd10.json";
import SelectWithCheckbox from "@components/SelectWithCheckbox";
import TradeBasicSelect from "@components/TradeBasicSelect";
import { SelectType } from "@components/TradeBasicSelect/styled";
import useCustomState from "@hook/useCustomState";
import { checkContainSpecialCharacters, strings } from "@utils/index";
import { Col, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { DataInfoStepWrapper, GeneralStyleWrapper } from "../styled";
const DataInfoStep = ({
  assetCId,
  setState,
  state,
  displayCId,
  data,
  dataResult,
  dataDetail,
  defaultMedicalUnit,
}) => {
  const [procState, setProcState] = useCustomState({
    listKeywords: [],

    params: {
      page: 0,
      size: 999,
    },
  });

  const handleChangeMedicalSpecialties = (e) => {
    setState({
      medicalSpecialties: e?.target?.value,
    });
  };

  const handleChangeTopics = (_, topics) => {
    setState({
      topics,
    });
  };

  const handleChangeIcdNames = (icdNames) => {
    setState({
      icdNames,
    });
  };

  const handleChangeDescription = (e) => {
    setState({
      description: e?.target?.value,
    });
  };

  const handleChangeAssetCId = (e) => {
    let value = e?.target?.value;
    if (
      checkContainSpecialCharacters(value) ||
      value?.length < 6 ||
      value?.length > 125
    ) {
      setState({
        checkNameValid: false,
      });
    } else {
      setState({
        checkNameValid: true,
      });
    }
    // value = replaceSpecialCharacters(value);
    setState({
      displayCId: value,
    });
  };

  const handleChangeMedicalUnit = (e) => {
    let value = e?.target?.value;

    if (value?.length < 6 || value?.length > 125) {
      setState({
        checkMedicalUnitValid: false,
      });
    } else {
      setState({
        checkMedicalUnitValid: true,
      });
    }
    // value = replaceSpecialCharacters(value);
    setState({
      medicalUnit: value,
    });
  };

  useEffect(() => {
    setState({
      checkMedicalUnitValid: !(
        defaultMedicalUnit?.length > 6 && defaultMedicalUnit < 125
      ),
    });
  }, [defaultMedicalUnit]);

  console.log("icdNames", state?.icdNames);

  return (
    <GeneralStyleWrapper>
      <DataInfoStepWrapper>
        <p className="asset-name">
          <label className="line-title mb-4">{strings("modal.DataInfoStep.name")}</label>
          {state.checkNameValid ? (
            ""
          ) : (
            <span
              style={{
                color: "red",
              }}
            >
              {strings("modal.DataInfoStep.txt")}
            </span>
          )}
          <Input
            placeholder="Asset CId"
            value={displayCId}
            onChange={handleChangeAssetCId}
            maxLength={125}
            showCount
          />
        </p>
        <Row className="category-and-keyword-selection" gutter={[20, 20]}>
          <Col md={12} lg={12} sm={24} xs={24}>
            <p className="asset-name">
              <label className="line-title">{strings("modal.DataInfoStep.txt2")}</label>
              <div className="mt-3">
                {" "}
                <Input
                  // defaultValue={defaultMedicalUnit}
                  placeholder={strings("modal.DataInfoStep.txt2")}
                  value={state?.medicalUnit}
                  onChange={handleChangeMedicalUnit}
                  maxLength={125}
                />
                {state.checkMedicalUnitValid ? (
                  ""
                ) : (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    {strings("modal.DataInfoStep.txt3")}
                  </span>
                )}
              </div>
            </p>
          </Col>
          <Col md={12} lg={12} sm={24} xs={24}>
            <p className="asset-name">
              <label className="line-title">{strings("modal.DataInfoStep.txt4")}</label>
              <div className="mt-3">
                {" "}
                <Input
                  placeholder={strings("modal.DataInfoStep.txt4")}
                  value={state?.medicalSpecialties}
                  onChange={handleChangeMedicalSpecialties}
                  maxLength={125}
                />
              </div>
            </p>
          </Col>

          <Col md={24} lg={24} sm={24} xs={24}>
            <label className="line-title">{strings("modal.DataInfoStep.txt5")}</label>
            <div className="mt-3">
              <SelectWithCheckbox
                placeholder={strings("modal.DataInfoStep.txt6")}
                options={ICD10Json.map((item) => ({
                  value: item.code,
                  label: `${item.code} - ${item.viName}`,
                  ...item,
                }))}
                total={ICD10Json?.reduce((a, b) => a + b.child?.length, 0)}
                onSubmit={handleChangeIcdNames}
                defaultValue={state?.icdNames}
              />
            </div>
          </Col>
          <Col md={24} lg={24} sm={24} xs={24}>
            <label className="line-title">{strings("modal.DataInfoStep.txt7")}</label>
            <div className="mt-3">
              <TradeBasicSelect
                showArrow
                mode="multiple"
                className="category-select w-full"
                type={SelectType.TRANSPARENT_GRAY_ROUND}
                placeholder={strings("modal.DataInfoStep.txt6")}
                options={state.listTopic}
                onChange={handleChangeTopics}
                value={state?.topics?.map((item) => item.value)}
                clearValue={() => {
                  handleChangeTopics(null, null);
                }}
              />
            </div>
          </Col>
        </Row>
        <div className="description-field mt-4">
          <p className="line-title">{strings("modal.DataInfoStep.txt8")}</p>
          <TextArea
            className="description-input"
            rows={4}
            maxLength={1000}
            placeholder={strings("modal.DataInfoStep.txt9")}
            showCount
            onChange={handleChangeDescription}
            value={state?.description}
          />
        </div>
      </DataInfoStepWrapper>
    </GeneralStyleWrapper>
  );
};

export default DataInfoStep;
