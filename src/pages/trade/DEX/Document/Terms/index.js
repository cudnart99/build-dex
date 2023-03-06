import React from "react";
import { WrapperStyled } from "./styled";
import {
  CommonImg,
  CommonParagraph,
  CommonTitle,
  DocumentList,
  DocumentList2,
  FlexBox,
  MainTitle,
} from "../../Common";
export default function Terms() {
  return (
    <WrapperStyled>
      <MainTitle text={"IVISwap Labs Terms of Service"} />
      <i>Last modified: December, 2022</i>
      <br />
      <br />
      <CommonParagraph
        text="These Terms of Service (the “Agreement”) explains the terms and conditions by which you may access and use https://app.IVISwap.com, a website-hosted user interface (the “Interface” or “App”) provided by IVISwap Labs (“we”, “our”, or “us”). You must read this Agreement carefully as it governs your use of the Interface. By accessing or using the Interface, you signify that you have read, understand, and agree to be bound by this Agreement in its entirety. If you do not agree, you are not authorized to access or use the Interface and should not use the Interface.
NOTICE: This Agreement contains important information, including a binding arbitration provision and a class action waiver, both of which impact your rights as to how disputes are resolved. The Interface is only available to you — and you should only access the Interface — if you agree completely with these terms.
Introduction"
      />
      <CommonParagraph text="The Interface provides access to (a) a decentralized protocol on various public blockchains, including but not limited to BNB Smart Chain, that allow users to trade certain compatible digital assets (“the IVISwap protocol” or the “Protocol”); and (b) an aggregator of various third-party non-fungible token (“NFT”) marketplaces (the “NFT Marketplace Aggregator”). The Interface is one, but not the exclusive, means of accessing the Protocol." />
      <CommonParagraph text="To access the Interface, you must use non-custodial wallet software, which allows you to interact with public blockchains. Your relationship with that non-custodial wallet provider is governed by the applicable terms of service of that third party, not this Agreement. Wallets are not operated by, maintained by, or affiliated with us, and we do not have custody or control over the contents of your wallet and have no ability to retrieve or transfer its contents. By connecting your wallet to our Interface, you agree to be bound by this Agreement and all of the terms incorporated herein by reference." />
      <CommonTitle text={"Modification of this Agreement"} />
      <br />
      <FlexBox
        com1={
          <CommonParagraph text="We reserve the right, in our sole discretion, to modify this Agreement from time to time. If we make any material modifications, we will notify you by updating the date at the top of the Agreement and by maintaining a current version of the Agreement at https://IVISwap.com/terms-of-service. All modifications will be effective when they are posted, and your continued accessing or use of the Interface will serve as confirmation of your acceptance of those modifications. If you do not agree with any modifications to this Agreement, you must immediately stop accessing and using the Interface." />
        }
        com2={
          <div className="terms-1">
            <CommonImg
              src={require("@images/dex/terms-1.png")}
              fullWidth={true}
              center={true}
            />
          </div>
        }
        width1="55%"
        width2="40%"
      />
      <div className="purple-content">
        <CommonTitle
          text={"Description of Services provided through the Interface"}
        />
        <CommonParagraph text="The Interface is distinct from the Protocol and is one, but not the exclusive, means of accessing the Protocol. The Protocol has one version comprises open-source or source-available self-executing smart contracts that are deployed on various public blockchains, such as BNB Smart Chain. IVISwap Labs does not control or operate any version of the Protocol on any blockchain network. By using the Interface, you understand that you are not buying or selling digital assets from us and that we do not operate any liquidity pools on the Protocol or control trade execution on the Protocol. When traders pay fees for trades, those fees accrue to liquidity providers for the Protocol. As a general matter, Labs is not a liquidity provider into Protocol liquidity pools and liquidity providers are independent third parties. The Protocol was initially deployed on the BNB Smart Chain blockchain, and has since been deployed on several other blockchain networks including by parties other than IVISwap Labs. Deployments on other networks typically make use of cross-chain bridges, which allow assets native to one blockchain to be transferred to another blockchain. Please note that digital assets that have been “bridged” or “wrapped” to operate on other blockchain networks (including to blockchains compatible with the BNB Smart Chain Virtual Machine that are designed to ensure the BNB Smart Chain blockchain can effectively process more transactions or other blockchains that are frequently referred to as “Layer 2” solutions) are distinct from the original BNB Smart Chain mainnet asset." />
        <div className="terms-2">
          <CommonImg
            src={require("@images/dex/terms-2.png")}
            fullWidth={true}
            center={true}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <CommonTitle text={"Eligibility"} />
      <br />
      <div className="blur-box">
        <FlexBox
          com1={
            <div className="terms-3">
              <CommonImg
                src={require("@images/dex/terms-3.png")}
                fullWidth={true}
                center={true}
              />
            </div>
          }
          com2={
            <CommonParagraph text="To access or use the Interface, you must be able to form a legally binding contract with us. Accordingly, you represent that you are at least the age of majority in your jurisdiction (e.g., 18 years old in the United States) and have the full right, power, and authority to enter into and comply with the terms and conditions of this Agreement on behalf of yourself and any company or legal entity for which you may access or use the Interface." />
          }
          width1="32%"
          width2="65%"
        />
      </div>
      <div className="blur-box">
        <FlexBox
          com1={
            <div className="terms-4">
              <CommonImg
                src={require("@images/dex/terms-4.png")}
                fullWidth={true}
                center={true}
              />
            </div>
          }
          com2={
            <CommonParagraph
              text="You further represent that you are not (a) the subject of economic or
      trade sanctions administered or enforced by any governmental authority or
      otherwise designated on any list of prohibited or restricted parties
      (including but not limited to the list maintained by the Office of Foreign
      Assets Control of the U.S. Department of the Treasury) or (b) a citizen,
      resident, or organized in a jurisdiction or territory that is the subject
      of comprehensive country-wide, territory-wide, or regional economic
      sanctions by the United States. Finally, you represent that your access
      and use of the Interface will fully comply with all applicable laws and
      regulations, and that you will not access or use the Interface to conduct,
      promote, or otherwise facilitate any illegal activity."
            />
          }
          width1="32%"
          width2="65%"
        />
      </div>
      <CommonTitle text={"Intellectual Property Rights"} />
      <br />
      {[
        "We own all intellectual property and other rights in the Interface and its contents, including (but not limited to) software, text, images, trademarks, service marks, copyrights, patents, designs, and its “look and feel.” This intellectual property is available under the terms of our copyright licenses and our Trademark Guidelines. Unlike the Interface, the Protocol is comprised entirely of open-source or source-available software running on public blockchains.",
        "By using the Interface to list, post, promote, or display NFTs, you grant us a worldwide, non-exclusive, sublicensable, royalty-free license to use, copy, modify, and display any content, including but not limited to text, materials, images, files, communications, comments, feedback, suggestions, ideas, concepts, questions, data, or otherwise, that you post on or through the Interface for our current and future business purposes, including to provide, promote, and improve the services. This includes any digital file, art, or other material linked to or associated with any NFTs that are displayed.",
        "You represent and warrant that you have, or have obtained, all rights, licenses, consents, permissions, power and/or authority necessary to grant the rights granted herein for any NFTs that you list, post, promote, or display on or through the Interface. You represent and warrant that such content does not contain material subject to copyright, trademark, publicity rights, or other intellectual property rights, unless you have necessary permission or are otherwise legally entitled to post the material and to grant us the license described above, and that the content does not violate any laws.",
      ].map((item, index) => {
        return <DocumentList2 key={index} text={item} />;
      })}
      <br />
      <CommonTitle text={"Additional Rights"} />
      <CommonParagraph text="We reserve the following rights, which do not constitute obligations of ours: (a) with or without notice to you, to modify, substitute, eliminate or add to the Interface; (b) to review, modify, filter, disable, delete and remove any and all content and information from the Interface; and (c) to cooperate with any law enforcement, court or government investigation or order or third party requesting or directing that we disclose information or content or information that you provide." />
      <DocumentList text="Prohibited Activity" bold={1} />
      <CommonParagraph text="You agree not to engage in, or attempt to engage in, any of the following categories of prohibited activity in relation to your access and use of the Interface:" />
      <DocumentList text="Intellectual Property Infringement." bold={2} />
      <CommonParagraph text="Activity that infringes on or violates any copyright, trademark, service mark, patent, right of publicity, right of privacy, or other proprietary or intellectual property rights under the law." />
      <DocumentList text="Cyberattack." bold={2} />
      <CommonParagraph
        text=" Activity that seeks to interfere with or compromise the integrity,
      security, or proper functioning of any computer, server, network, personal
      device, or other information technology system, including (but not limited
      to) the deployment of viruses and denial of service attacks."
      />
      <CommonParagraph
        text=" Fraud and Misrepresentation. Activity that seeks to defraud us or any other person
      or entity, including (but not limited to) providing any false, inaccurate,
      or misleading information in order to unlawfully obtain the property of
      another."
      />
      <DocumentList text="Market Manipulation." bold={2} />
      <CommonParagraph
        text="Activity that violates any applicable law, rule, or regulation concerning
      the integrity of trading markets, including (but not limited to) the
      manipulative tactics commonly known as “rug pulls”, pumping and dumping,
      and wash trading."
      />
      <CommonParagraph
        text=" Securities and Derivatives Violations. Activity that
      violates any applicable law, rule, or regulation concerning the trading of
      securities or derivatives, including (but not limited to) the unregistered
      offering of securities and the offering of leveraged and margined
      commodity products to retail customers in the United States."
      />
      <DocumentList text="Data Mining or Scraping." bold={2} />
      <CommonParagraph text="Activity that involves data mining, robots, scraping, or similar data gathering or extraction methods of content or information from the Interface." />
      <DocumentList text="Objectionable Content." bold={2} />
      <CommonParagraph
        text="Activity that involves soliciting information from anyone under the age of
      18 or that is otherwise harmful, threatening, abusive, harassing,
      tortious, excessively violent, defamatory, vulgar, obscene, pornographic,
      libelous, invasive of another’s privacy, hateful, discriminatory, or
      otherwise objectionable."
      />
      <DocumentList text="Any Other Unlawful Conduct." bold={2} />
      <CommonParagraph
        text="Activity that violates any applicable law, rule, or regulation of the
      United States or another relevant jurisdiction, including (but not limited
      to) the restrictions and regulatory requirements imposed by Social
      Republic of Vietnam. law."
      />
      <DocumentList
        text="Not Registered with the SEC or Any Other Agency"
        bold={2}
      />
      <CommonParagraph
        text="We are not registered with the V.N. Securities and Exchange Commission as
      a national securities exchange or in any other capacity. You understand
      and acknowledge that we do not broker trading orders on your behalf nor do
      we collect or earn fees from your trades on the Interface. We also do not
      facilitate the execution or settlement of your trades, which occur
      entirely on the public distributed on public distributed blockchains like
      BNB Smart Chain. As a result, we do not (and cannot) guarantee market best
      pricing or best execution through the Interface or when using our Auto
      Routing feature, which routes trades across liquidity pools on the
      Protocol only. Any references in the Interface to “best price” do not
      constitute a representation or warranty about pricing available through
      the Interface, on the Protocol, or elsewhere."
      />
      <DocumentList
        text="Not Registered with the SEC or Any Other Agency"
        bold={1}
      />
      <CommonParagraph
        text="You agree and understand that: (a) all trades you submit through the
      Interface are considered unsolicited, which means that they are solely
      initiated by you; (b) you have not received any investment advice from us
      in connection with any trades, including those you place via our Auto
      Routing API; and (c) we do not conduct a suitability review of any trades
      you submit."
      />
      <CommonParagraph
        text="We may provide information about tokens in the Interface
      sourced from third-party data partners through features such as rarity
      scores, token explorer or token lists (which includes the IVISwap Labs
      default token list and IVISwap Labs expanded list hosted at
      tokenlists.org). We may also provide warning labels for certain tokens.
      The provision of informational materials does not make trades in those
      tokens solicited; we are not attempting to induce you to make any purchase
      as a result of information provided. All such information provided by the
      Interface is for informational purposes only and should not be construed
      as investment advice or a recommendation that a particular token is a safe
      or sound investment. You should not take, or refrain from taking, any
      action based on any information contained in the Interface. By providing
      token information for your convenience, we do not make any investment
      recommendations to you or opine on the merits of any transaction or
      opportunity. You alone are responsible for determining whether any
      investment, investment strategy or related transaction is appropriate for
      you based on your personal investment objectives, financial circumstances,
      and risk tolerance."
      />
      <DocumentList text="Non-Custodial and No Fiduciary Duties" bold={1} />
      <CommonParagraph
        text="The Interface is a purely non-custodial application, meaning we do not
      ever have custody, possession, or control of your digital assets at any
      time. It further means you are solely responsible for the custody of the
      cryptographic private keys to the digital asset wallets you hold and you
      should never share your wallet credentials or seed phrase with anyone. We
      accept no responsibility for, or liability to you, in connection with your
      use of a wallet and make no representations or warranties regarding how
      the Interface will operate with any specific wallet. Likewise, you are
      solely responsible for any associated wallet and we are not liable for any
      acts or omissions by you in connection with or as a result of your wallet
      being compromised."
      />
      <CommonParagraph
        text="This Agreement is not intended to, and does not, create
      or impose any fiduciary duties on us. To the fullest extent permitted by
      law, you acknowledge and agree that we owe no fiduciary duties or
      liabilities to you or any other party, and that to the extent any such
      duties or liabilities may exist at law or in equity, those duties and
      liabilities are hereby irrevocably disclaimed, waived, and eliminated. You
      further agree that the only duties and obligations that we owe you are
      those set out expressly in this Agreement."
      />

      <DocumentList text="Compliance and Tax Obligations" bold={1} />
      <CommonParagraph text="The Interface may not be available or appropriate for use in your jurisdiction. By accessing or using the Interface, you agree that you are solely and entirely responsible for compliance with all laws and regulations that may apply to you." />
      <CommonParagraph text="Specifically, your use of the Interface or the Protocol may result in various tax consequences, such as income or capital gains tax, value-added tax, goods and services tax, or sales tax in certain jurisdictions." />
      <CommonParagraph text="It is your responsibility to determine whether taxes apply to any transactions you initiate or receive and, if so, to report and/or remit the correct tax to the appropriate tax authority." />
      <DocumentList text="Assumption of Risk" bold={1} />
      <CommonParagraph text="By accessing and using the Interface, you represent that you are financially and technically sophisticated enough to understand the inherent risks associated with using cryptographic and blockchain-based systems, and that you have a working knowledge of the usage and intricacies of digital assets such as IHI, so-called stablecoins, and other digital tokens such as those following the BNB Smart Chain Token Standard (BEP-20)." />
      <CommonParagraph text="In particular, you understand that the markets for these digital assets are nascent and highly volatile due to risk factors including (but not limited to) adoption, speculation, technology, security, and regulation. You understand that anyone can create a token, including fake versions of existing tokens and tokens that falsely claim to represent projects, and acknowledge and accept the risk that you may mistakenly trade those or other tokens. So-called stablecoins may not be as stable as they purport to be, may not be fully or adequately collateralized, and may be subject to panics and runs." />
      <CommonParagraph text="Further, you understand that smart contract transactions automatically execute and settle, and that blockchain-based transactions are irreversible when confirmed. You acknowledge and accept that the cost and speed of transacting with cryptographic and blockchain-based systems such as BNB Smart Chain are variable and may increase dramatically at any time. You further acknowledge and accept the risk of selecting to trade in Expert Modes, which can expose you to potentially significant price slippage and higher costs." />
      <CommonParagraph text="If you act as a liquidity provider to the Protocol through the Interface, you understand that your digital assets may lose some or all of their value while they are supplied to the Protocol through the Interface due to the fluctuation of prices of tokens in a trading pair or liquidity pool. Finally, you understand that we do not create, own, or operate cross-chain bridges and we do not make any representation or warranty about the safety or soundness of any cross-chain bridge, including its use for IVISwap governance." />
      <CommonParagraph text="In summary, you acknowledge that we are not responsible for any of these variables or risks, do not own or control the Protocol, and cannot be held liable for any resulting losses that you experience while accessing or using the Interface. Accordingly, you understand and agree to assume full responsibility for all of the risks of accessing and using the Interface to interact with the Protocol." />
      <DocumentList text="Third-Party Resources and Promotions" bold={1} />
      <CommonParagraph text="The Interface may contain references or links to third-party resources, including (but not limited to) information, materials, products, or services, that we do not own or control. In addition, third parties may offer promotions related to your access and use of the Interface. We do not approve, monitor, endorse, warrant or assume any responsibility for any such resources or promotions. If you access any such resources or participate in any such promotions, you do so at your own risk, and you understand that this Agreement does not apply to your dealings or relationships with any third parties. You expressly relieve us of any and all liability arising from your use of any such resources or participation in any such promotions." />
      <DocumentList text="Release of Claims" bold={1} />
      <CommonParagraph text='You expressly agree that you assume all risks in connection with your access and use of the Interface. You further expressly waive and release us from any and all liability, claims, causes of action, or damages arising from or in any way relating to your use of the Interface. If you are a California resident, you waive the benefits and protections of Social Republic of Vietnam’s Civil Code, which provides: "[a] general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party."' />
      <DocumentList text="Indemnity" bold={1} />
      <CommonParagraph text="You agree to hold harmless, release, defend, and indemnify us and our officers, directors, employees, contractors, agents, affiliates, and subsidiaries from and against all claims, damages, obligations, losses, liabilities, costs, and expenses arising from: (a) your access and use of the Interface; (b) your violation of any term or condition of this Agreement, the right of any third party, or any other applicable law, rule, or regulation; and (c) any other party's access and use of the Interface with your assistance or using any device or account that you own or control." />
      <div className="grad-box">
        <DocumentList text="No Warranties" bold={1} />
        <CommonParagraph text='The Interface is provided on an "AS IS" and "AS AVAILABLE" basis. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ANY REPRESENTATIONS AND WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING (BUT NOT LIMITED TO) THE WARRANTIES OF MBEPHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. You acknowledge and agree that your use of the Interface is at your own risk. We do not represent or warrant that access to the Interface will be continuous, uninterrupted, timely, or secure; that the information contained in the Interface will be accurate, reliable, complete, or current; or that the Interface will be free from errors, defects, viruses, or other harmful elements. No advice, information, or statement that we make should be treated as creating any warranty concerning the Interface. We do not endorse, guarantee, or assume responsibility for any advertisements, offers, or statements made by third parties concerning the Interface.' />
        <CommonParagraph text='Similarly, the Protocol is provided "AS IS", at your own risk, and without warranties of any kind. Although we contributed to the initial code for the Protocol, we do not provide, own, or control the Protocol, which is run autonomously without any headcount by smart contracts deployed on various blockchains. Upgrades and modifications to the Protocol are generally managed in a community-driven way by holders of the IVI governance token. No developer or entity involved in creating the Protocol will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of, the Protocol, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value. We do not endorse, guarantee, or assume responsibility for any advertisements, offers, or statements made by third parties concerning the Interface.' />
      </div>
      <br />
      <DocumentList text="Limitation of Liability" bold={1} />
      <CommonParagraph text="UNDER NO CIRCUMSTANCES SHALL WE OR ANY OF OUR OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AGENTS, AFFILIATES, OR SUBSIDIARIES BE LIABLE TO YOU FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING (BUT NOT LIMITED TO) DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE PROPERTY, ARISING OUT OF OR RELATING TO ANY ACCESS OR USE OF THE INTERFACE, NOR WILL WE BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY RESULTING FROM HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS OR USE OF THE INTERFACE OR THE INFORMATION CONTAINED WITHIN IT. WE ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY: (A) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT; (B) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM ANY ACCESS OR USE OF THE INTERFACE; (C) UNAUTHORIZED ACCESS OR USE OF ANY SECURE SERVER OR DATABASE IN OUR CONTROL, OR THE USE OF ANY INFORMATION OR DATA STORED THEREIN; (D) INTERRUPTION OR CESSATION OF FUNCTION RELATED TO THE INTERFACE; (E) BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE INTERFACE; (F) ERRORS OR OMISSIONS IN, OR LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF, ANY CONTENT MADE AVAILABLE THROUGH THE INTERFACE; AND (G) THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY." />
      <DocumentList text="Dispute Resolution" bold={1} />
      <CommonParagraph text="We will use our best efforts to resolve any potential disputes through informal, good faith negotiations. If a potential dispute arises, you must contact us by sending an email to legal@ivirse.com so that we can attempt to resolve it without resorting to formal dispute resolution. If we aren't able to reach an informal resolution within sixty days of your email, then you and we both agree to resolve the potential dispute according to the process set forth below." />
      <CommonParagraph text='Any claim or controversy arising out of or relating to the Interface, this Agreement, or any other acts or omissions for which you may contend that we are liable, including (but not limited to) any claim or controversy as to arbitrability ("Dispute"), shall be finally and exclusively settled by arbitration under the VIAC Optional Expedited Arbitration Procedures. You understand that you are required to resolve all Disputes by binding arbitration. The arbitration shall be held on a confidential basis before a single arbitrator, who shall be selected pursuant to VIAC rules. The arbitration will be held in Hanoi, Vietnam, unless you and we both agree to hold it elsewhere. Unless we agree otherwise, the arbitrator may not consolidate your claims with those of any other party. Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.' />
      <CommonTitle text={"Class Action and Jury Trial Waiver"} />
      <CommonParagraph text="You must bring any and all Disputes against us in your individual capacity and not as a plaintiff in or member of any purported class action, collective action, private attorney general action, or other representative proceeding. This provision applies to class arbitration. You and we both agree to waive the right to demand a trial by jury." />
      <DocumentList text="Governing Law" bold={1} />
      <CommonParagraph text="You agree that the laws of the Vietnam, without regard to principles of conflict of laws, govern this Agreement and any Dispute between you and us. You further agree that the Interface shall be deemed to be based solely in the State of New York, and that although the Interface may be available in other jurisdictions, its availability does not give rise to general or specific personal jurisdiction in any forum outside the region of Vietnam. Any arbitration conducted pursuant to this Agreement shall be governed by the Federal Arbitration Act. You agree that the national courts of Vietnam are the proper forum for any appeals of an arbitration award or for court proceedings in the event that this Agreement's binding arbitration clause is found to be unenforceable." />
      <DocumentList text="Entire Agreement" bold={1} />
      <CommonParagraph text="These terms constitute the entire agreement between you and us with respect to the subject matter hereof. This Agreement supersedes any and all prior or contemporaneous written and oral agreements, communications and other understandings (if any) relating to the subject matter of the terms." />
    </WrapperStyled>
  );
}
