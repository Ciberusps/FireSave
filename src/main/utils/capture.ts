import { desktopCapturer, screen } from "electron";

import Stores from "../stores";

const verifyPrimaryDisplaySelected = () => {
  const displays = screen.getAllDisplays();
  const currentDisplay = Stores.Settings.store.selectedDisplay;
  const isCurrentDisplayExists = displays.find(
    (d) => d.id === currentDisplay?.id
  );
  if (isCurrentDisplayExists) return;

  Stores.Settings.set("selectedDisplay", screen.getPrimaryDisplay());
};

const previewSize: Electron.Size = {
  width: 302 * 2,
  height: 170 * 2,
};

const makeSelectedDisplayScreenShot = async (): Promise<Buffer | null> => {
  const selectedDisplay = Stores.Settings.store.selectedDisplay;
  if (!selectedDisplay?.id) {
    // TODO: send toaster error
    return null;
  }

  const sources = await desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: previewSize,
  });

  const source = sources.find(
    (s) => s.display_id === selectedDisplay.id.toString()
  );
  if (source) {
    return source.thumbnail.toJPEG(100);
  }
  return null;
};

const Capture = {
  makeSelectedDisplayScreenShot,
  verifyPrimaryDisplaySelected,
};

export default Capture;
