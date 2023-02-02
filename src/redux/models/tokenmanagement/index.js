import { ethers } from "ethers";
import { getState } from "../../index";
import contractData from "./TokenManagement.json";

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
    initTokenManagement: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let { web3Provider, currentContractProperties, signer, address } =
            getState()?.contracts;
          let tokenManagementContract = new ethers.Contract(
            currentContractProperties.tokenManagementAddress,
            contractData.abi,
            web3Provider
          );

          let tokenManagementContractWithSigner =
            tokenManagementContract.connect(signer);
          let isOwner = await tokenManagementContractWithSigner.isOwner(
            address
          );
          dispatch.tokenmanagement.updateData({
            isOwner,
            tokenManagementContractWithSigner,
          });
          resolve({ isOwner, tokenManagementContractWithSigner });
        } catch (error) {
          reject(error);
        }
      });
    },
  }),
};
export default exportObject;
