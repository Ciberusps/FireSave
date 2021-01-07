import React, { HTMLProps, forwardRef, ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import Link, { LinkProps } from "next/link";

import Text from "./Text";
import Icon, { TIcons, TSizes, TProps as TIconProps } from "./Icon";
import ActivityIndicator from "./ActivityIndicator";

type TSize = "normal" | "small";

type TProps = Partial<LinkProps> & {
  size?: TSize;
  href?: string;
  as?: string;
  icon?: TIcons;
  iconSize?: TSizes;
  iconProps?: Partial<TIconProps>;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSubmit?: boolean;
  isSelected?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & TProps
>((props, ref) => {
  const {
    children,
    size = "normal",
    icon,
    iconSize,
    iconProps,
    href,
    as,
    isLoading = false,
    isDisabled = false,
    isSubmit = false,
    className,
    ...otherProps
  } = props;

  if (!href && as) {
    throw new Error('"as" attribute must be provided with "href"');
  }

  const getType = () => {
    if (href) return undefined;
    return isSubmit ? "submit" : "button";
  };

  const content = (
    <Container
      ref={ref}
      type={getType()}
      role="button"
      size={size}
      hasChildren={!!children}
      isLoading={!!isLoading}
      disabled={!!isDisabled}
      className={className}
      tabIndex={0}
      {...otherProps}
    >
      <TextStyled size={size} isLoading={isLoading} hasChildren={!!children}>
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

  if (href) {
    return (
      <Link href={href} as={as}>
        {content}
      </Link>
    );
  }

  return content;
});

export default Button;

const height = "48px";

type TContainer = Pick<HTMLProps<HTMLAnchorElement>, "href"> & {
  hasChildren: boolean;
  disabled: boolean;
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

  background: ${({ theme, hasChildren }) =>
    hasChildren ? theme.purple : theme.darkOpacity};
  color: ${({ disabled, theme }) => (disabled ? theme.darkOpacity : theme.white)};
  text-decoration: none;

  border: 0;
  border-radius: 4px;
  cursor: ${({ isLoading }) => (isLoading ? "progress" : "pointer")};

  padding: 0;
  margin: 2px;

  &:hover,
  &.hover {
    text-decoration: none;
    ${({ disabled, hasChildren }) =>
      !disabled &&
      css`
        background: ${({ theme }) =>
          hasChildren ? theme.purpleHovered : theme.purpleHovered};
      `}
  }

  &:focus,
  &.focus {
    outline: 0;
  }

  &:active,
  &.active {
    text-decoration: none;
    ${({ disabled, hasChildren }) =>
      !disabled &&
      css`
        background: ${({ theme }) =>
          hasChildren ? theme.purpleHovered : theme.purpleHovered};
      `}
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${({ theme }) => theme.white};
      color: ${({ theme }) => theme.white};
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
    size === "normal" ? "0 19px" : `5px ${hasChildren ? 20 : 5}px`};
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
