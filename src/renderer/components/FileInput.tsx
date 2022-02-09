import { useMemo } from "react";
import styled from "styled-components";
import { Controller, Control } from "react-hook-form";

import Button from "./Button";
import InputWrapper from "./InputWrapper";

export type TFileInputValue = {
  path: string;
  files: string[];
};

type TProp = "openFile" | "openDirectory" | "multiSelections";

type TProps = {
  control: Control;
  label: string;
  name: string;
  description: string | React.ReactNode;
  properties: TProp[];
  filters?: { name: string; extensions: string[] }[];
  isDisabled?: boolean;
};

const FileInput = (props: TProps) => {
  const { control, properties, filters, label, name, description, isDisabled } =
    props;

  // return null;

  return (
    <InputWrapper
      label={label}
      description={description}
      isDisabled={isDisabled}
    >
      <Controller
        name={name}
        control={control}
        render={({ onChange, onBlur, value, ref }) => {
          const parsedValue: TFileInputValue | undefined = useMemo(
            () => (value ? JSON.parse(value) : undefined),
            [value]
          );

          return (
            <>
              <Top>
                <Path>{parsedValue?.path ? parsedValue.path : "..."}</Path>

                <Button
                  size="small"
                  onClick={async () => {
                    const newVal = await window.electron.openDialog({
                      properties,
                      filters,
                      defaultPath: parsedValue?.path,
                    });
                    if (newVal) {
                      console.log(newVal);
                      onChange(JSON.stringify(newVal));
                    } else {
                      //TODO: error
                    }
                  }}
                >
                  Choose
                </Button>

                <Button
                  icon="openInNew"
                  size="small"
                  title="Reveal in expolorer"
                  onClick={() => window.electron.revealInFileExplorer(value)}
                />

                <Input
                  ref={ref}
                  type="string"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                />
              </Top>

              {parsedValue?.files && (
                <Files>
                  <FilesHeader>Files:</FilesHeader>
                  {parsedValue.files.map((file) => (
                    <File key={file}>{file}</File>
                  ))}
                </Files>
              )}
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

const Path = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: #333;
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 350;
  font-size: 14px;
`;

const Input = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
`;

const Files = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: -5px;
  margin-top: 10px;

  > * {
    margin: 5px;
  }
`;

const FilesHeader = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
`;

const File = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.darkOpacity};
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 300;
  font-size: 14px;
`;

export default FileInput;
