import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Form from "../components/Form";
import Link from "../components/Link";
import Button from "../components/Button";
import Layout from "../components/Layout";
import FormBlock from "../components/FormBlock";
import ToggleInput from "../components/ToggleInput";
import NumberInput from "../components/NumberInput";
import DisplaysInput from "renderer/components/DisplaysInput";

import { useSettingsStore } from "../utils/stores";
import useElectronApiRequest from "renderer/utils/useElectronApiRequest";

type TSettingsForm = Pick<
  TSettingsStore,
  "selectedDisplay" | "isAutoSaveOn" | "autoSaveMinutes" | "isStartingInTray"
>;

const SettingsPage = () => {
  const { t } = useTranslation();
  const settingsStore = useSettingsStore();
  const [displays, setDisplays] = useState<Electron.Display[]>([]);
  const [getDisplays] = useElectronApiRequest(window.api.getDisplays, {
    onSuccess: (res) => setDisplays(res || []),
  });
  const [changeSettings] = useElectronApiRequest(window.api.changeSettings);

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
    changeSettings(data);
  };

  useEffect(() => {
    getDisplays();
  }, [getDisplays]);

  if (!settingsStore) return null;

  return (
    <Layout contentStyles={{ height: "100vh", alignItems: "center" }}>
      <Container>
        <h1>{t("Settings")}</h1>

        <MainSettingsBlock onSubmit={handleSubmit(onSubmit)}>
          <FormBlock>
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
          </FormBlock>

          <CtaButtons>
            <Button isSubmit style={{ width: "170px" }}>
              Save
            </Button>
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
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 960px;
  padding: 0px 30px;
`;

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

const MainSettingsBlock = styled(Form)`
  margin-top: 30px;
`;

const CtaButtons = styled.div`
  display: flex;
  align-self: flex-end;

  > {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

export default SettingsPage;
