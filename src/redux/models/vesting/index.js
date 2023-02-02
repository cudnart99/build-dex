import { toDecimal } from "@utils/index";
import { ethers } from "ethers";
import { isEmpty } from "lodash";
import moment from "moment-timezone";
import { getState } from "../../index";
import { LIST_SMC_ADDRESS } from "./config";
import { VESTING_ABI, VESTING_OWNERSHIP_ABI } from "./VestingABI";
const exportObject = {
  state: {
    timeLockWithSigner: null,
    page: 1,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    init: () => {
      let web3Provider = getState()?.contracts?.web3Provider;
      let currentContractProperties =
        getState()?.contracts?.currentContractProperties;
      let signer = getState()?.contracts?.signer;

      let timeLock = new ethers.Contract(
        currentContractProperties.vestingAddress,
        VESTING_ABI,
        web3Provider
      );

      let timeLockWithSigner = timeLock.connect(signer);
      const getInvestors = async () => {
        let investors = await timeLockWithSigner.getInvestors();
        dispatch.vesting.updateData({
          investors: investors.map((item) => ({ address: item })),
        });
      };
      getInvestors();

      timeLockWithSigner.on("AddInvestors", () => {
        getInvestors();
      });
      dispatch.vesting.updateData({
        timeLockWithSigner,
      });
    },
    getAllSmartContract: () => {
      return new Promise((resolve, reject) => {
        let web3Provider = getState()?.contracts?.web3Provider;
        let signer = getState()?.contracts?.signer;
        let address = getState()?.contracts?.address;
        let currentContractProperties =
          getState()?.contracts?.currentContractProperties;
        let erc20 = getState()?.contracts?.erc20;

        let addressesSMC =
          LIST_SMC_ADDRESS[currentContractProperties?.name?.toLowerCase()];
        dispatch.vesting.updateData({
          show: false,
        });
        Promise.all(
          addressesSMC.map(async (item) => {
            let timeLock = new ethers.Contract(
              item,
              VESTING_OWNERSHIP_ABI,
              web3Provider
            );

            let timeLockWithSigner = timeLock.connect(signer);
            let owner = await timeLockWithSigner.owner();
            let thisBalance = await erc20.balanceOf(item);
            return {
              owner,
              timeLockWithSigner,
              smcAddress: item,
              thisBalance,
              allow: !thisBalance.eq(ethers.BigNumber.from("0")),
            };
          })
        )
          .then(async (res = []) => {
            const convertChartData = (dataChart = []) => {
              return dataChart?.map((item, index) => {
                let publicAmount = item?.publicAmount?.hexToDecimal();
                let privateAmount = item?.privateAmount?.hexToDecimal();
                return {
                  amountPrivate: privateAmount,
                  amountSeed: publicAmount,
                  total: publicAmount + privateAmount,
                };
              });
            };
            let arrTimeLock = res.filter((item) => item.owner === address);
            if (
              isEmpty(arrTimeLock) ||
              arrTimeLock.every((item) => !item.allow)
            ) {
              dispatch.vesting.updateData({
                currentVesting: null,
                arrTimeLock: [],
                show: false,
              });
              reject(2);
            }
            arrTimeLock = await Promise.all(
              arrTimeLock.map(async (item) => {
                let data = await item.timeLockWithSigner.getData();
                let cvData = convertChartData(data);
                return { total: cvData?.reduceByKey("total"), ...item };
              })
            );

            dispatch.vesting.updateData({
              arrTimeLock,
              currentVesting: arrTimeLock.find((item) => item.allow),
              flag: 1,
            });
            resolve(arrTimeLock);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setCurrentTime: (currentVesting) => {
      dispatch.vesting.updateData({
        currentVesting,
      });
    },

    initTimeLockOwnership: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let address = getState()?.contracts?.address;
          let currentVesting = getState()?.vesting?.currentVesting;
          if (!currentVesting || !currentVesting?.allow) {
            dispatch.vesting.updateData({
              show: false,
            });
          }
          let timeLockOwnership = currentVesting.timeLockWithSigner;

          timeLockOwnership.on(
            "ClaimTokenEvent",
            (totalTokenCanClaim, owner, currentTime) => {
              if (owner === address) {
                dispatch.contracts.getTokenBalance();
                reloadData();
              }
            }
          );
          const reloadData = async () => {
            let primitiveData = await timeLockOwnership.getData();

            let currentTime = moment().unix();

            const convertChartData = (dataChart = []) => {
              return dataChart?.map((item, index) => {
                let time = moment
                  .unix(item?.time)
                  .tz("Asia/Ho_Chi_Minh")
                  .format("DD-MM-YYYY");

                let publicAmount = item?.publicAmount?.hexToDecimal();
                let privateAmount = item?.privateAmount?.hexToDecimal();
                let newMoment = moment.unix(item.time).unix();
                return {
                  amountPrivate: privateAmount,
                  amountSeed: publicAmount,
                  date: time,
                  status:
                    publicAmount == 0 && privateAmount == 0
                      ? 4
                      : currentTime <= newMoment
                      ? 1 //"Coming soon"
                      : item.isClaimed
                      ? 2 //"Claimed"
                      : 3, //"Claimable",
                  total: publicAmount + privateAmount,
                  index,
                };
              });
            };
            let dataAfterConvert = convertChartData(primitiveData).map(
              (item) => ({ ...item })
            );
            const getDataByStatus = (status) => {
              let listFilter = dataAfterConvert.filter(
                (item) => item.status == status
              );
              let seed = listFilter?.reduceByKey("amountSeed");
              let privateAmount = listFilter?.reduceByKey("amountPrivate");
              let total = listFilter?.reduceByKey("total");

              return {
                seed,
                private: privateAmount,
                total,
              };
            };

            let pieData = [];

            pieData.push({
              name: "Claimable",
              ...getDataByStatus(3),
            });

            pieData.push({
              name: "Claimed",
              ...getDataByStatus(2),
            });

            pieData.push({
              name: "Coming soon",
              ...getDataByStatus(1),
            });
            dispatch.vesting.updateData({
              timeLockOwnerShipObj: currentVesting,
              data: dataAfterConvert,
              pieData,
              seedTokenCanClaim:
                getDataByStatus(3)?.seed + getDataByStatus(3)?.private,
              show: true,
            });
          };
          await reloadData();
          resolve(1);
        } catch (err) {
          reject(err);
        }
      });
    },
    releaseTimeLockOwnership: (amount) => {
      let timeLockWithSigner =
        getState()?.vesting?.timeLockOwnerShipObj?.timeLockWithSigner;

      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .release(amount)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    releasePublicToken: () => {
      let timeLockWithSigner =
        getState()?.vesting?.timeLockOwnerShipObj?.timeLockWithSigner;
      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .releaseAllToken()
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    transferOwnership: ({ address }) => {
      let timeLockWithSigner =
        getState()?.vesting?.timeLockOwnerShipObj?.timeLockWithSigner;
      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .transferOwnership(address)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    releasePrivateToken: () => {
      let timeLockWithSigner =
        getState()?.vesting?.timeLockOwnerShipObj?.timeLockWithSigner;
      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .releaseAllPrivateToken()
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    releasePublicTokenByIndex: (index) => {
      let timeLockWithSigner =
        getState()?.vesting?.timeLockOwnerShipObj?.timeLockWithSigner;
      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .releaseTokenByIndex(index)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    releasePrivateByIndex: (index) => {
      let timeLockWithSigner =
        getState()?.vesting?.timeLockOwnerShipObj?.timeLockWithSigner;
      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .releasePrivateTokenByIndex(index)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    addInvestor: ({ investorAddresses, amounts }) => {
      let timeLockWithSigner = getState()?.vesting?.timeLockWithSigner;
      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .addInvestor(investorAddresses, amounts)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    release: () => {
      let timeLockWithSigner = getState()?.vesting?.timeLockWithSigner;
      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .release()
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    start: () => {
      let timeLockWithSigner = getState()?.vesting?.timeLockWithSigner;
      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .start()
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    reStart: () => {
      let timeLockWithSigner = getState()?.vesting?.timeLockWithSigner;
      return new Promise((resolve, reject) => {
        timeLockWithSigner
          .reStart()
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setPage: (page) => {
      dispatch.vesting.updateData({ page });
    },
    queryAllSmartContract: () => {
      return new Promise((resolve, reject) => {
        let web3Provider = getState()?.contracts?.web3Provider;
        let signer = getState()?.contracts?.signer;
        let currentContractProperties =
          getState()?.contracts?.currentContractProperties;

        let addressesSMC =
          LIST_SMC_ADDRESS[currentContractProperties?.name?.toLowerCase()];
        let erc20 = getState()?.contracts?.erc20;

        Promise.all(
          addressesSMC.map(async (item) => {
            let timeLock = new ethers.Contract(
              item,
              VESTING_OWNERSHIP_ABI,
              web3Provider
            );

            let timeLockWithSigner = timeLock.connect(signer);
            let owner = await timeLockWithSigner.owner();

            return { owner, timeLockWithSigner, smcAddress: item };
          })
        )
          .then(async (res = []) => {
            const convertChartData = (dataChart = []) => {
              return dataChart?.map((item, index) => {
                let publicAmount = item?.publicAmount?.hexToDecimal();
                let privateAmount = item?.privateAmount?.hexToDecimal();
                let time = moment
                  .unix(item.time._hex)
                  .format("DD-MM-YYYY HH:mm:ss");
                return {
                  amountPrivate: privateAmount,
                  amountSeed: publicAmount,
                  total: publicAmount + privateAmount,
                  time,
                };
              });
            };

            res = await Promise.all(
              res.map(async (item) => {
                let data = await item.timeLockWithSigner.getData();
                let cvData = convertChartData(data);
                const balance = await erc20.balanceOf(item.smcAddress);

                return {
                  total: cvData?.reduceByKey("total"),
                  seed: cvData.map((item) => item.amountSeed),
                  private: cvData.map((item) => item.amountPrivate),
                  time: cvData.map((item) => item.time),
                  balance: toDecimal(balance),
                  ...item,
                };
              })
            );
            dispatch.vesting.updateData({
              allInvestor: res,
            });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  }),
};
export default exportObject;
