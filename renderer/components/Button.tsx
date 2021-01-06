import React, { HTMLProps, forwardRef, ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import Link, { LinkProps } from "next/link";

import Text from "./Text";
import Icon, { TIcons, TSizes } from "./Icon";
import ActivityIndicator from "./ActivityIndicator";

type TProps = Partial<LinkProps> & {
  size?: "big" | "normal";
  href?: string;
  as?: string;
  icon?: TIcons;
  iconSize?: TSizes;
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

  console.log("OTHER PROPS", otherProps);

  const Content = (
    <Container
      ref={ref}
      type={getType()}
      role="button"
      hasChildren={!!children}
      isLoading={!!isLoading}
      disabled={!!isDisabled}
      className={className}
      tabIndex={0}
      {...otherProps}
    >
      <TextStyled isLoading={isLoading} hasChildren={!!children}>
        {icon && <IconStyled icon={icon} size={iconSize} hasChildren={!!children} />}
        {children}
      </TextStyled>
      {isLoading && <ActivityIndicatorStyled />}
    </Container>
  );

  if (href) {
    return (
      <Link href={href} as={as}>
        {Content}
      </Link>
    );
  }

  return Content;
});

export default Button;

const height = "48px";

type TTextStyled = {
  hasChildren: boolean;
  isLoading?: boolean;
};
const TextStyled = styled(Text)<TTextStyled>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
  width: 100%;
  height: ${height};
  font-weight: 600;
  font-size: 18px;
  padding: 0 19px;
  outline: none;
`;

type TContainer = Pick<HTMLProps<HTMLAnchorElement>, "href"> & {
  hasChildren: boolean;
  disabled: boolean;
  isLoading: boolean;
};
const Container = styled.button<TContainer>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  min-height: ${height};

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
    ${({ disabled }) =>
      !disabled &&
      css`
        background: ${({ theme }) => theme.purpleHovered};
      `}
  }

  &:focus,
  &.focus {
    outline: 0;
    /* text-decoration: none;
    box-shadow: inset 0px 0px 0px 2px rgba(0, 0, 0, 1),
      0px 0px 0px 2px ${({ theme }) => theme.purple}; */
  }

  &:active,
  &.active {
    text-decoration: none;
    ${({ disabled }) =>
      !disabled &&
      css`
        background: ${({ theme }) => theme.purpleHovered};
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
