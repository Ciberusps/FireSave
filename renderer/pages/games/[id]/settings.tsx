import { useContext, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import FileInput from "../../../components/FileInput";
import GlobalContext from "../../../components/GlobalContext";
import FormBlock from "../../../components/FormBlock";

const GamePage = () => {
  const { state } = useContext(GlobalContext);
  const Router = useRouter();

  const id = Router.query?.id as string;
  const isEditing = id !== "new";
  const game = state?.games?.[id];

  const [exePath, setExePath] = useState<string | undefined>(game?.exePath);
  const [saves, setSaves] = useState<{ path: string; files: string[] } | undefined>(
    game?.saves
  );

  const onChooseExe = async () => {
    const newExePath = await ipcRenderer.invoke("chooseGameExe");
    // TODO: handle error
    if (newExePath) {
      console.log("ExePath added", newExePath);
      setExePath(newExePath);
    } else {
    }
  };

  const onChooseSavesPath = async () => {
    const newSaves = await ipcRenderer.invoke("chooseSavesPath");
    // TODO: handle error
    if (newSaves) {
      console.log("SavePath added", newSaves);
      setSaves(newSaves);
    }
  };

  const onSave = () => {
    if (!exePath || !saves) return;
    if (isEditing) {
      const isEdited = ipcRenderer.invoke("editGame", {
        game,
        exePath,
        saves,
      });
      console.log("game edited", isEdited);
    } else {
      const isCreated = ipcRenderer.invoke("createGame", {
        exePath,
        saves,
      });
      console.log("game created", isCreated);
    }
    Router.push(`/`);
  };

  // const onRemove = () => {
  //   ipcRenderer.invoke("removeGame", game?.id);
  //   Router.push(`/`);
  // };

  const onOpenPcGamingWiki = () => {
    ipcRenderer.invoke("openPcGamingWiki");
  };

  return (
    <Layout>
      <Header>{isEditing ? game?.name : "Add game"}</Header>

      <FormBlock>
        {/* <Description>
          Don't know where save file located?
          <br />
          - search by game name on PCGamingWiki
          <br />- find "Save game data location"
        </Description> */}

        <FileInput
          label=".exe file"
          value={exePath}
          description={`Path to game ".exe" file`}
          onClick={onChooseExe}
        />

        {exePath && (
          <FileInput
            label="Save file path"
            value={saves?.path}
            files={saves?.files}
            description={
              <Description>
                <div>Path to game save file. Don't know where save file located?</div>
                <div style={{ display: "flex" }}>
                  You can find game on&nbsp;
                  <Link onClick={onOpenPcGamingWiki}>PCGamingWiki.com</Link>&nbsp;under
                  "Save game data location" will be path to save file
                </div>
              </Description>
            }
            isDisabled={!exePath}
            onClick={onChooseSavesPath}
          />
        )}
        <CtaButtons>
          <Button onClick={onSave}>Save</Button>
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

const Link = styled.span`
  display: flex;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

const CtaButtons = styled.div`
  display: flex;

  > {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;
