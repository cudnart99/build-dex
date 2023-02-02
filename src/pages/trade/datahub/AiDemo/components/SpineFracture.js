import { UploadOutlined } from "@ant-design/icons";
import AiUploadFileProvider from "@data-access/ai-file-upload-provider";
import useCustomState from "@hook/useCustomState";
import {
  Button,
  Card,
  Col,
  notification,
  Row,
  Spin,
  Table,
  Upload,
} from "antd";
import React from "react";
import { SpineFractureWrapper } from "./styled";

const SpineFracture = () => {
  const [state, setState] = useCustomState({
    loading: false,
    fileList: [],
    isDisabledBtn: true,
    resultData: null,
  });

  const columns = [
    {
      title: "Spine name",
      dataIndex: "name",
    },
    {
      title: "Fracture diagnosis accuracy",
      dataIndex: "acc",
    },
  ];

  const TableSummary = ({ data }) => (
    <Table.Summary>
      <Table.Summary.Row>
        <Table.Summary.Cell>Summary</Table.Summary.Cell>
        <Table.Summary.Cell>{data}</Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  );

  const handleUpload = ({ file, fileList, event }) => {
    if (fileList?.every((item) => item?.status === "done")) {
      notification.success({
        message: "Successfully uploaded file",
        description: `You 've successfully upload ${fileList?.length} files`,
      });
      setState({
        fileList,
        isDisabledBtn: false,
      });
    }
  };

  const handlePredict = () => {
    setState({
      isDisabledBtn: true,
      loading: true,
    });
    AiUploadFileProvider.spineUpload(
      state.fileList?.map((item) => item?.originFileObj)
    )
      .then((res) => {
        if (res?.status === 200) {
          setState({
            resultSummaryAcc: res?.data?.resultSummaryAcc,
            num_slice: res?.num_slice,
            resultImgs: res?.data?.resultImgs,
            fileList: [],
            loading: false,
          });
        }
      })
      .catch((err) => {
        setState({
          isDisabledBtn: false,
          loading: false,
        });
        notification.error({
          message: "Error prediction",
          description: err?.message,
        });
      });
  };

  return (
    <SpineFractureWrapper>
      <Spin spinning={state.loading} tip={"Processing..."}>
        <div className="container">
          <header>
            <h1>Cervical Spine Fracture Detection</h1>
          </header>
          <div className="main">
            <div className="d-flex mb-4">
              <div className="d-flex-column">
                <Upload
                  className="upload-field"
                  method="get"
                  action=""
                  onChange={handleUpload}
                  multiple
                  // fileList={state?.fileList}
                >
                  <UploadOutlined />
                  <p>
                    Upload your .dcm container directory here to make prediction
                  </p>
                </Upload>
                <Button
                  className="mt-4"
                  type="primary"
                  disabled={state.isDisabledBtn}
                  onClick={handlePredict}
                >
                  Making prediction
                </Button>
              </div>

              <Table
                className="result-table-field"
                columns={columns}
                summary={() => (
                  <TableSummary
                    data={(state?.resultSummaryAcc || [])[0] || 0}
                  />
                )}
                dataSource={state?.resultImgs}
              />
            </div>
            <div className="result-image-field">
              <h1>Result Image</h1>
              <Row className="result-image-group__wrapper" gutter={[12, 12]}>
                {state?.resultImgs?.map((item, index) => (
                  <Col lg={8} md={8} key={index} className="image-item">
                    <Card
                      title={item?.name}
                      cover={
                        <img
                          alt=""
                          src={`http://localhost:8000/${item?.url}`}
                        />
                      }
                      loading={state.loading}
                    ></Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </Spin>
    </SpineFractureWrapper>
  );
};

export default SpineFracture;
