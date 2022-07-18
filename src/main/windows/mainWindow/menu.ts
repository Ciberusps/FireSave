import { Menu, shell, MenuItemConstructorOptions } from "electron";
import MainWindow from ".";

import i18n from "../../utils/i18n";
import Games from "../../utils/games";

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: MainWindow;

  constructor(mainWindow: MainWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.DEBUG_PROD === "true"
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === "darwin"
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on("context-menu", (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: "Inspect element",
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: "FireSave",
      submenu: [
        {
          label: "About ElectronReact",
          selector: "orderFrontStandardAboutPanel:",
        },
        { type: "separator" },
        { label: "Services", submenu: [] },
        { type: "separator" },
        {
          label: "Hide ElectronReact",
          accelerator: "Command+H",
          selector: "hide:",
        },
        {
          label: "Hide Others",
          accelerator: "Command+Shift+H",
          selector: "hideOtherApplications:",
        },
        { label: "Show All", selector: "unhideAllApplications:" },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: () => {
            this.mainWindow.quitApp();
          },
        },
      ],
    };

    const subMenuViewDev: MenuItemConstructorOptions = {
      label: i18n.t("menu_view"),
      submenu: [
        {
          label: i18n.t("menu_reload"),
          accelerator: "Command+R",
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: i18n.t("menu_toggle_full_screen"),
          accelerator: "Ctrl+Command+F",
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "Alt+Command+I",
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: i18n.t("menu_view"),
      submenu: [
        {
          label: i18n.t("menu_toggle_full_screen"),
          accelerator: "Ctrl+Command+F",
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: "Window",
      submenu: [
        {
          label: i18n.t("menu_validate_games"),
          accelerator: "Command+R",
          click: () => {
            Games.verifyGames();
          },
        },
        {
          label: i18n.t("menu_minimize_to_tray"),
          accelerator: "Command+W",
          selector: "performClose:",
        },
        { type: "separator" },
        {
          label: i18n.t("menu_bring_all_to_front"),
          selector: "arrangeInFront:",
        },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: i18n.t("menu_help"),
      submenu: [
        {
          label: i18n.t("menu_about_app"),
          click() {
            shell.openExternal("https://github.com/Ciberusps/FireSave");
          },
        },
        // {
        //   label: "Documentation",
        //   click() {
        //     shell.openExternal(
        //       "https://github.com/electron/electron/tree/main/docs#readme"
        //     );
        //   },
        // },
        // {
        //   label: "Community Discussions",
        //   click() {
        //     shell.openExternal("https://www.electronjs.org/community");
        //   },
        // },
        {
          label: i18n.t("menu_search_issues"),
          click() {
            shell.openExternal("https://github.com/Ciberusps/FireSave/issues");
          },
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === "development" ||
      process.env.DEBUG_PROD === "true"
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: i18n.t("menu_file"),
        submenu: [
          {
            label: i18n.t("menu_validate_games"),
            accelerator: "Ctrl+Shift+R",
            click: () => {
              Games.verifyGames();
            },
          },
          {
            label: i18n.t("menu_minimize_to_tray"),
            accelerator: "Ctrl+W",
            click: () => {
              this.mainWindow.close();
            },
          },
          {
            label: i18n.t("menu_exit"),
            accelerator: "Ctrl+Esc",
            click: () => {
              this.mainWindow.quitApp();
            },
          },
        ],
      },
      {
        label: i18n.t("menu_view"),
        submenu:
          process.env.NODE_ENV === "development" ||
          process.env.DEBUG_PROD === "true"
            ? [
                {
                  label: "&Reload",
                  accelerator: "Ctrl+R",
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: i18n.t("menu_toggle_full_screen"),
                  accelerator: "F11",
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
                {
                  label: "Toggle &Developer Tools",
                  accelerator: "Alt+Ctrl+I",
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: i18n.t("menu_toggle_full_screen"),
                  accelerator: "F11",
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
              ],
      },
      {
        label: i18n.t("menu_help"),
        submenu: [
          {
            label: i18n.t("menu_about_app"),
            click() {
              shell.openExternal("https://github.com/Ciberusps/FireSave");
            },
          },
          // {
          //   label: "Documentation",
          //   click() {
          //     shell.openExternal(
          //       "https://github.com/electron/electron/tree/main/docs#readme"
          //     );
          //   },
          // },
          // TODO: add discord?
          // {
          //   label: "Community Discussions",
          //   click() {
          //     shell.openExternal("https://www.electronjs.org/community");
          //   },
          // },
          {
            label: i18n.t("menu_search_issues"),
            click() {
              shell.openExternal("https://github.com/electron/electron/issues");
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}
