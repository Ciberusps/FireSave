import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";

import AppContainer from "./components/AppContainer";
import GlobalStyles from "./components/GlobalStyles";

import i18n from "./utils/i18n";
import defaultTheme from "./utils/defaultTheme";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <>
          <AppContainer />
        </>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
