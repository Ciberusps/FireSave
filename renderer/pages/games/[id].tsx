import { useContext, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import FileInput from "../../components/FileInput";
import GlobalContext from "../../components/GlobalContext";

const GamePage = () => {
  const { state } = useContext(GlobalContext);
  const Router = useRouter();

  const id = unescape(Router.query?.id as string);
  const isEditing = id !== "new";
  const game = state?.games?.find((g) => g.exePath === id);

  const [exePath, setExePath] = useState<string | undefined>(game?.exePath);
  const [savePath, setSavesPath] = useState<string | undefined>(game?.saves?.path);
  const [saveFiles, setSaveFiles] = useState<string[] | undefined>(game?.saves?.files);

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
    const { path, files } = await ipcRenderer.invoke("chooseSavesPath");
    // TODO: handle error
    if (path && files) {
      console.log("SavePath added", path, files);
      setSavesPath(path);
      setSaveFiles(files);
    }
  };

  const onSave = () => {
    if (!exePath || !savePath || !saveFiles?.length) return;
    const isGameCreated = ipcRenderer.invoke("createGame", {
      exePath,
      savePath,
      saveFiles,
    });
    console.log("isGameCreated", isGameCreated);
    Router.push(`/`);
    // remote.getCurrentWindow().minimize();
    // const gameName = ipcRenderer.send("chooseGameExe");
    // console.log("GameAdded", gameName);
  };

  return (
    <Layout title="New Game">
      <h1>{isEditing ? game?.name : "Add game"}</h1>

      <FileInput label=".exe file" path={exePath} onClick={onChooseExe} />

      <FileInput
        label="Save file(s) path"
        path={savePath}
        isDisabled={!exePath}
        onClick={onChooseSavesPath}
      />

      <div>
        Files:
        {saveFiles?.map((file) => (
          <div>- {file}</div>
        ))}
      </div>

      <Button onClick={onSave}>Save</Button>
    </Layout>
  );
};

const Button = styled.button`
  width: 150px;
  height: 50px;
  color: white;
  border: 0px;
  border-radius: 6px;
  background: #20af13;
  margin-top: 16px;
`;

export default GamePage;
