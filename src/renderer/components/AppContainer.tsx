import { useCallback, useEffect, useState } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";

import IndexPage from "../pages";
import GamePage from "../pages/games/[id]";
import AboutPage from "../pages/about";
import LoadingPage from "../pages/loading";
import SettingsPage from "../pages/settings";
import GameSettingsPage from "../pages/games/[id]/settings";

import Localization from "../../common/localization";
import {
  useSettingsStore,
  loadStores,
  subscribeOnStoresChanges,
} from "../utils/stores";

Localization.init();
Modal.setAppElement("#root");

const AppContainer = () => {
  const isLoadingApp = useSettingsStore(
    (state) => state.runtimeValues.isLoadingApp
  );
  const [isLoadingStores, setIsLoadingStores] = useState(true);

  const loadApp = useCallback(async () => {
    await loadStores();
    await subscribeOnStoresChanges();
    setIsLoadingStores(false);
  }, []);

  useEffect(() => {
    loadApp();
  }, [loadApp]);

  return (
    <Router>
      <Routes>
        {isLoadingStores || isLoadingApp ? (
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
