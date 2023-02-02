import ContentLeftRight from "@pages/trade/components/ContentLeftRight";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { Divider } from "@pages/trade/vesting/components/styled";
import { strings } from "@utils/index";
import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import { MedicResultWrapperStyled } from "./styled";

function MedicResult({ data, dataResult, dataDetail }) {
  const [active, setActive] = useState(0);
  const handleChangeHeader = (index) => {
    setActive(index);
  };
  const arrKham = (dataResult?.kham||[])?.map((item) => ({
    text: item?.tenDichVu,
  }));
  return (
    <MedicResultWrapperStyled>
      <div className="medic-header">
        <div className={"overflow-scroll-phong"}>
          <MultipleButtonSelect
            options={arrKham}
            onChange={(item, index) => {
              handleChangeHeader(index);
            }}
          />
        </div>
      </div>
      <h2>{((dataResult?.kham||[])||[])[active]?.tenDichVu}</h2>
      {active ? (
        <>
          <ContentLeftRight
            left={(dataResult?.kskHopDong||[])[41]?.tenTruong}
            right={(dataResult?.kskHopDong||[])[41]?.giaTri}
            styleRight={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left={strings("modal.MedicResult.txt")}
            right={(dataResult?.kham||[])[active]?.phong}
            styleRight={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left={strings("modal.MedicResult.txt1")}
            right={(dataResult?.kham||[])[active]?.khoa}
            styleRight={{ fontWeight: 700 }}
          />
        </>
      ) : (
        <>
          <ContentLeftRight
            left={(dataResult?.kskHopDong||[])[37]?.tenTruong}
            right={(dataResult?.kskHopDong||[])[37]?.giaTri}
            styleRight={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left={strings("modal.MedicResult.txt")}
            right={(dataResult?.kham||[])[active]?.phong}
            styleRight={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left={strings("modal.MedicResult.txt1")}
            right={(dataResult?.kham||[])[active]?.khoa}
            styleRight={{ fontWeight: 700 }}
          />
        </>
      )}

      {(dataResult?.kham||[])[active]?.hotlineKhoa && (
        <ContentLeftRight
          left={strings("modal.MedicResult.txt2")}
          right={(dataResult?.kham||[])[active]?.hotlineKhoa}
          styleRight={{ fontWeight: 700 }}
        />
      )}
      {dataResult?.thongTinKham && (
        <div className="medic-title">
          <h2>{strings("modal.MedicResult.txt3")}</h2>
          <Divider width={30} />
        </div>
      )}

      {dataResult?.tienSu && (
        <div className="medic-title">
          <h2>{strings("modal.MedicResult.txt4")}</h2>
          <Divider width={30} />
        </div>
      )}
      {dataResult?.chiTietKham && (
        <div className="medic-title">
          <h2>{strings("modal.MedicResult.txt5")}</h2>
          <Divider width={30} />
        </div>
      )}
      <div className="medic-title">
        <h2>{strings("modal.MedicResult.txt6")}</h2>
        <Divider width={30} />
      </div>
      <Row gutter={[24, 24]}>
        {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].map(
          (item, index) => {
            return (
              <>
                {active === 0 && (dataResult?.kskHopDong||[])[item]?.giaTri && (
                  <Col xl={3} lg={8} sm={8} key={index}>
                    <div className="w-700">
                      {(dataResult?.kskHopDong||[])[item]?.tenTruong}
                    </div>
                    <div>{(dataResult?.kskHopDong||[])[item]?.giaTri}</div>
                  </Col>
                )}
              </>
            );
          }
        )}
      </Row>
      {Array.from([39, 40], (el, idx) => (
        <>
          {active === 1 && (dataResult?.kskHopDong||[])[el]?.giaTri && (
            <div>
              <div className="w-700">
                {(dataResult?.kskHopDong||[])[el]?.tenTruong}
              </div>
              <div>- {(dataResult?.kskHopDong||[])[el]?.giaTri}</div>
            </div>
          )}
        </>
      ))}

      {(dataResult?.kham||[])[active]?.cdBanDau && (
        <>
          <ContentLeftRight
            left={strings("modal.MedicResult.txt7")}
            right=""
            styleLeft={{ fontWeight: 700 }}
            marginBottom={0}
          />
          <ContentLeftRight
            left={(dataResult?.kham||[])[active]?.cdBanDau
              ?.split("/")
              .map((item, index) => (
                <div>- {item}</div>
              ))}
          />
        </>
      )}
      {(dataResult?.kham||[])[active]?.cdChinh && (
        <>
          <ContentLeftRight
            left={strings("modal.MedicResult.txt8")}
            right=""
            styleLeft={{ fontWeight: 700 }}
            marginBottom={0}
          />
          <ContentLeftRight
            left={(dataResult?.kham||[])[active]?.cdChinh
              ?.formatBenhAn()
              .map((itemm, index) => (
                <div key={index}>- {itemm}</div>
              ))}
          />
        </>
      )}
      {(dataResult?.kham||[])[active]?.cdKhac && (
        <>
          <ContentLeftRight
            left={strings("modal.MedicResult.txt9")}
            right=""
            styleLeft={{ fontWeight: 700 }}
            marginBottom={0}
          />
          <ContentLeftRight
            left={(dataResult?.kham||[])[active]?.cdKhac
              ?.split(";")
              ?.map((item, index) => (
                <div>{item}</div>
              ))}
          />
        </>
      )}
      {(dataResult?.kham||[])[active]?.loiDan && (
        <div>
          <ContentLeftRight
            left={strings("modal.MedicResult.txt10")}
            right=""
            styleLeft={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left={(dataResult?.kham||[])[active]?.loiDan
              ?.formatBenhAn()
              .map((itemm, index) => (
                <div key={index}>{itemm}</div>
              ))}
          />
        </div>
      )}
    </MedicResultWrapperStyled>
  );
}

export default MedicResult;
