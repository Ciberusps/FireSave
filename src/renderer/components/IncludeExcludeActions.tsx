import { useMemo } from "react";
import styled from "styled-components";
import parsePath from "parse-filepath";
import groupBy from "lodash.groupby";

import Button from "./Button";

type TButtonsResult = {
  includeButtons: JSX.Element[];
  excludeButtons: JSX.Element[];
};

type TProps = {
  saveFullFolder: boolean;
  checkedNodes: string[];
  onClickInclude: (keys: string[]) => () => void;
  onClickExclude: (keys: string[]) => () => void;
};

const IncludeExcludeActions = (props: TProps) => {
  const { saveFullFolder, checkedNodes, onClickInclude, onClickExclude } =
    props;

  const { includeButtons, excludeButtons } = useMemo(() => {
    const result: TButtonsResult = {
      includeButtons: [],
      excludeButtons: [],
    };
    const parsedFiles = checkedNodes.map((key) => parsePath(key));
    console.log({ parsedFiles });
    if (!parsedFiles.length) return result;

    result.excludeButtons.push(
      <ButtonStyled size="small" onClick={onClickExclude(checkedNodes)}>
        {/* Exclude file(s)/folder(s) */}
        {/* Exclude only files/folders */}
        Exclude
      </ButtonStyled>
    );
    result.excludeButtons.push(<div>or</div>);

    if (!saveFullFolder) {
      result.includeButtons.push(
        <ButtonStyled size="small" onClick={onClickInclude(checkedNodes)}>
          Include
        </ButtonStyled>
      );
      result.includeButtons.push(<div>or</div>);
    }

    const filesWithExt = parsedFiles.filter((p) => !!p.ext);
    if (filesWithExt.length > 0) {
      const groupedByDir = groupBy(filesWithExt, "dir");
      Object.keys(groupedByDir).forEach((dir) => {
        const files = groupedByDir[dir];
        const groupedByExtension = groupBy(files, "ext");
        Object.entries(groupedByExtension).forEach(([, val]) => {
          const dirName = val[0].dir ? val[0].dir + "/" : "";
          const fileExt = val[0].ext ?? "";
          const excludeFolderKey = `${dirName}*${fileExt}`;
          const excludeAllKey = `${dirName}**/*${fileExt}`;
          console.log({ excludeKey: excludeFolderKey });

          const excludeFolderText = (
            <>
              <ExcludePath>*{fileExt}</ExcludePath> in{" "}
              <ExcludePath>{dirName}</ExcludePath>
            </>
          );

          const excludeAllText = (
            <>
              Exclude <ExcludePath>*{fileExt}</ExcludePath> in{" "}
              <ExcludePath>{dirName}</ExcludePath>
              <span>and all folders below</span>
            </>
          );

          result.excludeButtons.push(
            <ButtonStyled
              size="small"
              onClick={onClickExclude([excludeFolderKey])}
            >
              Exclude {excludeFolderText}
            </ButtonStyled>
          );
          result.excludeButtons.push(
            <ButtonStyled
              size="small"
              onClick={onClickExclude([excludeAllKey])}
            >
              Exclude {excludeAllText}
            </ButtonStyled>
          );

          if (!saveFullFolder) {
            result.includeButtons.push(
              <ButtonStyled
                size="small"
                onClick={onClickExclude([excludeFolderKey])}
              >
                Include {excludeFolderText}
              </ButtonStyled>
            );
            result.includeButtons.push(
              <ButtonStyled
                size="small"
                onClick={onClickExclude([excludeAllKey])}
              >
                Include {excludeAllText}
              </ButtonStyled>
            );
          }
        });
      });

      console.log({ groupedByDir });
    }
    return result;
  }, [checkedNodes, saveFullFolder]);

  if (checkedNodes.length === 0) {
    return <div>Select files/folders to include/exclude</div>;
  }

  return (
    <Container>
      <Buttons>{includeButtons.map((button) => button)}</Buttons>
      <Buttons>{excludeButtons.map((button) => button)}</Buttons>
    </Container>
  );
};

export default IncludeExcludeActions;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: -10px;
`;

const ButtonStyled = styled(Button)`
  margin: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ExcludePath = styled.span`
  background: rgba(0, 0, 0, 0.3);
  padding: 4px;
  margin-left: 6px;

  &:not(:last-child) {
    margin-right: 6px;
  }
  // fontSize: 12,
  // paddingRight: 6,
  // paddingLeft: 6,
`;
