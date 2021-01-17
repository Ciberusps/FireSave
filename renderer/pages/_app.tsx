import "../fonts.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "../components/ErrorFallback";
import { GlobalStyles } from "../components/GlobalStyles";
import { GlobalProvider } from "../components/GlobalContext";

import Toaster from "../utils/toaster";
import Analytics from "../utils/analytics";
import ErrorReporter from "../utils/sentry";
import { myTheme } from "../utils/defaultTheme";

if (typeof window !== "undefined") {
  ErrorReporter.init();
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

  const onError = (error: Error, info: { componentStack: string }) => {
    console.log("SENDED");
    ErrorReporter.send(error, { isErrorBoundary: true }, { componentStack: info });
  };

  return (
    <ThemeProvider theme={myTheme}>
      <GlobalStyles />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default MyApp;
