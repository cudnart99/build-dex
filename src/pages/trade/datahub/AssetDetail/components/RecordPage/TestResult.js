import BaseResponsive from "@components/base/BaseResponsive";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { strings } from "@utils/index";
import React, { useEffect, useState } from "react";
import { TestResultWrapperStyled } from "./styled";

function TestResult({ data, dataResult, dataDetail }) {
  const dataHoaSinh = dataResult?.xn?.filter(
    (item, index) => item.nhomDichVuCap2 === strings("modal.TestResult.txt")
  );
  const dataHuyetHoc = dataResult?.xn?.filter(
    (item, index) => item.nhomDichVuCap2 === strings("modal.TestResult.txt1")
  );
  const dataViSinh = dataResult?.xn?.filter(
    (item, index) =>
      item.nhomDichVuCap2 === strings("modal.TestResult.txt2") ||
      item.nhomDichVuCap2 === strings("modal.TestResult.txt3")
  );
  const dataKhac = dataResult?.xn?.filter(
    (item, index) => item.nhomDichVuCap2 === strings("modal.TestResult.txt4")
  );

  const dataHuyetHocMerge = dataHuyetHoc?.reduce((total, item, index) => {
    return [...total, item, ...item?.chiSoCon];
  }, []);
  const dataHoaSinhMerge = dataHoaSinh?.reduce((total, item, index) => {
    return [...total, item, ...item?.chiSoCon];
  }, []);
  const dataViSinhMerge = dataViSinh?.reduce((total, item, index) => {
    return [...total, item, ...item?.chiSoCon];
  }, []);
  const dataKhacMerge = dataKhac?.reduce((total, item, index) => {
    return [...total, item, ...item?.chiSoCon];
  }, []);
  const [state, _setState] = useState({
    dataActive: 0,
    page: 0,
    size: 10,
  });
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      render: (data, dataObject, index) => {
        return index + 1;
      },
      width: "5%",
    },
    ,
    {
      title: strings("modal.TestResult.title"),
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      render: (data, dataObject, index) => {
        return (
          <div className={`${data ? "font-title" : ""}`}>
            {/* {(<span className="font-bold">{data}</span>) || (
              <span>{dataObject?.tenChiSo}</span>
            )} */}
            {data || dataObject?.tenChiSo}
          </div>
        );
      },
      width: "50%",
    },
    {
      title: strings("modal.TestResult.title1"),
      dataIndex: "ketQua",
      key: "ketQua",
      width: "15%",
      render: (data, dataObject, index) => {
        return (
          <>
            <div>{data} </div>
          </>
        );
      },
    },
    {
      title: strings("modal.TestResult.title2"),
      dataIndex: "donVi",
      key: "donVi",
      width: "15%",
      render: (data, dataObject, index) => {
        return (
          <div>
            <span>{data}</span>
          </div>
        );
      },
    },
    {
      title: strings("modal.TestResult.title3"),
      dataIndex: "binhThuong",
      key: "binhThuong",
      width: "25%",
      render: (data, dataObject, index) => {
        return (
          <div>
            <span>{data || dataObject.chiSoCao}</span>
          </div>
        );
      },
    },
  ];
  const testObject = [
    {
      title: strings("modal.TestResult.txt"),
      data: dataHoaSinhMerge,
    },
    {
      title: strings("modal.TestResult.txt1"),
      data: dataHuyetHocMerge,
    },
    {
      title: strings("modal.TestResult.txt2"),
      data: dataViSinhMerge,
    },
    {
      title: strings("modal.TestResult.txt4"),
      data: dataKhacMerge,
    },
  ];

  useEffect(() => {}, []);
  return (
    <TestResultWrapperStyled>
      <div className="d-flex mb-4 overflow-scroll-phong">
        <MultipleButtonSelect
          options={[
            {
              text: strings("modal.TestResult.txt"),
            },
            {
              text: strings("modal.TestResult.txt1"),
            },
            {
              text: strings("modal.TestResult.txt2"),
            },
            {
              text: strings("modal.TestResult.txt4"),
            },
          ]}
          onChange={(item, index) => {
            setState({
              dataActive: index,
            });
          }}
        />
      </div>

      <BaseResponsive
        columns={columns}
        dataSource={testObject[state.dataActive]?.data}
        clientSearch={true}
      />
    </TestResultWrapperStyled>
  );
}

export default TestResult;
