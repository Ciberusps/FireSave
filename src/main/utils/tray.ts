import { Menu, Tray } from "electron";

import { getAssetPath } from ".";

type AppTrayConstructorOptions = {
  isWindowVisible: boolean;
  onClickShow: VoidFunction;
  onClickHide: VoidFunction;
  onClickQuit: VoidFunction;
};

// Probably tray should be created in main process, but its single window app leave as is
class AppTray {
  // Tray cannot be extended
  private tray: Tray;
  private onClickShow: VoidFunction;
  private onClickQuit: VoidFunction;
  private onClickHide: VoidFunction;

  constructor(props: AppTrayConstructorOptions) {
    const appIconPath = getAssetPath("icon.png");
    this.tray = new Tray(appIconPath);

    this.onClickShow = props.onClickShow;
    this.onClickQuit = props.onClickQuit;
    this.onClickHide = props.onClickHide;

    this.tray.on("double-click", this.onClickShow);
    this.tray.setToolTip("FireSave");

    this.updateContextMenu(props.isWindowVisible);
  }

  updateContextMenu(isWindowVisible: boolean) {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: isWindowVisible ? "Hide" : "Show",
        click: isWindowVisible ? this.onClickHide : this.onClickShow,
      },
      {
        label: "Exit",
        click: this.onClickQuit,
      },
    ]);
    this.tray.setContextMenu(contextMenu);
  }
}

export default AppTray;
