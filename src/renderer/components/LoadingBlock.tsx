import styled from "styled-components";

import ActivityIndicator from "./ActivityIndicator";

type TProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

const LoadingBlock = (props: TProps) => {
  const { isLoading, children } = props;

  return (
    <Content>
      <div style={{ opacity: isLoading ? 0.3 : 1 }}>{children}</div>

      {isLoading && (
        <Overlay>
          <ActivityIndicator />
        </Overlay>
      )}
    </Content>
  );
};

export default LoadingBlock;

const Content = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
