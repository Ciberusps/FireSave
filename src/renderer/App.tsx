import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import IndexPage from "./pages";
import GamePage from "./pages/games/[id]";
import GameSettingsPage from "./pages/games/[id]/settings";
import { GlobalProvider } from "./components/GlobalContext";
import { GlobalStyles } from "./components/GlobalStyles";

import { myTheme } from "./utils/defaultTheme";

const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <GlobalStyles />
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/games/:id/settings" element={<GameSettingsPage />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default App;
