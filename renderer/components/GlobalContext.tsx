import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

type TProps = {
  //   value: User.TUser | null;
  children: any;
};

type TState = {
  state: any | null;
  // logout?: (...args: any) => Promise<any>;
};

const GlobalContext = React.createContext<TState>({
  state: null,
});

const GlobalProvider = (props: TProps) => {
  const { children } = props;
  // const Router = useRouter();
  // const api = useContext(ApiContext);
  const [state, setState] = useState<any | null>(null);

  useEffect(() => {
    ipcRenderer.on("stateUpdate", (event, arg) => {
      console.log("State updated");
      setState(arg);
    });
  }, []);

  // if (user !== props.value) {
  //   setUser(props.value);
  // }

  // const { send } = useApiRequest(postLogout(api), {
  //   onCompleted: async () => {
  //     await Router.push("/");
  //   },
  // });

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
