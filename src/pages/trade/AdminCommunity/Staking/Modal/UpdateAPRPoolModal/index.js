import React from "react";
import StakingDatePicker from "../../CommonInput/StakingDatePicker";
import StakingInput from "../../CommonInput/StakingInput";
import StakingSelect from "../../CommonInput/StakingSelect";
import BaseModalAdminStaking from "../BaseModalAdminStaking";

export default function UpdateAPRPoolModal({ state, setState }) {
  const setCloseUpdateAPRPoolModal = () => {
    setState({
      openUpdateAPRPoolModal: false,
    });
  };
  return (
    <BaseModalAdminStaking
      width={900}
      openModal={state.openUpdateAPRPoolModal}
      setCloseModal={setCloseUpdateAPRPoolModal}
      arrowBack={true}
      titleModal={"Update locktime/APR"}
      effectiveDate={<StakingDatePicker />}
      poolType={
        <StakingSelect
          width={"100%"}
          placeholder={"Select"}
          options={[
            {
              value: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
              label: `BNB/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
            },
            {
              value: `${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
              label: `${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}/${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
            },
          ]}
        />
      }
      rewardAmount={<StakingInput placeholder={"Type amount"} />}
    />
  );
}
