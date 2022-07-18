import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ContextMenu, { TContextMenuProps } from "./ContextMenu";

import useElectronApiRequest from "../utils/useElectronApiRequest";

type TProps = Omit<TContextMenuProps, "items" | "onClickOutside"> & {
  game: TGame;
  children: React.ReactNode;
  onRequestClose: VoidFunction;
};

const GameContextMenu = (props: TProps) => {
  const { game, children, onRequestClose, ...restProps } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [runGame] = useElectronApiRequest(window.api.runGame);
  const [makeSavePoint] = useElectronApiRequest(window.api.makeSavePoint);

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

  return (
    <ContextMenu
      items={[
        {
          title: t("save_button"),
          icon: "save",
          onClick: onSaveGame,
        },
        {
          title: t("run_button"),
          icon: "play",
          onClick: onRunGame,
        },
        {
          title: t("settings_button"),
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
