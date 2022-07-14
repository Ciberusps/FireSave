import styled from "styled-components";

type TProps = {
  label: string;
  children: any;
  description: string | React.ReactNode;
  isDisabled?: boolean;
};

const InputWrapper = (props: TProps) => {
  const { label, children, description, isDisabled } = props;

  return (
    <Container isDisabled={isDisabled}>
      <Name>{label}</Name>

      <InputContainer>
        <Top>{children}</Top>

        <Description>{description}</Description>
      </InputContainer>
    </Container>
  );
};

type TContainer = {
  isDisabled?: boolean;
};

const Container = styled.div<TContainer>`
  display: flex;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.35 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "unset")};
`;

const Name = styled.div`
  width: 170px;
  padding-right: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /*
  > * {
    &:not(:first-child) {
      margin-left: 10px;
    }
  } */
`;

const Description = styled.div`
  font-style: normal;
  font-weight: normal;
  color: #d3d3d3;
  font-size: 14px;
  margin-top: 10px;
`;

export default InputWrapper;
