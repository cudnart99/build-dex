import styled from "styled-components";

export const WrapperStyled = styled.div`
  /* padding: 100px 40px 400px 40px; */
  /* background-color: rgb(86, 11, 177); */
  padding: 50px 3% 400px 3%;
  /* background: linear-gradient(116.2deg, #3a1c66 -18.51%, #230537 41.78%); */
  color: white;
  /* width */
  .title {
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 55px;
    letter-spacing: -0.02em;

    background: linear-gradient(180deg, #ffffff 13.92%, #ea95bc 92.05%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    width: 1100px;
    margin: auto;
  }
  .content {
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
    display: flex;
    .menu {
      width: 25%;
      position: relative;
      .menu-container {
        position: -webkit-sticky;
        position: sticky;
        top: 80px;
      }
      a {
        display: block;
      }

      span.ant-menu-title-content {
        margin-left: -24px;
      }
      ul.ant-menu-sub > li > span.ant-menu-title-content {
        margin-left: -48px;
      }
      ul.ant-menu-root > li.ant-menu-submenu,
      ul.ant-menu-root > li.ant-menu-item {
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      }
      li.ant-menu-submenu-open
        ul.ant-menu-inline
        span.ant-menu-title-content
        a {
        font-size: 13px;
        color: #cbc0c0;
      }
      a {
        text-decoration: none;
        color: white;
      }
      .ant-menu {
        border: none;
        background-color: rgba(255, 255, 255, 0.05);
        color: white;
      }
      .ant-menu-submenu-arrow {
        color: white;
      }
      .ant-menu-item,
      .ant-menu-inline .ant-menu-item::after {
        border: none;
        /* font-size: 13px; */
      }
      .ant-menu,
      .ant-menu-submenu-selected {
        font-size: 13px;
        color: gray;
      }
      li.ant-menu-submenu-open
        ul.ant-menu-inline
        li.ant-menu-item-selected
        span.ant-menu-title-content
        a,
      li.ant-menu-submenu-open
        ul.ant-menu-inline
        li.ant-menu-item-active
        span.ant-menu-title-content
        a {
        font-size: 13px;
        color: white;
      }
      li.ant-menu-submenu-open ul.ant-menu-inline li.ant-menu-item-selected,
      li.ant-menu-submenu-open ul.ant-menu-inline li.ant-menu-item-active {
        background: rgba(255, 255, 255, 0.05);
      }
      .ant-menu:not(.ant-menu-horizontal),
      .ant-menu-item-selected,
      .ant-menu-item:active,
      .ant-menu-submenu-title:active {
        background: transparent;
      }
      .ant-menu-item-selected,
      .ant-menu-light .ant-menu-item:hover,
      .ant-menu-light .ant-menu-submenu-title:hover,
      /* .ant-menu-submenu-selected, */
      li.ant-menu-submenu-open div.ant-menu-submenu-title span.ant-menu-title-content {
        color: white;
      }
      .ant-menu-item .ant-menu-item-selected .ant-menu-item-only-child {
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        color: white;
        background-color: transparent;
      }
      .ant-menu-submenu .ant-menu-submenu-inline {
        border-bottom: 1px solid white;
      }
    }
    .detail {
      width: 75%;
      /* width: 900px; */
      padding: 20px;
      padding-top: 0px;
      padding-right: 0px;
    }
  }

  .back-to-head {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    position: fixed;
    bottom: 35px;
    right: 35px;
    z-index: 9999;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .menu-icon-container {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    position: fixed;
    bottom: 98px;
    right: 35px;
    z-index: 9999;
    text-align: center;
    img {
      margin-top: 2.7px;
      border-radius: 50%;
      width: 45px;
      height: 45px;
    }
  }
  .block-id-head {
    margin-top: -100px;
    padding-top: 85px;
  }
  @media screen and (min-width: 1201px) {
    .menu-icon-container {
      display: none;
    }
  }
  @media screen and (max-width: 1200px) and (min-width: 700px) {
    .title {
      max-width: 700px;
      margin: auto;
    }
    .content {
      display: flex;
      justify-content: center;

      .menu {
        display: none;
      }
      .detail {
        /* width: 75%; */
        width: 700px;
        padding: 0px;
      }
    }
  }
  @media screen and (max-width: 699px) and (min-width: 320px) {
    .title {
      max-width: 310px;
      margin: auto;
      font-size: 18px;
      line-height: 27px;
    }
    .content {
      display: flex;
      justify-content: center;

      .menu {
        display: none;
      }
      .detail {
        /* width: 75%; */
        width: 310px;
        padding: 0px;
      }
    }
    .back-to-head {
      width: 30px;
      height: 30px;
      bottom: 25px;
      right: 25px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .menu-icon-container {
      width: 30px;
      height: 30px;
      bottom: 70px;
      right: 25px;
      text-align: center;
      img {
        width: 25px;
        height: 25px;
      }
    }
  }
`;
