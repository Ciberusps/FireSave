import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import "../fonts.css";

import { GlobalProvider } from "../components/GlobalContext";
import { GlobalStyles } from "../components/GlobalStyles";

import Analytics from "../utils/analytics";
import { myTheme } from "../utils/defaultTheme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    Analytics.pageView(router.pathname);

    const handleRouteChange = (url: string) => {
      Analytics.pageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
