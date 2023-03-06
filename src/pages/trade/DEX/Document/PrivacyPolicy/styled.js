import styled from "styled-components";

export const WrapperStyled = styled.div`
  .Policy-1 {
    img {
      margin-top: -65px;
      width: 300px;
    }
  }
  .blur-box-container {
    background-color: rgba(217, 217, 217, 0.2);
    padding: 20px 25px 0px 10px;
    border-radius: 5px;
  }
  .contact-container {
    background-color: rgba(217, 217, 217, 0.2);
    padding: 20px;
    border-radius: 5px;
  }
  .third-party-container {
    background: rgba(122, 73, 202, 0.2);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 20px 20px 0px 10px;
    justify-content: space-between;
    margin-top: 30px;
    .Policy-2 {
      width: 20%;
      img {
        margin-top: -70px;
      }
    }
    .Policy-2-text {
      width: 79%;
    }
  }
  .third-party-box-container {
    display: flex;
    flex-wrap: wrap;
    .third-party-box {
      border: 1px solid white;
      border-radius: 10px;
      width: 30%;
      padding: 10px;
      margin: 10px;
      text-align: justify;
      word-break: break-word;
      a {
        color: white;
        font-weight: 700;
      }
    }
  }
  .Policy-3 {
    img {
      margin-top: -110px;
    }
  }
  .age-require-container {
    margin-top: -30px;
    background: linear-gradient(
      180deg,
      rgba(162, 10, 255, 0) 0%,
      rgba(173, 39, 255, 0.14) 86.64%
    );
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    padding: 20px;
  }
  .Policy-4 {
    img {
      width: 200px;
      margin-top: -90px;
    }
  }
`;
