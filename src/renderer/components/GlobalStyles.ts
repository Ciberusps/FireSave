import { css, createGlobalStyle } from "styled-components";
import checkBoxStyles from "react-checkbox-tree/lib/react-checkbox-tree.css";

import Fonts from "../utils/fonts";

const scollbarStyles = css`
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${({ theme }) => theme.darkOpacity};
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: ${({ theme }) => theme.darkOpacity};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${({ theme }) => theme.purple};
  }
`;

const toasterStyles = css`
  /* Toaster */
  .Toastify__toast {
    border-radius: 12px;
    border: 2px solid ${({ theme }) => theme.feedback.info};
    padding: 6px;
    padding-left: 14px;
    font-family: "Roboto", sans-serif;
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

const reactCheckboxStyles = css`
  .rct-node-icon * {
    width: 1.25rem;
    height: 1.25rem;
  }

  .rct-text {
    height: 2.25rem;
    font-size: 18px;
  }
`;

const GlobalStyles = createGlobalStyle`
  ${Fonts}
  ${checkBoxStyles}
  ${scollbarStyles}
  ${toasterStyles}
  ${reactCheckboxStyles}

  body * {
    box-sizing: border-box;
  }

  body {
    color: white;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
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
    font-family: "Roboto", sans-serif;
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



  &::selection {
    background: ${({ theme }) => theme.purple};
  }
`;

export default GlobalStyles;
