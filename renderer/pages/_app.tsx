import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import "../fonts.css";

import { GlobalProvider } from "../components/GlobalContext";
import { GlobalStyles } from "../components/GlobalStyles";

import { myTheme } from "../utils/defaultTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ThemeProvider theme={myTheme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default MyApp;
