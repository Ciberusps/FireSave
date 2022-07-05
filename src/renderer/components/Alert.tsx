import { transparentize } from "polished";
import styled from "styled-components";

import { TIntent } from "../utils/toaster";

type TProps = {
  variant: TIntent;
  children: React.ReactNode;
};

const Alert = (props: TProps) => {
  const { variant, children, ...restProps } = props;

  return (
    <Container variant={variant} {...restProps}>
      {children}
    </Container>
  );
};

export default Alert;

type TContainer = {
  variant: TIntent;
};

const Container = styled.div<TContainer>`
  flex: 1;
  width: 100%;
  display: flex;
  background: ${({ theme, variant }) =>
    transparentize(0.75, theme.feedback?.[variant] || "#fff")};
  border: 1px solid
    ${({ theme, variant }) => theme.feedback?.[variant] || "#fff"};
  border-radius: 4px;
  padding: 10px 20px;
`;
