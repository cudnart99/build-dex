import { getState } from "@redux";

const dex = {
  state: {
    activeTabDoc: "sub1",
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    jumpToDocument: (activeTabDoc) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch.dex.updateData({
            activeTabDoc: activeTabDoc,
          });
          resolve({ activeTabDoc });
        } catch (err) {
          reject(err);
        }
      });
    },
  }),
};

export default dex;
