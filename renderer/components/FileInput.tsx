import styled from "styled-components";

import Button from "./Button";

type TProps = {
  label: string;
  value: string | undefined;
  files?: string[];
  description: string | React.ReactNode;
  isDisabled?: boolean;
  onClick: () => void;
};

const FileInput = (props: TProps) => {
  const { label, value, files, description, isDisabled, onClick } = props;

  const onShowInExplorer = () => {
    ipcRenderer.invoke("revealInFileExplorer", value);
  };

  return (
    <Container isDisabled={isDisabled}>
      <Label>{label}</Label>

      <InputContainer>
        <Top>
          <Path>{value ? value : "..."}</Path>

          <Button size="small" onClick={onClick}>
            Choose
          </Button>

          <Button
            icon="openInNew"
            size="small"
            title="Reveal in expolorer"
            onClick={onShowInExplorer}
          />
        </Top>

        {files && (
          <Files>
            <FilesHeader>Files:</FilesHeader>
            {files.map((file) => (
              <File>{file}</File>
            ))}
          </Files>
        )}

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
  opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "unset")};
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

const Path = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: #333;
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 300;
  font-size: 14px;
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
  flex: 0;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.darkOpacity};
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 300;
  font-size: 14px;
`;

const Description = styled.div`
  font-style: normal;
  font-weight: lighter;
  font-size: 14px;
  margin-top: 10px;
`;

export default FileInput;
