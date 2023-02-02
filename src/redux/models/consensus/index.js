import ConsensusService from "@pack/ConsensusService";

export default {
  state: {
    consensusService: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    initConsensusService: (payload = {}, state) => {
      return new Promise(async(resolve, reject) => {
        try {
          let signer = state.contracts.signer;
          let { adminManagement, voteFactory, campaignManagement } =
            state.contracts.currentContractProperties;

          let consensusService = await ConsensusService.init(
            signer,
            adminManagement,
            voteFactory,
            campaignManagement
          );
          dispatch.consensus.updateData({ consensusService });
          resolve(consensusService);
        } catch (error) {
          reject(error);
        }
      });
    },
  }),
};
