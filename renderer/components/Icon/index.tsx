import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import * as ICONS from "./icons";

const sizes = {
  small: 20,
  medium: 26,
  large: 30,
};
export type TSizes = keyof typeof sizes;
export type TIcons = keyof typeof ICONS;

export type TProps = {
  icon: TIcons;
  size?: TSizes;
  color?: string;
  className?: string;
};

const Icon = (props: TProps) => {
  const theme = useContext(ThemeContext);
  const { icon, size, color, className } = props;

  const _color = color || theme.white;
  const _size = size || "medium";

  const sizePx = sizes[_size];
  const Component = ICONS[icon];
  return (
    <Component
      className={className}
      style={{
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        fill: _color,
      }}
    />
  );
};

export default Icon;
