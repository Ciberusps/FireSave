import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { DeepPartial, useForm } from "react-hook-form";
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

import Form from "../../../components/Form";
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
import useElectronApiRequest from "../../../utils/useElectronApiRequest";
import { useGamesStore, useSettingsStore } from "../../../utils/stores";

const folderColor = "#ffd970";

type TGameForm = {
  isAutoDetectionEnabled: boolean;
  autoDetectionType: TGameDetectionMethod;
  gamePath: TFolderOrFilesRaw;
  savesConfig: TSavesConfig;
};

// TODO: globby size
// TODO: prefill from pcGamingWiki
const GameSettingsPage = () => {
  const navigate = useNavigate();
  const games = useGamesStore((state) => state.games);
  const PLATFORM = useSettingsStore((state) => state.envs.PLATFORM);
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();

  const [folderContentTree, setFolderContentTree] = useState<TFilesTree>([]);
  const [folderCheckedNodes, setFolderCheckedNodes] = useState<string[]>([]);
  const [folderExpandedNodes, setFolderExpandedNodes] = useState<string[]>([]);
  const [isLoadingFolderContent, setIsLoadingFolderContent] = useState(false);

  const [resultContentTree, setResultContentTree] = useState<TFilesTree>([]);
  const [isLoadingResultContent, setIsLoadingResultContent] = useState(false);

  const [editGame] = useElectronApiRequest(window.api.editGame, {
    onSuccess: () => {
      navigate("/");
    },
  });
  const [createCustomGame] = useElectronApiRequest(
    window.api.createCustomGame,
    {
      onSuccess: () => {
        navigate("/");
      },
    }
  );
  const [getFolderFilesTree] = useElectronApiRequest(
    window.api.getFolderFilesTree,
    {
      onComplete: () => setIsLoadingFolderContent(false),
      onSuccess: (res) => {
        setFolderContentTree(res);
      },
    }
  );
  const [getResultFolderFilesTree] = useElectronApiRequest(
    window.api.getFolderFilesTree,
    {
      onComplete: () => setIsLoadingResultContent(false),
      onSuccess: (res) => {
        setResultContentTree(res);
      },
    }
  );

  const isEditing = id !== "new";
  const game = id ? games[id] : undefined;
  const isStoresAssociationsExists = [game?.steamAppId].every(Boolean);

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

  const defaultValues = useMemo<DeepPartial<TGameForm>>(
    () => ({
      isAutoDetectionEnabled: game?.isAutoDetectionEnabled,
      autoDetectionType: game?.autoDetectionMethod || undefined,
      gamePath: { path: "", ...game?.gamePath?.[PLATFORM] },
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
    }),
    []
  );

  const { control, watch, handleSubmit, register, setValue } =
    useForm<TGameForm>({ defaultValues });

  const isAutoDetectionEnabledWatch = watch("isAutoDetectionEnabled");
  const saveConfigTypeWatch = watch("savesConfig.type");
  const saveFolderWatch = watch("savesConfig.saveFolder");
  const saveFullFolderWatch = watch("savesConfig.saveFullFolder", true);
  const includeListWatch = watch("savesConfig.includeList", []);
  const excludeListWatch = watch("savesConfig.excludeList", []);

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

  const updateTrees = (value: DeepPartial<TGameForm>) => {
    const savesConfig = value.savesConfig;
    const path = savesConfig?.saveFolder?.path;

    if (path) {
      setIsLoadingFolderContent(true);
      getFolderFilesTree({
        path,
        includeList: ["**/*"],
        excludeList: [],
      });

      setIsLoadingResultContent(true);
      getResultFolderFilesTree({
        path,
        includeList: [
          ...(savesConfig.saveFullFolder ? ["**/*"] : []),
          ...(savesConfig.includeList || []),
        ],
        excludeList: savesConfig.excludeList,
      });
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && name.startsWith("savesConfig") && value.savesConfig) {
        updateTrees(value);
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, [watch]);

  useEffect(() => {
    updateTrees(defaultValues);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [defaultValues]);

  const onSubmit = (data: TGameForm) => {
    try {
      if (!game) throw new Error("Game not found, try reopen app");

      if (isEditing) {
        if (data.isAutoDetectionEnabled && !isStoresAssociationsExists) {
          throw new Error(
            "Game not associated with any store please disable auto-detect game"
          );
        }
        editGame(game.id, {
          isAutoDetectionEnabled: data.isAutoDetectionEnabled,
          autoDetectionMethod: data.autoDetectionType,
          gamePath: data.gamePath,
          savesConfig: data.savesConfig,
        });
      } else {
        createCustomGame({
          gamePath: data.gamePath,
          savesConfig: data.savesConfig,
        });
      }
    } catch (err) {
      Toaster.add({
        intent: "error",
        content: (err as Error).message,
      });
    }
  };

  return (
    <Layout contentStyles={{ alignItems: "center", paddingBottom: "400px" }}>
      <Container>
        <Header>{isEditing ? game?.name : "Add game"}</Header>

        <FormStyled onSubmit={handleSubmit(onSubmit)}>
          {/* TODO: detection type should be displayed if
        - steam game moving to custom game
        */}
          <h3>{"Game settings"}</h3>
          <FormBlock>
            {/* TODO: for now available only if editing, until stores associations pull request made */}
            {isEditing && isStoresAssociationsExists && (
              <ToggleInput
                label="Auto-detect game?"
                description="Is game auto-detection enabled"
                {...register("isAutoDetectionEnabled")}
              />
            )}

            {isEditing &&
              isStoresAssociationsExists &&
              isAutoDetectionEnabledWatch && (
                <>
                  <SwitchInput<TGameForm>
                    control={control}
                    name="autoDetectionType"
                    label="Auto-detect using"
                    description="Game will be auto-detected using selected games store"
                    isDisabled={!game?.isSettupedAtLeastOnce}
                    values={[
                      {
                        label: "steam",
                        value: "steam",
                        isDisabled: !Boolean(game?.steamAppId),
                        whyIsDisabled: "No association with steam store appId",
                      },
                    ]}
                  />
                </>
              )}

            <FolderOrFilesInput<TGameForm>
              control={control}
              name="gamePath"
              label="Path or exe file"
              description={<Description>Path to game exe</Description>}
              property={"openFile"}
              isDisabled={isEditing && isAutoDetectionEnabledWatch}
            />
          </FormBlock>

          <h3>{"Save config"}</h3>
          <FormBlock>
            <SwitchInput<TGameForm>
              control={control}
              name="savesConfig.type"
              values={[
                { label: "Simple", value: "simple" },
                { label: "Advanced", value: "advanced" },
              ]}
              label="Type"
              description={
                saveConfigTypeWatch === "simple"
                  ? "Simple - easy to setup, only folder required but can be heavier in size"
                  : "Advanced - for hardcore gamers 💪😎💪 who wants to exclude unnecessary files and save up some space"
              }
            />

            <FolderOrFilesInput<TGameForm>
              control={control}
              name="savesConfig.saveFolder"
              label="Saves folder"
              description={<Description>Path to saves folder</Description>}
              property={"openDirectory"}
            />

            {saveConfigTypeWatch === "advanced" && (
              <>
                <ToggleInput
                  label="Include all files"
                  description={
                    saveFullFolderWatch
                      ? `Include all files by default and use
                      exclude list for exclusions`
                      : `Include files only selected files exclude files from exclude list`
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
          </FormBlock>

          <CtaButtons>
            <Button type="submit" style={{ width: "170px" }}>
              Save
            </Button>
          </CtaButtons>
        </FormStyled>
      </Container>
    </Layout>
  );
};

export default GameSettingsPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 960px;
  padding: 0px 30px;
`;

const Header = styled.h1`
  margin-bottom: 20px;
`;

const FormStyled = styled(Form)`
  margin-top: 20px;
`;

const Description = styled.div``;

const CtaButtons = styled.div`
  display: flex;
  align-self: flex-end;

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
