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
import { usePersistentStore, useSettingsStore } from "../utils/stores";

type TSettingsForm = {
  isAutoSaveOn: boolean;
  autoSaveMinutes: number;
  settingsStorePath: string;
};

const SettingsPage = () => {
  // const { settingsStore, persistentStore } = useContext(GlobalContext);
  const settingsStore = useSettingsStore();
  const persistentStore = usePersistentStore();

  const defaultValues: TSettingsForm = {
    isAutoSaveOn: settingsStore?.isAutoSaveOn,
    autoSaveMinutes: settingsStore?.autoSaveMinutes,
    settingsStorePath: JSON.stringify({
      path: persistentStore?.settingsStorePath,
    }),
  };

  const { register, handleSubmit, control } = useForm<TSettingsForm>({
    defaultValues,
  });

  const onSubmit = (data: TSettingsForm) => {
    const { settingsStorePath, ...restData } = data;
    const parsedSettingsStorePath = JSON.parse(settingsStorePath).path;
    window.electron.changeSettings(restData);
    window.electron.changePersistentStore({
      settingsStorePath: parsedSettingsStorePath,
    });
  };

  if (!settingsStore) return null;

  return (
    <Layout contentStyles={{ height: "100vh" }}>
      <h1>Settings</h1>

      <MainSettingsBlock onSubmit={handleSubmit(onSubmit)}>
        <ToggleInput
          ref={register}
          name="isAutoSaveOn"
          label="Autosaves"
          description="Makes autosaves when game runned"
        />

        <NumberInput
          control={control}
          min={1}
          max={60}
          name="autoSaveMinutes"
          label="Autosaves interval"
          description="Interval in minutes between autosaves"
        />

        <FileInput
          control={control}
          name="settingsStorePath"
          label="Store folder"
          description="CANNOT BE CHANGED(for now). Folder for saves, screenshots and config."
          properties={["openDirectory"]}
          isDisabled
        />

        <CtaButtons>
          <Button isSubmit>Save</Button>
        </CtaButtons>
      </MainSettingsBlock>

      <About>
        <Version>v{settingsStore?.version}</Version>
        <WithLove>
          by&nbsp;
          <Link to="https://github.com/Ciberusps">Ciberus</Link>
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
