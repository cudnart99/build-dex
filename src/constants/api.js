const PREFIX = "/api";

const API_VAR = {
  ASSET: PREFIX + "/asset",
  LIKED: PREFIX + "/liked",
  KEYWORD: PREFIX + "/keyword",
  AI: PREFIX + "/v1/brain-tumor",
  SPINE: "/spinefracture/",
  NOTIFICATIONS: PREFIX + "/notifications",
  USERS: PREFIX + "/datahub-user",
};

export const API_ROUTE = {
  ASSET: {
    UPDATE_VIEWS: "/asset-views-update",
    STATISTIC: "/statistic",
  },
  NOTIFICATIONS: {
    READ_ALL: "/read-all",
    DELETE_ALL: "/delete-all",

  },
};

export default API_VAR;
