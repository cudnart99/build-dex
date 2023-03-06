import { Table } from "antd";
import React from "react";
import {
  CommonImgWrapper,
  CommonTableWrapper,
  CommonParagraphWrapper,
  CommonTitleWrapper,
  MainTitleDetailWrapper,
  WhitepaperCheckListWrapper,
  FlexBoxWrapper,
  DocumentListWrapper,
} from "./styled";
export const MainTitle = ({ text }) => {
  return <MainTitleDetailWrapper>{text}</MainTitleDetailWrapper>;
};
export const CommonTitle = ({ text, type }) => {
  return <CommonTitleWrapper type={type}>{text}</CommonTitleWrapper>;
};
export const CommonParagraph = ({ text, bold = false }) => {
  return (
    <CommonParagraphWrapper>
      <div
        className={bold == 1 ? "bold1" : bold == 2 ? "bold2" : ""}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
      {/* {text} */}
    </CommonParagraphWrapper>
  );
};
export const BlockID = ({ id }) => {
  return <div style={{ paddingTop: "85px", marginTop: "-70px" }} id={id}></div>;
};
export const BlockIDForTitle = ({ id }) => {
  return <div style={{ paddingTop: "85px", marginTop: "-85px" }} id={id}></div>;
};
export const CommonImg = ({
  src,
  center,
  fullWidth,
  borderRadius,
  className,
  width,
}) => {
  return (
    <CommonImgWrapper
      width={width}
      center={center}
      fullWidth={fullWidth}
      borderRadius={borderRadius}
    >
      <img src={src} className={className} />
    </CommonImgWrapper>
  );
};
export const CommonTable = ({ data, columns, className, ...props }) => {
  return (
    <CommonTableWrapper>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className={className}
        {...props}
      />
    </CommonTableWrapper>
  );
};

export const WhitepaperCheckList = ({
  src,
  checkList,
  styleText,
  styleLi,
  classNameImg,
  render = null,
  ...props
}) => {
  return (
    <WhitepaperCheckListWrapper {...props}>
      {checkList.map((item, index) =>
        render ? (
          render(item, index)
        ) : (
          <li key={index} style={styleLi}>
            <img className={classNameImg} src={src} alt="" />
            <span style={styleText}>{item}</span>
          </li>
        )
      )}
    </WhitepaperCheckListWrapper>
  );
};

export const FlexBox = ({ com1, com2, width1, width2 }) => {
  return (
    <FlexBoxWrapper width1={width1} width2={width2}>
      <div className="com1">{com1}</div>
      <div className="com2">{com2}</div>
    </FlexBoxWrapper>
  );
};
export const DocumentList = ({ text, bold }) => {
  return (
    <FlexBox
      com1={
        <DocumentListWrapper>
          <CommonImg
            src={require("@images/dex/iconList.png")}
            fullWidth={true}
            center={true}
          />
        </DocumentListWrapper>
      }
      com2={<CommonParagraph text={text} bold={bold} />}
      width1="5%"
      width2="94%"
    />
  );
};
export const DocumentList2 = ({ text }) => {
  return (
    <FlexBox
      com1={
        <DocumentListWrapper>
          <CommonImg
            src={require("@images/dex/iconList2.png")}
            fullWidth={true}
            center={true}
          />
        </DocumentListWrapper>
      }
      com2={<CommonParagraph text={text} />}
      width1="5%"
      width2="94%"
    />
  );
};
