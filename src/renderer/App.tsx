import { ThemeProvider } from "styled-components";

import AppContainer from "./components/AppContainer";
import GlobalStyles from "./components/GlobalStyles";

import defaultTheme from "./utils/defaultTheme";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <>
        <AppContainer />
      </>
    </ThemeProvider>
  );
};

export default App;
