import {
  CheckOutlined,
  ContainerOutlined,
  DisconnectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  AiDemoIcon,
  ConvertCardIcon,
  MoneyReceiveIcon,
  ProfileIcon,
} from "@assets/svg";
import snackbarUtils from "@utils/snackbar-utils";
import { Avatar, Button, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const AccountPanelHead = ({
  currentContractProperties = {},
  coinBalance = 0,
  address,
  history,
}) => {
  return (
    <div className="account-panel__header">
      <div className="account-check-active">
        <CheckOutlined />
      </div>
      <div className="account-info">
        <div className="account-info__avatar">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </div>
        <div className="account-info__txt">
          <Tooltip title={address} placement="bottomLeft">
            <p className="account-info__name">{address}</p>
          </Tooltip>
          <p className="account-info__asset">
            {coinBalance} <span>{currentContractProperties?.nameCoin}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const AccountPanelStaticItem = [
  {
    link: "/data-hub/profile",
    Icon: ProfileIcon,
    text: "Profile",
  },
  {
    link: "/data-hub/deposit",
    Icon: ConvertCardIcon,
    text: "Deposit",
  },
  {
    link: "/data-hub/ai-demo-page",
    Icon: AiDemoIcon,
    text: "Brain Tumor Prediction",
  },
];

export const AccountPanelBody = ({ showDisconect = true, history }) => {
  const disconnect = useDispatch().contracts?.disconnect;
  const { initTokenManagement } = useDispatch().tokenmanagement;
  const { isAdmin, isMasterAdmin } = useSelector((state) => state.consensus);
  return (
    <ul className="list-account-option">
      {/* {(isAdmin || isMasterAdmin) && (
        <li className="list-account-option__item">
          <div className="option-icon">
            <UserOutlined />
          </div>
          <Button
            className="option-title__onclick"
            onClick={() => {
              if (isAdmin) {
                localStorage.setItem("role", "admin");
                history.push("/admin-community");
              } else {
                snackbarUtils.error("You are not admin!");
              }
            }}
          >
            Account admin information
          </Button>
        </li>
      )} */}

      {/* {AccountPanelStaticItem?.map((item, index) => (
        <Link
          to={item?.link}
          style={{ display: "flex" }}
          className="link-option__wrapper"
        >
          <li className="list-account-option__item" key={index}>
            <div className="option-icon">
              <item.Icon className={`option-icon-${index}`} />
            </div>
            <Button
              style={
                `${item?.text}` === "Deposit"
                  ? { marginLeft: "-6px" }
                  : `${item?.text}` === "Profile"
                  ? { marginLeft: "-1.5px" }
                  : {}
              }
              className="option-title__onclick"
            >
              {item?.text}
            </Button>
          </li>
        </Link>
      ))} */}
      {/* <li className="list-account-option__item">
        <div className="option-icon">
          <ContainerOutlined />{" "}
        </div>
        <Button
          className="option-title__onclick"
          onClick={() => {
            initTokenManagement()
              .then((res) => {
                history.push("/token-management");
              })
              .catch((err) => {
                snackbarUtils.error("Not have administrator!");
              });
          }}
        >
          Token Allocation
        </Button>
      </li> */}

      {/* <li className="list-account-option__item">
        <div className="option-icon">
          <MoneyReceiveIcon />{" "}
        </div>
        <Button
          className="option-title__onclick"
          onClick={() => {
            history.push("/erc20-management");
          }}
        >
          Token Management
        </Button>
      </li> */}
      {showDisconect && (
        <li
          className="list-account-option__item"
          id="disconnect-btn"
          onClick={() => {
            disconnect();
          }}
        >
          <div className="option-icon">
            <DisconnectOutlined />
          </div>
          <Button className="option-title__onclick">
            <Link to="/">Disconnect Account</Link>
          </Button>
        </li>
      )}
    </ul>
  );
};
