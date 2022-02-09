import { forwardRef, useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import Icon from "./Icon";
import InputWrapper from "./InputWrapper";

type TProps = {
  name: string;
  label: string;
  description: string;
  isDisabled?: boolean;
};

const ToggleInput = forwardRef<HTMLInputElement, TProps>((props, ref) => {
  const { name, label, description, isDisabled } = props;
  const theme = useContext(ThemeContext);

  return (
    <InputWrapper
      label={label}
      description={description}
      isDisabled={isDisabled}
    >
      <Label>
        <Input ref={ref} name={name} type="checkbox" />
        <FakeInput isDisabled={isDisabled}>
          <InputIcon icon="check" size="small" color={theme.purple} />
        </FakeInput>
      </Label>
    </InputWrapper>
  );
});

const InputIcon = styled(Icon)`
  visibility: hidden;
  transition: 0.1s;
`;

type TFakeInput = {
  isDisabled?: boolean;
};

const FakeInput = styled.div<TFakeInput>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: ${({ theme }) => theme.darkOpacity};
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    background: ${({ isDisabled, theme }) =>
      !isDisabled ? theme.purpleHovered : theme.darkOpacity};
  }
`;

const Input = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;

  &:checked {
    + ${FakeInput} {
      ${InputIcon} {
        visibility: visible;
      }
    }
  }
`;

const Label = styled.label``;

export default ToggleInput;
