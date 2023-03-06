import React from "react";
import { WrapperStyled } from "./styled";
import { BlockID, CommonImg, FlexBox, MainTitle } from "../../Common";
export default function Disclaimer() {
  return (
    <WrapperStyled>
      <MainTitle text={"Disclaimer"} />
      <br />
      <br />
      <FlexBox
        com1={
          "The information provided on IVISwap is for general information purposes only. It does not constitute investment advice or a recommendation or a solicitation to buy or sell any investment and should not be used in the evaluation of the merits of making any investment decision. It should not be relied upon for accounting, legal or tax advice or investment recommendations. The information reflects the current opinions of the authors and is not made on behalf of IVI Group or its affiliates and does not necessarily reflect the opinions of IVI Group, its affiliates or individuals associated with IVI Group. The opinions reflected herein are subject to change without being updated."
        }
        com2={
          <div className="img">
            <CommonImg
              src={require("@images/dex/Disclaimer.png")}
              fullWidth={true}
              center={true}
            />
          </div>
        }
        width1="49%"
        width2="49%"
      />
    </WrapperStyled>
  );
}
