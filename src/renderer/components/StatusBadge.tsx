import React from "react";
import styled from "styled-components";

import Tooltip from "./Tooltip";

type TStatusBadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  background: string;
  tooltipText: React.ReactNode;
  children: React.ReactNode;
};

const StatusBadge = (props: TStatusBadgeProps) => {
  const { background, tooltipText, children, ...restProps } = props;

  return (
    <Tooltip text={tooltipText}>
      <Container background={background} {...restProps}>
        {children}
      </Container>
    </Tooltip>
  );
};

export default StatusBadge;

const Container = styled.div<Pick<TStatusBadgeProps, "background">>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.5px;
  width: 24px;
  height: 24px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.75);
  background: ${({ background }) => background};
`;
