import API_VAR, { API_ROUTE } from "@constants/api";
import axiosBaseProvider from "./axios-base-provider";
import axiosUtils from "@utils/datahub-axios-utils";

const DatahubNotificationsProvider = {
  ...axiosBaseProvider(API_VAR.NOTIFICATIONS),
  readAll(body) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          ignoreAuth: false,
          method: "PUT",
          url: API_VAR.NOTIFICATIONS + API_ROUTE.NOTIFICATIONS.READ_ALL,
          isUseServiceUrl: true,
          data: body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },

  deleteAll(body) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          ignoreAuth: false,
          method: "DELETE",
          url: API_VAR.NOTIFICATIONS + API_ROUTE.NOTIFICATIONS.DELETE_ALL,
          isUseServiceUrl: true,
          data: body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
};

export default DatahubNotificationsProvider;
