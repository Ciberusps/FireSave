import styled from "styled-components";

type TProps = {
  label: string;
  path?: string;
  onClick: () => void;
};

const IndexPage = (props: TProps) => {
  const { label, path, onClick } = props;

  return (
    <Container>
      <Label>{label}</Label>
      <Path>{path}</Path>
      <ChooseButton onClick={onClick}>Choose</ChooseButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0px;
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
