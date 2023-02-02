import { io } from "socket.io-client";

const ws = {
  state: {
    wsClient: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    initWsClient: ({ path, auth, query }) => {
      const wsClient = io(path, {
        reconnectionDelayMax: 10000,
        auth,
        query,
      });
      
    },
  }),
};

export default ws;
