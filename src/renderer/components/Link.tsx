import { forwardRef } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import styled, { css } from "styled-components";

type TProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    isActive?: boolean;
    children: any;
    className?: string;
  };

const Link = (props: TProps, ref: any) => {
  const { to, children, className, onContextMenu, ...restProps } = props;
  delete restProps.isActive;

  if (to?.toString().startsWith("http")) {
    return (
      <ExternalLink
        ref={ref}
        href={to.toString()}
        target="_blank"
        rel="noreferrer"
        className={className}
        {...restProps}
      >
        {children}
      </ExternalLink>
    );
  }

  return (
    <Container
      ref={ref}
      to={to}
      className={className}
      onContextMenu={onContextMenu}
    >
      {children}
    </Container>
  );
};

const linkStyles = css`
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled(RouterLink)`
  ${linkStyles}
`;

const ExternalLink = styled.a`
  ${linkStyles}
`;

export default forwardRef<HTMLAnchorElement, TProps>(Link);
