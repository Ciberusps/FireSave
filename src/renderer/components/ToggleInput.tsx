import { forwardRef, InputHTMLAttributes, useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import Icon from "./Icon";
import InputWrapper from "./InputWrapper";

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  description: React.ReactNode;
  isDisabled?: boolean;
};

const ToggleInput = (props: TProps, ref: any) => {
  const { name, label, description, isDisabled, ...restProps } = props;
  const theme = useContext(ThemeContext);

  return (
    <InputWrapper
      label={label}
      description={description}
      isDisabled={isDisabled}
    >
      <Label>
        <Input ref={ref} name={name} type="checkbox" {...restProps} />
        <FakeInput isDisabled={isDisabled}>
          <InputIcon icon="check" size="small" color={theme.purple} />
        </FakeInput>
      </Label>
    </InputWrapper>
  );
};

export default forwardRef<HTMLInputElement, TProps>(ToggleInput);

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
