import {
  CampainIcon,
  CategoryIcon,
  DefaultThreeDot,
  Eye,
  Report,
  Trash,
  UserPlusIcon,
} from "@assets/svg";
import BaseResponsive from "@components/base/BaseResponsive";
import { TradeSelect } from "@components/TradeInputStyled";
import notificationProvider from "@data-access/notification-provider";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { CustomSearch } from "@pages/trade/components/styled";
import { TicketCircleIcon } from "@svg";
import snackbarUtils from "@utils/snackbar-utils";
import { Badge } from "antd";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BorderPopover, NotificationWrapper } from "./styled";

export default function Notification() {
  /**
   * @hook
   */
  const { params, data, totalElements } = useSelector(
    (state) => state.notification
  );
  const { getMultiple, setParams } = useDispatch().notification;

  const {
    address,
    currentContractProperties: { name: network },
  } = useSelector((state) => state.contracts);
  
  useEffect(() => {
    setParams({ network });
  }, [network]);

  useEffect(() => {
    getMultiple();
  }, [params]);

  /**
   * @variable
   */
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: "52px",
      render: (data, dataObject, index) => {
        return params.page * params.size + index + 1;
      },
    },
    {
      title: "Time",
      width: "200px",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "left",
      render: (item) => {
        return moment(item)?.format("DD-MM-YYYY HH:mm:ss");
      },
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "150px",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
    },

    {
      title: "Content",
      dataIndex: "contentView",
      // width: "200px",
      key: "contentView",
      ignoreTitle: true,
      xs: 24,
      sm: 24,
      render: (_, record) => {
        let badge = record?.requestAddresses?.includes(address) ? (
          <></>
        ) : (
          <Badge color={"green"} text={""} style={{ color: "white" }} />
        );
        return (
          <div className="d-flex justify-content-space-between">
            <div>
              <p className="font-bold">
                {record.contentTitle} <span>{badge}</span>
              </p>
              <p>{record.content}</p>
            </div>
            <BorderPopover
              onClick={(e) => {
                e.stopPropagation();
              }}
              placement="bottom"
              content={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {[
                    {
                      icon: <Eye />,
                      text: "Mark as read/unread",
                      onClick: (e) => {
                        notificationProvider
                          .increaseReader({ id: record.id, address })
                          .then((res) => {
                            if (res.code == 0) {
                              getNotifications();
                              snackbarUtils.success(
                                "This notification has been marked as read!"
                              );
                            } else {
                              snackbarUtils.error(
                                "This notification has been read before!"
                              );
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                            snackbarUtils.error("View error!");
                          });
                      },
                    },
                    { icon: <Trash />, text: "Delete" },
                    { icon: <Report />, text: "Report" },
                  ].map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex justify-content-space-arround"
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
              <div className="view">
                <DefaultThreeDot />
              </div>
            </BorderPopover>
          </div>
        );
      },
    },
  ];
  /**
   * @function
   */
  const debounceSearch = debounce((e) => {
    setParams({ content: e.target?.value });
  }, 500);

  const handleSetParams = (key) => (value) => {
    if (typeof value == "object") {
      value = value.value;
    }
    setParams({ [key]: value });
  };
  return (
    <NotificationWrapper>
      <BaseResponsive
        action={
          <>
            <div
              className="d-flex justify-content-space-between"
              id="notification-header-filter"
            >
              <div className="filter-group d-flex">
                <MultipleButtonSelect
                  options={[
                    { value: null, text: "All", icon: <CategoryIcon /> },
                    {
                      value: "Account",
                      text: "Account",
                      icon: <UserPlusIcon />,
                    },
                    {
                      value: "Campaign",
                      text: "Campaign",
                      icon: <CampainIcon />,
                    },
                  ]}
                  onChange={handleSetParams("category")}
                />{" "}
              </div>
              <div className="search">
                <CustomSearch
                  placeholder="Search by name..."
                  onChange={debounceSearch}
                />
              </div>
            </div>
            <div className="d-flex mt-3 mb-4 justify-content-space-between">
              <div className="select-filter">
                <div className="select-filter__select">
                  <TradeSelect
                    tag={"Status: "}
                    icon={<TicketCircleIcon className="cutom-css-icon" />}
                    options={[
                      { label: "All", value: 0 },
                      { label: "Read", value: 1 },
                      { label: "Unread", value: 2 },
                    ]}
                    value={params.status}
                    onChange={handleSetParams("status")}
                  />
                </div>
              </div>
            </div>
          </>
        }
        childrenTitle="Notification"
        columns={columns}
        dataSource={data}
        total={totalElements}
        params={params}
        onChangeParams={setParams}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              event.stopPropagation();

              handleChangeTab(record.category == "Campaign" ? 3 : 1);
            },
          };
        }}
        filters={{
          status: {
            title: "Status",
            key: "status",
            options: [
              {
                label: "All",
                value: 0,
              },
              {
                label: "Read",
                value: 1,
              },
              {
                label: "Unread",
                value: 2,
              },
            ],
          },
          category: {
            title: "Category",
            key: "category",
            options: [
              {
                label: "All",
                value: null,
              },
              {
                label: "Account",
                value: "account",
              },
              {
                label: "Campaign",
                value: "campaign",
              },
            ],
          },
        }}
      />
    </NotificationWrapper>
  );
}
