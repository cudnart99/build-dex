import React from "react";
import { connect } from "react-redux";
import Claim from "./components/Claim";
import VerifyContainer from "./components/VerifyContainer";
import { VestingToolWrapper } from "./styled";
const VestingTool = ({
  initTimeLockOwnership,
  loading,
  data,
  releaseTimeLockOwnership,
  pieData,
  seedTokenCanClaim,
  privateTokenCanClaim,
  releasePrivateToken,
  releasePublicToken,
  releasePublicTokenByIndex,
  releasePrivateByIndex,
  show,
  setLoading,
  transferOwnership,
  getAllSmartContract,
  arrTimeLock,
  currentVesting,
  history,
  address,
  flag,
}) => {
  return (
    <VestingToolWrapper>
      {!show ? (
        <VerifyContainer
          initTimeLockOwnership={getAllSmartContract}
          loading={loading}
          setLoading={setLoading}
          verify={initTimeLockOwnership}
        />
      ) : (
        <Claim
          transferOwnership={transferOwnership}
          pieData={pieData}
          data={data}
          releaseTimeLockOwnership={releaseTimeLockOwnership}
          seedTokenCanClaim={seedTokenCanClaim}
          privateTokenCanClaim={privateTokenCanClaim}
          releasePrivateToken={releasePrivateToken}
          releasePublicToken={releasePublicToken}
          releasePublicTokenByIndex={releasePublicTokenByIndex}
          releasePrivateByIndex={releasePrivateByIndex}
          arrTimeLock={arrTimeLock}
          currentVesting={currentVesting}
          getAllSmartContract={getAllSmartContract}
        />
      )}
    </VestingToolWrapper>
  );
};

const mapStateToProps = ({
  contracts: { address },
  vesting: {
    timeLockWithSigner,
    timeLockOwnerShipObj,
    data,
    pieData,
    seedTokenCanClaim,
    privateTokenCanClaim,
    show,
    arrTimeLock,
    currentVesting,
    flag,
  },
  global: { loading },
}) => ({
  timeLockWithSigner,
  timeLockOwnerShipObj,
  data,
  pieData,
  seedTokenCanClaim,
  privateTokenCanClaim,
  show,
  loading,
  address,
  arrTimeLock,
  currentVesting,
  flag,
});

const mapDispatchToProps = ({
  vesting: {
    releasePrivateToken,
    releasePublicToken,
    initTimeLockOwnership,
    releasePublicTokenByIndex,
    releasePrivateByIndex,
    transferOwnership,
    getAllSmartContract,
  },
}) => ({
  releasePrivateToken,
  releasePublicToken,
  initTimeLockOwnership,
  releasePublicTokenByIndex,
  releasePrivateByIndex,
  transferOwnership,
  getAllSmartContract,
});
export default connect(mapStateToProps, mapDispatchToProps)(VestingTool);
