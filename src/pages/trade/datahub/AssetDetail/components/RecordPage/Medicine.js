import BaseResponsive from "@components/base/BaseResponsive";
import { TradeTable } from "@pages/trade/components/styled";
import { strings } from "@utils/index";
import React from "react";
import { MedicineWrapperStyled } from "./styled";

function Medicine({ data, dataResult, dataDetail }) {
  const columns = [
    {
      title: strings("modal.Medicine.title"),
      dataIndex: "stt",
      key: "stt",
      render: (data, dataObject, index) => {
        return index + 1;
      },
      width: "20%",
    },
    {
      title: strings("modal.Medicine.title2"),
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      width: "40%",
      render: (data, dataObject, index) => {
        return (
          <>
            <b>{data}</b>
            <div>
              {dataObject?.lieuDung} {dataObject?.cachDung}{" "}
            </div>
          </>
        );
      },
    },
    {
      title: strings("modal.Medicine.title3"),
      dataIndex: "soLuong",
      key: "soLuong",
      width: "40%",
      render: (data, dataObject, index) => {
        return (
          <div>
            <span>
              {data} {dataObject.donVi}
            </span>
          </div>
        );
      },
    },
  ];
  const devideBacsi = (dataResult) => {
    let newArr = [];
    dataResult?.map((item, index) => {
      if (!newArr?.includes(item?.bacSiChiDinh)) newArr.push(item.bacSiChiDinh);
    });
    return newArr;
  };

  return (
    <MedicineWrapperStyled>
      {devideBacsi(dataResult?.donThuoc).map((item) => {
        const arr = dataResult?.donThuoc?.filter((itemChild) => {
          return itemChild?.bacSiChiDinh === item;
        });
        return (
          <div>
            <h2>{strings("modal.Medicine.title4")}: {item}</h2>
            {/* <TradeTable
              tableLayout="fixed"
              columns={columns}
              dataSource={arr}
              
              style={{ borderBottom: "solid #fff 2px" }}
              
              scroll={{ y: 500 }}
              showSizeChanger={false}
              pagination={{ defaultPageSize: 1000, hideOnSinglePage: true }}
            /> */}
            <BaseResponsive
              columns={columns}
              dataSource={arr}
              clientSearch={true}
            />
          </div>
        );
      })}
      {/* <TradeTable tableLayout="fixed" columns={columns} dataSource={dataResult?.donThuoc} pagination={{hideOnSinglePage : true}} /> */}
    </MedicineWrapperStyled>
  );
}

export default Medicine;
