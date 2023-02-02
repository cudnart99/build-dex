import styled from "styled-components";

export const SpineFractureWrapper = styled.div`
  --font-color-dark: #61707d;
  --font-color-light: #f5fbef;
  --header-color: #9d69a3;

  --page-color-green: #40f99b;
  --page-color-gray: #61707d;
  --page-color-pink: #9d69a3;
  --page-color-white: #f5fbef;
  --page-color-red: #e85d75;

  --header-height: 100px;

  min-height: 100vh;
  background-color: var(--page-color-white);
  .container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  header {
    background-color: var(--header-color);
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    h1 {
      text-align: center;
      color: var(--page-color-white);
    }
  }

  .main {
    background-color: var(--page-color-white);
    padding: 24px;
    height: calc(100vh - var(--header-height));
    overflow-y: scroll;

    .upload-field {
      padding: 12px;
      border-radius: 10px;
      border: 1px dashed black;
      height: 300px;
      overflow-y: scroll;
      &:hover {
        cursor: pointer;
        border: 1px dashed blue;
        span,
        p {
          color: blue;
        }
      }
      span.ant-upload {
        display: flex;
        height: 300px;
        overflow-y: scroll;
        width: 300px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
          text-align: center;
        }
      }
    }

    .result-table-field {
      flex: 1;
      padding: 12px;
      padding-top: 0px;
    }

    .result-image-field {
      margin-top: 36px;
      .image-item {
        .ant-card-head {
          text-align: center;
          background-color: var(--page-color-green);
        }
      }
    }
  }

  footer {
  }
`;
