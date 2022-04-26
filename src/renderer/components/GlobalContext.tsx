import React, { useState, useEffect } from "react";

type TProps = {
  children: any;
};

type TState = {
  settingsStore: TSettingsStore | null;
  persistentStore: TPersistentStore | null;
};

const GlobalContext = React.createContext<TState>({
  settingsStore: null,
  persistentStore: null,
});

const GlobalProvider = (props: TProps) => {
  const { children } = props;
  const [settingsStore, setSettingsStore] = useState<TSettingsStore | null>(
    null
  );
  const [persistentStore, setPersistentStore] =
    useState<TPersistentStore | null>(null);

  const getState = async () => {
    const newPersistentStore = await window.electron.getPersistentStore();
    const newSettingsState = await window.electron.getSettingsStore();
    setPersistentStore(newPersistentStore);
    setSettingsStore(newSettingsState);
  };

  useEffect(() => {
    getState();

    console.log({ electron: window.electron });
    window.electron.onSettingsStoreUpdate((_, newStore) => {
      setSettingsStore(newStore);
    });

    window.electron.onPersistentStoreUpdate((_, newStore) => {
      setPersistentStore(newStore);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        settingsStore,
        persistentStore,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
