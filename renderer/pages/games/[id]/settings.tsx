import { useContext, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import FileInput from "../../../components/FileInput";
import FormBlock from "../../../components/FormBlock";
import GlobalContext from "../../../components/GlobalContext";

const GamePage = () => {
  const { state } = useContext(GlobalContext);
  const Router = useRouter();

  const id = Router.query?.id as string;
  const isEditing = id !== "new";
  const game = state?.games?.[id];
  const name = game?.steamInfo?.name || game?.name;

  const [exePath, setExePath] = useState<string | undefined>(game?.exePath);
  const [saves, setSaves] = useState<{ path: string; files: string[] } | undefined>(
    game?.saves
  );

  const onChooseExe = async () => {
    const newExePath = await window.electron.chooseGameExe(exePath || game?.exePath);
    // TODO: handle error
    if (newExePath) {
      console.log("ExePath added", newExePath);
      setExePath(newExePath);
    } else {
    }
  };

  const onChooseSavesPath = async () => {
    const newSaves = await window.electron.chooseSavesPath(
      saves?.path || game?.saves?.path
    );
    // TODO: handle error
    if (newSaves) {
      console.log("SavePath added", newSaves);
      setSaves(newSaves);
    }
  };

  const onSave = () => {
    if (!exePath || !saves) return;
    if (isEditing) {
      const isEdited = window.electron.editGame({ game, exePath, saves });
      console.log("game edited", isEdited);
    } else {
      const isCreated = window.electron.createGame({ exePath, saves });
      console.log("game created", isCreated);
    }
    Router.push(`/`);
  };

  // const onRemove = () => {
  //   ipcRenderer.invoke("removeGame", game?.id);
  //   Router.push(`/`);
  // };

  const onOpenPcGamingWiki = () => {
    window.electron.openPcGamingWiki();
  };

  return (
    <Layout>
      <Header>{isEditing ? name : "Add game"}</Header>

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
