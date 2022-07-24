import path from "path";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ContextMenu, { TContextMenuProps } from "./ContextMenu";

import useElectronApiRequest from "../utils/useElectronApiRequest";
import { usePersistentStore } from "../utils/stores";

type TProps = Omit<TContextMenuProps, "items" | "onClickOutside"> & {
  game: TGame;
  children: React.ReactNode;
  onRequestClose: VoidFunction;
};

const GameContextMenu = (props: TProps) => {
  const { game, children, onRequestClose, ...restProps } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const savesFolder = usePersistentStore((state) => state.savesFolder);
  const [runGame] = useElectronApiRequest(window.api.runGame);
  const [makeSavePoint] = useElectronApiRequest(window.api.makeSavePoint);
  const [revealInFileExplorer] = useElectronApiRequest(
    window.api.revealInFileExplorer
  );

  const onSaveGame = useCallback(() => {
    makeSavePoint(game.id);
    onRequestClose();
  }, [game.id, makeSavePoint, onRequestClose]);

  const onRunGame = useCallback(() => {
    runGame(game.id);
    onRequestClose();
  }, [game.id, runGame, onRequestClose]);

  const onOpenSettings = useCallback(() => {
    navigate(`/games/${game.id}/settings`);
    onRequestClose();
  }, [game.id, navigate, onRequestClose]);

  const onRevealInFileExplorerSavesFolder = useCallback(() => {
    const savesFolderPath = path.join(
      savesFolder,
      `${game.savePointsFolderName}__${game.id}`
    );
    revealInFileExplorer(savesFolderPath);
    onRequestClose();
  }, [game, savesFolder, revealInFileExplorer, onRequestClose]);

  return (
    <ContextMenu
      items={[
        {
          title: t("button.save.label"),
          icon: "save",
          onClick: onSaveGame,
        },
        {
          title: t("button.run"),
          icon: "play",
          onClick: onRunGame,
        },
        {
          title: t("button.open_saves_folder.label"),
          icon: "openInNew",
          onClick: onRevealInFileExplorerSavesFolder,
        },
        {
          title: t("button.settings"),
          icon: "settings",
          onClick: onOpenSettings,
        },
        // TODO: modals should be global
        // {
        //   title: "Remove Save",
        //   // icon: "settings",
        //   onClick: () => {
        //     console.log("KFJSLFJD");
        //     setShowContextMenu(false);
        //   },
        // },
      ]}
      onClickOutside={onRequestClose}
      {...restProps}
    >
      {children}
    </ContextMenu>
  );
};

export default GameContextMenu;
