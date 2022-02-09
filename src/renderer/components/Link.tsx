import { Link as RouterLink, LinkProps } from "react-router-dom";
import styled from "styled-components";

type TProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: any;
    className?: string;
  };

const Link = (props: TProps) => {
  const { to, children, className, ...restProps } = props;

  if (to.toString().startsWith("http")) {
    return (
      <a href={to.toString()} target="_blank" rel="noreferrer">
        <Container className={className} {...restProps}>
          {children}
        </Container>
      </a>
    );
  }

  return (
    <RouterLink to={to}>
      <Container className={className} {...restProps}>
        {children}
      </Container>
    </RouterLink>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export default Link;
