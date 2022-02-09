import styled from "styled-components";

const ErrorFallback = () => {
  return (
    <Container>
      Error happened 🙃
      <br />
      Try to reload app
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 40px;
  font-weight: 600;
`;

export default ErrorFallback;
