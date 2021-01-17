import { useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Link from "../components/Link";
import Button from "../components/Button";
import Layout from "../components/Layout";
import FileInput from "../components/FileInput";
import FormBlock from "../components/FormBlock";
import ToggleInput from "../components/ToggleInput";
import NumberInput from "../components/NumberInput";
import GlobalContext from "../components/GlobalContext";

type TSettingsForm = {
  isAutoSaveOn: boolean;
  autoSaveMinutes: number;
  storePath: string;
};

const SettingsPage = () => {
  const { state } = useContext(GlobalContext);
  if (!state) return null;

  const defaultValues: TSettingsForm = {
    isAutoSaveOn: state.isAutoSaveOn,
    autoSaveMinutes: state.autoSaveMinutes,
    storePath: state.storePath,
  };

  const { register, handleSubmit } = useForm<TSettingsForm>({
    mode: "onChange",
    defaultValues,
  });

  const onAutoSaveToggle = () => {
    window.electron.toggleAutoSave();
  };

  const onAutoSaveIntervalChange = (val: number) => {
    window.electron.changeAutoSaveInterval(val);
  };

  const onChangeStorePath = () => {
    const storePath = window.electron.chooseStorePath();
    console.log("STORE PATH", storePath);
  };

  const onSave = () => {};

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

      <CtaButtons>
        <Button onClick={onSave}>Save</Button>
      </CtaButtons>

      <About>
        <Version>v{state?.version}</Version>
        <WithLove>
          by&nbsp;
          <Link href="https://github.com/Ciberusps" target="_blank">
            Ciberus
          </Link>
          &nbsp;for gamers ♥
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

const MainSettingsBlock = styled(FormBlock)`
  margin-top: 30px;
`;

const CtaButtons = styled.div`
  display: flex;
  margin-top: 20px;

  > {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

export default SettingsPage;
