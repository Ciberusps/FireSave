import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import * as ICONS from "./icons";

const sizes = {
  small: 16,
  medium: 26,
  large: 30,
};
export type TSizes = keyof typeof sizes;
export type TIcons = keyof typeof ICONS;

type TProps = {
  icon: TIcons;
  size?: TSizes;
  color?: string;
  className?: string;
};

const Icon = (props: TProps) => {
  const theme = useContext(ThemeContext);
  const { icon, size = "medium", color = theme.white, className } = props;

  const sizePx = sizes[size];
  const Component = ICONS[icon];
  return (
    <Component
      className={className}
      style={{
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        fill: color,
      }}
    />
  );
};

export default Icon;
