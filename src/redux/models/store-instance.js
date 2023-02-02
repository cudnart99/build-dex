import { notification } from "antd";

const storeInstance = ({
  storeName,
  fetchProvider,
  initStore = { listData: [] },
  customEffect = () => ({}),
}) => ({
  state: {
    listData: [],
    totalElements: 0,
    params: { page: 0, size: 10 },
    ...initStore,
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
    search: (payload = {}, state) => {
      let urlParams = new URLSearchParams();
      const newParams = { ...state[storeName].params, ...payload };
      dispatch[storeName].updateData({
        params: newParams,
      });

      for (let [key, value] of Object.entries(newParams)) {
        if (key === "sort") {
          for (let item of value) {
            urlParams.append("sort", item);
          }
        } else if (value || String(value) === "0") {
          urlParams.append(key, value);
        }
      }

      return new Promise((resolve, reject) => {
        fetchProvider
          .search(urlParams)
          .then((res) => {
            if (res && res?.data?.code === 200 && res?.data?.data) {
              dispatch[storeName].updateData({
                listData: res?.data?.data,
                totalElements: res?.data?.totalElements,
              });
            }
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    create: (payload) => {
      const callApi = payload?.id ? fetchProvider.update : fetchProvider.create;
      return new Promise((resolve, reject) => {
        callApi(payload, payload?.id)
          .then((res) => {
            if (
              res &&
              [201, 200].includes(res?.data?.code) &&
              res?.data?.data
            ) {
              dispatch[storeName].search();
            } else if (res && res?.data?.code === 401) {
              //   window.location.href = ROUTE_PREFIX;
            } else {
              throw new Error(res?.data?.message);
            }
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    delete: (payload, state) => {
      return new Promise((resolve, reject) => {
        fetchProvider
          .delete(payload)
          .then((res) => {
            if (res && res?.data?.code === 200) {
              dispatch[storeName].search();
            } else if (res && res?.data?.code === 401) {
              //   window.location.hred = ROUTE_PREFIX;
            } else {
              notification.error({
                message: "Error",
                description: res?.data?.message,
              });
            }
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    patch: (payload) => {
      const callApi = payload?.id ? fetchProvider.patch : fetchProvider.create;
      const id = payload?.id;
      delete payload.id;

      return new Promise((resolve, reject) => {
        callApi(id, payload)
          .then((res) => {
            if (res && res?.data?.code === 200 && res?.data?.data) {
              dispatch[storeName].search();
            } else if (res && res?.data?.code === 401) {
              //   window.location.href = ROUTE_PREFIX;
            } else {
              notification.error({
                message: "Path error",
                description: res?.data?.message,
              });
            }
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    createMany: (payload) => {
      const callApi = fetchProvider.createMany;
      return new Promise((resolve, reject) => {
        callApi(payload)
          .then((res) => {
            if (res && res?.data?.code === 200 && res?.data?.data) {
              dispatch[storeName].search();
            } else if (res && res?.data?.code === 401) {
              //   window.location.href = ROUTE_PREFIX;
            } else {
              throw new Error(res?.data?.message);
            }
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    setParams: (payload, state) => {
      const newParams = { ...state[storeName].params, ...payload };
      dispatch[storeName].updateData({
        params: newParams,
      });
    },
    ...customEffect({ dispatch }),
  }),
});

export default storeInstance;
