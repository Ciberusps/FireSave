import { css, createGlobalStyle } from "styled-components";
import { transparentize } from "polished";
import checkBoxStyles from "react-checkbox-tree/lib/react-checkbox-tree.css";
import toastifyStyles from "react-toastify/dist/ReactToastify.css";

import Fonts from "../utils/fonts";

const scollbarStyles = css`
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${({ theme }) => theme.background};
  }

  &::-webkit-scrollbar {
    width: 14px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    width: 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    transition: 0.32s ease-in-out;

    &:hover {
      border-width: 1px;
    }
  }
`;

// Link on styles https://fkhadra.github.io/react-toastify/how-to-style
const toasterStyles = css`
  :root {
    --toastify-color-info: ${({ theme }) => theme.purple};
    --toastify-color-success: ${({ theme }) => theme.purple};
    --toastify-color-warning: #f1c40f;
    --toastify-color-error: #e74c3c;
  }

  /* Toaster */
  .Toastify__toast {
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.feedback.info};
    padding: 6px;
    padding-left: 14px;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    color: white;
  }
  .Toastify__toast-container {
    /* bottom: 5em; */
  }
  .Toastify__close-button {
    width: 19px;
    height: 19px;
    > svg {
      fill: white;
    }
  }
  .Toastify__toast.Toastify__toast--error {
    background: ${({ theme }) => transparentize(0.8, theme.feedback.error)};
    border-color: ${({ theme }) => theme.feedback.error};
  }
  .Toastify__toast.Toastify__toast--info {
    background: ${({ theme }) => transparentize(0.8, theme.feedback.info)};
    border-color: ${({ theme }) => theme.feedback.info};
  }
  .Toastify__toast.Toastify__toast--success {
    background: ${({ theme }) => transparentize(0.8, theme.feedback.success)};
    border-color: ${({ theme }) => theme.feedback.success};
  }
  .Toastify__toast.Toastify__toast--warning {
    background: ${({ theme }) => transparentize(0.8, theme.feedback.warning)};
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
  ${toastifyStyles}
  ${scollbarStyles}
  ${toasterStyles}
  ${reactCheckboxStyles}

  :root {
    white-space: pre-line;
  }

  body * {
    box-sizing: border-box;
  }

  body {
    color: white;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: normal;
    font-smooth: antialiased;

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
    align-self: flex-start;
  }

  h2 {
    margin: 1em 0em;
    align-self: flex-start;
  }

  .lazyload-wrapper {
    display: flex;
  }

  .ReactModal__Overlay {
    z-index: 10;
  }

  &::selection {
    background: ${({ theme }) => theme.purple};
  }
`;

export default GlobalStyles;
