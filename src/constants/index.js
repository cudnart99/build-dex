export const theme = {};

export const assetStatusDatamarket = {
  CANBUY: 10,
  AUCTION: 20,
  GRANTED: 30,
  REPORTED: 40,
};

export const ASSET_REQUEST_STATUS = {
  0: "Pending",
  1: "Declined",
  2: "Accepted",
  3: "Accused Successfully",
  4: "Response expired",
  5: "Accuse time expired",
};

export const getStatusByCode = (status) => {
  switch (status) {
    case 1:
      return "Listed";
    case 2:
      return "Owner";
    case 3:
      return "Granted";
    case 4:
      return "Reported";
    default:
      return "";
  }
};

export const DatahubAssetConst = {
  MEDICAL_UNIT: {
    filter: [{ label: "EMR", value: 0 }],
    mapping: {
      0: "EMR",
    },
  },
};

export const DatahubNotiStatus = {
  READ: 10,
  UNREAD: 20,
};

export const DatahubNotiTypeEnum = {
  WHEN_USER_RECEIVED_REQUEST_ACCESS_TO_DATA_BY_ANY_PURCHASER: 10,
  WHEN_RECEIVED_DATA_REPORT_RESULT: 20,
  WHEN_OWNER_REJECTED_REQUEST_ACCESS_DATA: 30,
  WHEN_OWNER_ACCEPTED_REQUEST_ACCESS_DATA: 40,
  "WHEN_THE_REPORT_RESULTS_CONFIRM_A_DATA_ERROR_(REPORT_SUCCESSFULLY)": 50,
  "WHEN_THE_REPORT_RESULTS_CONFIRM_THERE’S_NO_DATA_ERROR_(REPORT_FAILED)": 60,
  WHEN_USER_DEPOSIT_TO_SMART_CONTRACT_BALANCE_SUCCESSFULLY: 70,
  WHEN_USER_WITHDRAW_FROM_SMART_CONTRACT_BALANCE_TO_WALLET_SUCCESSFULLY: 80,
  WHEN_USER_LISTING_DATA_SUCCESSFULLY: 90,
};
