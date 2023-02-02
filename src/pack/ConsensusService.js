import { Contract } from "ethers";

import ADMIN_MANAGEMENT_BUILDER from "./build/AdminManagement.json";
import CAMPAIGN_MANAGEMENT_BUILDER from "./build/CampaignManagement.json";
import VOTE_FACTORY_BUILDER from "./build/VoteFactory.json";

class ConsensusService {
  constructor(
    signer,
    adminManagementContract,
    voteFactoryContract,
    campaignManagementContract
  ) {
    this.signer = signer;
    this.adminManagementContract = adminManagementContract;
    this.voteFactoryContract = voteFactoryContract;
    this.campaignManagementContract = campaignManagementContract;
  }

  static async init(
    signer,
    adminManagementAddress,
    voteFactoryAddress,
    campaignManagementAddress
  ) {
    const adminManagementContract = new Contract(
      adminManagementAddress,
      ADMIN_MANAGEMENT_BUILDER.abi,
      signer.provider
    );

    const voteFactoryContract = new Contract(
      voteFactoryAddress,
      VOTE_FACTORY_BUILDER.abi,
      signer.provider
    );

    const campaignManagementContract = new Contract(
      campaignManagementAddress,
      CAMPAIGN_MANAGEMENT_BUILDER.abi,
      signer.provider
    );
    return new ConsensusService(
      signer,
      adminManagementContract,
      voteFactoryContract,
      campaignManagementContract
    );
  }

  async getCurrentRole() {
    let address = await this.signer.getAddress();
    let isParticipant = await this.campaignManagementContract
      .connect(this.signer)
      .isParticipant(address);
    let isMasterAdmin = await this.adminManagementContract
      .connect(this.signer)
      .isMasterAdmin(address);
    let isAdmin = await this.adminManagementContract
      .connect(this.signer)
      .isAdmin(address);
    return { isParticipant, isAdmin, isMasterAdmin };
  }

  async getTotalAcceptVote(account) {
    return await this.adminManagementContract
      .connect(this.signer)
      .getTotalRequestVote(account, 1);
  }

  async getTotalRejectVote(account) {
    return await this.adminManagementContract
      .connect(this.signer)
      .getTotalRequestVote(account, 2);
  }

  async getCurrentAccountVoteForAdmin(account) {
    return await this.adminManagementContract
      .connect(this.signer)
      .getAdminVote(account, await this.signer.getAddress());
  }

  async renounceAdminRole() {
    return await this.adminManagementContract
      .connect(this.signer)
      .renounceAdminRole();
  }
  async account(account) {
    return await this.adminManagementContract
      .connect(this.signer)
      .proposeMasterAdmin(account);
  }
}

export default ConsensusService;
