import NextLink, { LinkProps } from "next/link";
import styled from "styled-components";

type TProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: any;
    className?: string;
  };

const Link = (props: TProps) => {
  const { href, as, children, className, ...restProps } = props;
  return (
    <NextLink href={href} as={as} passHref={true}>
      <Container className={className} {...restProps}>
        {children}
      </Container>
    </NextLink>
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
