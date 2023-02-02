import { Modal } from "antd";
import styled, { css } from "styled-components";

export const AssetDetailWrapper = styled.div`
  .ant-switch-checked {
    background-color: #007817;
  }
  padding: 0 5%;
  padding-top: 32px;
  .detail-page__head {
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
    .head-left {
      width: 30%;
      background: linear-gradient(90deg, #d3efe5 0%, #88c3ad 83.69%);
      /* height: 365px; */
      height: 423px;
      max-width: 428px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-top-left-radius: 45%;
      border-top-right-radius: 45%;
      position: relative;
      @media screen and (max-width: 991px) and (min-width: 768px) {
        height: 356px;
      }
      @media screen and (max-width: 767px) and (min-width: 576px) {
        height: 270px;
        margin-top: 25px;
        margin: auto;
        width: 42%;
      }
      @media screen and (max-width: 575px) {
        height: 200px;
        margin-top: 25px;
        margin: auto;
        width: 42%;
      }
      .circle {
        width: 360px;
        height: 360px;
        border-radius: 50%;
        background-color: transparent;
        opacity: 0.3;
        position: absolute;
        z-index: -1;
      }
      .circle-1 {
        left: -24px;
        top: 12px;
        border: 2px solid #00945d;
      }
      .circle-2 {
        border: 2px solid #00945d;
        right: -24px;
        top: -12px;
      }
      .asset-image {
        width: 70%;
      }
    }
    .head-right {
      width: 70%;
      margin-left: 33px;
      @media screen and (max-width: 768px) {
        width: 100%;
        margin: 0;
      }
      .footer-detail {
        margin-top: 50px;
      }
      .switch-show-data-btn {
        /* padding-left: 16px; */
        span {
          font-weight: 400;
          font-size: 16px;
          line-height: 30px;
          text-align: justify;
          color: #ffffff;
          margin-right: 12px;
        }
        /* .ant-switch-checked {
          background-color: #007817;
        } */
      }
      .asset-code-and-like {
        margin-top: 16px;
        .code {
          font-weight: 700;
          font-size: 30px;
          line-height: 36px;
          height: 72px;
          color: #ffffff;
          word-wrap: break-word;
          white-space: normal;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;

          @media screen and (max-width: 576px) {
            font-size: 24px;
            line-height: 26px;
          }
        }
        .favorite-btn {
          margin-left: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border-radius: 10px;
          border: 1px solid #c6c6c6;
          padding: 24px 16px;
          &.is-liked {
            svg {
              fill: red !important;
            }
          }
        }
      }
      .small-asset-detail {
        margin-bottom: 15px;
        .small-asset-detail__item {
          margin-right: 24px;
        }
        span {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #ffffff;
          margin-left: 4px;
        }
        .view,
        .date {
          svg {
            circle,
            path {
              stroke: white;
            }
          }
        }
      }
      .tags-list {
        margin-top: 20px;
        span:first-child {
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: #c6c6c6;
          margin-right: 4px;
        }
        span:last-child {
          font-weight: 700;
          font-size: 14px;
          line-height: 18px;
          color: #ffffff;
        }
      }
      .current-bid-info {
        margin-top: 0px;
        border-radius: 20px;
        width: 60%;
        max-width: 395px;
        /* border: 2px solid #048556;
        background-color: rgba(31, 48, 78, 0.5); */
        padding: 16px;
        color: #ffffff;
        @media screen and (max-width: 768px) {
          width: 100%;
          max-width: none;
        }
        .info {
          &-name {
            &-img {
              width: 40px;
              height: auto;
              margin: 5px 0;
            }
            &-address {
              font-weight: 500;
              font-size: 16px;
              line-height: 20px;
            }
          }
          &-money {
            &-price {
              font-weight: 700;
              font-size: 24px;
              line-height: 22px;
            }
          }
        }
      }
      .requester-and-creator {
        margin-top: 20px;
        .requester,
        .creator {
          align-items: center;
          margin-right: 16px;
          img {
            width: 40px;
            height: 40px;
            margin-right: 8px;
          }
          p {
            margin-bottom: 0px;
          }
          p:first-child {
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: #ffffff;
          }
          p:last-child {
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #ffffff;
          }
        }
      }
    }
  }
  .icon-medicDetail {
    display: flex;
    align-items: center;
    .react-share__ShareButton {
      padding: 4px 15px !important;
    }
    .ant-btn,
    .share-btn {
      border: none;
      outline: none;
      box-shadow: none;
      background-color: transparent;
      svg {
        width: 16px;
        height: 16px;
        @media screen and (max-width: 576px) {
          width: 14px;
          height: 14px;
        }
      }
    }
    .share-disable-btn {
      border: none;
      outline: none;
      box-shadow: none;
      color: #6e6e6e;
      background-color: transparent;
      margin-left: 30px;
      svg {
        width: 16px;
        height: 16px;
        @media screen and (max-width: 576px) {
          width: 14px;
          height: 14px;
        }
      }
    }
  }

  .detail-page__body-wrapper {
    margin-top: 48px;
    margin-bottom: 48px;
    /* background-color: rgb(36, 13, 64, 0.5);
    border-radius: 10px; */
    min-height: 200px;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
    .left-body {
      width: 26%;
      /* padding: 24px; */
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
    .right-content {
      padding: 24px;
      background-color: rgb(36, 13, 64, 0.5);
      border-radius: 10px;
    }
    .left-content {
      /* width: 26%; */
      padding: 24px;
      background-color: rgb(36, 13, 64, 0.5);
      border-radius: 10px;
    }
    .bottom-content {
      margin-top: 20px;
      padding: 24px;
      background-color: rgb(36, 13, 64, 0.5);
      border-radius: 10px;
    }

    .right-content {
      width: 70%;
      margin-left: 33px;
      @media screen and (max-width: 768px) {
        width: 100%;
        margin-top: 20px;
        margin-right: 0;
        margin-left: 0;
      }
    }
    .detail-body__title {
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
      text-transform: uppercase;
      color: #61ca96;
      margin-bottom: 24px;
    }
    .detail-body__content {
      margin-bottom: 20px;
      .keyword-item {
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
        text-align: justify;
        color: #ffffff;
        margin-right: 8px;
      }
      .content-line {
        margin-bottom: 8px;
        display: flex;
      }
      .type-prop {
        display: block;
        font-weight: 400;
        font-size: 16px;
        line-height: 30px;
        color: #ffffff;
        min-width: 100px;
        word-break: break-word;
      }
      .type-value {
        font-weight: bold;
        /* font-size: 16px; */
        line-height: 30px;
        color: #ffffff;
        /* text-align: justify; */
        color: #ffffff;
        /* margin-left: 30px; */
        word-break: break-word;
      }
    }
    .content-list {
      background: none;
    }
    .content-list__item {
      color: white;
      margin-bottom: 20px;
      background: rgba(28, 12, 49, 0.3);
      border-radius: 5px;
      border: none;
    }
    .content-list__item-header {
      /* font-weight: 700;
      font-size: 14px;
      line-height: 22px; */
    }
    .iconList {
      margin-right: 10px;
    }
    .iconList path {
      fill: white;
    }
    .iconList-green {
      margin-right: 10px;
    }
    .iconList-green path {
      fill: #61ca96;
    }
    .info-profile__detail {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #ffffff;
    }
    .detail-content {
      margin-right: auto;
      margin-left: auto;
      width: 50%;
      text-align: center;
    }
    .icon-Locked {
      margin-left: auto;
      margin-right: auto;
      display: block;
      background: #35186c;
      border-radius: 50%;
    }
    .detail-content__text-header {
      font-weight: 600;
      line-height: 22px;
      font-size: 20px;
      color: #c6c6c6;
    }
    .detail-content__text-body {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #6e6e6e;
    }
    .list-content {
      list-style: disc;
      padding: revert;
      font-size: 16px;
      color: #c6c6c6;
    }
    hr {
      margin-bottom: 24px;
    }
    .detail-body__keyword {
    }
    .detail-body__type {
    }
    .detail-body__description {
      p {
        font-weight: 200;
        font-size: 16px;
        line-height: 20px;
        text-align: justify;
        color: #ffffff;
        word-break: break-word;
        white-space: pre-line;
        @media screen and (max-width: 576px) {
          font-size: 14px;
        }
      }
    }
  }
  .detail-page__relate {
    margin-top: 32px;
    h1 {
      font-weight: 700;
      font-size: 30px;
      line-height: 55px;
      color: #ffffff;
    }
  }
`;

export const CustomBreadCrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 200;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
    margin-right: 8px;
  }
  .anticon {
    display: flex;
    align-items: center;
    justify-content: center;
    &:last-child {
      display: none;
    }
  }
`;

export const RelateAssetWrapper = styled.div`
  margin-bottom: 24px;
  .slick-arrow {
    z-index: 100;
    width: unset;
  }
  .ant-carousel .slick-prev,
  .ant-carousel .slick-next,
  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-next:hover,
  .ant-carousel .slick-prev:focus,
  .ant-carousel .slick-next:focus {
    font-size: inherit;
    color: currentColor !important;
  }
  .content-group-5 {
    display: flex;
  }

  /* .ant-carousel .slick-prev::before {
    color: currentColor !important;
  } */

  .slick-arrow.slick-prev {
    font-size: 20px !important;
  }

  /* .ant-carousel .slick-next::before {
    color: currentColor !important;
  } */

  .slick-arrow.slick-next {
    font-size: 20px !important;
  }
  .ant-carousel .slick-next::before {
    content: "";
  }
  .ant-carousel .slick-prev::before {
    content: "";
  }
  .anticon {
    padding: 8px;
    border-radius: 50%;
    svg {
      fill: white;
      width: 24px;
      height: 24px;
    }
  }
  .anticon:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

export const DetailInfoWrapper = styled.div``;
export const ModalReportWrapper = styled(Modal)`
  .ant-modal-close-x {
    padding-top: 4px;
    .anticon-close {
      svg {
        fill: black;
      }
    }
  }
  .ant-modal-header {
    border: none;
  }
  .ant-modal-body {
    padding-top: 0px;
  }
  .ant-modal-footer {
    border: none;
  }
  .data-and-token-field {
    .data-field {
      span:last-child {
        margin-left: 16px;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #9b5fcc;
      }
    }
    .token-field {
      span {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #9b5fcc;
      }
    }
  }
  .reason-field,
  .description-field {
    textarea {
      border: 1px solid #6e6e6e;
      border-radius: 20px;
      &::placeholder {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #6e6e6e;
      }
      padding: 16px 16px;
    }
  }
  .upload-image-field {
    .ant-upload-list {
      display: flex;
      flex-wrap: wrap;
      .ant-btn {
        border: none;
      }
      .ant-upload-select {
      }
      .ant-upload-list-item {
        border-radius: 5px;
      }
    }
  }
  .agreement-field {
    border: 1px solid #9b5fcc;
    border-radius: 10px;
    padding: 12px;
    .agreement-description span {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      text-align: justify;
      color: #000000;
    }
    .checkbox-agreement {
      span:last-child {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: justify;
        color: #6e6e6e;
      }
    }
  }
  .field-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #2b2b2b;
  }
`;

export const ModalListingWrapper = styled(Modal)`
  max-width: 650px;
  .ant-modal-footer,
  .ant-modal-header {
    border: none;
  }
  .ant-modal-close-x {
    padding-top: 4px;
  }
  .progress-btn {
    .ant-btn {
      display: flex;
      align-items: center;
      border: none;
      outline: none;
      color: #6e5ac3;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      .anticon-arrow-right {
        padding-top: 4px;
      }
    }
  }
  .ant-steps-item-finish
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot,
  .ant-steps-item-process
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot,
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background: #0a9921;
  }
  .step-content__wrapper {
    margin-top: 32px;
  }
  .price-field__wrapper {
    min-height: 80px;
    border-radius: 20px;
    border: 1px solid #6e6e6e;
    padding: 8px 24px;
    .input-listing-price {
      border: none;
      outline: none;
      width: 80%;
    }
  }
`;
const collapseGeneralStyle = css`
  .ant-collapse {
    background: transparent !important;
    color: white !important;
    border: none;
  }
  .ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-header-text {
    flex: auto;
    color: white;
    font-weight: bold;
  }
  .ant-collapse-content {
    color: white;
    background-color: transparent;
  }
  .ant-collapse > .ant-collapse-item {
    border-bottom: none;
    background: rgba(28, 12, 49, 0.3);
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    flex-direction: row-reverse;
  }

  .ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-arrow
    svg {
    transform: rotate(90deg);
  }
  .ant-collapse-header[aria-expanded="true"] {
    .anticon {
      svg {
        transform: rotate(270deg) !important;
        path {
          fill: #42dca3;
        }
      }
    }
  }

  .ant-collapse-item > .ant-collapse-item-active {
    * {
      fill: white;
    }
  }
`;
export const RecordDetailWrapper = styled.div`
  ${collapseGeneralStyle}
  /* padding: 24px;
  background-color: rgb(36, 13, 64, 0.5); */
  border-radius: 10px;
  color: #ffffff;
  margin: 30px 0;
  width: 100%;
  min-height: 900px;
  @media screen and (max-width: 768px) {
    padding: 0;
    background-color: unset;
    min-height: 550px;
  }
  .record {
    &-title {
      color: #61ca96;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 20px;
      line-height: 22px;
      @media screen and (max-width: 768px) {
        padding: 24px;
      }
    }
    &-header {
      display: flex;
      justify-content: space-around;
    }
    &-header:hover {
      cursor: pointer;
    }
  }
  svg {
    path {
      fill: #fff;
    }
  }
  .header-actived {
    color: #61ca96;
    font-weight: 600;
  }
  .actived-icon {
    svg {
      path {
        fill: #61ca96;
      }
    }
  }
  .provider-under {
    width: 100%;
    height: 2px;
    background-color: #61ca96;
  }
`;

export const RecordNoiTruWrapperStyled = styled.div`
  ${collapseGeneralStyle}

  /* padding: 24px; */
  /* background-color: rgb(36, 13, 64, 0.5); */
  border-radius: 10px;
  color: #ffffff;
  margin: 30px 0;
  width: 100%;
  min-height: 900px;
  @media screen and (max-width: 768px) {
    padding: 0;
    background-color: unset;
    min-height: 365px;
  }
  .record {
    &-title {
      color: #61ca96;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
      @media screen and (max-width: 768px) {
        padding: 24px;
      }
    }
    &-header {
      display: flex;
      justify-content: space-around;
    }
    &-header:hover {
      cursor: pointer;
    }
  }
  svg {
    path {
      fill: #fff;
    }
  }
  .header-actived {
    color: #61ca96;
    font-weight: 600;
  }
  .actived-icon {
    svg {
      path {
        fill: #61ca96;
      }
    }
  }
`;
