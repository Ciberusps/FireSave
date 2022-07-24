import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import path from "path";

import ContextMenu, { TContextMenuProps } from "./ContextMenu";

import useElectronApiRequest from "../utils/useElectronApiRequest";
import { usePersistentStore } from "renderer/utils/stores";

type TProps = Omit<TContextMenuProps, "items" | "onClickOutside"> & {
  game: TGame;
  savePoint: TSavePoint;
  children: React.ReactNode;
  onRequestClose: (res?: { shouldRemove?: boolean }) => void;
};

const SavePointContextMenu = (props: TProps) => {
  const { game, savePoint, children, onRequestClose, ...restProps } = props;
  const { t } = useTranslation();
  const savesFolder = usePersistentStore((state) => state.savesFolder);
  const [loadSavePoint] = useElectronApiRequest(window.api.loadSavePoint);
  const [addToFavorite] = useElectronApiRequest(window.api.addToFavorite);
  const [revealInFileExplorer] = useElectronApiRequest(
    window.api.revealInFileExplorer
  );

  const onLoadSave = useCallback(() => {
    loadSavePoint(game.id, savePoint.id);
    onRequestClose();
  }, [game.id, savePoint.id, loadSavePoint, onRequestClose]);

  const onAddToFavorite = useCallback(() => {
    addToFavorite(game.id, savePoint.id);
    onRequestClose();
  }, [game.id, savePoint.id, addToFavorite, onRequestClose]);

  const onRevealInFileExplorer = useCallback(() => {
    const savesFolderPath = path.join(
      savesFolder,
      `${game.savePointsFolderName}__${game.id}`,
      savePoint.folderName
    );
    revealInFileExplorer(savesFolderPath);
    onRequestClose();
  }, [game, savePoint, savesFolder, revealInFileExplorer, onRequestClose]);

  const onRemoveSavePoint = useCallback(() => {
    onRequestClose({ shouldRemove: true });
  }, [onRequestClose]);

  return (
    <ContextMenu
      items={[
        {
          title: t("button.load.label"),
          icon: "upload",
          onClick: onLoadSave,
        },
        {
          title: t("button.add_to_favorites.label"),
          icon: "starSolid",
          onClick: onAddToFavorite,
        },
        {
          title: t("button.open_save_point_folder.label"),
          icon: "openInNew",
          onClick: onRevealInFileExplorer,
        },
        {
          title: t("button.remove_save.label"),
          icon: "close",
          onClick: onRemoveSavePoint,
        },
      ]}
      onClickOutside={onRequestClose}
      {...restProps}
    >
      {children}
    </ContextMenu>
  );
};

export default SavePointContextMenu;
