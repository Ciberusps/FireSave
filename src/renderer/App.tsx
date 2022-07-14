import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import AppContainer from "./components/AppContainer";
import GlobalStyles from "./components/GlobalStyles";

import defaultTheme from "./utils/defaultTheme";
import { TOASTER_DEFAULT_AUTO_CLOSE } from "./utils/config";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <ToastContainer
        newestOnTop={true}
        hideProgressBar={true}
        position="bottom-right"
        autoClose={TOASTER_DEFAULT_AUTO_CLOSE}
      />
      <>
        <AppContainer />
      </>
    </ThemeProvider>
  );
};

export default App;
