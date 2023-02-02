import { BellIcon, Eye, ThreeDot, Trash } from "@assets/svg";
import DotIcon from "@components/DotIcon";
import { DatahubNotiStatus, DatahubNotiTypeEnum } from "@constants/index";
import DatahubNotificationsProvider from "@data-access/datahub-notifications-provider";
import { Badge, Popover } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { GlobalStyle, NotificationBellWrapper } from "./styled";

const NotificationsBell = () => {
  const { address } = useSelector((state) => state.contracts);
  const { listData: listNotifications, numUnread } = useSelector(
    (state) => state.datahubNotifications
  );
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const {
    search: getNotifications,
    delete: deleteRecord,
    patch,
  } = useDispatch()["datahubNotifications"];

  const handleClickNotiByType = (type, notiData) => {
    switch (type) {
      case DatahubNotiTypeEnum.WHEN_USER_RECEIVED_REQUEST_ACCESS_TO_DATA_BY_ANY_PURCHASER:
        history.push({
          pathname: "/data-hub/profile/requests",
          state: {
            notiData,
          },
        });
        return;
      case DatahubNotiTypeEnum.WHEN_RECEIVED_DATA_REPORT_RESULT:
        history.push(`/data-hub/asset-detail/${notiData?.detail?.assetCId}`);
        return;
      case DatahubNotiTypeEnum[
        "WHEN_THE_REPORT_RESULTS_CONFIRM_A_DATA_ERROR_(REPORT_SUCCESSFULLY)"
      ]:
        history.push(`/data-hub/asset-detail/${notiData?.detail?.assetCId}`);
        return;
      case DatahubNotiTypeEnum[
        "WHEN_THE_REPORT_RESULTS_CONFIRM_THERE’S_NO_DATA_ERROR_(REPORT_FAILED)"
      ]:
        history.push(`/data-hub/asset-detail/${notiData?.detail?.assetCId}`);
        return;
      case DatahubNotiTypeEnum.WHEN_OWNER_ACCEPTED_REQUEST_ACCESS_DATA:
        history.push(`/data-hub/asset-detail/${notiData?.detail?.assetCId}`);
        return;
      case DatahubNotiTypeEnum.WHEN_OWNER_REJECTED_REQUEST_ACCESS_DATA:
        history.push(`/data-hub/asset-detail/${notiData?.detail?.assetCId}`);
        return;
      case DatahubNotiTypeEnum.WHEN_USER_DEPOSIT_TO_SMART_CONTRACT_BALANCE_SUCCESSFULLY:
        history.push("/data-hub/deposit");
        return;
      case DatahubNotiTypeEnum.WHEN_USER_WITHDRAW_FROM_SMART_CONTRACT_BALANCE_TO_WALLET_SUCCESSFULLY:
        history.push("/data-hub/deposit");
        return;
      case DatahubNotiTypeEnum.WHEN_USER_LISTING_DATA_SUCCESSFULLY:
        history.push({
          pathname: `/data-hub/asset-detail/${notiData?.detail?.assetCId}`,
          search: `?role=${
            address === notiData?.detail?.toUser ? "owner" : "buyer"
          }`,
        });
        return;
      default:
        console.log("Nothing happen with noti!");
        return;
    }
  };

  const MenuRender = ({ dataList }) => {
    return (
      <div className="ivi-menu-dropdown">
        <GlobalStyle />

        <div className="dropdown-menu__header mb-4 d-flex justify-content-space-between">
          <div>
            Notification <span>{numUnread}</span>
          </div>
          <Popover
            trigger="click"
            placement="rightBottom"
            content={
              <div>
                {[
                  {
                    icon: <Eye />,
                    text: "Mark all as read",
                    onClick: handleReadAll,
                  },
                  {
                    icon: <Trash />,
                    text: "Delete All",
                    onClick: handleDeleteAll,
                  },
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex justify-content-space-around child-popover"
                      onClick={() => {
                        item?.onClick();
                      }}
                      style={{ gap: "20px" }}
                    >
                      <div className="d-flex align-items-center">
                        {item.icon}
                      </div>
                      <div>{item.text}</div>
                    </div>
                  );
                })}
              </div>
            }
          >
            <ThreeDot className="hover-border" />
          </Popover>{" "}
        </div>
        <div className="dropdown-menu__body">
          {dataList?.length > 0 ? (
            dataList?.map((item, index) => (
              <div
                className="notification-item d-flex gap-10"
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateStatus(
                    item?.detail?.uId,
                    item?.detail?.status === DatahubNotiStatus.READ
                      ? DatahubNotiStatus.UNREAD
                      : DatahubNotiStatus.READ
                  )();
                  handleClickNotiByType(item?.detail?.type, item);
                }}
              >
                <div className="d-flex">
                  {" "}
                  <div className="bell-icon">
                    <BellIcon />
                  </div>
                  <div className="notification-item__body">
                    <h3
                      className={`${
                        item?.detail?.status === DatahubNotiStatus.READ
                          ? ""
                          : "unread-noti"
                      }`}
                    >
                      {item?.title}
                    </h3>
                    <p>{item?.content}</p>
                    <p>
                      {moment(item?.detail?.create_at).format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10 hover-display">
                  <>
                    {" "}
                    <Popover
                      trigger="click"
                      placement="rightBottom"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      content={
                        <div>
                          {[
                            {
                              icon: <Eye />,
                              text: "Mark as read/unread",
                              onClick: handleUpdateStatus(
                                item?.detail?.uId,
                                item?.detail?.status === DatahubNotiStatus.READ
                                  ? DatahubNotiStatus.UNREAD
                                  : DatahubNotiStatus.READ
                              ),
                            },
                            {
                              icon: <Trash />,
                              text: "Delete",
                              onClick: handleDelete(item),
                            },
                          ].map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="d-flex justify-content-space-around child-popover"
                                onClick={(e) => {
                                  item?.onClick(e);
                                }}
                                style={{ gap: "20px" }}
                              >
                                <div className="d-flex align-items-center">
                                  {item.icon}
                                </div>
                                <div>{item.text}</div>
                              </div>
                            );
                          })}
                        </div>
                      }
                    >
                      <ThreeDot className="hover-border--2" />
                    </Popover>{" "}
                  </>
                </div>{" "}
                {item?.detail?.status !== DatahubNotiStatus.READ && (
                  <div className="d-flex align-items-center">
                    <DotIcon color={"#0A9921"} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty">
              <img alt="" src={require("@images/emptyNotification.png")} />
              <p className="text-center">No notifications yet!</p>
              <p className="text-center">
                We'll notify you when something arrives
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleReadAll = () => {
    if (address) {
      DatahubNotificationsProvider.readAll({
        userAddress: address,
      })
        .then((res) => {
          if (res?.data?.code === 200) {
            getNotifications({ userAddress: address });
          } else {
            throw new Error(res?.message);
          }
        })
        .catch((err) => {
          console.log("Read all noti Error", err?.message);
        });
    }
  };

  const handleDeleteAll = () => {
    if (address) {
      DatahubNotificationsProvider.deleteAll({
        userAddress: address,
      })
        .then((res) => {
          if (res?.data?.code === 200) {
            getNotifications({ userAddress: address });
          } else {
            throw new Error(res?.message);
          }
        })
        .catch((err) => {
          console.log("Read all noti Error", err?.message);
        });
    }
  };

  const handleDelete = (item) => (e) => {
    e?.stopPropagation();
    deleteRecord({ id: item?.detail?.uId })
      .then((res) => {
        if (res?.data?.code === 200) {
          getNotifications({ userAddress: address });
          handleOpen();
        } else {
          throw new Error(res?.message);
        }
      })
      .catch((err) => {
        console.log("Read all noti Error", err?.message);
      });
  };

  const handleUpdateStatus = (id, status) => (e) => {
    console.log(e);
    e?.stopPropagation();

    patch({ id, status })
      .then((res) => {
        handleOpen();

        if (res?.data?.code === 200) {
          getNotifications({ userAddress: address });
        } else {
          throw new Error(res?.message);
        }
      })
      .catch((err) => {
        console.log("Read all noti Error", err?.message);
      });
  };
  useEffect(() => {
    if (address) {
      getNotifications({ userAddress: address });
    }
  }, [address]);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <NotificationBellWrapper
      open={open}
      trigger={["click"]}
      placement="bottomRight"
      dropdownRender={() => <MenuRender dataList={listNotifications} />}
      overlayClassName="ivi-menu-dropdown__wrapper"
      onOpenChange={handleOpen}
    >
      <Badge dot={numUnread > 0} >
        <BellIcon />
      </Badge>
    </NotificationBellWrapper>
  );
};

export default NotificationsBell;
