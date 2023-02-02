import {
  DanhSachDichVuIcon,
  ProfileDataIcon,
  ThongTinHanhChinhIcon,
  TomTatBenhAnIcon,
} from "@assets/svg";
import { strings } from "@utils/index";
import { Collapse } from "antd";
import React from "react";
import ProfileRecord from "./components/RecordPage/ProfileRecord";
import Administrative from "./components/RecordPageNoiTru/Administrative";
import MedicalRecordNoitru from "./components/RecordPageNoiTru/MedicalRecordNoitru";
import ServiceListNoitru from "./components/RecordPageNoiTru/ServiceListNoitru";
import { RecordNoiTruWrapperStyled } from "./styled";

function HOC(Component, props) {
  return <Component {...props} />;
}

function RecordDetailNoitru(props) {
  const { data, dataResult, dataDetail } = props;

  const headerNav = [
    {
      component: ProfileRecord,
      title: strings("modal.RecordDetailNoitru.title1"),
      icon: ProfileDataIcon,
      length: 20,
    },
    {
      component: ServiceListNoitru,
      title: strings("modal.RecordDetailNoitru.title2"),
      icon: DanhSachDichVuIcon,
      length: 80 / 3,
    },
    {
      component: Administrative,
      title: strings("modal.RecordDetailNoitru.title3"),
      icon: ThongTinHanhChinhIcon,
      length: 80 / 3,
    },
    {
      component: MedicalRecordNoitru,
      title: strings("modal.RecordDetailNoitru.title4"),
      icon: TomTatBenhAnIcon,
      length: 80 / 3,
    },
  ];

  return (
    <RecordNoiTruWrapperStyled>
      <h2 className="record-title">{strings("modal.RecordDetailNoitru.txt1")}</h2>
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
      
    </RecordNoiTruWrapperStyled>
  );
}

export default RecordDetailNoitru;
