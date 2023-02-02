import ContentLeftRight from "@pages/trade/components/ContentLeftRight";
import { strings } from "@utils/index";
import moment from "moment";
import React from "react";
import { AdministrativeWrapper } from "./styled";

function Administrative({ data, dataDetail, dataResult }) {
  return (
    <AdministrativeWrapper>
      {dataResult?.diaChi&&<ContentLeftRight
        left={strings("modal.Administrative.txt")}
        right={dataResult?.diaChi}
        styleRight={{ fontWeight: 700 }}
      />}
      {/* <div className="adminis-space"></div> */}
      {dataResult?.soCanCuoc&&<ContentLeftRight
        left={strings("modal.Administrative.txt1")}
        right={dataResult?.soCanCuoc}
        styleRight={{ fontWeight: 700 }}
      />}
      {/* <div className="adminis-space"></div> */}
      {dataDetail?.khoa&&<ContentLeftRight
        left={strings("modal.Administrative.txt2")}
        right={dataDetail?.khoa}
        styleRight={{ fontWeight: 700 }}
      />}
      {/* <div className="adminis-space"></div> */}
      {(dataResult?.ngayRaVien || data?.updatedDate)&&<ContentLeftRight
        left={strings("modal.Administrative.txt3")}
        right={moment(dataResult?.ngayRaVien || data?.updatedDate)?.format(
          "DD/MM/YYYY, h:mm:ss a"
        )}
        styleRight={{ fontWeight: 700 }}
      />}
      {dataResult?.ngayVaoVien&&<ContentLeftRight
        left={strings("modal.Administrative.txt4")}
        right={moment(dataResult?.ngayVaoVien)?.format(
          "DD/MM/YYYY, h:mm:ss a"
        )}
        styleRight={{ fontWeight: 700 }}
      />}
     {dataResult?.maBenhAn&& <ContentLeftRight
        left={strings("modal.Administrative.txt5")}
        right={dataResult?.maBenhAn}
        styleRight={{ fontWeight: 700 }}
      />}
      {dataResult?.soTheBaoHiem&&<ContentLeftRight
        left={strings("modal.Administrative.txt6")}
        right={dataResult?.soTheBaoHiem}
        styleRight={{ fontWeight: 700 }}
      />}
    </AdministrativeWrapper>
  );
}

export default Administrative;
