import { Link as RouterLink, LinkProps } from "react-router-dom";
import styled, { css } from "styled-components";

type TProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    isActive?: boolean;
    children: any;
    className?: string;
  };

const Link = (props: TProps) => {
  const { to, children, className, ...restProps } = props;
  delete restProps.isActive;

  if (to?.toString().startsWith("http")) {
    return (
      <ExternalLink
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
    <Container to={to} className={className} {...restProps}>
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

export default Link;
