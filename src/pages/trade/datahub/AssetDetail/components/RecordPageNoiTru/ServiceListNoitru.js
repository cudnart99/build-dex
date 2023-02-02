import ContentLeftRight from "@pages/trade/components/ContentLeftRight";
import { Divider } from "@pages/trade/vesting/components/styled";
import { strings } from "@utils/index";
import moment from "moment";
import React from "react";
import { ServiceListNoitruWrapper } from "./styled";

function ServiceListNoitru({ data, dataResult, dataDetail }) {
  return (
    <ServiceListNoitruWrapper>
      <h2>{data?.hospitalName}</h2>
      <ContentLeftRight
        left={strings("modal.ServiceListNoitru.txt")}
        right={moment(data?.timeGoIn)?.format(
          "DD/MM/YYYY, h:mm:ss a"
        )}
        styleRight={{ fontWeight: 700 }}
      />
      <p>{strings("modal.ServiceListNoitru.txt1")}</p>
      <ul>
        {dataDetail?.dichVu?.map((item, index) => (
          <li key={index}>
            {item.trangThai !== 310 && (
              <ContentLeftRight
                left={item.tenDichVu}
                right={`${item.thanhTienDichVu.formatCurrency()}đ`}
              />
            )}
          </li>
        ))}
      </ul>
      <Divider 
        marginTop={10}
        marginBottom={20}
        opacity={0.1}
      />
      <ContentLeftRight
        left={strings("modal.ServiceListNoitru.txt2")}
        right={`${dataDetail?.tongTien?.formatCurrency()}đ`}
        styleRight={{fontWeight : 700}}
      />
      <ContentLeftRight
        left={strings("modal.ServiceListNoitru.txt3")}
        right={`${dataDetail?.nbThanhToan?.formatCurrency()}đ`}
        styleRight={{fontWeight : 700}}
      />
    </ServiceListNoitruWrapper>
  );
}

export default ServiceListNoitru;
