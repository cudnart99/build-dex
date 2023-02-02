import WalletConnectProvider from "@walletconnect/web3-provider";
import ABI from "./abi.json";
const INFURA_API_KEY = "3e31b3e72c8c4e798f5a2a61cf0ec50e";
const BNB_API_KEY = "FZ9TGE7XCY32G7YR7BDDBJ211CF7DMFF2G";

export default {
  createNewWalletConnectProvider: () => {
    return new WalletConnectProvider({
      infuraId: INFURA_API_KEY,
      rpc: {
        3: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
        4: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
        42: "https://kovan.poa.network",
        56: "https://bsc-dataseed.binance.org",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545",
      },
    });
  },
  networkHasCoin: [
    {
      name: "bnb",
      address: "0xD5944d6F633ac50a668479974b08ee1189cF86FD",
      ABI: ABI,
      scanURL: "https://api.bscscan.com",
      chainId: "0x38",
      API_KEY: BNB_API_KEY,
      symbol: "BNB",
      nameCoin: "BNB smart chain",
      communityAddress: "0x49F643792F966e264EBB1dF4F7284f25A70bB528",
      reactiveContractAddress: "0x1efF925F0D8562926BE3d4907c882D7726376480",
      marketplaceContractAddress: "0xFA609f6ad4bF064FD84D0DF95Ff0538FED7dA48C",
      intergrationServer: "https://intergration.isofh.vn",
      tokenManagementAddress: "0xa7cB1aFa0e2aAe81aA78358BCE7873F67fCecC9a",
    },
    {
      name: "bnbt",
      address: "0x009eC8014598e02Cc936ed0F897642d92fa3890F",
      stakingAddress: "0x823960ba90fEEB05b41ed474bff14d5b1F0f6EEf",
      flexibleStakingAddress: "0x276BD5B7fE057DCFd29d5d21696Ca7FF26A845E8",
      ABI: ABI,
      scanURL: "https://api-testnet.bscscan.com",
      chainId: "0x61",
      API_KEY: BNB_API_KEY,
      vestingAddress: "0xdD57304ccf2DBb9C5c7ccB86Cc9A39DC7EDdF34F",
      symbol: "BNBT",
      nameCoin: "BNB smart chain testnet",
      communityAddress: "0xfE4ba641E3043d2d63D13355809EA419E3a82F2c",
      reactiveContractAddress: "0x80dD54B9509d288Db6411E3a8cb9dc8EEE0b7374",
      marketplaceContractAddress: "0x2ad2C86AD52E5040375073dAD76654b8643A2843",
      intergrationServer: "https://intergration.isofh.vn",
      tokenManagementAddress: "0xE3284bca37a99532047739Bb1a55ae391c56BE94",
      adminManagement: "0xe5F5194e78A8e8cA0D72a789A2C3D35891672c4E",
      voteFactory: "0x7dE713c8D80810f4247eb230068ead69047b0348",
      campaignManagement: "0x9824535C6e95E2E6ad6312d46502A5C46A5E830b",
    },
  ],
};
