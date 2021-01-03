import { useContext } from "react";
import styled from "styled-components";

import Layout from "../../components/Layout";
import FileInput from "../../components/FileInput";
import GlobalContext from "../../components/GlobalContext";

const GamePage = () => {
  const { state } = useContext(GlobalContext);

  const onChooseExe = () => {
    const gameName = ipcRenderer.send("chooseGameExe");
    console.log("GameAdded", gameName);
  };

  const onSave = () => {
    // remote.getCurrentWindow().minimize();
    // const gameName = ipcRenderer.send("chooseGameExe");
    // console.log("GameAdded", gameName);
  };

  return (
    <Layout title="New Game">
      <h1>Add game</h1>

      <FileInput label=".exe file" path="..." onClick={onChooseExe} />
      <FileInput label="Save file(s) path" path="..." onClick={onChooseExe} />

      <button onClick={onSave}>Save</button>
    </Layout>
  );
};

export default GamePage;
