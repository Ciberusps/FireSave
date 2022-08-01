import styled, { useTheme } from "styled-components";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

import Button from "./Button";
import Tooltip from "./Tooltip";
import InputWrapper from "./InputWrapper";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { transparentize } from "polished";

type TTransform = {
  input: (value: TFolderOrFilesRaw) => string;
};

export type TSelectInputOption = {
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
  options: TSelectInputOption[];
  isDisabled?: boolean;
};

const SelectInput = <T extends FieldValues>(props: TProps<T>) => {
  const { control, options, label, name, description, isDisabled } = props;
  const theme = useTheme();

  const inputStyles: StylesConfig = useMemo(
    () => ({
      valueContainer: (base) => ({ ...base, paddingLeft: 0, margin: -2 }),
      control: (base) => ({
        ...base,
        width: "250px",
        borderColor: transparentize(0.2, theme.purple),
        background: "transparent",
        // borderTopColor: "transparent",
        // borderLeftColor: "transparent",
        // borderRightColor: "transparent",
      }),
      indicatorSeparator: (base) => ({
        ...base,
      }),
      option: (base) => ({
        ...base,
        borderRadius: 5,
        cursor: "pointer",
        margin: 2,
      }),
      menu: (base) => ({
        ...base,
        background: "#1c1c1c",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      }),
    }),
    [theme]
  );

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
          console.log(field);
          return (
            <Select
              menuPortalTarget={document.body}
              options={options}
              styles={inputStyles}
              value={options.find((o) => o.value === field.value)}
              theme={(reactSelectTheme) => ({
                ...reactSelectTheme,
                colors: {
                  ...reactSelectTheme.colors,
                  primary: theme.purple,
                  primary75: transparentize(0.75, theme.purple),
                  primary50: transparentize(0.5, theme.purple),
                  primary25: transparentize(0.25, theme.purple),
                  neutral0: theme.white,
                  neutral5: transparentize(0.95, theme.purple),
                  neutral10: transparentize(0.5, theme.purple), // tags background
                  neutral20: transparentize(0.8, theme.purple),
                  neutral30: transparentize(0.7, theme.purple),
                  neutral40: transparentize(0.6, theme.purple),
                  neutral50: theme.dark,
                  neutral60: transparentize(0.4, theme.purple),
                  neutral70: transparentize(0.3, theme.purple),
                  neutral80: theme.white,
                  neutral90: transparentize(0.1, theme.purple),
                },
              })}
              onChange={(newVal) => field.onChange(newVal.value)}
            />
          );
        }}
      />
    </InputWrapper>
  );
};

export default SelectInput;
