import { useCallback } from "react";

import Toaster from "./toaster";

type TElectronApiFunction = (...args: any[]) => IPC.TPromiseHandlerResult;

type TUseElectronApiRequestOptions = {
  onComplete?: (...args: any[]) => void;
  onSuccess?: (...args: any[]) => void;
  onError?: (...args: any[]) => void;
};

const makeElectronApiRequest =
  (
    apiFunction: TElectronApiFunction,
    options?: TUseElectronApiRequestOptions
  ) =>
  async (...args: any[]) => {
    const res = await apiFunction(...args);
    Toaster.add({
      intent: res.success ? "success" : "error",
      content: res.message,
    });
    console.log("EBAT");
    options?.onComplete && options.onComplete();
    if (res.success && options?.onSuccess) {
      options.onSuccess(res.result);
    }
    if (!res.success && options?.onError) {
      options.onError(res.message);
    }
  };

const useElectronApiRequest = (
  apiFunction: TElectronApiFunction,
  options?: TUseElectronApiRequestOptions
) => {
  const makeRequest = useCallback(async (...args: any[]) => {
    makeElectronApiRequest(apiFunction, options)(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [makeRequest];
};

export default useElectronApiRequest;
export { makeElectronApiRequest };
