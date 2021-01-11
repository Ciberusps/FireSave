import { useContext } from "react";
import styled from "styled-components";

import Layout from "../components/Layout";
import FileInput from "../components/FileInput";
import FormBlock from "../components/FormBlock";
import ToggleInput from "../components/ToggleInput";
import NumberInput from "../components/NumberInput";
import GlobalContext from "../components/GlobalContext";

const SettingsPage = () => {
  const { state } = useContext(GlobalContext);

  const onAutoSaveToggle = () => {
    ipcRenderer.invoke("toggleAutoSave");
  };

  const onAutoSaveIntervalChange = (val: number) => {
    ipcRenderer.invoke("changeAutoSaveInterval", val);
  };

  const onChangeStorePath = () => {
    ipcRenderer.invoke("chooseStorePath");
  };

  const onOpenProfileLink = () => {
    ipcRenderer.invoke("openProfileLink");
  };

  return (
    <Layout contentStyles={{ height: "100vh" }}>
      <h1>Settings</h1>

      <MainSettingsBlock>
        <ToggleInput
          label="Autosaves"
          value={state?.isAutoSaveOn}
          description="Makes autosaves when game runned"
          onClick={onAutoSaveToggle}
        />

        <NumberInput
          label="Autosaves interval"
          value={Number(state?.autoSaveMinutes)}
          description="Interval in minutes between autosaves"
          onChange={onAutoSaveIntervalChange}
        />

        <FileInput
          label="Store folder"
          value={state?.storePath}
          description="CANNOT BE CHANGED(for now). Place there saves, screenshots and config will be stored."
          isDisabled={true}
          onClick={onChangeStorePath}
        />
      </MainSettingsBlock>

      <About>
        <Version>v{state?.version}</Version>
        <WithLove>
          by&nbsp;<Username onClick={onOpenProfileLink}>Ciberus</Username>&nbsp;for gamers
          ♥
        </WithLove>
      </About>
    </Layout>
  );
};

const About = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  right: 12px;
  bottom: 12px;
`;

const Version = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;

const WithLove = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
`;

const Username = styled.div`
  font-weight: bold;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const MainSettingsBlock = styled(FormBlock)`
  margin-top: 30px;
`;

export default SettingsPage;
