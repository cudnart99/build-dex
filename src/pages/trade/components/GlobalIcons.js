import { memo } from "react";
import { Link } from "react-router-dom";
import { Divider } from "../vesting/components/styled";
import { IconData } from "./constants";
import { GlobalIconsWrapper } from "./styled";
import { useDispatch } from "react-redux";

const GlobalIcons = () => {
  const jumpToDocument = useDispatch()?.dex?.jumpToDocument;
  return (
    <GlobalIconsWrapper>
      <div
        className={`${
          window.location.pathname == "/data-hub" ? "" : "testclass"
        }`}
      >
        <div>
          {Object.keys(IconData).map((key, index) => {
            let Icon = IconData[key].icon;
            return (
              <a href={IconData[key].link} key={index} target="_blank">
                <Icon />
              </a>
            );
          })}
        </div>
        <Divider opacity={0.2} marginBottom={10} />
        <div className="policy d-flex justify-content-space-between mb-2">
          <div className="text-italic">IVIRSE © 2022</div>
          <div className="d-flex">
            <Link className="text-white" to={"/document"}>
              <div onClick={() => jumpToDocument("sub3")}>Privacy policy</div>
            </Link>
            <Link className="text-white" to={"/document"}>
              <div
                onClick={() => jumpToDocument("sub4")}
                className="pl-4 marginTerms"
              >
                Terms of Service
              </div>
            </Link>
          </div>
        </div>
      </div>
    </GlobalIconsWrapper>
  );
};
export default memo(GlobalIcons);
