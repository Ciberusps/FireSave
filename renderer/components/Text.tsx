import React from "react";
import styled from "styled-components";

type TProps = {
  children?: React.ReactNode;
};

const Text = (props: TProps) => {
  const { children, ...restProps } = props;
  return <Container {...restProps}>{children}</Container>;
};

export default Text;

const Container = styled.div`
  color: ${({ theme }) => theme.white};
`;
