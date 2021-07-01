import styled from "styled-components";
import { Controller, Control } from "react-hook-form";

import InputWrapper from "./InputWrapper";

type TProps = {
  name: string;
  label: string;
  min: number;
  max: number;
  description: string;
  control: Control;
  isDisabled?: boolean;
};

const NumberInput = (props: TProps) => {
  const { control, label, name, min, max, description, isDisabled } = props;

  return (
    <InputWrapper label={label} description={description} isDisabled={isDisabled}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, onBlur, value, ref }) => (
          <Input
            ref={ref}
            type="number"
            min={min}
            max={max}
            onBlur={onBlur}
            onChange={(e) => {
              e.preventDefault();
              let newVal = Number(e.target.value.slice(0, 2));
              if (newVal <= 0) newVal = 1;
              e.target.value = String(newVal);
              onChange(newVal);
            }}
            value={value}
          />
        )}
      />
    </InputWrapper>
  );
};

const Input = styled.input`
  background: ${({ theme }) => theme.darkOpacity};
  outline: none;
  border: 0px;
  border-radius: 4px;
  height: 30px;
  color: ${({ theme }) => theme.white};
  font-weight: 350;
  font-size: 14px;
  padding-left: 15px;
`;

export default NumberInput;
