import { useCallback, useEffect, useState } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";

import IndexPage from "../pages";
import GamePage from "../pages/games/[id]";
import AboutPage from "../pages/about";
import LoadingPage from "../pages/loading";
import SettingsPage from "../pages/settings";
import GameSettingsPage from "../pages/games/[id]/settings";

import {
  useSettingsStore,
  loadStores,
  subscribeOnStoresChanges,
} from "../utils/stores";
import i18n from "renderer/utils/i18n";

Modal.setAppElement("#root");

const AppContainer = () => {
  const isMainLoading = useSettingsStore(
    (state) => state.runtimeValues.IS_MAIN_LOADING
  );
  const [isLoadingApp, setIsLoadingApp] = useState(true);

  const loadApp = useCallback(async () => {
    const loadedStores = await loadStores();
    await subscribeOnStoresChanges();
    console.log({ loadedStores });
    i18n.changeLanguage(loadedStores.settingsStore.language);
    setIsLoadingApp(false);
  }, []);

  useEffect(() => {
    loadApp();
  }, [loadApp]);

  return (
    <Router>
      <Routes>
        {isLoadingApp || isMainLoading ? (
          <Route path="*" element={<LoadingPage />} />
        ) : (
          <>
            <Route path="/" element={<IndexPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/games/:id/settings" element={<GameSettingsPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppContainer;
