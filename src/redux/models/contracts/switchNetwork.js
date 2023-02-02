export const SWITCH_NETWORK = [
  {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  {
    chainId: "0x61",
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
];
