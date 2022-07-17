import { useCallback } from "react";

import Toaster from "./toaster";

type TElectronApiFunction = (...args: any[]) => Promise<IPC.THandlerResult>;

type TUseElectronApiRequestOptions = {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
};

const useElectronApiRequest = (
  apiFunction: TElectronApiFunction,
  options?: TUseElectronApiRequestOptions
) => {
  const makeRequest = useCallback(
    async (...args: any[]) => {
      const result = await apiFunction(...args);
      Toaster.add({
        intent: result.success ? "success" : "error",
        content: result.message,
      });
      if (result.success && options?.onSuccess) {
        options.onSuccess();
      }
      if (!result.success && options?.onError) {
        options.onError();
      }
    },
    [apiFunction, options]
  );

  return [makeRequest];
};

export default useElectronApiRequest;
