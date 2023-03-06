import styled from "styled-components";

export const MainTitleDetailWrapper = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  background: linear-gradient(180deg, #ffffff 13.92%, #ea95bc 92.05%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-bottom: 0px;
  @media screen and (max-width: 1200px) and (min-width: 700px) {
    font-size: 24px;
    line-height: 32px;
  }
  @media screen and (max-width: 699px) and (min-width: 320px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const CommonTitleWrapper = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  /* text-align: justify; */
  color: #ffffff;
  margin-bottom: 15px;
  text-align: ${(props) => (props.type === "center" ? "center" : "")};
  @media screen and (max-width: 1200px) and (min-width: 700px) {
    font-size: 20px;
    line-height: 28px;
  }
  @media screen and (max-width: 699px) and (min-width: 320px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const CommonParagraphWrapper = styled.div`
  filter: none;
  -webkit-filter: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: justify;
  color: #ffffff;
  margin-bottom: 15px;
  @media screen and (max-width: 1200px) and (min-width: 700px) {
    font-size: 14px;
    line-height: 18px;
  }
  @media screen and (max-width: 699px) and (min-width: 320px) {
    font-size: 12px;
    line-height: 16px;
  }
  .bold1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    padding-top: 4px;
  }
  .bold2 {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    padding-top: 8px;
  }
`;

export const CommonImgWrapper = styled.div`
  margin: 20px 0px;
  img {
    width: ${(props) => (props.fullWidth ? "100%" : props?.width)};
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "")};
  }
  text-align: ${(props) => (props.center ? "center" : "")};
`;

export const WhitepaperH1 = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: justify;
  color: #ffffff;
  margin-bottom: 32px;
  margin-top: 32px;
`;

export const WhitepaperH2 = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: justify;
  color: #ffffff;
  margin-top: 24px;
  margin-bottom: 24px;
  @media screen and (max-width: 1200px) and (min-width: 700px) {
    font-size: 20px;
    line-height: 24px;
  }
  @media screen and (max-width: 699px) and (min-width: 320px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const WhitepaperH3 = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: justify;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 1200px) and (min-width: 700px) {
    font-size: 14px;
    line-height: 18px;
  }
  @media screen and (max-width: 699px) and (min-width: 320px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const WhitepaperParagraph = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: justify;
  color: #ffffff;
  @media screen and (max-width: 1200px) and (min-width: 700px) {
    font-size: 14px;
    line-height: 18px;
  }
  @media screen and (max-width: 699px) and (min-width: 320px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const WhitepaperCheckListWrapper = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  li {
    display: flex;
    img {
      width: 18px;
      height: 18px;
      margin-top: 3px;
    }
    img.green-plus {
      width: 18px;
      height: 18px;
      margin-top: 0px;
    }
    p,
    span {
      margin-left: 12px;
    }
  }
`;

export const CommonTableWrapper = styled.div`
  margin: 24px 0px;
  .ant-table-cell::before {
    display: none;
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 10px;
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 10px;
  }
  .ant-table {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .ant-table-thead .ant-table-cell {
    background: #7251b2;
    color: white;
  }
  .ant-table-tbody .ant-table-cell {
    background: #361953;
    color: white;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: #361953;
  }
  .ant-table-tbody > tr > td:first-child {
    border-left: 1px solid white;
  }
  .ant-table-tbody > tr > td:last-child {
    border-right: 1px solid white;
  }
  /* .ant-table-tbody > tr > td:not(:last-child):not(:first-child) {
    border-right: 1px dotted white;
    border-left: 1px dotted white;
  }  */
  .ant-table-cell {
    padding: 16px 30px;
  }
  .ant-table-tbody .ant-table-cell {
    border-right: 1px dashed gray;
  }
`;

export const FlexBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .com1 {
    width: ${(props) => (props.width1 ? props.width1 : "")};
  }
  .com2 {
    width: ${(props) => (props.width2 ? props.width2 : "")};
  }
`;

export const SVGWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const DocumentListWrapper = styled.div`
  img {
    margin-top: -25px;
  }
`;
