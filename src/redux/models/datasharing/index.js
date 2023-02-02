import contractProvider from "@data-access/contract-provider";
import {
  IvirseIntegrationBuyer,
  IvirseIntegrationOwner,
} from "@ivirse-tovchain/integration-services/lib/integration-client";
import { getState } from "@redux/";
import axiosUtils from "@utils/axios-utils";
import { parseEther, x10_18 } from "@utils/index";
import moment from "moment";
import {
  buyerStorageConfig,
  ownerStorageConfig,
  ROOT_PEM,
  ROOT_PEM2,
} from "./config";

const datasharingObj = {
  state: {
    changeLike: false,
    // For mapping data between intergratin server with local be
    listDataAddress: [],
    listAdditionData: [],
    collected: {
      listDataAddress: [],
      listAdditionData: [],
    },
    typeDataCollected: 1,
    flag: 0,
    sidebarFilter: {
      fromValue: null,
      toValue: null,
      listStatus: [],
      tokens: null,
      isResetPriceFilter: false,
    },
    currentViewAsset: null,
    refreshDatahubFlag: 0,
    navigatePageFlag: 0,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    updateNestedData(state, payload = {}) {
      let keys = Object.keys(payload);
      let map = keys?.reduce((obj, key) => {
        obj[key] = {
          ...state[key],
          ...payload[key],
        };
        return obj;
      }, {});
      return {
        ...state,
        ...map,
      };
    },
  },
  effects: (dispatch) => ({
    getUserToken: async () => {
      return new Promise(async (resolve, reject) => {
        const {
          reactiveContractAddress,
          marketplaceContractAddress,
          intergrationServer,
        } = getState()?.contracts?.currentContractProperties;
        try {
          axiosUtils
            .requestAxios({
              method: "post",
              url: `${intergrationServer}/api/dev/login-random`,
            })
            .then((res) => {
              let userToken = res?.data?.token_login;
              dispatch.datasharing.updateData({
                userToken,
              });
              resolve(userToken);
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    setupConnectOwner: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const {
            reactiveContractAddress,
            marketplaceContractAddress,
            intergrationServer,
          } = getState()?.contracts?.currentContractProperties;
          const signer = getState()?.contracts?.signer;
          const userToken = getState()?.datasharing?.userToken;
          let owner = await IvirseIntegrationOwner.init(
            signer,
            [ROOT_PEM, ROOT_PEM2],
            ownerStorageConfig,
            reactiveContractAddress,
            marketplaceContractAddress,
            userToken,
            intergrationServer
          );
          dispatch.datasharing.updateData({
            owner,
          });
          resolve(owner);
        } catch (err) {
          reject(err);
        }
      });
    },
    setupConnectBuyer: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const { reactiveContractAddress, marketplaceContractAddress } =
            getState()?.contracts?.currentContractProperties;
          const signer = getState()?.contracts?.signer;
          let buyer = await IvirseIntegrationBuyer.init(
            signer,
            [ROOT_PEM, ROOT_PEM2],
            buyerStorageConfig,
            reactiveContractAddress,
            marketplaceContractAddress
          );
          resolve(buyer);
          dispatch.datasharing.updateData({
            buyer,
          });
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerGetResponsePeriod: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          let res = await owner.getResponsePeriod();
          let responsePeriod = res?.hexToNumber();

          dispatch.datasharing.updateData({ responsePeriod });
          resolve(responsePeriod);
        } catch (err) {
          reject(err);
        }
      });
    },

    ownerDecryptDataFromOwnedMetadataCid: ({ cid }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          let decrypt = await owner.decryptDataFromOwnedMetadataCid(cid);
          const jsonString = Buffer.from(decrypt).toString("utf8");
          const data = JSON.parse(jsonString);
          dispatch.datasharing.updateData({
            ownerCollectedAfterSignDetailData: data,
          });
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerRegister: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          let res = await owner.register();
          console.log(res);
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },

    ownerMigrate: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          let res = await owner.migrateData();
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerGetMigrateData: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          let res = await owner?.getMigratedDataBySignature();
          dispatch.datasharing.updateData({
            ownerListMigrateDataBySignature: res,
          });

          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerWaitAllDataMigrate: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          let res = await owner.waitAllDataMigrated();

          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerPostDataToMarketplace: async ({ cid, amount }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          let res = await owner.postOwnedMetadataCidToMarket(
            cid,
            x10_18(amount)
          );
          resolve(res?.wait());
        } catch (err) {
          reject(err);
        }
      });
    },

    ownerGetPostDataToMarketplace: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          let res = await owner?.getListPostedData();
          dispatch.datasharing.updateData({
            ownerListPostedData: res,
          });
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerGetMetaDataByCid: async ({ cid }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;

          let metadata = await owner.getMetadataByCid(cid);
          resolve(metadata);
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerGetListReceivedRequests: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          const buyer = getState()?.datasharing?.buyer;

          let requests = await owner.getListReceivedRequests();
          let dataAfterConvert = await Promise.all(
            requests.map(async (item) => {
              let allRequestReceived =
                await buyer?.blockchainService?.sharingDataContract?.getListReceivedRequests(
                  item.dataOwner
                );
              return {
                ...item,
                status:
                  allRequestReceived?.find(
                    (item2) =>
                      item2.status == 2 && item.dataCid == item2.dataCid
                  ) && item.status != 2
                    ? 1
                    : item.status,
              };
            })
          );
          dispatch.datasharing.updateData({
            ownerListReceivedRequests: dataAfterConvert,
          });
          resolve(requests);
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerGetListNotResponseRequests: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;

          let notResponseRequests =
            await owner.getListNotResponseReceivedRequests();
          dispatch.datasharing.updateData({
            ownerListNotResponseRequests: notResponseRequests,
          });
          resolve(notResponseRequests);
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerAcceptRequest: async ({ requestId }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;

          await owner
            .acceptRequest(requestId)
            .then((res) => {
              resolve(res.wait());
            })
            .catch((err) => {
              throw new Error(err?.message);
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerDeclineRequest: async ({ requestId }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;

          await owner
            .declineRequest(requestId)
            .then((res) => {
              resolve(res.wait());
            })
            .catch((err) => {
              throw new Error(err?.message);
            });
        } catch (err) {
          reject(err);
        }
      });
    },

    buyerAccuseResponse: async ({ requestId }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          buyer
            .accuseResponse(requestId)
            .then((res) => {
              resolve(res.wait());
            })
            .catch((err) => {
              reject(err);
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    ownerGetCollectedData: async () => {
      const owner = getState()?.datasharing?.owner;
      const buyer = getState()?.datasharing?.buyer;
      const getStatusByOwnerAndCid = async ({ owner, cid }) => {
        try {
          let allRequestReceived =
            await buyer?.blockchainService?.sharingDataContract?.getListReceivedRequests(
              owner
            );
          return {
            d0: allRequestReceived?.find(
              (item) => item.status == 0 && cid == item.dataCid // 0 mean request is not response
            )
              ? true
              : false,
            d1: allRequestReceived?.find(
              (item) => item.status == 1 && cid == item.dataCid // 1 mean request is declined
            )
              ? true
              : false,
            d2: allRequestReceived?.find(
              (item) => item.status == 2 && cid == item.dataCid // 2 mean request is accepted
            )
              ? true
              : false,
            d3: allRequestReceived?.find(
              (item) => item.status == 3 && cid == item.dataCid // 3 mean response is accused successfully
            )
              ? true
              : false,
            d4: allRequestReceived?.find(
              (item) => item.status == 4 && cid == item.dataCid // 4 mean response time expired
            )
              ? true
              : false,
            d5: allRequestReceived?.find(
              (item) => item.status == 5 && cid == item.dataCid // 5 mean accuse time expired
            )
              ? true
              : false,
          };
        } catch (error) {
          console.log(error);
        }
      };
      return new Promise(async (resolve, reject) => {
        try {
          let ownerListPostedData = await Promise.all(
            (
              await owner?.getListPostedData()
            )?.map(async (item) => {
              let objStatus = await getStatusByOwnerAndCid({
                owner: item.owner,
                cid: item.dataCid,
              });
              return {
                ...item,
                status: objStatus?.d2 || objStatus?.d5 ? "GRANT" : "CANBUY",
              };
            })
          );
          let ownerListMigrateDataBySignature = [];
          try {
            console.log(Math.ceil(Date.now() / 1000));
            ownerListMigrateDataBySignature =
              await owner?.getMigratedDataBySignature();
          } catch (error) {
            ownerListMigrateDataBySignature = [];
          }
          const buyerListAcceptRequest =
            await buyer?.getListAcceptedSentRequests();
          const ownerListReportRequest =
            await owner?.getListReportedReceivedRequests();
          dispatch.datasharing.updateData({
            ownerListMigrateDataBySignature:
              ownerListMigrateDataBySignature === "No migrated data"
                ? []
                : ownerListMigrateDataBySignature,
            ownerListPostedData,
            buyerListAcceptRequest,
            ownerListReportRequest,
            flag: 1,
          });
          resolve({
            ownerListMigrateDataBySignature,
            ownerListPostedData,
            buyerListAcceptRequest,
            ownerListReportRequest,
          });
        } catch (err) {
          reject(err);
        }
      });
      // dispatch.datasharing.updateData({
      //   ownerListPostedData: res,
      // });
    },

    buyerGetPostDataToMarketplace: async (sort) => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          const getStatusByOwnerAndCid = async ({ owner, cid }) => {
            try {
              let allRequestReceived =
                await buyer?.blockchainService?.sharingDataContract?.getListReceivedRequests(
                  owner
                );
              return {
                d0: allRequestReceived?.find(
                  (item) => item.status == 0 && cid == item.dataCid // 0 mean request is not response
                )
                  ? true
                  : false,
                d1: allRequestReceived?.find(
                  (item) => item.status == 1 && cid == item.dataCid // 1 mean request is declined
                )
                  ? true
                  : false,
                d2: allRequestReceived?.find(
                  (item) => item.status == 2 && cid == item.dataCid // 2 mean request is accepted
                )
                  ? true
                  : false,
                d3: allRequestReceived?.find(
                  (item) => item.status == 3 && cid == item.dataCid // 3 mean response is accused successfully
                )
                  ? true
                  : false,
                d4: allRequestReceived?.find(
                  (item) => item.status == 4 && cid == item.dataCid // 4 mean response time expired
                )
                  ? true
                  : false,
                d5: allRequestReceived?.find(
                  (item) => item.status == 5 && cid == item.dataCid // 5 mean accuse time expired
                )
                  ? true
                  : false,
                grantData: allRequestReceived?.find(
                  (item) => [2, 5].includes(item.status) && cid == item.dataCid // 0 mean request is not response
                ),
              };
            } catch (error) {
              console.log(error);
            }
          };
          let res;
          try {
            res = await buyer?.blockchainService?.marketContract?.getAllData();

            res = await Promise.all(
              res.map(async (item) => {
                let objStatus = await getStatusByOwnerAndCid({
                  owner: item.owner,
                  cid: item.dataCid,
                });
                return {
                  ...item,
                  status: objStatus?.d2 || objStatus?.d5 ? "GRANT" : "CANBUY",
                  grantData: objStatus?.grantData,
                };
              })
            );
          } catch (error) {
            res = [];
          }
          dispatch.datasharing.updateData({
            buyerListPostedDataToMarketplace: res,
          });
          resolve(res);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    },

    buyerGetMetadataByCid: async ({ cid }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          let res = await buyer.getMetadataByCid(cid);
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },
    buyerValidateMetadataDetail: async ({ metadata }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          let res = await buyer.validateMetadataDetail(metadata);
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },
    buyerDeposit: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          const amountDeposit = getState()?.datahub?.amountDeposit;
          let cvAmount = parseEther(amountDeposit.toString());
          let res1 = await buyer.approveToken(cvAmount);
          await res1.wait();
          let res2 = await buyer.depositToken(
            parseEther(amountDeposit.toString())
          );
          resolve(res2);
        } catch (err) {
          reject(err);
        } finally {
          dispatch.datahub.updateData({ amountDeposit: 0 });
        }
      });
    },
    buyerWithDraw: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          const amountDeposit = getState()?.datahub?.amountDeposit;
          let cvAmount = parseEther(amountDeposit.toString());
          let res2 = await buyer.withdraw(cvAmount);
          resolve(res2);
        } catch (err) {
          reject(err);
        } finally {
          dispatch.datahub.updateData({ amountDeposit: 0 });
        }
      });
    },
    buyerWithdrawable: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          let res = await buyer?.withdrawable();

          dispatch.datasharing.updateData({
            buyerWithDrawable: res?.hexToDecimal(),
          });
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },
    buyerRequestData: ({ cid, amount }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          let res = await buyer.requestFromMetaDataCid(cid, amount, false);
          await res.wait();
          resolve(res);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    },
    buyerGetListSentRequests: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          let res = await buyer.getListSentRequests();
          let dataAfterConvert = await Promise.all(
            res.map(async (item) => {
              let allRequestReceived =
                await buyer?.blockchainService?.sharingDataContract?.getListReceivedRequests(
                  item.dataOwner
                );
              return {
                ...item,
                status:
                  allRequestReceived?.find(
                    (item2) =>
                      item2.status == 2 && item.dataCid == item2.dataCid
                  ) && item.status != 2
                    ? 1
                    : item.status,
              };
            })
          );
          dispatch.datasharing.updateData({
            buyerListSentRequests: dataAfterConvert,
          });
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },
    buyerDecryptDataFromOwnedMetadataCid: ({ cid }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;
          let decrypt = await buyer.decryptDataFromResponse(cid);
          const jsonString = Buffer.from(decrypt).toString("utf8");
          const data = JSON.parse(jsonString);
          dispatch.datasharing.updateData({
            buyerCollectedAfterSignDetailData: data,
          });
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    },

    estimateGas: ({ func, amount }) => {
      return new Promise(async (resolve, reject) => {
        try {
          // const buyer = getState()?.datasharing?.buyer;

          // let cvAmount = x10_18(amount);
          // let gasFee =
          //   await buyer?.blockchainService?.sharingDataContract?.estimateGas[
          //     func
          //   ](cvAmount);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    },

    ownerGetListAcceptedReceivedRequests: ({ time }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          let res = await owner.getListAcceptedReceivedRequests();
          dispatch.datasharing.updateData({
            earnChart: res,
          });
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },

    getDataHistory: ({ mapData }, state) => {
      let { currentContractProperties, address, symbol } = state?.contracts;
      const { owner, buyer } = getState()?.datasharing;
      const getRequestStatus = (status) => {
        switch (status) {
          case 0:
            return 3;
          case 1:
            return 2;
          case 2:
            return 1;
          case 3:
            return 4;
          case 4:
            return 2;
          case 5:
            return 1;

          default:
            return null;
        }
      };
      return new Promise(async (resolve, reject) => {
        try {
          let requestUrl = `${currentContractProperties.scanURL}/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=desc&apikey=${currentContractProperties.API_KEY}`;
          let data = [];
          let bscScanResult;
          switch (mapData.value) {
            case 1:
              bscScanResult = await contractProvider.getAbi(requestUrl);
              data = bscScanResult?.result
                ?.filter(
                  (item) =>
                    item.from.toLowerCase() == address.toLowerCase() &&
                    item.to.toLowerCase() ==
                      currentContractProperties.reactiveContractAddress.toLowerCase()
                )
                .map((item, index) => ({
                  time: moment.unix(item.timeStamp),
                  currency: item.tokenSymbol,
                  amount: parseInt(item.value) / 1e18,
                  status: item.blockNumber ? 1 : 2,
                  timestamp: Number(item.timeStamp),
                }));
              break;
            case 2:
              bscScanResult = await contractProvider.getAbi(requestUrl);

              data = bscScanResult?.result
                ?.filter(
                  (item) =>
                    item.from.toLowerCase() ==
                      currentContractProperties.reactiveContractAddress.toLowerCase() &&
                    item.to.toLowerCase() == address.toLowerCase()
                )
                .map((item, index) => ({
                  time: moment.unix(item.timeStamp),
                  currency: item.tokenSymbol,
                  amount: parseInt(item.value) / 1e18,
                  status: item.blockNumber ? 1 : 2,
                  timestamp: Number(item.timeStamp),
                }));

              break;
            case 3:
              let purchase = await buyer.getListSentRequests();
              data = purchase.map((item, index) => ({
                time: moment.unix(item.createdAt),
                data: item.dataCid,
                price: item?.tokenAmount?.hexToDecimal(),
                status: getRequestStatus(item.status),
                timestamp: moment.unix(item.createdAt).unix(),
                currency: symbol,
              }));
              break;
            case 4:
              let sales = await owner.getListReceivedRequests();
              data = sales.map((item, index) => ({
                time: moment.unix(item.createdAt),
                data: item.dataCid,
                price: item?.tokenAmount?.hexToDecimal(),
                status: getRequestStatus(item.status),
                timestamp: moment.unix(item.createdAt).unix(),
                currency: symbol,
              }));
              break;
            case 5:
              let listing = await owner?.getListPostedData();
              data = listing.map((item, index) => ({
                time: moment.unix(item.postedAt),
                currency: symbol,
                amount: item?.tokenAmount?.hexToDecimal(),
                type: "Fixed price",
                timestamp: moment.unix(item.postedAt).unix(),
                data: item?.dataCid,
              }));
              break;
            default:
              break;
          }
          dispatch.datasharing.updateData({
            history: data,
          });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },

    getLineChartData: () => {
      let currentContractProperties =
        getState()?.contracts?.currentContractProperties;
      let address = getState()?.contracts?.address;
      const owner = getState()?.datasharing?.owner;
      const buyer = getState()?.datasharing?.buyer;
      const getRequestStatus = (status) => {
        switch (status) {
          case 0:
            return 3;
          case 1:
            return 2;
          case 2:
            return 1;
          case 3:
            return 4;
          case 4:
            return 2;
          case 5:
            return 1;

          default:
            return null;
        }
      };
      return new Promise(async (resolve, reject) => {
        try {
          let requestUrl = `${currentContractProperties.scanURL}/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=desc&apikey=${currentContractProperties.API_KEY}`;
          let bscScanResult = await contractProvider.getAbi(requestUrl);
          let depositData = bscScanResult?.result
            ?.filter(
              (item) =>
                item.from.toLowerCase() == address.toLowerCase() &&
                item.to.toLowerCase() ==
                  currentContractProperties.reactiveContractAddress.toLowerCase()
            )
            .map((item, index) => ({
              time: moment.unix(item.timeStamp),
              currency: item.tokenSymbol,
              price: parseInt(item.value) / 1e18,
              status: item.blockNumber ? 1 : 2,
              timestamp: Number(item.timeStamp),
            }));
          let withdrawData = bscScanResult?.result
            ?.filter(
              (item) =>
                item.from.toLowerCase() ==
                  currentContractProperties.reactiveContractAddress.toLowerCase() &&
                item.to.toLowerCase() == address.toLowerCase()
            )
            .map((item, index) => ({
              time: moment.unix(item.timeStamp),
              currency: item.tokenSymbol,
              price: parseInt(item.value) / 1e18,
              status: item.blockNumber ? 1 : 2,
              timestamp: Number(item.timeStamp),
            }));
          let purchase = await buyer.getListSentRequests();
          let purchaseData = purchase.map((item, index) => ({
            time: moment.unix(item.createdAt),
            data: item.dataCid,
            price: item?.tokenAmount?.hexToDecimal(),
            status: getRequestStatus(item.status),
            timestamp: moment.unix(item.createdAt).unix(),
          }));
          let sales = await owner.getListReceivedRequests();
          let salesData = sales.map((item, index) => ({
            time: moment.unix(item.createdAt),
            data: item.dataCid,
            price: item?.tokenAmount?.hexToDecimal(),
            status: getRequestStatus(item.status),
            timestamp: moment.unix(item.createdAt).unix(),
          }));

          dispatch.datasharing.updateData({
            depositData,
            withdrawData,
            purchaseData,
            salesData,
          });
          resolve({ depositData, withdrawData, purchaseData, salesData });
        } catch (error) {
          reject(error);
        }
      });
    },

    getStatisticData: () => {
      let currentContractProperties =
        getState()?.contracts?.currentContractProperties;
      const buyer = getState()?.datasharing?.buyer;
      let requestUrl = `${currentContractProperties.scanURL}/api?module=account&action=txlist&address=${currentContractProperties.reactiveContractAddress}&startblock=0&endblock=999999999&sort=desc&apikey=${currentContractProperties.API_KEY}`;
      let countUrl = `${currentContractProperties.intergrationServer}/api/public/user/count-active`;
      return new Promise(async (resolve, reject) => {
        try {
          let bscScanResult = await contractProvider.getAbi(requestUrl);
          let listing =
            await buyer?.blockchainService?.marketContract?.getAllData();
          let startTime = moment().startOf("day");
          let endTime = moment().endOf("day");
          let countUser = await contractProvider.getAbi(countUrl);

          dispatch.datasharing.updateData({
            totalTransaction: bscScanResult?.result?.filter(
              (item) =>
                moment.unix(item.timeStamp) <= endTime &&
                moment.unix(item.timeStamp) >= startTime
            )?.length,
            totalUser: countUser?.totalActiveUser,
            totalListedData: listing?.length,
          });
          resolve({
            totalTransaction: bscScanResult?.result?.filter(
              (item) =>
                moment.unix(item.timeStamp) <= endTime &&
                moment.unix(item.timeStamp) >= startTime
            )?.length,
            totalUser: countUser.totalActiveUser,
            totalListedData: listing?.length,
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    updatePrice: ({ id, newTokenAmount }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          const signer = getState()?.contracts?.signer;

          let data = await owner.blockchainService.marketContract
            .connect(signer)
            .getDataInfo(id);
          let res = await owner.blockchainService.marketContract
            .connect(signer)
            .updateData(id, data.hashKey, newTokenAmount);
          resolve(res?.wait());
        } catch (err) {
          reject(err);
        }
      });
    },

    getDataInfo: ({ dataOwner, cid }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.datasharing?.owner;
          const signer = getState()?.contracts?.signer;

          let data = await owner.blockchainService.marketContract
            .connect(signer)
            .getListData(dataOwner);
          dispatch.datasharing.updateData({
            dataInfo: data.find((item) => item.dataCid == cid),
          });
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    },
    getNotification: async () => {
      try {
        const buyer = getState()?.datasharing?.buyer;
        const owner = getState()?.datasharing?.owner;
        let notifications = [];
        let receiveRequests = await owner.getListReceivedRequests();
        let sentRequests = await buyer.getListSentRequests();
        for (let index = 0; index < receiveRequests?.length; index++) {
          let item = receiveRequests[index];
          if (item.status == 2) {
            notifications.push({
              title: "New request access",
              // content
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    getStatusByOwnerAndCid: async ({ owner, cid }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const buyer = getState()?.datasharing?.buyer;

          let allRequestReceived =
            await buyer?.blockchainService?.sharingDataContract?.getListReceivedRequests(
              owner
            );
          resolve({
            d0: allRequestReceived?.find(
              (item) => item.status == 0 && cid == item.dataCid // 0 mean request is not response
            ),
            d1: allRequestReceived?.find(
              (item) => item.status == 1 && cid == item.dataCid // 1 mean request is declined
            ),
            d2: allRequestReceived?.find(
              (item) => item.status == 2 && cid == item.dataCid // 2 mean request is accepted
            ),
            d3: allRequestReceived?.find(
              (item) => item.status == 3 && cid == item.dataCid // 3 mean response is accused successfully
            ),
            d4: allRequestReceived?.find(
              (item) => item.status == 4 && cid == item.dataCid // 4 mean response time expired
            ),
            d5: allRequestReceived?.find(
              (item) => item.status == 5 && cid == item.dataCid // 5 mean accuse time expired
            ),
            grantData: allRequestReceived?.find(
              (item) => [2, 5].includes(item.status) && cid == item.dataCid // 0 mean request is not response
            ),
          });
        } catch (error) {
          reject(error);
        }
      });
    },
  }),
};

export default datasharingObj;
