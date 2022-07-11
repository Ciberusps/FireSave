import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Link from "../components/Link";
import Button from "../components/Button";
import Layout from "../components/Layout";
import FormBlock from "../components/FormBlock";
import ToggleInput from "../components/ToggleInput";
import NumberInput from "../components/NumberInput";
import DisplaysInput from "renderer/components/DisplaysInput";

import { useSettingsStore } from "../utils/stores";

type TSettingsForm = Pick<
  TSettingsStore,
  "selectedDisplay" | "isAutoSaveOn" | "autoSaveMinutes" | "isStartingInTray"
>;

const SettingsPage = () => {
  const settingsStore = useSettingsStore();
  const [displays, setDisplays] = useState<Electron.Display[]>([]);

  const { control, register, handleSubmit, setValue, watch } =
    useForm<TSettingsForm>({
      defaultValues: {
        selectedDisplay: settingsStore.selectedDisplay,
        isAutoSaveOn: settingsStore.isAutoSaveOn,
        autoSaveMinutes: settingsStore.autoSaveMinutes,
        isStartingInTray: settingsStore.isStartingInTray,
      },
    });
  const watchSelectedDisplay = watch("selectedDisplay");

  const onSubmit = (data: TSettingsForm) => {
    window.electron.changeSettings(data);
  };

  const getDisplays = useCallback(async () => {
    const newDisplays = await window.electron.getDisplays();
    setDisplays(newDisplays || []);
  }, [setDisplays]);

  useEffect(() => {
    getDisplays();
  }, [getDisplays]);

  if (!settingsStore) return null;

  return (
    <Layout contentStyles={{ height: "100vh" }}>
      <h1>Settings</h1>

      <MainSettingsBlock onSubmit={handleSubmit(onSubmit)}>
        <DisplaysInput
          label="Display for screenshots"
          description="Select the display to take screenshots from"
          selectedDisplayId={watchSelectedDisplay?.id || -1}
          displays={displays}
          onChange={(newDisplay) => setValue("selectedDisplay", newDisplay)}
        />

        <ToggleInput
          label="Autosaves"
          description="Makes autosaves when game runned"
          {...register("isAutoSaveOn")}
        />

        <NumberInput
          control={control}
          min={1}
          max={60}
          name="autoSaveMinutes"
          label="Autosaves interval"
          description="Interval in minutes between autosaves"
        />

        <ToggleInput
          label="Start in Tray"
          description="Starts the app in tray"
          {...register("isStartingInTray")}
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
