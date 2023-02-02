import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import storeInstance from "../store-instance";

const storeName = "datahub";

const datahub = {
  ...storeInstance({
    fetchProvider: DatahubAssetProvider,
    storeName: storeName,
    initStore: {
      collected: {},
      liked: {},
      history: {},
      tradingStatus: null,
      params: {
        page: 0,
        size: 12,
      },
      statisticParams: {
        owner: null,
      },
      type: 1,
      listDataFromBC: [],
    },
    customEffect: ({ dispatch }) => ({
      setAmountDeposit: ({ amount }) => {
        dispatch.datahub.updateData({ amountDeposit: amount });
      },
      getStatisticAsset: (payload = {}, state) => {
        const newStatisticParams = {
          ...state[storeName].statisticPrams,
          ...payload,
        };
        dispatch[storeName].updateData({
          statisticPrams: newStatisticParams,
        });
        newStatisticParams.network = state?.contracts?.chainId;
        return new Promise((resolve, reject) => {
          DatahubAssetProvider.statistic(newStatisticParams)
            .then((res) => {
              if (res && res?.data?.code === 200 && res?.data?.data) {
                dispatch[storeName].updateData({
                  statisticData: res?.data?.data,
                });
              }
            })
            .catch((err) => reject(err));
        });
      },
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
          DatahubAssetProvider.search(urlParams)
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
    }),
  }),
};

export default datahub;
