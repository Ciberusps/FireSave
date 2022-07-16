import { useCallback, useEffect, useState } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import Modal from "react-modal";

import IndexPage from "../pages";
import GamePage from "../pages/games/[id]";
import AboutPage from "../pages/about";
import LoadingPage from "../pages/loading";
import SettingsPage from "../pages/settings";
import GameSettingsPage from "../pages/games/[id]/settings";

import i18n, { setupI18n } from "../utils/i18n";
import {
  useSettingsStore,
  loadStores,
  subscribeOnStoresChanges,
} from "../utils/stores";

Modal.setAppElement("#root");

const AppContainer = () => {
  const isMainLoading = useSettingsStore(
    (state) => state.runtimeValues.IS_MAIN_LOADING
  );
  const [isLoadingApp, setIsLoadingApp] = useState(true);

  const loadApp = useCallback(async () => {
    const loadedStores = await loadStores();
    await subscribeOnStoresChanges();
    setupI18n(
      loadedStores.settingsStore.envs.RESOURCES_PATH,
      loadedStores.settingsStore.language
    );

    // TODO: check if in production contextmenu also locked and dont have options
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    setIsLoadingApp(false);
  }, []);

  useEffect(() => {
    loadApp();
  }, [loadApp]);

  return isLoadingApp || isMainLoading ? (
    <Router>
      <Routes>
        <Route path="*" element={<LoadingPage />} />
      </Routes>
    </Router>
  ) : (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <>
            <Route path="/" element={<IndexPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/games/:id/settings" element={<GameSettingsPage />} />
          </>
        </Routes>
      </Router>
    </I18nextProvider>
  );
};

export default AppContainer;
