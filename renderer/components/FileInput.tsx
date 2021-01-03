import styled from "styled-components";

type TProps = {
  label: string;
  path?: string;
  isDisabled?: boolean;
  onClick: () => void;
};

const IndexPage = (props: TProps) => {
  const { label, path, isDisabled, onClick } = props;

  return (
    <Container isDisabled={isDisabled}>
      <Label>{label}</Label>
      <Path>{path ? path : "..."}</Path>
      <ChooseButton onClick={onClick}>Choose</ChooseButton>
    </Container>
  );
};

type TContainer = {
  isDisabled?: boolean;
};

const Container = styled.div<TContainer>`
  display: flex;
  align-items: center;
  padding: 6px 0px;
  background: ${({ isDisabled }) => (isDisabled ? "red" : "transparent")};
`;

const Label = styled.div`
  width: 100px;
  font-size: 18px;
  margin-right: 10px;
`;

const Path = styled.div`
  display: flex;
  flex: 1;
  background: #333;
  padding: 6px 10px;
`;

const ChooseButton = styled.button`
  margin-left: 16px;
`;

export default IndexPage;
