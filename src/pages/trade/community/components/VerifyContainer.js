import { IvirseLogo, SecurityUser } from "@assets/svg";
import { Button } from "antd";
import { VerifyContainerWrapper } from "./styled";

const VerifyContainer = ({ verify, loading }) => {
  return (
    <VerifyContainerWrapper>
      <div className="loading-container">
        <IvirseLogo className="logo" />
      </div>
      <div className="text-container">
        {loading ? (
          <p className="verify-text">Verifying your wallet address ...</p>
        ) : (
          <p className="verify-text">Please verify your wallet!</p>
        )}
      </div>
      <Button
        className="linear-button d-flex align-items-center"
        onClick={verify}
      >
        <SecurityUser className="mr-2" />
        Click to verify your wallet
      </Button>
    </VerifyContainerWrapper>
  );
};

export default VerifyContainer;
