import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }

  body {
    color: white;
    font-family: "Open Sans";
    font-size: 18px;
    font-weight: normal;
    font-smoothing: antialiased;

    background: ${({ theme }) => theme.background};

    margin: 0;
    padding: 0;

    backface-visibility: visible;
    overflow-y: scroll;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  input, textarea, select, button {
    font-size: 1em;
    font-family: "Open Sans";
  }

  a {
    text-decoration: none;
  }

  h1 {
    font-size: 54px;
    font-weight: bolder;
    margin: 0px;
  }

  h2 {
    margin: 1em 0em;
  }

  .lazyload-wrapper {
    display: flex;
  }

  /* Toaster */
  .Toastify__toast {
    border-radius: 12px;
    border: 2px solid ${({ theme }) => theme.feedback.info};
    padding: 6px;
    padding-left: 14px;
    font-family: "Open Sans";
    font-size: 16px;
  }
  .Toastify__toast-container {
    /* bottom: 5em; */
  }
  .Toastify__close-button {
    width: 19px;
    height: 19px;
  }
  .Toastify__toast.Toastify__toast--error {
    background: ${({ theme }) => theme.feedback.error};
    border-color: ${({ theme }) => theme.feedback.error};
  }
  .Toastify__toast.Toastify__toast--info {
    background: ${({ theme }) => theme.feedback.info};
    border-color: ${({ theme }) => theme.feedback.info};
  }
  .Toastify__toast.Toastify__toast--success {
    background: ${({ theme }) => theme.feedback.success};
    border-color: ${({ theme }) => theme.feedback.success};
  }
  .Toastify__toast.Toastify__toast--warning {
    background: ${({ theme }) => theme.feedback.warning};
    border-color: ${({ theme }) => theme.feedback.warning};
  }
`;
