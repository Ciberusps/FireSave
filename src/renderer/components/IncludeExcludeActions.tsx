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

    result.excludeButtons.push(
      <ButtonStyled onClick={onClickExclude(checkedNodes)}>
        {/* Exclude file(s)/folder(s) */}
        {/* Exclude only files/folders */}
        Exclude file/folder
      </ButtonStyled>
    );
    if (!saveFullFolder) {
      result.includeButtons.push(
        <ButtonStyled onClick={onClickInclude(checkedNodes)}>
          Include file/folder
        </ButtonStyled>
      );
    }

    const parsedFiles = checkedNodes.map((key) => parsePath(key));
    // console.log({ parsedFiles });
    if (!parsedFiles.length) return result;

    const filesWithExt = parsedFiles.filter((p) => !!p.ext);
    if (!filesWithExt.length) return result;

    const groupedByDir = groupBy(filesWithExt, "dir");

    const OrTextEl = <OrText>or use pattern</OrText>;

    result.excludeButtons.push(OrTextEl);
    !saveFullFolder && result.includeButtons.push(OrTextEl);

    Object.keys(groupedByDir).forEach((dir) => {
      const files = groupedByDir[dir];
      const groupedByExtension = groupBy(files, "ext");
      Object.entries(groupedByExtension).forEach(([, val]) => {
        const dirName = val[0].dir ? val[0].dir + "/" : "";
        const fileExt = val[0].ext ?? "";
        const dirNameText = dirName.length ? dirName : "/";

        const onlyInFolderKey = `${dirName}*${fileExt}`;
        const inFolderAndAllFoldersBelowKey = `${dirName}**/*${fileExt}`;
        const allByFileTypeKey = `**/*${fileExt}`;

        const excludeFolderText = (
          <>
            <TextHighlight>*{fileExt}</TextHighlight> in{" "}
            <TextHighlight>{dirNameText}</TextHighlight>
          </>
        );
        const excludeAllText = (
          <>
            <TextHighlight>*{fileExt}</TextHighlight> in{" "}
            <TextHighlight>{dirNameText}</TextHighlight>
            <span>and all folders below</span>
          </>
        );
        const excludeAllByFileTypeText = (
          <>
            <TextHighlight> *{fileExt}</TextHighlight>
            <span>everywhere</span>
          </>
        );

        result.excludeButtons.push(
          <div key={result.excludeButtons.length}>
            <ButtonStyled
              size="small"
              title={`Exclude '${onlyInFolderKey}'`}
              onClick={onClickExclude([onlyInFolderKey])}
            >
              Exclude {excludeFolderText}
            </ButtonStyled>
            <ButtonStyled
              size="small"
              title={`Exclude '${inFolderAndAllFoldersBelowKey}'`}
              onClick={onClickExclude([inFolderAndAllFoldersBelowKey])}
            >
              Exclude {excludeAllText}
            </ButtonStyled>
            <ButtonStyled
              size="small"
              title={`Exclude '${allByFileTypeKey}'`}
              onClick={onClickExclude([allByFileTypeKey])}
            >
              Exclude {excludeAllByFileTypeText}
            </ButtonStyled>
          </div>
        );

        if (!saveFullFolder) {
          result.includeButtons.push(
            <div key={result.includeButtons.length}>
              <ButtonStyled
                size="small"
                title={`Include '${onlyInFolderKey}'`}
                onClick={onClickInclude([onlyInFolderKey])}
              >
                Include {excludeFolderText}
              </ButtonStyled>

              <ButtonStyled
                size="small"
                title={`Include '${inFolderAndAllFoldersBelowKey}'`}
                onClick={onClickInclude([inFolderAndAllFoldersBelowKey])}
              >
                Include {excludeAllText}
              </ButtonStyled>

              <ButtonStyled
                size="small"
                title={`Include '${allByFileTypeKey}'`}
                onClick={onClickInclude([allByFileTypeKey])}
              >
                Include {excludeAllByFileTypeText}
              </ButtonStyled>
            </div>
          );
        }
      });
    });

    return result;
  }, [checkedNodes, saveFullFolder, onClickInclude, onClickExclude]);

  if (checkedNodes.length === 0) {
    return <div>Select files/folders to include/exclude</div>;
  }

  return (
    <>
      {Boolean(includeButtons.length) && (
        <Buttons>{includeButtons.map((button) => button)}</Buttons>
      )}

      {Boolean(excludeButtons.length) && (
        <Buttons>{excludeButtons.map((button) => button)}</Buttons>
      )}
    </>
  );
};

export default IncludeExcludeActions;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: -10px;
`;

const ButtonStyled = styled(Button)`
  margin: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TextHighlight = styled.span`
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

const OrText = styled.div`
  margin-right: 15px;
  margin-left: 15px;
`;
