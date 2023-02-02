import { strings } from "@utils/index";
import React from "react";
import { MedicalRecordNoitruWrapper } from "./styled";

function MedicalRecordNoitru({ data, dataResult, dataDetail }) {
  const getTrangThai = (state) => {
    switch (state) {
      case "PaidOut":
        return strings("modal.MedicalRecordNoitru.txt");
      case "New":
        return strings("modal.MedicalRecordNoitru.txt1");
      case "TransferDepartment":
        return strings("modal.MedicalRecordNoitru.txt2");
      case "InHospital":
        return strings("modal.MedicalRecordNoitru.txt3");
      case "AppointmentIsPaid":
        return strings("modal.MedicalRecordNoitru.txt4");
      case "OutHospital":
        return strings("modal.MedicalRecordNoitru.txt5");
      case "OutpatientTreatment":
        return strings("modal.MedicalRecordNoitru.txt6");
      case "AppointmentNotPaid":
        return strings("modal.MedicalRecordNoitru.txt7");
    }
  };
  return (
    <MedicalRecordNoitruWrapper>
      {dataResult?.trangThaiNb&&<>
      <b>{strings("modal.MedicalRecordNoitru.txt8")}:</b>
      <p>{getTrangThai(dataResult?.trangThaiNb)}</p>
      </>}
      <b>{strings("modal.MedicalRecordNoitru.txt9")}:</b>
      <p>{dataResult?.quaTrinhBenhLyDbCls}</p>
      <b>{strings("modal.MedicalRecordNoitru.txt10")}:</b>
      <p>{dataResult?.tomTatKqCls}</p>
      <b>{strings("modal.MedicalRecordNoitru.txt11")}:</b>
      <p>{dataResult?.chanDoanRaVien}</p>

      {/* data khac Null thi render */}
      

      {dataResult?.chanDoanVaoVien && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt12")}:</b>
          <p>{dataResult?.chanDoanVaoVien}</p>
        </>
      )}
      {dataResult?.chanDoanRaVienKhac && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt13")}:</b>
          <p>{dataResult?.chanDoanRaVienKhac}</p>
        </>
      )}

      {dataResult?.chanDoanRaVienChiTiet && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt14")}:</b>
          <p>{dataResult?.chanDoanRaVienChiTiet}</p>
        </>
      )}

      {dataResult?.loiDanBacSi && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt15")}:</b>
          <p>{dataResult?.loiDanBacSi}</p>
        </>
      )}

      {dataResult?.phuongPhapDieuTri && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt16")}:</b>
          <p>{dataResult?.phuongPhapDieuTri}</p>
        </>
      )}
      {dataResult?.quaTrinhBenhLyDbCls && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt17")}:</b>
          <p>{dataResult?.quaTrinhBenhLyDbCls}</p>
        </>
      )}
      {dataResult?.tomTatKqCls && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt18")}:</b>
          <p>{dataResult?.tomTatKqCls}</p>
        </>
      )}
      {dataResult?.huongDieuTri && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt19")}:</b>
          <p>{dataResult?.huongDieuTri}</p>
        </>
      )}
      {dataResult?.ketQuaDieuTri && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt20")}:</b>
          <p>{dataResult?.ketQuaDieuTri}</p>
        </>
      )}
      {dataResult?.hinhThucRaVien && (
        <>
          <b>{strings("modal.MedicalRecordNoitru.txt21")}:</b>
          <p>{dataResult?.hinhThucRaVien}</p>
        </>
      )}
    </MedicalRecordNoitruWrapper>
  );
}

export default MedicalRecordNoitru;
