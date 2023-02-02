import storeInstance from "../store-instance";
import datahubUsersProvider from "@data-access/datahub-user-provider";

const storeName = "datahubUsers";

const datahubUsers = {
  ...storeInstance({
    fetchProvider: datahubUsersProvider,
    storeName: storeName,
    initStore: {
      currentUser: null,
    },
    customEffect: ({ dispatch }) => ({
      create: (payload) => {
        const callApi = datahubUsersProvider.create;
        return new Promise((resolve, reject) => {
          callApi(payload, payload?.id)
            .then((res) => {
              if (
                res &&
                [201, 200].includes(res?.data?.code) &&
                res?.data?.data
              ) {
                dispatch[storeName].updateData({
                  currentUser: res?.data?.data,
                });
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

export default datahubUsers;
