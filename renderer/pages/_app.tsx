import "../fonts.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "../components/GlobalStyles";
import { GlobalProvider } from "../components/GlobalContext";

import Sentry from "../utils/sentry";
import Toaster from "../utils/toaster";
import Analytics from "../utils/analytics";
import { myTheme } from "../utils/defaultTheme";

if (typeof window !== "undefined") {
  Sentry.init();
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    Analytics.pageView(router.pathname);
    Toaster.init();

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
};

export default MyApp;
