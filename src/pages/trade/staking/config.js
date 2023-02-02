export const dataStaking = [
  {
    text: "Flexible",
    type: "Flexible",
    apr: 0.01,
    unit: "/min",
  },
  {
    text: "3 minutes",
    type: 3 * 60,
    apr: 3,
  },
  {
    text: "6 minutes",
    type: 6 * 60,
    apr: 6.3,
  },
  {
    text: "9 minutes",
    type: 9 * 60,
    apr: 9.6,
  },
];

export const stepSummary = 60;

// disable = "disable"
// selected = "selected"
// can select = "select"
export const timeStake = [
  {
    label: "Flexible",
    value: "flexible",
  },
  {
    label: "1 month",
    value: "1 month",
  },
  {
    label: "2 month",
    value: "2 month",
  },
  {
    label: "3 month",
    value: "3 month",
  },
  {
    label: "4 month",
    value: "4 month",
  },
  {
    label: "5 month",
    value: "5 month",
  },
  {
    label: "6 month",
    value: "6 month",
  },
  {
    label: "7 month",
    value: "7 month",
  },
  {
    label: "8 month",
    value: "8 month",
  },
  {
    label: "9 month",
    value: "9 month",
  },
  {
    label: "10 month",
    value: "10 month",
  },
  {
    label: "11 month",
    value: "11 month",
  },
  {
    label: "12 month",
    value: "12 month",
  },
];

export const dataAdmin = [
  {
    status: "Draft",
    effectiveDate: "01-01-2023",
    name: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
    task: "Create New",
    Creator: "An.pt",
    createDate: "01-06-2022 16:12:10",
    approved: "-",
    delete: "select",
    refuse: "disable",
    agree: "disable",
    sent: "disable",
  },
  {
    status: "Voting",
    effectiveDate: "01-01-2023",
    name: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
    task: "Update APR/time",
    Creator: "An.pt",
    createDate: "01-06-2022 16:12:10",
    approved: "0% - 0%",
    delete: "disable",
    refuse: "selected",
    agree: "select",
    sent: "disable",
  },
  {
    status: "Voting",
    effectiveDate: "01-01-2023",
    name: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
    task: "Update reward",
    Creator: "An.pt",
    createDate: "01-06-2022 16:12:10",
    approved: "49.9% - 50.1%",
    delete: "disable",
    refuse: "selected",
    agree: "select",
    sent: "disable",
  },
  {
    status: "Voting",
    effectiveDate: "01-01-2023",
    name: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
    task: "Update APR/time",
    Creator: "An.pt",
    createDate: "01-06-2022 16:12:10",
    approved: "49.9% - 50.1%",
    delete: "disable",
    refuse: "disable",
    agree: "selected",
    sent: "select",
  },
  {
    status: "Voting",
    effectiveDate: "01-01-2023",
    name: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
    task: "Update reward",
    Creator: "An.pt",
    createDate: "01-06-2022 16:12:10",
    approved: "50.1% - 49.9%",
    delete: "disable",
    refuse: "selected",
    agree: "disable",
    sent: "select",
  },
  {
    status: "Voting",
    effectiveDate: "01-01-2023",
    name: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
    task: "Update APR/time",
    Creator: "An.pt",
    createDate: "01-06-2022 16:12:10",
    approved: "50.1% - 49.9%",
    delete: "disable",
    refuse: "disable",
    agree: "selected",
    sent: "select",
  },
  {
    status: "Completed",
    effectiveDate: "01-01-2023",
    name: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
    task: "Update APR/time",
    Creator: "An.pt",
    createDate: "01-06-2022 16:12:10",
    approved: "Done",
    delete: "disable",
    refuse: "disable",
    agree: "disable",
    sent: "disable",
  },
  {
    status: "Rejected",
    effectiveDate: "01-01-2023",
    name: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
    task: "Create New",
    Creator: "An.pt",
    createDate: "01-06-2022 16:12:10",
    approved: "0% - 50.1%",
    delete: "disable",
    refuse: "disable",
    agree: "disable",
    sent: "disable",
  },
];
