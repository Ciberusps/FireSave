import { useCallback } from "react";
import styled from "styled-components";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";

import Button from "./Button";
import InputWrapper from "./InputWrapper";
import RevealInFileExplorerButton from "./RevealInFileExplorerButton";

type TTransform = {
  input: (value: TFolderOrFilesRaw) => string;
};

type TProp = "openFile" | "openDirectory" | "multiSelections";

type TProps<T> = {
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
  description: string | React.ReactNode;
  properties: TProp[];
  filters?: { name: string; extensions: string[] }[];
  isDisabled?: boolean;
};

const FolderOrFilesInput = <T extends FieldValues>(props: TProps<T>) => {
  const { control, properties, filters, label, name, description, isDisabled } =
    props;

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
          const onChooseClick = useCallback(async () => {
            const newVal = await window.electron.openDialog({
              properties,
              filters,
              defaultPath: field.value?.path,
            });
            if (newVal) {
              console.log(newVal);
              field.onChange(newVal);
            } else {
              //TODO: error
            }
          }, []);

          return (
            <>
              <Top>
                <Path>{field.value?.path || "..."}</Path>

                <Button size="small" onClick={onChooseClick}>
                  Choose
                </Button>

                <RevealInFileExplorerButton
                  path={field.value?.path}
                  isDisabled={!field.value?.path}
                />

                <Input
                  ref={field.ref}
                  type="text"
                  onBlur={field.onBlur}
                  value={transform.input(field.value)}
                />
              </Top>

              {field.value?.files && (
                <Files>
                  <FilesHeader>Files:</FilesHeader>
                  {field.value?.files.map((file) => (
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

export default FolderOrFilesInput;