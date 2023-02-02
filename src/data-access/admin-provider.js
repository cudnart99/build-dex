import clientUtils from "@utils/client-utils";
import baseProvider from "./base-provider";
const baseUrl = "/admin";
const adminProvider = {
  ...baseProvider(baseUrl),
  login({ network, address }) {
    let url = `${baseUrl}/login`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "POST",
          url,
          isUseServiceUrl: true,
          body: { network, address },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
};

export default adminProvider;
