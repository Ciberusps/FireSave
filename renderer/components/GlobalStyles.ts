import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }

  body {
    /* font-family: ; */
    /* font-size:  */
    font-weight: normal;
    font-smoothing: antialiased;

    margin: 0;
    padding: 0;

    backface-visibility: visible;
    overflow-y: scroll;
    /* background:  */
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  input, textarea, select, button {
    font-size: 1em;
  }

  a {
    text-decoration: none;
  }

  h2 {
    margin: 1em 0em;
  }
`;
