import DatahubNotificationsProvider from "@data-access/datahub-notifications-provider";
import storeInstance from "../store-instance";

const storeName = "datahubNotifications";

const datahubNotifications = {
  ...storeInstance({
    fetchProvider: DatahubNotificationsProvider,
    storeName: storeName,
    initStore: {
      numUnread: null,
    },
    customEffect: ({ dispatch }) => ({
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
        urlParams.append("network", state?.contracts?.chainId);
        return new Promise((resolve, reject) => {
          DatahubNotificationsProvider.search(urlParams)
            .then((res) => {
              if (res && res?.data?.code === 200 && res?.data?.data) {
                dispatch[storeName].updateData({
                  listData: res?.data?.data,
                  totalElements: res?.data?.totalElements,
                  numUnread: res?.data?.unreadNoti,
                });
              }
              resolve(res);
            })
            .catch((err) => reject(err));
        });
      },
      create: (payload, state) => {
        const callApi = DatahubNotificationsProvider.create;
        return new Promise((resolve, reject) => {
          callApi({ ...payload, network: state?.contracts?.chainId })
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
    }),
  }),
};

export default datahubNotifications;
