import styled from "styled-components";

export const StyledWrapper = styled.div`
  .row-content {
    display: flex;
  }
  .small-text {
    padding: 0px;
    color: white;
    font-size: 16px;
    font-weight: 400;
  }
  .content {
    padding: 80px 0px;
    width: 40%;
  }
  .content-2 {
    padding: 20px 0px 100px 0px;
    width: 30%;
  }
  .img-side {
    /* background-color: red; */
    margin: auto;
    height: 100%;
    width: 60%;
    text-align: center;
    img {
      /* max-height: 500px; */
      height: auto;
      width: 100%;
      margin-top: -80px;
    }
    .img-2 {
    }
    .img-3 {
      transform: scale(0.7);
    }
  }
  .small-line {
    margin: 10px 0px;
    height: 1px;
    width: 30%;
    background-color: white;
  }
  @media screen and (max-width: 1920px) and (min-width: 1281px) {
    .small-text {
      padding: 0px;
      color: white;
      font-size: 20px;
      font-weight: 400;
    }
    .content {
      padding: 150px 0px;
      width: 40%;
    }
  }
  @media screen and (max-width: 1023px) and (min-width: 768px) {
    .small-text {
      padding: 0px;
      color: white;
      font-size: 15px;
      font-weight: 400;
    }
    .content {
      padding: 50px 0px;
      width: 40%;
    }
    .row-content {
      margin-bottom: 50px;
    }
  }
  @media screen and (max-width: 1023px) and (min-width: 768px) {
    .small-text {
      padding: 0px;
      color: white;
      font-size: 15px;
      font-weight: 400;
    }
    .content {
      padding: 50px 0px;
      width: 40%;
    }
    .row-content {
      margin-bottom: 50px;
    }
  }
  @media screen and (max-width: 426px) and (min-width: 320px) {
    .row-content {
      display: initial;
    }
    .small-text {
      font-size: 10px;
    }
    .content {
      margin: auto;
      padding: 20px 0px;
      width: 90%;
    }
    .content-2 {
      margin: auto;
      padding: 20px 0px;
      width: 90%;
    }
    .img-side {
      /* background-color: red; */
      margin: auto;
      height: 100%;
      width: 90%;
      text-align: center;
      img {
        /* max-height: 500px; */
        height: auto;
        width: 100%;
        margin-top: -60px;
      }
      .img-2 {
        margin-top: 0px;
      }
      .img-3 {
        transform: scale(0.7);
      }
    }
    .small-line {
      margin: 10px 0px;
      height: 1px;
      width: 30%;
      background-color: white;
    }
  }
`;
