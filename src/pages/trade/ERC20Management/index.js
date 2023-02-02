import { Cancel, Dislike, Like, Redirect, TrashAdmin } from "@assets/svg";
import BaseModal from "@components/base/BaseModal";
import BaseResponsive from "@components/base/BaseResponsive";
import DotIcon from "@components/DotIcon";
import useCustomState from "@hook/useCustomState";
import {
  blockChainConfirmationTransaction,
  parseEther,
  toDecimal,
} from "@utils/index";
import { Form, Input, Tabs } from "antd";
import { ethers } from "ethers";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IconAdmin } from "../AdminCommunity/Adminlist/components/AdminComponent";
import LinearText from "../components/LinearText";
import { LinearButton } from "../components/styled";
import { ERC20ManagementWrapper } from "./styled";

function ERC20Management({ history }) {
  const [state, setState] = useCustomState({ flag: 0 });

  const { erc20, address } = useSelector((state) => state.contracts);
  useEffect(() => {
    if (erc20) {
      updateRequest();
      updateMinter();
      if (!state.flag) {
        setState({ flag: 1 });
      }
    }
  }, [erc20]);

  useEffect(() => {
    if (state.flag === 1) {
      verify();
    }
  }, [state.flag, address]);
  const updateRequest = async () => {
    let data = await erc20.getMintRequests();
    let cvData = await Promise.all(
      data.map(async (item) => {
        let vote = await erc20.getMintVote(address, item.id);
        let numVote = await erc20.getMintVoteCount(item.id);
        return {
          ...item,
          createdAt: moment
            .unix(item.createdAt._hex)
            .format("DD-MM-YYYY HH:mm:ss"),
          amount: toDecimal(item.amount),
          vote,
          numVote,
        };
      })
    );
    let totalSupply = await erc20.totalSupply();
    setState({
      dataSource: cvData,
      totalSupply: toDecimal(totalSupply),
    });
  };

  const updateMinter = async () => {
    let minterData = await erc20.getAllOwner();
    let data = await Promise.all(
      minterData.map(async (item) => {
        let status = await erc20.isOwner(item);
        let vote = await erc20.getVote(item, address);
        let numVote = await erc20.getNumberVote(item);
        return { address: item, status: status, id: item, vote, numVote };
      })
    );

    setState({ minters: data });
  };

  const verify = async () => {
    let isOwner = await erc20.isOwner(address);
    if (isOwner === 1) {
      setState({ isOwner: true });
    } else {
      history.push("/community");
    }
  };
  const minterRef = useRef();
  const [minterForm] = Form.useForm();

  const accountRef = useRef();
  const [accountForm] = Form.useForm();
  return (
    <ERC20ManagementWrapper>
      <LinearText fontSize={"40px"} title={"Token management"}></LinearText>{" "}
      <div className="d-flex">
        <h2 className="mr-1">Max supply: </h2>
        <h2>{Number(888888888).formatCurrency()}</h2>
      </div>{" "}
      <div className="d-flex">
        <h2 className="mr-1">Total supply: </h2>
        <h2>{Number(state.totalSupply || 0)?.formatCurrency()}</h2>
      </div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Token management" key="1">
          <div style={{ width: "150px", display: "flex", gap: "10px" }}>
            {/* <LinearButton
              onClick={() => {
                minterRef.current.show({
                  submit: async () => {
                    await minterForm.validateFields();
                    let values = minterForm.getFieldsValue();
                    blockChainConfirmationTransaction({
                      transaction: async () => {
                        return erc20.mint(
                          values.address,
                          parseEther(values.amount)
                        );
                      },
                    });
                  },
                });
              }}
            >
              Mint (Only owner)
            </LinearButton> */}
            <LinearButton
              onClick={() => {
                minterRef.current.show({
                  submit: async () => {
                    await minterForm.validateFields();
                    let values = minterForm.getFieldsValue();
                    blockChainConfirmationTransaction({
                      callback: updateRequest,
                      transaction: async () => {
                        return await erc20.createMintRequest(
                          values.address,
                          parseEther(values.amount)
                        );
                      },
                    });
                  },
                });
              }}
            >
              Create mint request
            </LinearButton>
          </div>
          <br />
          <BaseResponsive
            rowKey="id"
            dataSource={state.dataSource}
            columns={[
              {
                title: "Created At",
                dataIndex: "createdAt",
                key: "createdAt",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
              },
              {
                title: "Request By ",
                dataIndex: "requestBy",
                key: "requestBy",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
              },
              {
                title: "To",
                dataIndex: "to",
                key: "to",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
              },
              {
                title: "Amount",
                dataIndex: "amount",
                key: "amount",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
              },
              {
                title: "Vote",
                dataIndex: "numVote",
                key: "numVote",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                render: (numVote) =>
                  `${numVote}/${
                    state?.minters?.filter((item) => item.status === 1)?.length
                  }`,
              },
              {
                title: "Status",
                dataIndex: "used",
                key: "used",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                render: (used, record) => {
                  if (used) {
                    return (
                      <>
                        {" "}
                        <DotIcon color={"#0A9921"} />
                        <span>Allocated</span>
                      </>
                    );
                  } else {
                    if (record.numVote.eq(ethers.BigNumber.from("0"))) {
                      return (
                        <>
                          {" "}
                          <DotIcon color={"#33E0C2"} />
                          <span>Proposed</span>
                        </>
                      );
                    } else {
                      return (
                        <>
                          {" "}
                          <DotIcon color={"#ECDE2D"} />
                          <span>Voting</span>
                        </>
                      );
                    }
                  }
                },
              },
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                render: (_, record) => {
                  let used = record.used;
                  return (
                    !used && (
                      <div className="d-flex gap-10">
                        <IconAdmin
                          disable={!record.vote}
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: updateRequest,
                              transaction: async () => {
                                return await erc20.rejectMint(record.id);
                              },
                            });
                          }}
                          type="low"
                          tooltipText="Reject"
                        >
                          {" "}
                          <Dislike />
                        </IconAdmin>
                        <IconAdmin
                          disable={record.vote}
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: updateRequest,
                              transaction: async () => {
                                return await erc20.acceptMint(record.id);
                              },
                            });
                          }}
                          type="high"
                          tooltipText="Accept"
                        >
                          {" "}
                          <Like />{" "}
                        </IconAdmin>

                        <IconAdmin
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: updateRequest,
                              transaction: async () => {
                                return await erc20.mintConsensus(record.id);
                              },
                            });
                          }}
                          type="high"
                          tooltipText="Mint consensus"
                        >
                          <Redirect />
                        </IconAdmin>
                      </div>
                    )
                  );
                },
              },
            ]}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Minter management" key="2">
          {" "}
          <div style={{ width: "150px", display: "flex", gap: "10px" }}>
            <LinearButton
              onClick={() => {
                accountRef.current.show({
                  submit: async () => {
                    await accountForm.validateFields();
                    let values = accountForm.getFieldsValue();
                    blockChainConfirmationTransaction({
                      callback: updateMinter,
                      transaction: async () => {
                        return await erc20.requestNewOwner(values.address);
                      },
                    });
                  },
                });
              }}
            >
              Request new account
            </LinearButton>
          </div>
          <br />
          <BaseResponsive
            rowKey="id"
            dataSource={state.minters}
            columns={[
              {
                title: "Address",
                dataIndex: "address",
                key: "address",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                xs: 24,
                sm: 12,
                // width: "200px",
                align: "center",
                responsive: ["sm"],
                render: (status) => {
                  switch (status) {
                    case 0:
                      return (
                        <>
                          <DotIcon color={"#33E0C2"} />
                          <span>Proposed</span>
                        </>
                      );
                    case 1:
                      return (
                        <>
                          <DotIcon color={"#0A9921"} />
                          <span>Active</span>
                        </>
                      );

                    case 2:
                      return (
                        <>
                          <DotIcon color={"#EA0000"} />
                          <span>Inactive</span>
                        </>
                      );
                    default:
                      return "";
                  }
                },
              },
              {
                title: "Voting decision",
                dataIndex: "decision",
                key: "decision",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                align: "center",
                render: (numVote, record) => (
                  <div className="d-flex justify-content-center gap-10">
                    <IconAdmin
                      disable={!record.vote}
                      onClick={async () => {
                        blockChainConfirmationTransaction({
                          callback: updateMinter,
                          transaction: async () => {
                            return await erc20.rejectAccount(record.address);
                          },
                        });
                      }}
                      type="low"
                      tooltipText="Reject"
                    >
                      <Dislike />
                    </IconAdmin>
                    <IconAdmin
                      disable={record.vote}
                      onClick={async () => {
                        blockChainConfirmationTransaction({
                          callback: updateMinter,
                          transaction: async () => {
                            return await erc20.acceptAccount(record.address);
                          },
                        });
                      }}
                      type="high"
                      tooltipText="Accept"
                    >
                      <Like />
                    </IconAdmin>
                  </div>
                ),
              },
              {
                title: "Voting result",
                dataIndex: "numVote",
                key: "numVote",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                align: "center",
                render: (numVote) =>
                  `${numVote}/${
                    state?.minters?.filter((item) => item.status === 1)?.length
                  }`,
              },
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                align: "center",
                render: (used, record) => {
                  return (
                    <div className="d-flex justify-content-center gap-10">
                      {record.status !== 1 && (
                        <IconAdmin
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: updateMinter,
                              transaction: async () => {
                                return await erc20.grantOwnership(
                                  record.address
                                );
                              },
                            });
                          }}
                          type="high"
                          tooltipText="Confirm granted"
                        >
                          <Redirect />
                        </IconAdmin>
                      )}
                      {record.status === 1 && (
                        <IconAdmin
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: updateMinter,
                              transaction: async () => {
                                return await erc20.revokeOwnership(
                                  record.address
                                );
                              },
                            });
                          }}
                          type="low"
                          tooltipText="Confirm revoked"
                        >
                          <Cancel />
                        </IconAdmin>
                      )}
                      {/* {record.status !== 1 && ( */}
                      <IconAdmin
                        onClick={async () => {
                          blockChainConfirmationTransaction({
                            callback: updateMinter,
                            transaction: async () => {
                              return await erc20.removeAccount(record.address);
                            },
                          });
                        }}
                        type="low"
                        tooltipText="Remove from list"
                      >
                        <TrashAdmin />
                      </IconAdmin>
                      {/* )} */}
                    </div>
                  );
                },
              },
            ]}
          />{" "}
        </Tabs.TabPane>
      </Tabs>
      <BaseModal
        title="Create transfer request"
        ref={minterRef}
        renderForm={() => (
          <div>
            <Form layout="horizontal" form={minterForm}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    require: true,
                    message: "Please input new owner address!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value && ethers.utils.isAddress(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Invalid address!"));
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  {
                    require: true,
                    message: "Please input amount!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </div>
        )}
      />
      <BaseModal
        title="Request new account"
        ref={accountRef}
        renderForm={() => (
          <div>
            <Form layout="horizontal" form={accountForm}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    require: true,
                    message: "Please input new owner address!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value && ethers.utils.isAddress(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Invalid address!"));
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </div>
        )}
      />
    </ERC20ManagementWrapper>
  );
}

export default ERC20Management;
