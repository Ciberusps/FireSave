import { useEffect, useMemo, useState } from "react";
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
import DisplaysInput from "../components/DisplaysInput";

import { useSettingsStore } from "../utils/stores";
import useElectronApiRequest from "../utils/useElectronApiRequest";
import SelectInput, { TSelectInputOption } from "../components/SelectInput";
import { LANGUAGES_CODES_WHITELIST } from "../../common/languagesWhiteList";

type TSettingsForm = Pick<
  TSettingsStore,
  | "selectedDisplay"
  | "isAutoSaveOn"
  | "autoSaveMinutes"
  | "isStartingInTray"
  | "language"
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
        language: settingsStore.language,
        selectedDisplay: settingsStore.selectedDisplay,
        isAutoSaveOn: settingsStore.isAutoSaveOn,
        autoSaveMinutes: settingsStore.autoSaveMinutes,
        isStartingInTray: settingsStore.isStartingInTray,
      },
    });
  const watchSelectedDisplay = watch("selectedDisplay");

  const languagesOptions: TSelectInputOption[] = useMemo(() => {
    return LANGUAGES_CODES_WHITELIST.map((l) => ({
      label: l,
      value: l,
      isDisabled: false,
    }));
  }, []);

  const onSubmit = (data: TSettingsForm) => {
    changeSettings(data);
  };

  useEffect(() => {
    getDisplays();
  }, [getDisplays]);

  if (!settingsStore) return null;

  return (
    <Layout
      contentStyles={{
        height: "100%",
        alignItems: "center",
      }}
    >
      <Container>
        <h1>{t("settings_page.title")}</h1>

        <MainSettingsBlock onSubmit={handleSubmit(onSubmit)}>
          <FormBlock>
            <DisplaysInput
              label={t("settings_page.display.label")}
              description={t("settings_page.display.description")}
              selectedDisplayId={watchSelectedDisplay?.id || -1}
              displays={displays}
              onChange={(newDisplay) => setValue("selectedDisplay", newDisplay)}
            />

            <ToggleInput
              label={t("settings_page.autosaves.label")}
              description={t("settings_page.autosaves.description")}
              {...register("isAutoSaveOn")}
            />

            <NumberInput
              control={control}
              min={1}
              max={60}
              name="autoSaveMinutes"
              label={t("settings_page.autosaves_interval.label")}
              description={t("settings_page.autosaves_interval.description")}
            />

            <ToggleInput
              label={t("settings_page.start_in_tray.label")}
              description={t("settings_page.start_in_tray.description")}
              {...register("isStartingInTray")}
            />

            <SelectInput
              control={control}
              name="language"
              label={t("settings_page.language.label")}
              description={t("settings_page.language.description")}
              options={languagesOptions}
            />
          </FormBlock>

          <CtaButtons>
            <Button isSubmit style={{ width: "170px" }}>
              {t("button.save.label")}
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
  padding-bottom: 400px;
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
