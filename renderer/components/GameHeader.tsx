import styled from "styled-components";

import Text from "./Text";
import Button from "./Button";

type TProps = {
  game: TGame;
};

const GameHeader = (props: TProps) => {
  const { game } = props;

  const name = game.steamInfo?.name || game.name;
  const imgSrc = game.steamInfo?.header_image;

  const onSave = async () => {
    const newExePath = await ipcRenderer.invoke("saveGame", game.id);
    // TODO: handle error
    if (newExePath) {
      console.log("Game Saved", newExePath);
      //   setExePath(newExePath);
    } else {
    }
  };

  return (
    <Container>
      <Info>
        {imgSrc && <Img src={imgSrc} />}
        <Name>{name}</Name>
      </Info>

      <CtaButtons>
        <Button icon="save" onClick={onSave}>
          Save
        </Button>

        <SettingsButton
          icon="settings"
          href="/games/[id]/settings"
          forwardedAs={`/games/${game.id}/settings`}
        />
      </CtaButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(34, 34, 34, 0.8);
  height: 80px;
  position: sticky;
  padding: 0px 25px;
  top: 0px;
  backdrop-filter: blur(10px);
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 150px;
  height: 70px;
`;

const Name = styled(Text)`
  margin-left: 24px;
`;

const CtaButtons = styled.div`
  display: flex;
`;

const SettingsButton = styled(Button)`
  margin-left: 12px;
`;

export default GameHeader;
