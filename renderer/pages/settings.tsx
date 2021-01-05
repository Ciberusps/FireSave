import { useContext } from "react";
import styled from "styled-components";

import Layout from "../components/Layout";
import FileInput from "../components/FileInput";
import GlobalContext from "../components/GlobalContext";

const SettingsPage = () => {
  const { state } = useContext(GlobalContext);

  const onAutoSaveToggle = () => {
    ipcRenderer.send("toggleAutoSave");
  };

  const onChangeStorePath = () => {
    ipcRenderer.send("chooseStorePath");
  };

  return (
    <Layout title="About | Next.js + TypeScript + Electron Example">
      <h1>Settings</h1>

      <div>
        <div>AutoSave:</div>
        <button onClick={() => onAutoSaveToggle()}>
          {state?.isAutoSaveOn ? "true" : "false"}
        </button>
      </div>

      <FileInput label="Store:" path={state?.storePath} onClick={onChangeStorePath} />

      <Version>v{state?.version}</Version>
    </Layout>
  );
};

const Version = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 18px;
`;

export default SettingsPage;
