import styled, { createGlobalStyle } from "styled-components";

export const SelectWidthCheckboxWrapper = styled.div`
  width: 100%;

  position: relative;
  .ant-select {
    width: 100%;
  }

  .ant-select-selector {
    border: 1px solid #6e6e6e !important;
    border-radius: 20px !important;
  }
  .ant-select-selector:hover {
    border: 1px solid #6e5ac3 !important;
  }
`;

export const DropdownGlobalStyled = createGlobalStyle`
.ant-checkbox-input:focus+.ant-checkbox-inner, .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #6e5ac3;
}
.ant-input,.ant-checkbox:hover {
    border-color: #6e5ac3 !important;
    border-right-width: 1px;
}
.ant-checkbox-checked .ant-checkbox-inner:after {
    border-color: #9b5fcc !important;
  }
.ant-checkbox-checked .ant-checkbox-inner {
    background-color: white;
    border-color: #6e5ac3;
}
    .dropdown-container {
    padding: 5px 10px;
    &__all {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    div{
        cursor: pointer;
    }
      * {
        color: #6e5ac3;
        font-family: "Bai Jamjuree";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        div {
          display: flex;
          align-items: center;
        }
      }
    }
    &__search {
        border-radius: 10px !important;
        padding: 5px;
        .ant-input{
            border: 1px solid #6e6e6e !important;
            border-radius: 10px !important;
        }
        margin-bottom: 10px;
        
    }
    &__items {
        height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
        &__item{
            display: flex;
            gap:10px;
            align-items: center;
            &__text{
                        
  color: #2B2B2B;
  display: -webkit-box;
  max-width: 400px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

            }
            transition: 2s;
            &__subitem{
                margin-left: 40px;
                display: flex;
                gap: 10px;
                margin-bottom: 5px;
            }
        }
    }
    &__footer{
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        &--close{
            color: #6E6E6E;
            border: 1px solid #6E6E6E;
border-radius: 5px;
        }
        &--submit{
            margin-left: 10px;
            background: #6E5AC3;
border-radius: 5px;
color:white;        }
    }
  }
`;
export const CustomActionIconWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  right: 10px;
  gap: 10px;
  align-items: center;
  justify-content: center;
  .count {
    width: 24px;
    height: 24px;
    color: white;
    background: #9b5fcc;
    border-radius: 5px;
    text-align: center;
  }
  .clear {
    display: flex;
    cursor: pointer;
  }
  .arrow {
    display: flex;
    cursor: pointer;
  }
`;
