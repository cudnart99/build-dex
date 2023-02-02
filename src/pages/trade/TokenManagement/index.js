/* eslint-disable react-hooks/exhaustive-deps */
import { EyeFilled } from "@ant-design/icons";
import { Cancel, Dislike, Like, Redirect, TrashAdmin } from "@assets/svg";
import BaseModal from "@components/base/BaseModal";
import BaseResponsive from "@components/base/BaseResponsive";
import DotIcon from "@components/DotIcon";
import useCustomState from "@hook/useCustomState";
import {
  blockChainConfirmationTransaction,
  formatPrice,
  parseEther,
  toDecimal,
} from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import { Form, Input, Table, Tabs } from "antd";
import { ethers } from "ethers";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconAdmin } from "../AdminCommunity/Adminlist/components/AdminComponent";
import LinearText from "../components/LinearText";
import { LinearButton } from "../components/styled";
import { TokenManagementWrapper } from "./styled";
function TokenManagement({ history }) {
  const [state, setState] = useCustomState({});
  const { currentContractProperties, address, erc20 } = useSelector(
    (state) => state?.contracts
  );
  const { allInvestor } = useSelector((state) => state?.vesting);
  const { isOwner, tokenManagementContractWithSigner } = useSelector(
    (state) => state?.tokenmanagement
  );

  const { queryAllSmartContract } = useDispatch()?.vesting;
  const { initTokenManagement } = useDispatch()?.tokenmanagement;
  const { getTokenTx } = useDispatch()?.contracts;
  const mergeData = async () => {
    let tokenData =
      await tokenManagementContractWithSigner.getAllTransferData();
    let tokenDataWithVote = await Promise.all(
      tokenData.map(async (item) => {
        let vote = await tokenManagementContractWithSigner.getAccountVote(
          item.id,
          address
        );
        let numVote =
          await tokenManagementContractWithSigner.getTransferVoteCount(item.id);
        return { ...item, vote, numVote };
      })
    );
    let dataSource = tokenDataWithVote.map((item) => ({
      ...item,
      ...allInvestor.find((subItem) => subItem.smcAddress === item.to),
      total: Number(toDecimal(item.amount)),
      isInvestor: true,
    }));

    let listWaitRequest = allInvestor.filter(
      (item) =>
        !tokenDataWithVote.find((subItem) => subItem.to === item.smcAddress)
    );
    setState({ dataSource, listWaitRequest });
  };

  const getParentSmartContractBalance = async () => {
    let balance = await erc20.balanceOf(
      currentContractProperties.tokenManagementAddress
    );
    setState({ parentBalance: Number(toDecimal(balance)).formatCurrency() });
  };
  const updateOwner = async () => {
    let minterData = await tokenManagementContractWithSigner.getAllOwner();
    let data = await Promise.all(
      minterData.map(async (item) => {
        let status = await tokenManagementContractWithSigner.isOwner(item);
        let numVote = await tokenManagementContractWithSigner.getNumberVote(
          item
        );
        let vote = await tokenManagementContractWithSigner.getVote(
          item,
          address
        );
        return { address: item, status: status, id: item, numVote, vote };
      })
    );

    setState({ owners: data });
  };
  const verify = async () => {
    let isMinter = await tokenManagementContractWithSigner.isOwner(address);
    if (isMinter === 1) {
      setState({ isOwner: isMinter === 1 });
    } else {
      history.push("/community");
    }
  };

  const getTransferToData = () => {
    getTokenTx(currentContractProperties.tokenManagementAddress)
      .then((res) => {
        setState({ dataTransfers: res });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (state.flag === 1 && tokenManagementContractWithSigner) {
      verify();
    }
  }, [state.flag, address, tokenManagementContractWithSigner]);

  useEffect(() => {
    if (tokenManagementContractWithSigner) {
      queryAllSmartContract();
      getParentSmartContractBalance();
      updateOwner();
      if (!state.flag) {
        setState({ flag: 1 });
      }
    }
  }, [tokenManagementContractWithSigner]);
  useEffect(() => {
    if (allInvestor && tokenManagementContractWithSigner) {
      mergeData();
    }
  }, [allInvestor, tokenManagementContractWithSigner]);
  useEffect(() => {
    if (currentContractProperties) {
      getTransferToData();
      initTokenManagement();
    }
  }, [currentContractProperties]);

  const transferRef = useRef();
  const [transferForm] = Form.useForm();

  const minterRef = useRef();
  const [minterForm] = Form.useForm();
  const columnsCampaignsValue = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      // width: "52px",
      width: "5%",
      // render: (_, __, index) => params.page * params.size + index + 1,
    },
    {
      title: "Time",
      // width: "200px",
      width: "15%",
      dataIndex: "timeStamp",
      key: "timeStamp",
      align: "left",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.timeStamp - b.timeStamp,
      render: (timeStamp) => {
        return moment.unix(timeStamp)?.format("DD-MM-YYYY HH:mm:ss");
      },
      // render: (item) => moment(item)?.format("DD-MM-YYYY HH:mm:ss"),
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      // sorter: true,
    },

    {
      title: "From",
      dataIndex: "from",
      key: "from",
      // width: "150px",
      width: "20%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      // render: (hash) => (
      //   <AddressTooltip
      //     address={hash}
      //     getLengthAddress={getLengthAddressByWindowScreen(hash, width)}
      //   />
      // ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      // width: "150px",
      width: "20%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      // render: (hash) => (
      //   <AddressTooltip
      //     address={hash}
      //     getLengthAddress={getLengthAddressByWindowScreen(hash, width)}
      //   />
      // ),
    },

    {
      title: "Value (BNB)",
      dataIndex: "gasFee",
      key: "gasFee",
      // width: "150px",
      width: "10%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      render: (_, record) =>
        (Number(record.gasPrice) * Number(record.gasUsed)) / Math.pow(10, 18),
    },
    {
      title: `Value (${process.env.REACT_APP_STABLE_TOKEN_SYMBOL})`,
      dataIndex: "value",
      key: "value",
      // width: "150px",
      width: "10%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      render: (value) => formatPrice(Number(value) / Math.pow(10, 18)),
    },
    {
      title: "Txn Hash",
      dataIndex: "hash",
      key: "hash",
      // width: "200px",
      width: "20%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      // render: (hash) => (
      //   <AddressTooltip
      //     address={hash}
      //     getLengthAddress={getLengthAddressByWindowScreen(hash, width)}
      //   />
      // ),
    },
  ];
  let totalTransferToSmartContract = state.dataTransfers
    ?.filter(
      (item) =>
        item.to.toLowerCase() ===
        currentContractProperties.tokenManagementAddress.toLowerCase()
    )
    ?.map((item, index) => ({
      ...item,
      index: index + 1,
    }))
    .reduce((a, b) => a + Number(b.value) / Math.pow(10, 18), 0)
    .formatCurrency();
  return (
    <TokenManagementWrapper>
      <LinearText fontSize={"40px"} title={"Token allocation"}></LinearText>{" "}
      <h2 className="text-white d-flex">
        {`Token available to allocate: ${state.parentBalance}`}{" "}
      </h2>{" "}
      <h2 className="text-white d-flex">
        {`Total token transferred to smart contract for allocation: ${
          totalTransferToSmartContract || 0
        }`}{" "}
        <IconAdmin
          onClick={() => {
            snackbarUtils.confirm({
              width: 1000,
              title: "Transfer to",
              content: (
                <Table
                  scroll={{ x: 400 }}
                  dataSource={state.dataTransfers
                    ?.filter(
                      (item) =>
                        item.to.toLowerCase() ===
                        currentContractProperties.tokenManagementAddress.toLowerCase()
                    )
                    ?.map((item, index) => ({
                      ...item,
                      index: index + 1,
                    }))}
                  columns={columnsCampaignsValue}
                />
              ),
            });
          }}
          type="low"
          tooltipText="View Detail"
        >
          <EyeFilled className="icon" style={{ color: "hotpink" }} />{" "}
        </IconAdmin>
      </h2>{" "}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Investors" key="1">
          <BaseResponsive
            clientSearch={true}
            rowKey={"smcAddress"}
            dataSource={state.dataSource?.filter((item) => item.isInvestor)}
            columns={[
              {
                title: "Wallet Address",
                dataIndex: "owner",
                key: "owner",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
              },
              {
                title: "Allocation SMC Address",
                dataIndex: "smcAddress",
                key: "smcAddress",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
              },
              {
                title: "Seed",
                dataIndex: "seed",
                key: "seed",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                align: "right",
                render: (data) =>
                  data?.reduce((a, b) => a + b, 0)?.formatCurrency(),
              },
              {
                title: "Private",
                dataIndex: "private",
                key: "private",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                align: "right",
                render: (data) =>
                  data?.reduce((a, b) => a + b, 0)?.formatCurrency(),
              },
              {
                title: "Total",
                dataIndex: "total",
                key: "total",
                xs: 24,
                sm: 12,
                responsive: ["sm"],
                align: "right",
                render: (data) => data.formatCurrency(),
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
                title: "Vote",
                dataIndex: "numVote",
                key: "numVote",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                render: (numVote) =>
                  `${numVote}/${
                    state?.owners?.filter((item) => item.status === 1)?.length
                  }`,
              },
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
                xs: 24,
                sm: 12,
                width: "200px",
                responsive: ["sm"],
                aligh: "center",
                render: (_, record, index) => {
                  let used = record.used;
                  return (
                    !used && (
                      <div className="d-flex justify-content-center gap-10">
                        <IconAdmin
                          onClick={() => {
                            snackbarUtils.confirm({
                              title: "Allocation Detail",
                              content: (
                                <Table
                                  dataSource={record.seed.map(
                                    (item, index) => ({
                                      seed: record.seed[index],
                                      private: record.private[index],
                                      time: record.time[index],
                                    })
                                  )}
                                  columns={[
                                    {
                                      title: "Time",
                                      dataIndex: "time",
                                      key: "time",
                                      xs: 24,
                                      sm: 12,
                                      width: "200px",
                                      responsive: ["sm"],
                                    },
                                    {
                                      title: "Seed",
                                      dataIndex: "seed",
                                      key: "seed",
                                      xs: 24,
                                      sm: 12,
                                      width: "200px",
                                      responsive: ["sm"],
                                      render: (data) => data?.formatCurrency(),
                                    },
                                    {
                                      title: "Private",
                                      dataIndex: "private",
                                      key: "private",
                                      xs: 24,
                                      sm: 12,
                                      width: "200px",
                                      responsive: ["sm"],
                                      render: (data) => data?.formatCurrency(),
                                    },
                                  ]}
                                />
                              ),
                            });
                          }}
                          type="low"
                          tooltipText="View Detail"
                        >
                          <EyeFilled />{" "}
                        </IconAdmin>
                        <IconAdmin
                          disable={record.vote}
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: queryAllSmartContract,
                              transaction: async () => {
                                return await tokenManagementContractWithSigner.acceptTransfer(
                                  record.id
                                );
                              },
                            });
                          }}
                          type="high"
                          tooltipText="Accept"
                        >
                          <Like />{" "}
                        </IconAdmin>
                        <IconAdmin
                          disable={record.total === Number(record.balance)}
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: queryAllSmartContract,
                              transaction: async () => {
                                return await tokenManagementContractWithSigner.transfer(
                                  record.id
                                );
                              },
                            });
                          }}
                          type="high"
                          tooltipText="Allocate"
                        >
                          <Redirect />
                        </IconAdmin>
                      </div>
                    )
                  );
                },
              },
            ]}
          />{" "}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Queue" key="2">
          <div style={{ width: "160px", display: "flex", gap: "10px" }}>
            <LinearButton
              onClick={() => {
                transferRef.current.show({
                  submit: async () => {
                    await transferForm.validateFields();
                    let values = transferForm.getFieldsValue();
                    blockChainConfirmationTransaction({
                      callback: queryAllSmartContract,
                      transaction: async () => {
                        return await tokenManagementContractWithSigner.requestNewTransfer(
                          values.address,
                          parseEther(values.amount)
                        );
                      },
                    });
                  },
                });
              }}
            >
              Create transfer request
            </LinearButton>
          </div>
          <br />
          <BaseResponsive
            dataSource={state?.listWaitRequest}
            clientSearch={true}
            rowKey={"id"}
            columns={[
              {
                title: "Wallet Address",
                dataIndex: "owner",
                key: "owner",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
              },
              {
                title: "Allocation SMC Address",
                dataIndex: "smcAddress",
                key: "smcAddress",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
              },
              {
                title: "Seed",
                dataIndex: "seed",
                key: "seed",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                align: "right",
                render: (data) =>
                  data?.reduce((a, b) => a + b, 0)?.formatCurrency(),
              },
              {
                title: "Private",
                dataIndex: "private",
                key: "private",
                xs: 24,
                sm: 12,
                // width: "200px",
                responsive: ["sm"],
                align: "right",
                render: (data) =>
                  data?.reduce((a, b) => a + b, 0)?.formatCurrency(),
              },
              {
                title: "Total",
                dataIndex: "total",
                key: "total",
                xs: 24,
                sm: 12,
                responsive: ["sm"],
                align: "right",
                render: (data) => data.formatCurrency(),
              },
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
                xs: 24,
                sm: 12,
                width: "200px",
                responsive: ["sm"],
                align: "center",
                render: (_, record, index) => {
                  let used = record.used;
                  return (
                    !used && (
                      <div className="d-flex justify-content-center gap-10">
                        <IconAdmin
                          onClick={() => {
                            snackbarUtils.confirm({
                              title: "Allocation Detail",
                              content: (
                                <Table
                                  dataSource={record.seed.map(
                                    (item, index) => ({
                                      seed: record.seed[index],
                                      private: record.private[index],
                                      time: record.time[index],
                                    })
                                  )}
                                  columns={[
                                    {
                                      title: "Time",
                                      dataIndex: "time",
                                      key: "time",
                                      xs: 24,
                                      sm: 12,
                                      width: "200px",
                                      responsive: ["sm"],
                                    },
                                    {
                                      title: "Seed",
                                      dataIndex: "seed",
                                      key: "seed",
                                      xs: 24,
                                      sm: 12,
                                      width: "200px",
                                      responsive: ["sm"],
                                      render: (data) => data?.formatCurrency(),
                                    },
                                    {
                                      title: "Private",
                                      dataIndex: "private",
                                      key: "private",
                                      xs: 24,
                                      sm: 12,
                                      width: "200px",
                                      responsive: ["sm"],
                                      render: (data) => data?.formatCurrency(),
                                    },
                                  ]}
                                />
                              ),
                            });
                          }}
                          type="low"
                          tooltipText="View Detail"
                        >
                          <EyeFilled />{" "}
                        </IconAdmin>

                        <IconAdmin
                          disable={record.total === Number(record.balance)}
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: queryAllSmartContract,
                              transaction: async () => {
                                return await tokenManagementContractWithSigner.requestNewTransfer(
                                  record.smcAddress,
                                  parseEther(record.total.toString())
                                );
                              },
                            });
                          }}
                          type="high"
                          tooltipText="Allocate"
                        >
                          <Redirect />
                        </IconAdmin>
                      </div>
                    )
                  );
                },
              },
            ]}
            // columns={[
            //   {
            //     title: "Transfer to address",
            //     dataIndex: "to",
            //     key: "to",
            //     xs: 24,
            //     sm: 12,
            //     responsive: ["sm"],
            //   },
            //   {
            //     title: "Amount",
            //     dataIndex: "total",
            //     key: "total",
            //     xs: 24,
            //     sm: 12,
            //     responsive: ["sm"],
            //     align: "right",
            //     render: (data) => data.formatCurrency(),
            //   },
            //   {
            //     title: "Status",
            //     dataIndex: "used",
            //     key: "used",
            //     xs: 24,
            //     sm: 12,
            //     responsive: ["sm"],
            //     align: "center",
            //     // render: (used, record) => {
            //     //   if(used)
            //     // },
            //   },
            //   {
            //     title: "Voting decision",
            //     dataIndex: "decision",
            //     key: "decision",
            //     xs: 24,
            //     sm: 12,
            //     responsive: ["sm"],
            //     align: "center",
            //     render: (numVote, record) => (
            //       <div className="d-flex justify-content-center gap-10">
            //         <IconAdmin
            //           disable={!record.vote}
            //           onClick={async () => {
            //             blockChainConfirmationTransaction({
            //               callback: queryAllSmartContract,
            //               transaction: async () => {
            //                 return await tokenManagementContractWithSigner.rejectTransfer(
            //                   record.id
            //                 );
            //               },
            //             });
            //           }}
            //           type="low"
            //           tooltipText="Reject"
            //         >
            //           <Dislike />
            //         </IconAdmin>
            //         <IconAdmin
            //           disabled={record.vote}
            //           onClick={() => {
            //             blockChainConfirmationTransaction({
            //               callback: queryAllSmartContract,
            //               transaction: async () => {
            //                 return await tokenManagementContractWithSigner.acceptTransfer(
            //                   record.id
            //                 );
            //               },
            //             });
            //           }}
            //           type="high"
            //           tooltipText="Accept"
            //         >
            //           <Like />{" "}
            //         </IconAdmin>
            //       </div>
            //     ),
            //   },
            //   {
            //     title: "Voting result",
            //     dataIndex: "numVote",
            //     key: "numVote",
            //     xs: 24,
            //     sm: 12,
            //     responsive: ["sm"],
            //     align: "center",
            //     render: (numVote) =>
            //       `${numVote}/${
            //         state?.owners?.filter((item) => item.status === 1)?.length
            //       }`,
            //   },

            //   {
            //     title: "Action",
            //     dataIndex: "action",
            //     key: "action",
            //     xs: 24,
            //     sm: 12,
            //     width: "200px",
            //     responsive: ["sm"],
            //     render: (_, record, index) => {
            //       return (
            //         <div className="d-flex justify-content-center gap-10">
            //           <IconAdmin
            //             disabled={record.used}
            //             onClick={() => {
            //               blockChainConfirmationTransaction({
            //                 callback: queryAllSmartContract,
            //                 transaction: async () => {
            //                   return await tokenManagementContractWithSigner.transfer(
            //                     record.id
            //                   );
            //                 },
            //               });
            //             }}
            //             type="high"
            //             tooltipText="Confirm transfered"
            //           >
            //             <Redirect />
            //           </IconAdmin>
            //         </div>
            //       );
            //     },
            //   },
            // ]}
          />{" "}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Admin management" key="3">
          {" "}
          <div style={{ width: "150px", display: "flex", gap: "10px" }}>
            <LinearButton
              onClick={() => {
                minterRef.current.show({
                  submit: async () => {
                    await minterForm.validateFields();
                    let values = minterForm.getFieldsValue();
                    blockChainConfirmationTransaction({
                      callback: updateOwner,
                      transaction: async () => {
                        return await tokenManagementContractWithSigner.requestNewOwner(
                          values.address
                        );
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
            dataSource={state.owners}
            clientSearch={true}
            ignoreToZero={false}
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
                          callback: updateOwner,
                          transaction: async () => {
                            return await tokenManagementContractWithSigner.rejectAccount(
                              record.address
                            );
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
                          callback: updateOwner,
                          transaction: async () => {
                            return await tokenManagementContractWithSigner.acceptAccount(
                              record.address
                            );
                          },
                        });
                      }}
                      type="high"
                      tooltipText="Accept"
                    >
                      <Like />{" "}
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
                align: "center",
                responsive: ["sm"],
                render: (numVote) =>
                  `${numVote}/${
                    state?.owners?.filter((item) => item.status === 1)?.length
                  }`,
              },

              {
                title: "Action",
                dataIndex: "action",
                key: "action",
                xs: 24,
                sm: 12,
                align: "center",
                responsive: ["sm"],
                render: (used, record) => {
                  return (
                    <div className="d-flex justify-content-center gap-10">
                      {record.status !== 1 && (
                        <IconAdmin
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: updateOwner,
                              transaction: async () => {
                                return await tokenManagementContractWithSigner.grantOwnership(
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
                              callback: updateOwner,
                              transaction: async () => {
                                return await tokenManagementContractWithSigner.revokeOwnership(
                                  record.address
                                );
                              },
                            });
                          }}
                          type="low"
                          tooltipText="Confirm revoked"
                        >
                          <Cancel />{" "}
                        </IconAdmin>
                      )}
                      {record.status !== 1 && (
                        <IconAdmin
                          onClick={async () => {
                            blockChainConfirmationTransaction({
                              callback: updateOwner,
                              transaction: async () => {
                                return await tokenManagementContractWithSigner.removeAccount(
                                  record.address
                                );
                              },
                            });
                          }}
                          type="low"
                          tooltipText="Remove from list"
                        >
                          <TrashAdmin />
                        </IconAdmin>
                      )}
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
        ref={transferRef}
        renderForm={() => (
          <div>
            <Form layout="horizontal" form={transferForm}>
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
            </Form>
          </div>
        )}
      />
    </TokenManagementWrapper>
  );
}

export default TokenManagement;
