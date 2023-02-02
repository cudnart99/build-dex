import useLocalStorage from "@hook/useLocalStorage";
import { refLoading } from "@src/index";
import snackbarUtils from "@utils/snackbar-utils";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContainer from "./components/user";
import VerifyContainer from "./components/VerifyContainer";
import { CommunityWrapper } from "./styled";
const Community = () => {
  /**
   * @hook
   */
  const [loading, setLoading] = useState(false);

  const data = useLocalStorage("role");
  const { initConsensusService, updateData } = useDispatch().consensus;
  const { generateToken } = useDispatch().auth;

  const { isParticipant, isAdmin, isMasterAdmin } = useSelector(
    (state) => state.consensus
  );
  const { address, currentContractProperties } = useSelector(
    (state) => state.contracts
  );
  /**
   * @function
   */
  const verify = async () => {
    try {
      refLoading.current.show();
      setLoading(true);
      let consensusService = await initConsensusService();
      let currentRole = await consensusService.getCurrentRole();
      updateData(currentRole);
      localStorage.setItem("role", "user");
      if (currentRole.isMasterAdmin || currentRole.isAdmin) {
        generateToken({
          address,
          network: currentContractProperties?.name,
        });
      }
      if (currentRole.isParticipant) {
        snackbarUtils.success("You have successfully authenticated!");
      } else {
        snackbarUtils.error(
          "Sorry, you are not currently participating in any campaigns!"
        );
      }
    } catch (error) {
      snackbarUtils.error("Verify error!");
    } finally {
      refLoading.current.hide();
      setLoading(false);
    }
  };
  return (
    <CommunityWrapper>
      {isParticipant && data && data == "user" ? (
        <UserContainer />
      ) : (
        <VerifyContainer verify={verify} loading={loading} />
      )}
    </CommunityWrapper>
  );
};

export default Community;
