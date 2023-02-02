import useLocalStorage from "@hook/useLocalStorage";
import LinearText from "@pages/trade/components/LinearText";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminList from "./Adminlist";
import Campain from "./CampainManagement";
import Notification from "./Notification";
import StakingAdmin from "./Staking";
import { AdminWrapper, TabItem } from "./styled";
import TokenManagement from "./TokenManagement";
function AdminContainer({ history }) {
  /**
   * @hook
   */
  const setActiveNavItem = useDispatch()?.community?.updateData;

  const { activeNavItem, notifications } = useSelector((state) => {
    return state.community;
  });
  const { scrWidth } = useSelector((state) => state.global);
  const { isAdmin, isMasterAdmin } = useSelector((state) => state?.consensus);
  const data = useLocalStorage("role");

  useEffect(() => {
    if (!(isAdmin || isMasterAdmin) || (data && data != "admin")) {
      history.push("/community");
    }
  }, [isAdmin, data]);

  /**
   * @variable
   */

  const TabContent = [
    {
      component: <Notification />,
      title: "Notification",
      numberBadge: notifications?.length || 0,
    },
    {
      component: <AdminList />,
      title: "Admin List",
    },
    {
      component: <TokenManagement />,
      title: "Token management",
    },
    {
      component: <Campain />,
      title: "Campaign",
    },
    {
      component: <StakingAdmin />,
      title: "Staking",
    },
  ];

  /**
   * @function
   */

  const onChangeNav = (value) => {
    setActiveNavItem({ activeNavItem: value });
  };
  return (
    <AdminWrapper>
      <LinearText
        title={"Admin"}
        fontSize={scrWidth > 992 ? "50px" : scrWidth > 576 ? "45px" : "40px"}
        lineHeight={scrWidth > 992 ? "55px" : scrWidth > 576 ? "50px" : "45px"}
        margin="10px"
      />

      <div className="content">
        <div className="content__tabs">
          {TabContent.map((item, index) => {
            return (
              <TabItem
                key={index}
                active={activeNavItem == index}
                onClick={() => {
                  onChangeNav(index);
                }}
              >
                {`${item.title} ${
                  item?.numberBadge ? `(${item.numberBadge})` : ""
                }`}
              </TabItem>
            );
          })}
        </div>
        <div className="content__data">
          {TabContent?.[activeNavItem]?.component}
        </div>
      </div>
    </AdminWrapper>
  );
}

export default AdminContainer;
