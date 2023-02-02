import { CloudDownloadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import DotIcon from "@components/DotIcon";
import BaseResponsive from "@components/base/BaseResponsive";
import { CustomSearch } from "@pages/trade/components/styled";
import { dataAdmin } from "@pages/trade/staking/config";
import { Col, Row } from "antd";
import React, { useState } from "react";
import { ButtonAdmin, IconAdmin } from "../Adminlist/components/AdminComponent";
import {
  ActionWrapper,
  ButtonWrapper,
  NameTokenWrapper,
  TagWrapper,
} from "./styled";
import { Dislike, Like, PenUnderline, TrashAdmin, Redirect } from "@assets/svg";
import useCustomState from "@hook/useCustomState";
import NewPoolModal from "./Modal/NewPoolModal";
import EditPoolModal from "./Modal/EditPoolModal";
import UpdateAPRPoolModal from "./Modal/UpdateAPRPoolModal";
import UpdateRewardPoolModal from "./Modal/UpdateRewardPoolModal";

export default function StakingAdmin() {
  const [proposal, setProposal] = useState(false);
  const [state, setState] = useCustomState({
    openNewPoolModal: false,
  });
  const genColorByStatus = (status) => {
    if (status === "Draft") {
      return "#EA95BC";
    } else if (status === "Voting") {
      return "#33E0C2";
    } else if (status === "Completed") {
      return "#0A9921";
    } else if (status === "Rejected") {
      return "#B0B0B0";
    }
  };
  const genColorTask = (task) => {
    if (task === "Create New") {
      return "rgba(64, 243, 93, 0.3)";
    } else if (task === "Update APR/time") {
      return "rgba(255, 122, 0, 0.3)";
    } else if (task === "Update reward") {
      return "rgba(0, 87, 255, 0.3)";
    }
  };
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: "52px",
      render: (data, dataObject, index) => {
        return index + 1;
      },
      xs: 24,
      sm: 24,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "100px",
      key: "status",
      sorter: true,
      render: (item, record, index) => {
        let color = genColorByStatus(item);
        return (
          <>
            <DotIcon color={color} />
            <span> {item}</span>
          </>
        );
      },
      xs: 24,
      sm: 12,
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      width: "100px",
      sorter: true,
      xs: 24,
      sm: 12,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "50px",
      render: (item) => {
        return (
          <div className="d-flex">
            <div>
              <img src={require("@images/BNB-IVI.png")} />
            </div>
            <NameTokenWrapper>{item}</NameTokenWrapper>
          </div>
        );
      },
      xs: 24,
      sm: 12,
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      width: "100px",
      render: (item) => {
        let color = genColorTask(item);
        return <TagWrapper color={color}>{item}</TagWrapper>;
      },
      xs: 24,
      sm: 12,
    },
    {
      title: "Create date",
      dataIndex: "createDate",
      key: "createDate",
      width: "100px",
      // render: (_, record) => record?.participants?.length,
      xs: 24,
      sm: 12,
    },
    {
      title: "Approved - Rejected",
      dataIndex: "approved",
      key: "approved",
      width: "100px",
      align: "end",
      xs: 24,
      sm: 12,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "150px",
      render: (item, record) => {
        return (
          <ActionWrapper>
            <IconAdmin type="high" tooltipText="Edit">
              <PenUnderline
                onClick={() =>
                  setState({
                    openEditPoolModal: true,
                  })
                }
              />
            </IconAdmin>
            <IconAdmin type="low" tooltipText="Delete">
              <TrashAdmin onClick={() => {}} />
            </IconAdmin>
            <IconAdmin onClick={() => {}} type="low" tooltipText="Reject">
              <Dislike />
            </IconAdmin>
            <IconAdmin onClick={() => {}} type="low" tooltipText="Reject">
              <Like />
            </IconAdmin>
            <IconAdmin onClick={() => {}} type="low" tooltipText="Reject">
              <Redirect />
            </IconAdmin>
          </ActionWrapper>
        );
      },
      xs: 24,
      sm: 24,
      ignoreTitle: true,
    },
  ];

  return (
    <>
      <BaseResponsive
        action={
          <Row
            gutter={[24, 24]}
            justify="space-between"
            style={{ marginBottom: "20px" }}
          >
            <Col xs={24} sm={12} lg={6}>
              <CustomSearch
                placeholder="Search by name..."
                onSearch={(value) => {
                  // handleChangeParams({ name: value });
                }}
              />
            </Col>
            <Col xs={24} sm={12} lg={4}>
              <ButtonWrapper>
                <ButtonAdmin
                  border
                  type={"high"}
                  onClick={() => setProposal(!proposal)}
                >
                  <img
                    className="add-icon"
                    src={require("@images/add-circle.png")}
                    alt=""
                  />
                  <div>Make a proposal</div>
                  <div className="triangle"></div>
                </ButtonAdmin>
                {proposal && (
                  <div className="selector">
                    <div
                      className="select-part"
                      onClick={() => {
                        setState({
                          openNewPoolModal: true,
                        });
                        setProposal(!proposal);
                      }}
                    >
                      <img
                        className="proposal-icon"
                        src={require("@images/proposal-icon-1.png")}
                        alt=""
                      />
                      <div className="select-text">Create a new pool</div>
                    </div>
                    <div
                      className="select-part"
                      onClick={() => {
                        setState({
                          openUpdateAPRPoolModal: true,
                        });
                        setProposal(!proposal);
                      }}
                    >
                      <img
                        className="proposal-icon"
                        src={require("@images/proposal-icon-2.png")}
                        alt=""
                      />
                      <div className="select-text">Update APR/Locktime</div>
                    </div>
                    <div
                      className="select-part"
                      onClick={() => {
                        setState({
                          openUpdateRewardPoolModal: true,
                        });
                        setProposal(!proposal);
                      }}
                    >
                      <img
                        className="proposal-icon"
                        src={require("@images/proposal-icon-3.png")}
                        alt=""
                      />
                      <div className="select-text">Update reward</div>
                    </div>
                  </div>
                )}
              </ButtonWrapper>
            </Col>
          </Row>
        }
        childrenTitle="Campaign"
        columns={columns}
        dataSource={dataAdmin}
      />
      <NewPoolModal state={state} setState={setState} />
      <UpdateAPRPoolModal state={state} setState={setState} />
      <EditPoolModal state={state} setState={setState} />
      <UpdateRewardPoolModal state={state} setState={setState} />
    </>
  );
}
