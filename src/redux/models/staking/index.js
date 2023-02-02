import { getState } from "@redux";
import { ethers } from "ethers";
import moment from "moment";
import stakingABI from "./abj";
import flexibleStakingABI from "./flexibleAPI";
import { applyDecimals } from "@utils";
import { dataStaking, stepSummary } from "@pages/trade/staking/config";
import { refLoading } from "@src";

const staking = {
  state: {
    allowance: 0,
    // stakeSuccess: false,
    claimSuccess: false,
    amountStake: 0,
    aprStake: 0,
    received: 0,
    tableType: 0,
    refresh: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    initStaking: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let currentContractProperties =
            getState()?.contracts?.currentContractProperties;
          let web3Provider = getState()?.contracts?.web3Provider;
          let signer = getState()?.contracts?.signer;
          let currentAddress = currentContractProperties?.stakingAddress;

          if (currentAddress) {
            let stakingContract = new ethers.Contract(
              currentAddress,
              stakingABI,
              web3Provider
            );
            let stakingContractWithSigner = stakingContract.connect(signer);
            dispatch.staking.updateData({
              stakingContractWithSigner,
              currentAddress,
            });
            console.log("đã init staking contract");
            resolve({
              stakingContractWithSigner,
              currentAddress,
            });
          } else {
            reject(false);
          }
        } catch (err) {
          reject(err);
        }
      });
    },

    initFlexibleStaking: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let currentContractProperties =
            getState()?.contracts?.currentContractProperties;
          let web3Provider = getState()?.contracts?.web3Provider;
          let signer = getState()?.contracts?.signer;
          let currentFlexibleAddress =
            currentContractProperties?.flexibleStakingAddress;

          if (currentFlexibleAddress) {
            let stakingFlexibleContract = new ethers.Contract(
              currentFlexibleAddress,
              flexibleStakingABI,
              web3Provider
            );
            let stakingFlexibleContractWithSigner =
              stakingFlexibleContract.connect(signer);
            dispatch.staking.updateData({
              stakingFlexibleContractWithSigner,
              currentFlexibleAddress,
            });
            console.log("đã init staking flexible contract");
            resolve({
              stakingFlexibleContractWithSigner,
              currentFlexibleAddress,
            });
          } else {
            reject(false);
          }
        } catch (err) {
          reject(err);
        }
      });
    },

    getPoolCoinData: async () => {
      const stakingContractWithSigner =
        getState()?.staking?.stakingContractWithSigner;
      const bonusWillPay = await stakingContractWithSigner.bonusWillPay();
      console.log(bonusWillPay, "bonusWillPay");
      const dateAndRate = await stakingContractWithSigner.date;
      console.log(dateAndRate, "dateAndRate");
      return new Promise((resolve, reject) => {
        stakingContractWithSigner
          .viewMaxRewardPool()
          .then((value) => {
            dispatch.staking.updateData({
              maxRewardPool: value?.hexToDecimal(),
              balanceStakingPool:
                value?.hexToDecimal() + bonusWillPay?.hexToDecimal(),
            });
            resolve(value);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getTotalRewardPoolFlexible: async () => {
      const stakingFlexibleContractWithSigner =
        getState()?.staking?.stakingFlexibleContractWithSigner;
      return new Promise((resolve, reject) => {
        stakingFlexibleContractWithSigner
          .getTotalRewardPool()
          .then((value) => {
            dispatch.staking.updateData({
              totalRewardPoolFlexible: value?.hexToDecimal(),
            });
            resolve(value);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    viewAmountBonusCurrent: async ({ IDStake }) => {
      const stakingContractWithSigner =
        getState()?.staking?.stakingContractWithSigner;
      let addressOwner = await getState()?.contracts?.signer?.getAddress();

      return new Promise((resolve, reject) => {
        stakingContractWithSigner
          .viewAmountBonusCurrent(addressOwner, IDStake)
          .then((bonus) => {
            console.log(bonus?.hexToDecimal(), "bonus");
            dispatch.staking.updateData({
              bonus: bonus?.hexToDecimal(),
            });
            resolve(bonus);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    viewAmountBonusCurrentFlexible: async ({ IDStake }) => {
      const stakingFlexibleContractWithSigner =
        getState()?.staking?.stakingFlexibleContractWithSigner;
      let addressOwner = await getState()?.contracts?.signer?.getAddress();
      return new Promise((resolve, reject) => {
        stakingFlexibleContractWithSigner
          .viewAmountBonusCurrent(addressOwner, IDStake)
          .then((bonus) => {
            console.log(bonus?.hexToDecimal(), "bonus flexible");
            dispatch.staking.updateData({
              rewardFlexible: bonus?.hexToDecimal(),
            });
            resolve(bonus);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAllStakeUser: async () => {
      console.log(moment().format("DD-MM-YYYY HH:mm:ss"), "date now123");
      const stakingContractWithSigner =
        getState()?.staking?.stakingContractWithSigner;
      let addressOwner = await getState()?.contracts?.signer?.getAddress();
      const stakingFlexibleContractWithSigner =
        getState()?.staking?.stakingFlexibleContractWithSigner;

      const promise1 = new Promise((resolve, reject) => {
        stakingContractWithSigner
          .getAllStakeUser(addressOwner)
          .then((res) => {
            console.log(res, "all stake user");
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      const promise2 = new Promise((resolve, reject) => {
        stakingFlexibleContractWithSigner
          .showListStakeUser(addressOwner)
          .then((res) => {
            console.log(res, "showListStakeUser");
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // refLoading.current && refLoading.current.show();
      Promise.all([promise1, promise2]).then((values) => {
        console.log(values, "values123");
        let dataUser = [];
        values[0].map(async (item, index) => {
          // item[3] là rate của stake này
          let newText = " ";
          let newApr = 0;
          let newEndDateUnix =
            parseInt(item[1].hexToDecimal() * Math.pow(10, 18)) +
            parseInt(item[2].hexToDecimal() * Math.pow(10, 18));

          await dispatch.staking.viewAmountBonusCurrent({
            IDStake: item[4].toString(),
          });

          var bonus = await getState()?.staking?.bonus;

          console.log(bonus, "bonus in ra");

          var newStatus = 0;
          if (moment().unix() - newEndDateUnix >= 0) {
            newStatus = 1;
          } else if (bonus !== 0) {
            newStatus = 2;
          } else {
            newStatus = 0;
          }
          // thay data ở đây
          switch (parseInt(item[2].toString())) {
            case 180:
              newText = "3 minutes";
              newApr = 3;
              break;
            case 360:
              newText = "6 minutes";
              newApr = 6.3;
              break;
            case 540:
              newText = "9 minutes";
              newApr = 9.6;
              break;
            default:
              newText = "";
              newApr = 0;
          }

          let newObj = {
            nameCoin: `${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
            stakeTime: {
              text: newText,
              type: parseInt(item[2].toString()),
              apr: newApr,
            },
            stakeDate: moment
              .unix(item[1].hexToDecimal() * Math.pow(10, 18))
              .format("DD-MM-YYYY HH:mm:ss"),
            endDate: moment.unix(newEndDateUnix)?.format("DD-MM-YYYY HH:mm:ss"),
            yourBalance: item[0].hexToDecimal(),
            reward: item[6].hexToDecimal(),
            status: newStatus,
            IDStake: item[4].toString(),
            tokenCanClaimed: bonus,
          };
          dataUser.push(newObj);
        });
        values[1].map(async (item, index) => {
          await dispatch.staking.viewAmountBonusCurrentFlexible({
            IDStake: item[4].toString(),
          });

          var rewardFlexible = await getState()?.staking?.rewardFlexible;
          var newStatus = 0;
          if (rewardFlexible) {
            newStatus = 1;
          }
          console.log(moment().unix(), "moment now");
          console.log(item[2].hexToDecimal() * Math.pow(10, 18), "moment item");

          const temp1 = Math.floor(
            (moment().unix() - item[2].hexToDecimal() * Math.pow(10, 18)) /
              stepSummary
          );
          const tempReward =
            temp1 *
            item[1].hexToDecimal() *
            Math.pow(10, 9) *
            item[0].hexToDecimal();

          let newObj = {
            nameCoin: `${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
            stakeTime: {
              text: "Flexible",
              type: "Flexible",
              apr: item[1].hexToDecimal() * Math.pow(10, 11),
            },
            stakeDate: moment
              .unix(item[2].hexToDecimal() * Math.pow(10, 18))
              .format("DD-MM-YYYY HH:mm:ss"),
            endDate: "---",
            yourBalance: item[0].hexToDecimal(),
            reward: tempReward,
            status: newStatus,
            IDStake: item[4].toString(),
            tokenCanClaimed: rewardFlexible,
          };
          dataUser.push(newObj);
        });
        dispatch.staking.updateData({
          allData: dataUser,
        });
      });
      // .finally(() => {
      //   refLoading.current && refLoading.current.hide();
      // });
    },
    showListStakeUserFlexible: async () => {
      const stakingFlexibleContractWithSigner =
        getState()?.staking?.stakingFlexibleContractWithSigner;
      let addressOwner = await getState()?.contracts?.signer?.getAddress();
      return new Promise((resolve, reject) => {
        stakingFlexibleContractWithSigner
          .showListStakeUser(addressOwner)
          .then((res) => {
            console.log(res, "showListStakeUser");
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    approve: async (amount) => {
      let erc20 = getState()?.contracts?.erc20;
      let stakingAddress =
        getState()?.contracts?.currentContractProperties?.stakingAddress;
      const amountToApprove = applyDecimals(parseInt(amount), 18, "positive");
      let addressOwner = await getState()?.contracts?.signer?.getAddress();
      return new Promise((resolve, reject) => {
        erc20
          .approve(stakingAddress, amountToApprove)
          .then((res) => {
            resolve(res.wait());
            console.log(res, "res của approve");
            // erc20.on("Approval", (owner, spender, amount) => {
            //   if (addressOwner === owner && spender === stakingAddress) {
            //     dispatch.staking.updateData({
            //       allowance: amount.hexToDecimal(),
            //     });
            //   }
            // });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    stake: async ({ amount, duration }) => {
      console.log(duration, "duration");
      const stakingContractWithSigner =
        getState()?.staking?.stakingContractWithSigner;
      console.log(parseInt(amount), parseInt(duration), "123");
      const amountToStake = applyDecimals(parseInt(amount), 18, "positive");
      const _duration = parseInt(duration);
      let newStartDate = moment().format("DD-MM-YYYY HH:mm:ss a");
      let newEndDate = moment
        .unix(moment().unix() + _duration)
        .format("DD-MM-YYYY HH:mm:ss a");
      let newApr = 0;

      switch (_duration) {
        case 180:
          newApr = 3;
          break;
        case 360:
          newApr = 6.3;
          break;
        case 540:
          newApr = 9.6;
          break;
        default:
          newApr = 0;
      }

      return new Promise((resolve, reject) => {
        // const dateStake = moment();
        stakingContractWithSigner
          .stake(amountToStake, _duration)
          .then((res) => {
            resolve(res.wait());
            dispatch.staking.updateData({
              // stakeSuccess: true,
              amountStake: parseInt(amount),
              aprStake: newApr,
              startDate: newStartDate,
              endDate: newEndDate,
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    approveFlexible: async (amount) => {
      let erc20 = getState()?.contracts?.erc20;
      let flexibleStakingAddress =
        getState()?.contracts?.currentContractProperties
          ?.flexibleStakingAddress;
      const amountToApprove = applyDecimals(parseInt(amount), 18, "positive");
      return new Promise((resolve, reject) => {
        erc20
          .approve(flexibleStakingAddress, amountToApprove)
          .then((res) => {
            resolve(res.wait());
            console.log(res, "res của approve");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    stakeFlexible: async ({ amount }) => {
      const stakingFlexibleContractWithSigner =
        getState()?.staking?.stakingFlexibleContractWithSigner;
      const amountToStake = applyDecimals(parseInt(amount), 18, "positive");
      let newStartDate = moment().format("DD-MM-YYYY HH:mm:ss a");

      return new Promise((resolve, reject) => {
        // const dateStake = moment();
        stakingFlexibleContractWithSigner
          .stakeToken(amountToStake)
          .then((res) => {
            resolve(res.wait());
            dispatch.staking.updateData({
              // stakeSuccess: true,
              amountStake: parseInt(amount),
              aprStake: dataStaking[0].apr,
              startDate: newStartDate,
              // endDate: newEndDate,
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    claimReward: async ({ IDStake, receivedClaim }) => {
      const stakingContractWithSigner =
        getState()?.staking?.stakingContractWithSigner;
      return new Promise((resolve, reject) => {
        stakingContractWithSigner
          .claimReward(IDStake)
          .then((res) => {
            resolve(res.wait());
            stakingContractWithSigner.on(
              "ClaimReward",
              (address, amount, ID) => {
                console.log(address, amount, ID, "claimreward");
                dispatch.staking.updateData({
                  claimSuccess: true,
                  receivedClaim: receivedClaim,
                });
              }
            );
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    claimRewardFlexible: async ({ IDStake }) => {
      const stakingFlexibleContractWithSigner =
        getState()?.staking?.stakingFlexibleContractWithSigner;
      return new Promise((resolve, reject) => {
        stakingFlexibleContractWithSigner
          .claimReward(IDStake)
          .then((res) => {
            resolve(res.wait());
            stakingFlexibleContractWithSigner.on(
              "ClaimReward",
              (address, amount, ID) => {
                console.log(address, amount, ID, "claimreward");
                dispatch.staking.updateData({
                  claimSuccess: true,
                });
              }
            );
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    withdrawTokenStake: async ({ IDStake, receivedRedeem, receivedClaim }) => {
      const stakingContractWithSigner =
        getState()?.staking?.stakingContractWithSigner;
      return new Promise((resolve, reject) => {
        stakingContractWithSigner
          .withdrawTokenStake(IDStake)
          .then((res) => {
            resolve(res.wait());
            stakingContractWithSigner.on(
              "WithdrawTokenStake",
              (address, amount, ID) => {
                console.log(address, amount, ID, "WithdrawTokenStake");
                dispatch.staking.updateData({
                  claimSuccess: true,
                  receivedRedeem: receivedRedeem,
                  receivedClaim: receivedClaim,
                });
              }
            );
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    withdrawTokenStakeFlexible: async ({
      IDStake,
      // receivedRedeem,
      // receivedClaim,
    }) => {
      const stakingFlexibleContractWithSigner =
        getState()?.staking?.stakingFlexibleContractWithSigner;
      return new Promise((resolve, reject) => {
        stakingFlexibleContractWithSigner
          .withdrawTokenStake(IDStake)
          .then((res) => {
            resolve(res.wait());
            stakingFlexibleContractWithSigner.on(
              "WithdrawTokenStake",
              (address, amount, ID) => {
                console.log(address, amount, ID, "WithdrawTokenStake");
                dispatch.staking.updateData({
                  claimSuccess: true,
                  // receivedRedeem: receivedRedeem,
                  // receivedClaim: receivedClaim,
                });
              }
            );
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    switchTable: ({ type }) => {
      dispatch.staking.updateData({
        tableType: type,
      });
    },
    refreshData: () => {
      let refreshTool = getState()?.staking?.refresh;
      dispatch.staking.updateData({
        refresh: !refreshTool,
      });
    },

    // successOff: () => {
    //   dispatch.staking.updateData({
    //     stakeSuccess: false,
    //   });
    // },

    successClaimOff: () => {
      dispatch.staking.updateData({
        claimSuccess: false,
      });
    },
    failClaimOff: () => {
      dispatch.staking.updateData({
        claimFail: false,
      });
    },

    // stakingContractWithSigner
    // .stake(12, 180)
    // .then((res) => {
    //   resolve(res.wait());
    // })
    // .catch((err) => {
    //   reject(err);
    // });
  }),
};

export default staking;
