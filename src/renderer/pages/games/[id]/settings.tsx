import { useContext } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Link from "../../../components/Link";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import FileInput from "../../../components/FileInput";
import FormBlock from "../../../components/FormBlock";
import GlobalContext from "../../../components/GlobalContext";

import Toaster from "../../../utils/toaster";

type TGameForm = {
  exePath: string;
  saves: string;
};

const GameSettingsPage = () => {
  const { settingsStore: state } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isEditing = id !== "new";
  const game = id && state?.games?.[id];
  const name = game?.steamInfo?.name || game?.name;

  const defaultValues: TGameForm = {
    exePath: JSON.stringify(game?.exePath || { path: undefined }),
    saves: JSON.stringify(game?.saves || { path: undefined }),
  };

  const { handleSubmit, control } = useForm<TGameForm>({
    defaultValues,
  });

  const onSubmit = (data: TGameForm) => {
    console.log("NEW DATA", data);
    if (!data.exePath || !data.saves) return;

    try {
      const exePath = JSON.parse(data.exePath);
      const saves = JSON.parse(data.saves);

      const isSuccess = isEditing
        ? window.electron.editGame({ game, exePath, saves })
        : window.electron.createGame({ exePath, saves });
      if (isSuccess) {
        Toaster.add({
          intent: "success",
          content: isEditing ? "Game edited" : "Game created",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      Toaster.add({ intent: "error", content: "Something went wrong" });
    } finally {
      navigate("/");
    }
  };

  return (
    <Layout>
      <Header>{isEditing ? name : "Add game"}</Header>

      <FormBlock onSubmit={handleSubmit(onSubmit)}>
        {/* <Description>
          Don't know where save file located?
          <br />
          - search by game name on PCGamingWiki
          <br />- find "Save game data location"
        </Description> */}

        <FileInput
          control={control}
          name="exePath"
          label=".exe file"
          description={`Path to game ".exe" file`}
          properties={["openFile"]}
          filters={[{ name: "All Files", extensions: ["exe"] }]}
          // onClick={onChooseExe}
        />

        <FileInput
          control={control}
          name="saves"
          label="Save file path"
          description={
            <Description>
              <div>
                Path to game save file. Don't know where save file located?
              </div>
              <div style={{ display: "flex" }}>
                You can find game on&nbsp;
                <PcGamingWikiLink to="https://pcgamingwiki.com">
                  PCGamingWiki.com
                </PcGamingWikiLink>
                ,&nbsp;under "Save game data location" will be path to save file
              </div>
            </Description>
          }
          // Note: On Windows and Linux an open dialog can not be both a file selector and a directory selector,
          // so if you set properties to ['openFile', 'openDirectory'] on these platforms, a directory selector will be shown.
          // properties={["openFile", "openDirectory"]}
          properties={["openFile"]}
          // isDisabled={!exePath}
          // onClick={onChooseSavesPath}
        />

        <CtaButtons>
          <Button type="submit">Save</Button>
          {/* {isEditing && <Button onClick={onRemove}>Remove game</Button>} */}
        </CtaButtons>
      </FormBlock>
    </Layout>
  );
};

export default GameSettingsPage;

const Header = styled.h1`
  margin-bottom: 20px;
`;

const Description = styled.div``;

const PcGamingWikiLink = styled(Link)`
  text-decoration: underline;
`;

const CtaButtons = styled.div`
  display: flex;

  > {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;
