import { useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Link from "../../../components/Link";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import FileInput from "../../../components/FileInput";
import FormBlock from "../../../components/FormBlock";
import GlobalContext from "../../../components/GlobalContext";

type TGameForm = {
  exePath: string;
  saves: string;
};

const GamePage = () => {
  const { state } = useContext(GlobalContext);
  const Router = useRouter();

  const id = Router.query?.id as string;
  const isEditing = id !== "new";
  const game = state?.games?.[id];
  const name = game?.steamInfo?.name || game?.name;

  const defaultValues: TGameForm = {
    exePath: JSON.stringify({ path: game?.exePath }),
    saves: JSON.stringify(game?.saves || { path: undefined }),
  };

  const { handleSubmit, control } = useForm<TGameForm>({
    defaultValues,
  });

  const onSubmit = (data: TGameForm) => {
    // const { storePath, ...restData } = data;
    // const parsedStorePath = JSON.parse(storePath).path;
    // window.electron.changeSettings({ ...restData, storePath: parsedStorePath });
    console.log("NEW DATA", data);
    // if (!exePath || !saves) return;
    // if (isEditing) {
    //   const isEdited = window.electron.editGame({ game, exePath, saves });
    //   console.log("game edited", isEdited);
    // } else {
    //   const isCreated = window.electron.createGame({ exePath, saves });
    //   console.log("game created", isCreated);
    // }
    // Router.push(`/`);
  };

  // const onChooseExe = async () => {
  //   const newExePath = await window.electron.chooseGameExe(exePath || game?.exePath);
  //   // TODO: handle error
  //   if (newExePath) {
  //     console.log("ExePath added", newExePath);
  //     setExePath(newExePath);
  //   } else {
  //   }
  // };

  // const onChooseSavesPath = async () => {
  //   const newSaves = await window.electron.chooseSavesPath(
  //     saves?.path || game?.saves?.path
  //   );
  //   // TODO: handle error
  //   if (newSaves) {
  //     console.log("SavePath added", newSaves);
  //     setSaves(newSaves);
  //   }
  // };

  // const onRemove = () => {
  //   ipcRenderer.invoke("removeGame", game?.id);
  //   Router.push(`/`);
  // };

  return (
    <Layout>
      <Header>{isEditing ? name : "Add game"}</Header>

      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        {/* <Description>
          Don't know where save file located?
          <br />
          - search by game name on PCGamingWiki
          <br />- find "Save game data location"
        </Description> */}

        <FileInput
          control={control}
          name="exePath"
          label=".exe file"
          description={`Path to game ".exe" file`}
          properties={["openFile"]}
          filters={[{ name: "All Files", extensions: ["exe"] }]}
          // onClick={onChooseExe}
        />

        <FileInput
          control={control}
          name="saves"
          label="Save file path"
          description={
            <Description>
              <div>Path to game save file. Don't know where save file located?</div>
              <div style={{ display: "flex" }}>
                You can find game on&nbsp;
                <PcGamingWikiLink href="https://pcgamingwiki.com" target="_blank">
                  PCGamingWiki.com
                </PcGamingWikiLink>
                ,&nbsp;under "Save game data location" will be path to save file
              </div>
            </Description>
          }
          properties={["openFile", "openDirectory"]}
          // isDisabled={!exePath}
          // onClick={onChooseSavesPath}
        />

        <CtaButtons>
          <Button type="submit">Save</Button>
          {/* {isEditing && <Button onClick={onRemove}>Remove game</Button>} */}
        </CtaButtons>
      </FormBlock>
    </Layout>
  );
};

export default GamePage;

const Header = styled.h1`
  margin-bottom: 20px;
`;

const Description = styled.div``;

const PcGamingWikiLink = styled(Link)`
  text-decoration: underline;
`;

const CtaButtons = styled.div`
  display: flex;

  > {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;
