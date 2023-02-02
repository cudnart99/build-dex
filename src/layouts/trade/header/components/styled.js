import { Dropdown } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const NotificationBellWrapper = styled(Dropdown)`
  z-index: -1;
  display: flex;
  @media screen and (max-width: 576px) {
      margin-right: -160px ;
  }
  @media screen and (max-width: 380px) {
      margin-right: -130px ;
  }
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  svg {
    width: 28px;
    height: 28px;
  }
`;
export const GlobalStyle = createGlobalStyle`
 .ant-dropdown {
    z-index: 1;
  }
  .child-popover{
    display: flex;
    justify-content: start;
    align-items: center;
    height: 40px;
    padding: 0px 10px;
    svg{
      *{
        fill: #2B2B2B;
      }
      
    }
    &:hover{
    background: #F5F5F5;
    border-radius: 5px;
  }
  }
   .hover-border{
    cursor: pointer;
    &:hover{
      background: #C6ABE7;
      border-radius: 50%;
     
      circle{
        stroke:#C6ABE7;
      }
      
    }

   }

   .hover-border--2{
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: #C6ABE7;
    border-radius: 50%;
     
    circle{
      stroke:#C6ABE7;
    }

   }
`;
