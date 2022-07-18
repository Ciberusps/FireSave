import { useMemo } from "react";
import styled from "styled-components";
import parsePath from "parse-filepath";
import groupBy from "lodash.groupby";
import { useTranslation } from "react-i18next";

import Button from "./Button";

type TButtonsResult = {
  includeButtons: JSX.Element[];
  excludeButtons: JSX.Element[];
};

type TProps = {
  includeAll: boolean;
  checkedNodes: string[];
  onClickInclude: (keys: string[]) => () => void;
  onClickExclude: (keys: string[]) => () => void;
};

// TODO: probably needs rework for better localization
const IncludeExcludeActions = (props: TProps) => {
  const { includeAll, checkedNodes, onClickInclude, onClickExclude } = props;
  const { t } = useTranslation();

  const { includeButtons, excludeButtons } = useMemo(() => {
    const result: TButtonsResult = {
      includeButtons: [],
      excludeButtons: [],
    };

    result.excludeButtons.push(
      <ButtonStyled onClick={onClickExclude(checkedNodes)}>
        {t("include_exclude_actions_component.exclude_file_or_folder")}
      </ButtonStyled>
    );
    if (!includeAll) {
      result.includeButtons.push(
        <ButtonStyled onClick={onClickInclude(checkedNodes)}>
          {t("include_exclude_actions_component.include_file_or_folder")}
        </ButtonStyled>
      );
    }

    const parsedFiles = checkedNodes.map((key) => parsePath(key));
    if (!parsedFiles.length) return result;

    const filesWithExt = parsedFiles.filter((p) => !!p.ext);
    if (!filesWithExt.length) return result;

    const groupedByDir = groupBy(filesWithExt, "dir");

    const OrTextEl = (
      <OrText>{t("include_exclude_actions_component.or_use_pattern")}</OrText>
    );

    result.excludeButtons.push(OrTextEl);
    !includeAll && result.includeButtons.push(OrTextEl);

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
            <TextHighlight>*{fileExt}</TextHighlight>{" "}
            {t("include_exclude_actions_component.in")}{" "}
            <TextHighlight>{dirNameText}</TextHighlight>
          </>
        );
        const excludeAllText = (
          <>
            <TextHighlight>*{fileExt}</TextHighlight>{" "}
            {t("include_exclude_actions_component.in")}{" "}
            <TextHighlight>{dirNameText}</TextHighlight>
            <span>
              {t("include_exclude_actions_component.and_all_folders_below")}
            </span>
          </>
        );
        const excludeAllByFileTypeText = (
          <>
            <TextHighlight> *{fileExt}</TextHighlight>
            <span>{t("include_exclude_actions_component.everywhere")}</span>
          </>
        );

        result.excludeButtons.push(
          <div key={result.excludeButtons.length}>
            <ButtonStyled
              size="small"
              title={`Exclude '${onlyInFolderKey}'`}
              onClick={onClickExclude([onlyInFolderKey])}
            >
              {t("include_exclude_actions_component.exclude_file_or_folder")}{" "}
              {excludeFolderText}
            </ButtonStyled>
            <ButtonStyled
              size="small"
              title={`Exclude '${inFolderAndAllFoldersBelowKey}'`}
              onClick={onClickExclude([inFolderAndAllFoldersBelowKey])}
            >
              {t("include_exclude_actions_component.exclude_file_or_folder")}{" "}
              {excludeAllText}
            </ButtonStyled>
            <ButtonStyled
              size="small"
              title={`Exclude '${allByFileTypeKey}'`}
              onClick={onClickExclude([allByFileTypeKey])}
            >
              {t("include_exclude_actions_component.exclude_file_or_folder")}{" "}
              {excludeAllByFileTypeText}
            </ButtonStyled>
          </div>
        );

        if (!includeAll) {
          result.includeButtons.push(
            <div key={result.includeButtons.length}>
              <ButtonStyled
                size="small"
                title={`Include '${onlyInFolderKey}'`}
                onClick={onClickInclude([onlyInFolderKey])}
              >
                {t("include_exclude_actions_component.include_file_or_folder")}{" "}
                {excludeFolderText}
              </ButtonStyled>

              <ButtonStyled
                size="small"
                title={`Include '${inFolderAndAllFoldersBelowKey}'`}
                onClick={onClickInclude([inFolderAndAllFoldersBelowKey])}
              >
                {t("include_exclude_actions_component.include_file_or_folder")}{" "}
                {excludeAllText}
              </ButtonStyled>

              <ButtonStyled
                size="small"
                title={`Include '${allByFileTypeKey}'`}
                onClick={onClickInclude([allByFileTypeKey])}
              >
                {t("include_exclude_actions_component.include_file_or_folder")}{" "}
                {excludeAllByFileTypeText}
              </ButtonStyled>
            </div>
          );
        }
      });
    });

    return result;
  }, [checkedNodes, includeAll, t, onClickInclude, onClickExclude]);

  if (checkedNodes.length === 0) {
    return (
      <div>
        {t(
          includeAll
            ? "include_exclude_actions_component.empty_warning_include_all_on"
            : "include_exclude_actions_component.empty_warning_include_all_off"
        )}
      </div>
    );
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
