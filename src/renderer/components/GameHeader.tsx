import styled from "styled-components";

import Text from "./Text";
import Image from "./Image";
import Stats from "./Stats";
import Button from "./Button";
import GameContextMenu from "./GameContextMenu";

import useContextMenu from "../utils/useContextMenu";
import useElectronApiRequest from "../utils/useElectronApiRequest";
import { useGamesStore } from "../utils/stores";
import { getGameImage } from "../utils/common";
import { useCallback } from "react";

type TProps = {
  game: TGame;
};

const GameHeader = (props: TProps) => {
  const { game } = props;
  const steamStoreInfo = useGamesStore((state) =>
    game.steamAppId ? state.steamGamesStoreInfo?.[game.steamAppId] : undefined
  );
  const {
    showContextMenu,
    setShowContextMenu,
    getReferenceClientRect,
    onContextMenu,
  } = useContextMenu();
  const [runGame] = useElectronApiRequest(window.api.runGame);
  const [makeSavePoint] = useElectronApiRequest(window.api.makeSavePoint);

  const name = game?.name || "Unknown game";
  const imgSrc = getGameImage({ game, steamStoreInfo });

  const onSave = useCallback(() => {
    makeSavePoint(game.id);
  }, [game.id, makeSavePoint]);

  const onPlayGame = useCallback(() => {
    runGame(game.id);
  }, [game.id, runGame]);

  return (
    <Container>
      <Info>
        <BackArrow to="/" icon="leftArrow" variant="secondary" />

        <GameContextMenu
          game={game}
          visible={showContextMenu}
          getReferenceClientRect={getReferenceClientRect}
          onRequestClose={() => setShowContextMenu(false)}
        >
          <ImageAndDescription onContextMenu={onContextMenu}>
            <GameImage
              width={150}
              height={70}
              isPlayingNow={game.isPlaingNow}
              src={imgSrc}
              alt={`Game ${name}`}
            />

            <Description>
              <Name>{name}</Name>
              <Stats game={game} />
            </Description>
          </ImageAndDescription>
        </GameContextMenu>
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

const ImageAndDescription = styled.div`
  display: flex;
`;

type TGameImage = {
  isPlayingNow?: boolean;
};
const GameImage = styled(Image)<TGameImage>`
  box-shadow: 0px 0px 10px
    ${({ theme, isPlayingNow }) =>
      isPlayingNow ? theme.purple : "rgba(0, 0, 0, 0.25)"};
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
  font-weight: bolder;
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
