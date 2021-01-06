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
`;
