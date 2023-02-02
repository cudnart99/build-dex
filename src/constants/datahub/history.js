import { IviCurrency } from "@assets/svg";
import DotIcon from "@components/DotIcon";
import { strings } from "@utils/index";
import styled from "styled-components";

const StrongTextStyle = styled.p`
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 138% */

  /* White color */

  color: #ffffff;
  margin-bottom: 0%;
  padding: 5px;
`;
export const filterData = [
  {
    label: strings("history.deposit"),
    value: 1,
    status: [
      {
        value: 0,
        label: strings("history.all"),
      },
      {
        value: 1,
        label: strings("history.completed"),
      },
      {
        value: 2,
        label: strings("history.failed"),
      },
    ],
    columns: [
      { title: "#", dataIndex: "index", key: "index" },
      {
        title: strings("history.time"),
        dataIndex: "timestamp",
        key: "time",
        align: "left",
        sorter: (a, b) => a.timestamp - b.timestamp,
        render: (time, object) => object.time.format("DD-MM-YYYY hh:mm:ss"),
      },
      {
        title: strings("history.currency"),
        dataIndex: "currency",
        key: "currency",
        align: "left",
        render: (value, record, idx) => (
          <span className="d-flex align-items-center">
            <IviCurrency className="mr-3" /> {value}
          </span>
        ),
      },
      { title: strings("history.amount"), dataIndex: "amount", key: "amount", align: "left" },
      {
        title: strings("history.status"),
        dataIndex: "status",
        key: "status",
        align: "left",
        render: (status) => {
          let data = [
            {
              value: 0,
              label: strings("history.all"),
            },
            {
              value: 1,
              label: strings("history.completed"),
              iconColor: <DotIcon color="#0A9921" />,
            },
            {
              value: 2,
              label: strings("history.failed"),
              iconColor: <DotIcon color="#EA0000" />,
            },
            {
              value: 3,
              label: strings("history.processing"),
              iconColor: <DotIcon color="#FF7A00;" />,
            },
            {
              value: 4,
              label: strings("history.accused"),
              iconColor: <DotIcon color="#B0B0B0" />,
            },
          ].find((item) => item.value == status);
          return (
            <>
              <span>{data?.iconColor}</span>
              <span>{data?.label}</span>
            </>
          );
        },
      },
    ],
  },
  {
    label: strings("history.withdraw"),
    value: 2,
    status: [
      {
        value: 0,
        label: strings("history.all"),
      },
      {
        value: 1,
        label: "history.completed",
      },
      {
        value: 2,
        label: strings("history.failed"),
      },
    ],
    columns: [
      { title: "#", dataIndex: "index", key: "index" },
      {
        title: strings("history.time"),
        dataIndex: "timestamp",
        key: "time",
        align: "left",
        sorter: (a, b) => a.timestamp - b.timestamp,
        render: (time, object) => object.time.format("DD-MM-YYYY hh:mm:ss"),
      },
      {
        title: strings("history.currency"),
        dataIndex: "currency",
        key: "currency",
        align: "left",
        render: (value, record, idx) => (
          <span className="d-flex align-items-center">
            <IviCurrency className="mr-3" /> {value}
          </span>
        ),
      },
      { title: strings("history.amount"), dataIndex: "amount", key: "amount", align: "left" },
      {
        title: strings("history.status"),
        dataIndex: "status",
        key: "status",
        align: "left",
        render: (status) => {
          let data = [
            {
              value: 0,
              label: strings("history.all"),
            },
            {
              value: 1,
              label: strings("history.completed"),
              iconColor: <DotIcon color="#0A9921" />,
            },
            {
              value: 2,
              label: strings("history.failed"),
              iconColor: <DotIcon color="#EA0000" />,
            },
            {
              value: 3,
              label: strings("history.processing"),
              iconColor: <DotIcon color="#FF7A00;" />,
            },
            {
              value: 4,
              label: strings("history.accused"),
              iconColor: <DotIcon color="#B0B0B0" />,
            },
          ].find((item) => item.value == status);
          return (
            <>
              <span>{data?.iconColor}</span>
              <span>{data?.label}</span>
            </>
          );
        },
      },
    ],
  },
  {
    label: strings("history.purchase"),
    value: 3,
    status: [
      {
        value: 0,
        label: strings("history.all"),
      },
      {
        value: 1,
        label: strings("history.completed"),
      },
      {
        value: 2,
        label: strings("history.rejected"),
      },
      {
        value: 3,
        label: strings("history.processing"),
      },
      {
        value: 4,
        label: strings("history.accused"),
      },
    ],
    columns: [
      { title: "#", dataIndex: "index", key: "index" },
      {
        title: strings("history.time"),
        dataIndex: "timestamp",
        key: "time",
        align: "left",
        sorter: (a, b) => a.timestamp - b.timestamp,
        render: (time, object) => object.time.format("DD-MM-YYYY hh:mm:ss"),
      },
      {
        title: "Data ID",
        dataIndex: "data",
        key: "data",
        align: "left",
        render: (data) => (
          <StrongTextStyle
            className="hover-pointer"
            onClick={() => {
              window.open(`/data-hub/asset-detail/${data}`, "_blank");
            }}
          >
            {data}
          </StrongTextStyle>
        ),
      },
      {
        title: strings("history.price"),
        dataIndex: "price",
        key: "price",
        align: "right",
        render: (value, record, idx) => (
          <>
            <strong>{`${value} `}</strong>
            {record?.currency}
          </>
        ),
      },
      {
        title: strings("history.status"),
        dataIndex: "status",
        key: "status",
        align: "left",
        render: (status) => {
          let data = [
            {
              value: 0,
              label: strings("history.all"),
            },
            {
              value: 1,
              label: strings("history.completed"),
              iconColor: <DotIcon color="#0A9921" />,
            },
            {
              value: 2,
              label: strings("history.rejected"),
              iconColor: <DotIcon color="#EA0000" />,
            },
            {
              value: 3,
              label: strings("history.processing"),
              iconColor: <DotIcon color="#FF7A00;" />,
            },
            {
              value: 4,
              label: strings("history.accused"),
              iconColor: <DotIcon color="#B0B0B0" />,
            },
          ].find((item) => item.value == status);
          return (
            <>
              <span>{data?.iconColor}</span>
              <span>{data?.label}</span>
            </>
          );
        },
      },
    ],
  },
  {
    label: strings("history.sales"),
    value: 4,
    status: [
      {
        value: 0,
        label: strings("history.all"),
      },
      {
        value: 1,
        label: strings("history.completed"),
      },
      {
        value: 2,
        label: strings("history.rejected"),
      },
      {
        value: 3,
        label: strings("history.processing"),
      },
      {
        value: 4,
        label: strings("history.accused"),
      },
    ],
    columns: [
      { title: "#", dataIndex: "index", key: "index" },
      {
        title: strings("history.time"),
        dataIndex: "timestamp",
        key: "time",
        align: "left",
        sorter: (a, b) => a.timestamp - b.timestamp,
        render: (time, object) => object.time.format("DD-MM-YYYY hh:mm:ss"),
      },
      {
        title: "Data ID",
        dataIndex: "data",
        key: "data",
        align: "left",
        render: (data) => (
          <StrongTextStyle
            className="hover-pointer"
            onClick={() => {
              window.open(`/data-hub/asset-detail/${data}`, "_blank");
            }}
          >
            {data}
          </StrongTextStyle>
        ),
      },
      {
        title: strings("history.price"),
        dataIndex: "price",
        key: "price",
        align: "right",
        render: (value, record, idx) => (
          <>
            <strong>{`${value} `}</strong>
            {record?.currency}
          </>
        ),
      },
      {
        title: strings("history.status"),
        dataIndex: "status",
        key: "status",
        align: "left",
        render: (status) => {
          let data = [
            {
              value: 0,
              label: strings("history.all"),
            },
            {
              value: 1,
              label: strings("history.completed"),
              iconColor: <DotIcon color="#0A9921" />,
            },
            {
              value: 2,
              label: strings("history.rejected"),
              iconColor: <DotIcon color="#EA0000" />,
            },
            {
              value: 3,
              label: strings("history.processing"),
              iconColor: <DotIcon color="#FF7A00;" />,
            },
            {
              value: 4,
              label: strings("history.accused"),
              iconColor: <DotIcon color="#B0B0B0" />,
            },
          ].find((item) => item.value == status);
          return (
            <>
              <span>{data?.iconColor}</span>
              <span>{data?.label}</span>
            </>
          );
        },
      },
    ],
  },
  {
    label: strings("history.listing"),
    value: 5,
    columns: [
      { title: "#", dataIndex: "index", key: "index", align: "left" },
      {
        title: strings("history.time"),
        dataIndex: "timestamp",
        key: "time",
        align: "left",
        sorter: (a, b) => a.timestamp - b.timestamp,
        render: (time, object) => object.time.format("DD-MM-YYYY hh:mm:ss"),
      },
      {
        title: "Data ID",
        dataIndex: "data",
        key: "time",
        align: "left",
        render: (value, record) => {
          return (
            <StrongTextStyle
              className="hover-pointer"
              onClick={() => {
                window.open(`/data-hub/asset-detail/${value}`, "_blank");
              }}
            >
              {value}
            </StrongTextStyle>
          );
        },
      },
      {
        title: strings("history.price"),
        dataIndex: "dataPrice",
        key: "time",
        align: "right",
        render: (value, record) => {
          return (
            <>
              <strong>{record?.amount} </strong> {record?.currency}
            </>
          );
        },
      },

      // {
      //   title: "Currency",
      //   dataIndex: "currency",
      //   key: "currency",
      //   align: "left",
      // },
      // { title: "Amount", dataIndex: "amount", key: "amount", align: "left" },
      { title: strings("history.type"), dataIndex: "type", key: "type", align: "left" },
    ],
  },
];
