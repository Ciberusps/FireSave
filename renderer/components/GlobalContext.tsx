import React, { useState, useEffect } from "react";

type TProps = {
  children: any;
};

type TState = {
  state: TStore | null;
};

const GlobalContext = React.createContext<TState>({
  state: null,
});

const GlobalProvider = (props: TProps) => {
  const { children } = props;
  const [state, setState] = useState<any | null>(null);

  const getState = async () => {
    const newState = await window.electron.getState();
    setState(newState);
  };

  useEffect(() => {
    getState();

    window.electron.onStateUpdate((_: any, newState: any) => {
      setState(newState);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
