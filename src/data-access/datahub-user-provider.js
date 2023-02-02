import API_VAR, { API_ROUTE } from "@constants/api";
import axiosBaseProvider from "./axios-base-provider";
import axiosUtils from "@utils/datahub-axios-utils";

const DatahubUserProvider = {
  ...axiosBaseProvider(API_VAR.USERS),
};

export default DatahubUserProvider;
