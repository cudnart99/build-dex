import React from "react";
import { WrapperStyled } from "./styled";
import {
  CommonImg,
  CommonParagraph,
  CommonTitle,
  FlexBox,
  MainTitle,
} from "../../Common";
export default function FAQ() {
  return (
    <WrapperStyled>
      <MainTitle text={"What is IVISwap Protocol?"} />
      <br />
      <CommonTitle text={"What Is IVISwap?"} />
      <br />
      <FlexBox
        com1={
          <>
            <CommonParagraph
              text=" The IVISwap Protocol is an open-source protocol for providing
              liquidity and trading BEP-20 tokens on BNB Smart Chain. It
              eliminates trusted intermediaries and unnecessary forms of rent
              extraction, allowing for safe, accessible, and efficient exchange
              activity. The protocol is non-upgradable and designed to be
              censorship resistant."
            />
            <CommonParagraph
              text="The IVISwap Protocol and the IVISwap Interface were developed by
              IVIRSE."
            />
            <CommonParagraph
              text=" Check out the Introduction section of our docs for more info on
              the different roles played by IVIRSE, the Interface, and the
              Protocol."
            />
          </>
        }
        com2={
          <div className="FAQ-1">
            <CommonImg
              src={require("@images/dex/FAQ-1.png")}
              fullWidth={true}
              center={true}
            />
          </div>
        }
        width1="45%"
        width2="55%"
      />
      <br />
      <CommonTitle text={"How do I use the IVISwap Protocol?"} />
      <br />
      <br />
      <br />
      <br />
      <FlexBox
        com1={
          <div className="FAQ-2">
            <CommonImg
              src={require("@images/dex/FAQ-2.png")}
              fullWidth={true}
              center={true}
            />
          </div>
        }
        com2={
          <>
            <CommonParagraph text="To create a new liquidity pool, provide liquidity, swap tokens, or vote on governance proposals, head to the IVISwap Interface and connect a Web3 wallet. Remember, each transaction on Binance Smart Chain costs BNB. For a more detailed walkthrough, check out our Help Guides." />
            <CommonParagraph text="If you’re a developer interested in building on top of the IVISwap Protocol, please refer to our extensive docs." />
          </>
        }
        width1="45%"
        width2="55%"
      />
      <br />
      <CommonTitle text={"How does IVISwap Protocol work?"} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="FAQ-3-container">
        <div className="FAQ-3">
          <CommonImg
            src={require("@images/dex/FAQ-3.png")}
            fullWidth={true}
            center={true}
          />
        </div>
        <CommonParagraph text="IVISwap is an automated market maker. In practical terms, it is a collection of smart contracts that define a standard way to create liquidity pools, provide liquidity, and swap assets." />
        <CommonParagraph text="Each liquidity pool contains two assets. The pools keep track of aggregate liquidity reserves and the pre-defined pricing strategies set by liquidity providers. Reserves and prices are updated automatically every time someone trades. There is no central order book, no third-party custody, and no private order matching engine." />
        <CommonParagraph text="Because reserves are automatically rebalanced after each trade, an IVISwap pool can always be used to buy or sell a token — unlike traditional exchanges, traders do not need to match with individual counterparties to complete a trade." />
        <CommonParagraph text="For a more in-depth description, check out the Concepts from the documentation." />
      </div>
    </WrapperStyled>
  );
}
