import styled from "styled-components";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";

import Button from "./Button";
import Tooltip from "./Tooltip";
import InputWrapper from "./InputWrapper";

type TTransform = {
  input: (value: TFolderOrFilesRaw) => string;
};

type TProp = {
  value: string;
  label: string;
  isDisabled?: boolean;
  whyIsDisabled?: string;
};

type TProps<T> = {
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
  description: string | React.ReactNode;
  values: TProp[];
  isDisabled?: boolean;
};

const SwitchInput = <T extends FieldValues>(props: TProps<T>) => {
  const { control, values, label, name, description, isDisabled } = props;

  const transform: TTransform = {
    input: (value) => JSON.stringify(value),
  };

  return (
    <InputWrapper
      label={label}
      description={description}
      isDisabled={isDisabled}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <Top>
                {values.map((property) => (
                  <Tooltip
                    key={property.value}
                    text={property.whyIsDisabled || ""}
                    disabled={!property.isDisabled}
                  >
                    <SwitchButton
                      size="small"
                      isSelected={field.value === property.value}
                      isDisabled={property.isDisabled}
                      onClick={() => field.onChange(property.value)}
                    >
                      {property.label || property.value}
                    </SwitchButton>
                  </Tooltip>
                ))}

                <Input
                  ref={field.ref}
                  type="text"
                  onBlur={field.onBlur}
                  value={transform.input(field.value)}
                  onChange={() => {}}
                />
              </Top>
            </>
          );
        }}
      />
    </InputWrapper>
  );
};

const Top = styled.div`
  width: 100%;
  display: flex;

  > * {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

const Input = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
`;

const SwitchButton = styled(Button)`
  background: ${({ theme, isSelected }) =>
    !isSelected ? theme.darkOpacity : theme.purple};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

export default SwitchInput;
