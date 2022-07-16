import React, { HTMLProps, forwardRef, useMemo } from "react";
import styled, { css } from "styled-components";
import { Link, LinkProps, To } from "react-router-dom";

import Text from "./Text";
import Icon, { TIcons, TSizes, TProps as TIconProps } from "./Icon";
import ActivityIndicator from "./ActivityIndicator";

type TSize = "normal" | "small";
type TVariant = "primary" | "secondary";

export type TButtonProps = Partial<LinkProps> & {
  variant?: TVariant;
  to?: To;
  size?: TSize;
  href?: string;
  icon?: TIcons;
  iconSize?: TSizes;
  iconProps?: Partial<TIconProps>;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSubmit?: boolean;
  isSelected?: boolean;
  className?: string;
  textStyles?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button = (props: TButtonProps, ref: any) => {
  const {
    variant = "primary",
    children,
    size = "normal",
    icon,
    iconSize,
    iconProps,
    to,
    isLoading = false,
    isDisabled = false,
    isSubmit = false,
    textStyles,
    className,
    onClick,
    ...otherProps
  } = props;

  const type = useMemo(() => {
    if (to) return undefined;
    return isSubmit ? "submit" : "button";
  }, [to, isSubmit]);

  const content = (
    <Container
      ref={ref}
      // @ts-ignore
      type={type}
      role="button"
      size={size}
      variant={variant}
      isLoading={!!isLoading}
      isDisabled={isDisabled}
      className={className}
      tabIndex={0}
      onClick={!isDisabled ? onClick : undefined}
      {...otherProps}
    >
      <TextStyled
        style={textStyles}
        size={size}
        isLoading={isLoading}
        hasChildren={!!children}
      >
        {icon && (
          <IconStyled
            icon={icon}
            size={iconSize || size === "small" ? "small" : "medium"}
            hasChildren={!!children}
            {...iconProps}
          />
        )}
        {children}
      </TextStyled>
      {isLoading && <ActivityIndicatorStyled />}
    </Container>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};

export default forwardRef<HTMLButtonElement, TButtonProps>(Button);

const height = "48px";

type TContainer = Pick<HTMLProps<HTMLAnchorElement>, "href"> & {
  variant: TVariant;
  isDisabled: boolean;
  isLoading: boolean;
  size: TSize;
};
const Container = styled.button<TContainer>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  height: ${({ size }) => (size === "normal" ? height : "30px")};
  min-height: ${({ size }) => (size === "normal" ? height : "30px")};

  background: ${({ theme, variant }) =>
    variant === "primary" ? theme.purple : theme.darkOpacity};
  color: ${({ isDisabled, theme }) =>
    isDisabled ? theme.darkOpacity : theme.white};
  text-decoration: none;

  border: 0;
  border-radius: 4px;
  cursor: ${({ isLoading }) => (isLoading ? "progress" : "pointer")};

  padding: 0;

  &:hover,
  &.hover {
    text-decoration: none;
    ${({ isDisabled, variant }) =>
      !isDisabled &&
      css`
        background: ${({ theme }) =>
          variant === "primary" ? theme.purpleHovered : theme.purpleHovered};
      `}
  }

  &:focus,
  &.focus {
    outline: 0;
  }

  &:active,
  &.active {
    text-decoration: none;
    ${({ isDisabled, variant }) =>
      !isDisabled &&
      css`
        background: ${({ theme }) =>
          variant === "primary" ? theme.purpleHovered : theme.purpleHovered};
      `}
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.5;
      color: ${({ theme }) => theme.white};
      background: ${({ theme }) => theme.darkOpacity};
      cursor: not-allowed;

      ${TextStyled} {
        color: ${({ theme }) => theme.dark};
      }
    `}
`;

type TTextStyled = {
  hasChildren: boolean;
  isLoading?: boolean;
  size?: TSize;
};

const TextStyled = styled(Text)<TTextStyled>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
  width: 100%;
  height: ${height};
  font-weight: 600;
  font-size: ${({ size }) => (size === "normal" ? "18px" : "14px")};
  padding: ${({ size, hasChildren }) =>
    size === "normal" ? "0 19px" : `5px ${hasChildren ? 20 : 10}px`};
  outline: none;
`;

type TIcon = {
  hasChildren: boolean;
};

const IconStyled = styled(Icon)<TIcon>`
  margin-right: ${({ hasChildren }) => (hasChildren ? "6px" : 0)};
  margin-left: ${({ hasChildren }) => (hasChildren ? "-8px" : 0)};
  fill: ${({ theme }) => theme.white};
  flex-shrink: 0;
`;

const ActivityIndicatorStyled = styled(ActivityIndicator)`
  position: absolute;
`;
