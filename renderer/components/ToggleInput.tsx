import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import Button from "./Button";

type TProps = {
  label: string;
  value: boolean | undefined;
  description: string;
  isDisabled?: boolean;
  onClick: () => void;
};

const FileInput = (props: TProps) => {
  const { label, value = false, description, isDisabled, onClick } = props;
  const theme = useContext(ThemeContext);

  return (
    <Container isDisabled={isDisabled}>
      <Label>{label}</Label>

      <InputContainer>
        <Top>
          <Button
            icon={value ? "check" : "visuallyHidden"}
            size="small"
            iconProps={{ color: theme.purple }}
            onClick={onClick}
          />
        </Top>

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
  background: ${({ isDisabled }) => (isDisabled ? "red" : "transparent")};
`;

const Label = styled.div`
  width: 120px;
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

  > * {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

const Description = styled.div`
  font-style: normal;
  font-weight: lighter;
  font-size: 14px;
  margin-top: 10px;
`;

export default FileInput;
