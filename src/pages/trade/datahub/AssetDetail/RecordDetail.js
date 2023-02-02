import {
  CdhaIcon,
  DanhSachDichVuIcon,
  KetQuaKhamIcon,
  KetQuaXetNghiemIcon,
  PhauThuatIcon,
  ProfileDataIcon,
  ThuocIcon,
} from "@assets/svg";
import { strings } from "@utils/index";
import { Collapse } from "antd";
import React from "react";
import CDHA from "./components/RecordPage/CDHA";
import Medicine from "./components/RecordPage/Medicine";
import MedicResult from "./components/RecordPage/MedicResult";
import ProfileRecord from "./components/RecordPage/ProfileRecord";
import ServiceList from "./components/RecordPage/ServiceList";
import Surgery from "./components/RecordPage/Surgery";
import TestResult from "./components/RecordPage/TestResult";
import { RecordDetailWrapper } from "./styled";

function HOC(Component, props) {
  return <Component {...props} />;
}

function RecordDetail(props) {
  const { data, dataResult, dataDetail } = props;

  const headerNav = [
    {
      component: ProfileRecord,
      title: strings("component.profile"),
      icon: ProfileDataIcon,
      length: 10,
    },
    {
      component: ServiceList,
      title: strings("component.DSDV"),
      icon: DanhSachDichVuIcon,
      length: 17,
    },
    {
      component: MedicResult,
      title: strings("component.KQK"),
      icon: KetQuaKhamIcon,
      length: 14.5,
    },
    {
      component: TestResult,
      title: strings("component.KQXN"),
      icon: KetQuaXetNghiemIcon,
      length: 13.8,
    },
    {
      component: CDHA,
      title: strings("component.CDHA"),
      icon: CdhaIcon,
      length: 14.5,
    },
    {
      component: Surgery,
      title: strings("component.PT&TT"),
      icon: PhauThuatIcon,
      length: 21.2,
    },
    {
      component: Medicine,
      title: strings("component.medicine"),
      icon: ThuocIcon,
      length: 8.4,
    },
  ];

  return (
    <RecordDetailWrapper>
      <h2 className="record-title">
        {dataResult?.khamSucKhoeHopDong ? strings("modal.RecordDetail.txt1") : strings("modal.RecordDetail.txt2")}
      </h2>
      <Collapse>
        {headerNav.map((item, index) => {
          let Icon = item.icon;
          return (
            <Collapse.Panel
              header={
                <div className="d-flex align-items-center">
                  <Icon />
                  <span className="ml-2"> {item.title}</span>
                </div>
              }
              key={index}
            >
              {HOC(item.component, {
                data,
                dataResult,
                dataDetail,
              })}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </RecordDetailWrapper>
  );
}

export default RecordDetail;
