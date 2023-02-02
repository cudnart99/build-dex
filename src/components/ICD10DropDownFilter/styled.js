import styled from "styled-components";

export const ICD10DropDownWrapper = styled.div`
  .show {
    text-decoration: underline;
    color: #c6c6c6;
    cursor: pointer;
  }
  .ant-menu-inline.ant-menu-root .ant-menu-item,
  .ant-menu-inline.ant-menu-root .ant-menu-submenu-title {
    margin: 0;
    /* height: 30px; */
  }
  .filter-group__title {
    color: #8ed8b3;
    font-size: 16px;
    line-height: 22px;
    font-weight: 700;
  }
  .ant-menu-submenu-title {
    padding: 0 !important;
    .ant-menu-title-content {
      margin-left: 10px;
    }
  }
  .ant-menu {
    border: none;
  }
  .ant-menu-inline {
    background: transparent;
  }
  .ant-menu-submenu-arrow {
    color: white;
  }
  .ant-menu-inline.ant-menu-root .ant-menu-item > .ant-menu-title-content,
  .ant-menu-inline.ant-menu-root
    .ant-menu-submenu-title
    > .ant-menu-title-content {
    color: white;
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: transparent;
  }
  .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow,
  .ant-menu-submenu:hover
    > .ant-menu-submenu-title
    > .ant-menu-submenu-expand-icon {
    color: white;
  }
  .ant-menu-inline.ant-menu-root .ant-menu-item,
  .ant-menu-inline.ant-menu-root .ant-menu-submenu-title {
    display: flex;
    align-items: center;
    transition: border-color 0.3s, background 0.3s,
      padding 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);

    display: flex;
    flex-direction: row-reverse;
  }
  .ant-menu-item:active,
  .ant-menu-submenu-title:active {
    background: transparent;
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: white;
  }
  .ant-checkbox-wrapper {
    margin-right: 2px;
    margin-top: -5px;
  }
  .ant-checkbox-inner {
    background: transparent;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background: white;
    border-color: white;
  }
  .ant-checkbox-checked .ant-checkbox-inner:after {
    border-color: #9b5fcc !important;
  }
  .break-line {
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    line-height: 25px;
  }
  .ant-menu-item,
  .ant-menu-submenu-title {
    white-space: normal !important;
  }
  .ant-menu-inline.ant-menu-root .ant-menu-item,
  .ant-menu-inline.ant-menu-root .ant-menu-submenu-title {
    height: auto;
    align-items: flex-start;
    svg {
      margin-top: 10px;
    }
  }
  /* .ant-checkbox > .ant-checkbox-inner {
    border-radius: 5px;
  } */
`;
