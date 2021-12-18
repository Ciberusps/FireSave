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
  const [settingsStore, setSettingsStore] = useState<any | null>(null);
  const [persistentStore, setPersistentStore] = useState<any | null>(null);

  const getState = async () => {
    const persistentStore = await window.electron.getPersistentStore();
    const settingsState = await window.electron.getSettingsStore();
    setPersistentStore(persistentStore);
    setSettingsStore(settingsState);
  };

  useEffect(() => {
    getState();

    window.electron.onStateUpdate((_: any, newStore: any) => {
      setSettingsStore(newStore);
    });

    window.electron.onPersistentStoreUpdate((_: any, newStore: any) => {
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
