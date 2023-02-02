import React from "react";
import useCustomState from "@hook/useCustomState";
import { FailModalWrapper } from "./styled";
import { WrongLine } from "@assets/animation";
import BaseModal from "../../BaseModal";

export default function FailModal({ openFailModal, setOpenFailModal, type }) {
  const [state, setState] = useCustomState({});
  return (
    <>
      <BaseModal
        width={450}
        openModal={openFailModal}
        setOpenModal={setOpenFailModal}
        titleModal={
          type === "stake"
            ? "Stake failed"
            : type === "redeem"
            ? "Redeem failed"
            : "Claim failed"
        }
        buttonFooter={"Try again"}
        arrowBack={false}
        content={
          <FailModalWrapper>
            <WrongLine />
            <div className="info-container">Reason fail & please try again</div>
          </FailModalWrapper>
        }
      />
    </>
  );
}
