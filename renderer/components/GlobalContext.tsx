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

  useEffect(() => {
    ipcRenderer.on("stateUpdate", (_, arg) => {
      console.log("State updated", arg);
      setState(arg);
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
