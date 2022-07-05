import styled from "styled-components";

import Text from "./Text";
import Image from "./Image";
import Stats from "./Stats";
import Button from "./Button";

type TProps = {
  game: TGame;
};

const GameHeader = (props: TProps) => {
  const { game } = props;

  const name = game?.name || "Unknown game";
  const imgSrc = game.imageUrl;

  const onSave = async () => {
    await window.electron.makeSavePoint(game.id);
  };

  const onPlayGame = async () => {
    window.electron.runGame(game.id);
  };

  return (
    <Container>
      <Info>
        <BackArrow to="/" icon="leftArrow" variant="secondary" />

        <Image width={150} height={70} src={imgSrc} alt={`Game ${name}`} />

        <Description>
          <Name>{name}</Name>
          <Stats game={game} />
        </Description>
      </Info>

      <CtaButtons>
        <Button icon="save" onClick={onSave}>
          Save
        </Button>

        {!game.isPlaingNow && <PlayButton icon="play" onClick={onPlayGame} />}

        <Button
          icon="settings"
          variant="secondary"
          to={`/games/${game.id}/settings`}
        />
      </CtaButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(34, 34, 34, 0.65);
  height: 80px;
  position: sticky;
  padding: 0px 25px;
  top: 0px;
  backdrop-filter: blur(10px);
  z-index: 99999;
  box-shadow: 0px 10px 6px -6px rgba(0, 0, 0, 0.75);
  border-bottom: 1px solid rgba(0, 0, 0, 0.75);
`;

const Info = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const BackArrow = styled(Button)`
  margin-right: 20px;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  padding: 8px 0px;
  flex-direction: column;
  margin-left: 24px;
`;

const Name = styled(Text)`
  font-size: 1.35rem;
  font-weight: normal;
`;

const CtaButtons = styled.div`
  display: flex;

  > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const PlayButton = styled(Button)`
  background: linear-gradient(#6fd61d, #38bf3c);
  &:hover {
    background: linear-gradient(#6fd61d, #38bf3c);
    filter: brightness(1.1);
  }
`;

export default GameHeader;
