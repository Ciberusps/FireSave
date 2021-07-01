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
    storePath: JSON.stringify({ path: state.storePath }),
  };

  const { register, handleSubmit, control } = useForm<TSettingsForm>({
    defaultValues,
  });

  const onSubmit = (data: TSettingsForm) => {
    const { storePath, ...restData } = data;
    const parsedStorePath = JSON.parse(storePath).path;
    window.electron.changeSettings({ ...restData, storePath: parsedStorePath });
  };

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
          name="storePath"
          label="Store folder"
          description="CANNOT BE CHANGED(for now). Folder for saves, screenshots and config."
          properties={["openDirectory"]}
          isDisabled={true}
        />

        <CtaButtons>
          <Button isSubmit={true}>Save</Button>
        </CtaButtons>
      </MainSettingsBlock>

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
