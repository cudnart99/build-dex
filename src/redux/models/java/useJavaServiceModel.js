import baseProvider from "@data-access/base-provider";
import { notification } from "antd";
const useJavaServiceInstance = ({
  model, //required
  provider, //required
  initState = {}, //optional
  additionEffect = () => {}, //optional
}) => {
  if (!model || !provider) {
    throw new Error("Model and provider are required");
  }

  let baseProviderKeys = Object.keys(baseProvider());
  let providerKeys = Object.keys(provider);
  let isValidProvider = baseProviderKeys.every((providerKey) =>
    providerKeys.includes(providerKey)
  );
  if (!isValidProvider) {
    throw new Error("Not support provider");
  }
  return {
    state: {
      params: { page: 0, size: 10 },
      data: [],
      totalElements: 0,
      ...initState,
    },
    reducers: {
      updateData(state, payload = {}) {
        return { ...state, ...payload };
      },
    },
    effects: (dispatch) => ({
      create: (body) => {
        return new Promise((resolve, reject) => {
          provider
            ?.create(body)
            .then((res) => {
              if (res.code === 0) {
                dispatch[model].updateData({ newRecord: res?.data });
              } else {
                notification.error({
                  message: "Error",
                  description: res?.message,
                });
              }
              resolve(res);
            })
            .catch((err) => {
              reject(err);
              notification.error({
                message: "Error",
                description: JSON.stringify(err),
              });
            });
        });
      },
      update: (id, body) => {
        return new Promise((resolve, reject) => {
          provider
            ?.update(id, body)
            .then((res) => {
              if (res.code === 0) {
                dispatch[model].updateData({ latestUpdate: res?.data });
              } else {
                notification.error({
                  message: "Error",
                  description: res?.message,
                });
              }
              resolve(res);
            })
            .catch((err) => {
              reject(err);
              notification.error({
                message: "Error",
                description: JSON.stringify(err),
              });
            });
        });
      },
      patch: (id, body) => {
        return new Promise((resolve, reject) => {
          provider
            ?.patch(id, body)
            .then((res) => {
              if (res.code === 0) {
                dispatch[model].updateData({ latestPatch: res?.data });
              } else {
                notification.error({
                  message: "Error",
                  description: res?.message,
                });
              }
              resolve(res);
            })
            .catch((err) => {
              reject(err);
              notification.error({
                message: "Error",
                description: JSON.stringify(err),
              });
            });
        });
      },
      createMultiple: (body) => {
        return new Promise((resolve, reject) => {
          provider
            ?.create(body)
            .then((res) => {
              if (res.code === 0) {
                dispatch[model].updateData({ newListRecord: res?.data });
              } else {
                notification.error({
                  message: "Error",
                  description: res?.message,
                });
              }
              resolve(res);
            })
            .catch((err) => {
              reject(err);
              notification.error({
                message: "Error",
                description: JSON.stringify(err),
              });
            });
        });
      },
      getMultiple: (_, store) => {
        const params = store[model].params;
        return new Promise((resolve, reject) => {
          provider
            ?.getMultiple(params)
            .then((res) => {
              if (res.code === 0) {
                dispatch[model].updateData({
                  data: res?.data,
                  totalElements: res?.totalElements,
                });
              } else {
                notification.error({
                  message: "Error",
                  description: res?.message,
                });
              }
              resolve(res);
            })
            .catch((err) => {
              reject(err);
              notification.error({
                message: "Error",
                description: JSON.stringify(err),
              });
            });
        });
      },
      getDetail: (id) => {
        return new Promise((resolve, reject) => {
          provider
            ?.getDetail(id)
            .then((res) => {
              if (res.code === 0) {
                dispatch[model].updateData({ detailRecord: res?.data });
              } else {
                notification.error({
                  message: "Error",
                  description: res?.message,
                });
              }
              resolve(res);
            })
            .catch((err) => {
              reject(err);
              notification.error({
                message: "Error",
                description: JSON.stringify(err),
              });
            });
        });
      },
      delete: (id) => {
        return new Promise((resolve, reject) => {
          provider
            ?.delete(id)
            .then((res) => {
              if (res.code === 0) {
                dispatch[model].updateData({ latestDelete: res?.data });
              } else {
                notification.error({
                  message: "Error",
                  description: res?.message,
                });
              }
              resolve(res);
            })
            .catch((err) => {
              reject(err);
              notification.error({
                message: "Error",
                description: JSON.stringify(err),
              });
            });
        });
      },
      deleteMultiple: (ids) => {
        return new Promise((resolve, reject) => {
          provider
            ?.deleteMultiple(ids)
            .then((res) => {
              if (res.code === 0) {
                dispatch[model].updateData({ latestListDelete: res?.data });
              } else {
                notification.error({
                  message: "Error",
                  description: res?.message,
                });
              }
              resolve(res);
            })
            .catch((err) => {
              reject(err);
              notification.error({
                message: "Error",
                description: JSON.stringify(err),
              });
            });
        });
      },
      setParams: (newParams = {}, state) => {
        const oldParams = state[model].params;
        dispatch[model].updateData({ params: { ...oldParams, ...newParams } });
      },
      ...additionEffect({ dispatch }),
    }),
  };
};
export default useJavaServiceInstance;
