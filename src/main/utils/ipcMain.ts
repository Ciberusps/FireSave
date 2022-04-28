import { ipcMain as _ipcMain } from "electron";

type THandler<T> = (
  event: Electron.IpcMainInvokeEvent,
  // @ts-ignore
  ...args: Parameters<T>
) => // @ts-ignore
ReturnType<T>;

const ipcMain = {
  ..._ipcMain,
  handle: <T extends keyof IPC.TApi>(
    eventName: T,
    handler: THandler<IPC.TApi[T]>
  ) => {
    // @ts-ignore
    _ipcMain.handle(eventName, handler);
  },
};

export default ipcMain;
