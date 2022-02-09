import React from "react";
import styled from "styled-components";

type TProps = {
  children?: React.ReactNode;
};

const ActivityIndicator = (props: TProps) => {
  const { children, ...restProps } = props;
  return <Container {...restProps}>Loading...</Container>;
};

export default ActivityIndicator;

const Container = styled.div``;
