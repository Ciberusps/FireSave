import { MouseEventHandler, useState } from "react";

const defaultDomRect: DOMRect = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  toJSON: () => {},
};

const useContextMenu = () => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [clientRect, setClientRect] = useState<DOMRect>(defaultDomRect);

  const getReferenceClientRect = () => clientRect;

  const onContextMenu: MouseEventHandler<HTMLElement> | undefined = (e) => {
    setShowContextMenu(true);
    const x = e?.clientX;
    const y = e?.clientY;

    setClientRect({
      ...defaultDomRect,
      x,
      y,
      top: y,
      bottom: y,
      left: x,
      right: x,
    });
  };

  return {
    showContextMenu,
    setShowContextMenu,
    getReferenceClientRect,
    onContextMenu,
  };
};

export default useContextMenu;
