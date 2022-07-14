import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faFolderOpen,
  faMinusSquare,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faChevronRight,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import CheckboxTree from "react-checkbox-tree";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import FormBlock from "../../../components/FormBlock";
import ListInput from "../../../components/ListInput";
import ToggleInput from "../../../components/ToggleInput";
import SwitchInput from "../../../components/SwitchInput";
import LoadingBlock from "../../../components/LoadingBlock";
import FolderOrFilesInput from "../../../components/FolderOrFilesInput";
import IncludeExcludeActions from "../../../components/IncludeExcludeActions";

import Toaster from "../../../utils/toaster";
import { globToNodes, TNode } from "../../../utils/globTree";
import { useGamesStore, useSettingsStore } from "../../../utils/stores";

const folderColor = "#ffd970";

type TGameForm = {
  gamePath: TFolderOrFilesRaw;
  savesConfig: TSavesConfig & {
    saveFolder: TFolderOrFilesRaw;
  };
};

// TODO: globby size
// TODO: prefill from pcGamingWiki
const GameSettingsPage = () => {
  const navigate = useNavigate();
  const games = useGamesStore((state) => state.games);
  const PLATFORM = useSettingsStore((state) => state.envs.PLATFORM);
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();

  const [folderContentTree, setFolderContentTree] = useState<TNode[]>([]);
  const [folderCheckedNodes, setFolderCheckedNodes] = useState<string[]>([]);
  const [folderExpandedNodes, setFolderExpandedNodes] = useState<string[]>([]);
  const [isLoadingFolderContent, setIsLoadingFolderContent] = useState(false);

  const [resultContentTree, setResultContentTree] = useState<TNode[]>([]);
  const [isLoadingResultContent, setIsLoadingResultContent] = useState(false);

  const isEditing = id !== "new";
  const game = id ? games[id] : undefined;

  const icons = useMemo(
    () => ({
      check: <FontAwesomeIcon icon={faCheckSquare} color={theme.purple} />,
      uncheck: <FontAwesomeIcon icon={faSquare} />,
      halfCheck: <FontAwesomeIcon icon={faCheckSquare} />,
      expandClose: <FontAwesomeIcon icon={faChevronRight} />,
      expandOpen: <FontAwesomeIcon icon={faChevronDown} />,
      expandAll: <FontAwesomeIcon icon={faPlusSquare} />,
      collapseAll: <FontAwesomeIcon icon={faMinusSquare} />,
      parentClose: <FontAwesomeIcon icon={faFolder} color={folderColor} />,
      parentOpen: <FontAwesomeIcon icon={faFolderOpen} color={folderColor} />,
      leaf: <FontAwesomeIcon icon={faFile} color={theme.white} />,
    }),
    [theme]
  );

  const { control, watch, handleSubmit, register, setValue } =
    useForm<TGameForm>({
      defaultValues: {
        gamePath: game?.gamePath?.[PLATFORM],
        savesConfig: {
          type: "simple",
          saveFolder: {
            path: "",
          },
          saveFullFolder: true,
          includeList: [],
          excludeList: [],
          ...game?.savesConfig?.[PLATFORM],
        },
      },
    });

  const typeWatch = watch("savesConfig.type");
  const saveFolderWatch = watch("savesConfig.saveFolder");
  const saveFullFolderWatch = watch("savesConfig.saveFullFolder", true);
  const includeListWatch = watch("savesConfig.includeList", []);
  const excludeListWatch = watch("savesConfig.excludeList", []);

  const updateFormValues = useCallback(async () => {
    const path = saveFolderWatch?.path;
    if (!path) return;

    const newFolderContentTree = await getContentTree(
      path,
      ["**/*"],
      [],
      setIsLoadingFolderContent
    );
    if (newFolderContentTree) {
      setFolderContentTree(newFolderContentTree);
    }

    const newResultContentTree = await getContentTree(
      path,
      [...(saveFullFolderWatch ? ["**/*"] : []), ...includeListWatch],
      excludeListWatch,
      setIsLoadingResultContent
    );
    if (newResultContentTree) {
      setResultContentTree(newResultContentTree);
    }
  }, [
    saveFolderWatch,
    saveFullFolderWatch,
    includeListWatch,
    excludeListWatch,
    setFolderContentTree,
    setIsLoadingFolderContent,
    setResultContentTree,
    setIsLoadingResultContent,
  ]);

  const onClickInclude = useCallback(
    (keys: string[]) => () => {
      const newList = [...new Set([...keys, ...includeListWatch])];
      setValue("savesConfig.includeList", newList);
      // TODO: probably can unselect only values that were touched
      setFolderCheckedNodes([]);
    },
    [includeListWatch, setValue, setFolderCheckedNodes]
  );
  const onClickExclude = useCallback(
    (keys: string[]) => () => {
      const newList = [...new Set([...keys, ...excludeListWatch])];
      setValue("savesConfig.excludeList", newList);
      setFolderCheckedNodes([]);
    },
    [excludeListWatch, setValue, setFolderCheckedNodes]
  );

  const onClickRemoveInclude = useCallback(
    (keys: string[]) => () => {
      const newList = [
        ...new Set([...includeListWatch.filter((k) => !keys.includes(k))]),
      ];
      setValue("savesConfig.includeList", newList);
    },
    [includeListWatch, setValue]
  );
  const onClickRemoveExclude = useCallback(
    (keys: string[]) => () => {
      const newList = [
        ...new Set([...excludeListWatch.filter((k) => !keys.includes(k))]),
      ];
      setValue("savesConfig.excludeList", newList);
    },
    [excludeListWatch, setValue]
  );

  useEffect(() => {
    updateFormValues();
  }, [
    saveFolderWatch,
    saveFullFolderWatch,
    includeListWatch,
    excludeListWatch,
    updateFormValues,
  ]);

  const onSubmit = async (data: TGameForm) => {
    console.log("NEW DATA", data);
    try {
      if (isEditing && game) {
        // TODO: так делать нерпавильно нужно вынести в main process заполнение платформы
        window.api.editGame(game.id, {
          isValid: true,
          savesConfig: { [PLATFORM]: data.savesConfig },
        });
      } else {
        if (!data.gamePath || !data.savesConfig) {
          // TODO: show error
          return;
        }
        window.api.createCustomGame({
          gamePath: data.gamePath,
          savesConfig: data.savesConfig,
        });
      }
      navigate("/");
    } catch (err) {
      Toaster.add({
        intent: "error",
        content: "Something went wrong" + JSON.stringify(err),
      });
    }
  };

  return (
    <Layout>
      <Header>{isEditing ? game?.name : "Add game"}</Header>

      <h3>{isEditing ? "You need to setup saves config first" : ""}</h3>

      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        <FolderOrFilesInput<TGameForm>
          control={control}
          name="gamePath"
          label="Game exe file"
          description={<Description>Path to game exe</Description>}
          property={"openFile"}
          isDisabled={isEditing && game?.isCreatedAutomatically}
        />

        <SwitchInput<TGameForm>
          control={control}
          name="savesConfig.type"
          values={[{ value: "simple" }, { value: "advanced" }]}
          label="Save config type"
          description="'Simple' easy to setup only folder required but can be heavier in size, 'Advanced' - select folder and exclude unnecessary files"
        />

        <FolderOrFilesInput<TGameForm>
          control={control}
          name="savesConfig.saveFolder"
          label="Saves folder"
          description={<Description>Path to saves folder</Description>}
          property={"openDirectory"}
        />

        {typeWatch === "advanced" && (
          <>
            <ToggleInput
              label="Save full folder"
              description={
                <>
                  Switch between include list and exclude list.
                  <br /> - Checked - include all files by default and use
                  exclude list for exclusions
                  <br /> - Unchecked - include files only from include list and
                  exclude files from exclude list
                </>
              }
              {...register("savesConfig.saveFullFolder")}
            />

            {!saveFolderWatch && <div>Choose saves folder first</div>}
            {saveFolderWatch && (
              <TreesContainer>
                <CheckboxTreeStyled>
                  <div>Files</div>
                  <br />

                  <LoadingBlock isLoading={isLoadingFolderContent}>
                    <CheckboxTree
                      nodes={folderContentTree}
                      icons={icons}
                      checked={folderCheckedNodes}
                      expanded={folderExpandedNodes}
                      checkModel="all"
                      // noCascade={false}
                      expandOnClick={true}
                      noCascade={true}
                      showExpandAll={true}
                      onClick={() => {}}
                      onCheck={setFolderCheckedNodes}
                      onExpand={setFolderExpandedNodes}
                    />
                  </LoadingBlock>
                </CheckboxTreeStyled>

                <CheckboxTreeStyled>
                  <div>Result - files that will be saved</div>
                  <br />

                  <LoadingBlock isLoading={isLoadingResultContent}>
                    <CheckboxTree
                      nodes={resultContentTree}
                      icons={icons}
                      checked={folderCheckedNodes}
                      expanded={folderExpandedNodes}
                      checkModel="all"
                      disabled={true}
                      expandOnClick={true}
                      noCascade={true}
                    />
                  </LoadingBlock>
                </CheckboxTreeStyled>
              </TreesContainer>
            )}

            <IncludeExcludeActions
              checkedNodes={folderCheckedNodes}
              saveFullFolder={saveFullFolderWatch}
              onClickInclude={onClickInclude}
              onClickExclude={onClickExclude}
            />

            <Lists>
              <ListInput
                type="include"
                saveFullFolder={saveFullFolderWatch}
                list={includeListWatch}
                inputProps={register("savesConfig.includeList")}
                onClickRemove={onClickRemoveInclude}
              />

              <ListInput
                type="exclude"
                saveFullFolder={saveFullFolderWatch}
                list={excludeListWatch}
                inputProps={register("savesConfig.excludeList")}
                onClickRemove={onClickRemoveExclude}
              />
            </Lists>
          </>
        )}

        <CtaButtons>
          <Button type="submit">Save</Button>
        </CtaButtons>
      </FormBlock>
    </Layout>
  );
};

const getContentTree = async (
  path: string,
  includeList: string[] = [],
  excludeList: string[] = [],
  setLoading: (loading: boolean) => void
): Promise<TNode[] | undefined> => {
  try {
    setLoading(true);
    let globbyRes = await window.api.getGlobby({
      path,
      includeList,
      excludeList,
    });
    console.log({ globbyRes });
    const newTree = globToNodes(globbyRes);
    console.log({ newTree });
    return newTree;
  } catch (err) {
    console.error(err);
    // @ts-ignore
    Toaster.add({ intent: "error", message: err });
    return;
  } finally {
    setLoading(false);
  }
};

export default GameSettingsPage;

const Header = styled.h1`
  margin-bottom: 20px;
`;

const Description = styled.div``;

const CtaButtons = styled.div`
  display: flex;

  > {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

const TreesContainer = styled.div`
  display: flex;
  margin: -10px;
`;

const CheckboxTreeStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.25);
  margin: 10px;
  padding: 25px;
  border-radius: 10px;
`;

const Lists = styled.div`
  display: flex;
  margin: -10px;
`;
