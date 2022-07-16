import { useMemo } from "react";
import styled from "styled-components";
import { formatDistance } from "date-fns";
// import { transparentize } from "polished";

import Icon from "./Icon";
import Link from "./Link";
import Stats from "./Stats";
import Image from "./Image";
// import Button from "./Button";
import Tooltip from "./Tooltip";

import { useGamesStore } from "../utils/stores";
import { getGameImage } from "../utils/common";

type TProps = {
  game: TGame;
};

const GameCard = (props: TProps) => {
  const { game, ...restProps } = props;
  // const theme = useTheme();

  const gameSavePoints = useGamesStore((state) => state.savePoints[game.id]);
  const steamStoreInfo = useGamesStore((state) =>
    game.steamAppId ? state.steamGamesStoreInfo?.[game.steamAppId] : undefined
  );
  const savePoints = gameSavePoints && Object.values(gameSavePoints);

  const lastSaveDate = useMemo(() => {
    const lastSave = savePoints && savePoints[savePoints.length - 1];
    if (lastSave) return new Date(lastSave.date);
    return undefined;
  }, [savePoints]);

  const lastSaveDateFormatted = useMemo(
    () => lastSaveDate && formatDistance(lastSaveDate, new Date()),
    [lastSaveDate]
  );
  const isSteamGame = game.steamAppId;

  return (
    <Container
      to={game.isValid ? `/games/${game.id}` : `/games/${game.id}/settings`}
      isPlayingNow={game.isPlaingNow}
      {...restProps}
    >
      {game.isPlaingNow && <RunningIcon>running</RunningIcon>}

      <ImageContainer>
        {!game.isGamePathValid &&
          game.isAutoDetectionEnabled &&
          game.autoDetectionMethod === "steam" && (
            <Tooltip
              text={`Install from steam or change "Detect type" on manual`}
            >
              <IsGamePathValidIcon>
                <Icon size="extraSmall" icon="download" color="white" />
              </IsGamePathValidIcon>
            </Tooltip>
          )}
        {!game.isSaveConfigValid && (
          <Tooltip text="Save config setup required">
            <IsSavesConfigValidIcon>
              <Icon size="small" icon="save" color="black" />
            </IsSavesConfigValidIcon>
          </Tooltip>
        )}

        <Img
          width="100%"
          height={215}
          src={getGameImage({ game, steamStoreInfo })}
        />

        <Badges>
          {isSteamGame ? <SteamBadge>steam</SteamBadge> : <Badge>custom</Badge>}
        </Badges>
      </ImageContainer>

      <Description>
        <div>
          <GameName>{steamStoreInfo?.name || game.name}</GameName>
          <div>
            <Stats game={game} />
            <LastSave>
              {lastSaveDateFormatted
                ? `last save ${lastSaveDateFormatted} ago`
                : "no saves yet"}
            </LastSave>
          </div>
        </div>

        {/* <Button
          icon="settings"
          variant="secondary"
          size="small"
          iconProps={{ color: transparentize(0.4, theme.white) }}
          to={`/games/${game.id}/settings`}
        /> */}
      </Description>
    </Container>
  );
};

type TContainer = {
  isPlayingNow?: boolean;
};

const Container = styled(Link)<TContainer>`
  display: flex;
  flex-direction: column;
  width: 460px;
  background: #1c1c1c;
  margin: 10px;
  padding-bottom: 14px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25));
  box-shadow: 0px 4px 20px
    ${({ theme, isPlayingNow }) =>
      isPlayingNow ? theme.purple : "rgba(0, 0, 0, 0.25)"};

  &:hover {
    text-decoration: none;
    transform: translateY(-2px);
    box-shadow: 0px 2px 6px ${({ theme }) => theme.purple};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 215px;
`;

const Img = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Badges = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 10px;
  left: 15px;
`;

const Badge = styled.div`
  font-size: 0.9rem;
  padding: 5px 10px;
  background: ${({ theme }) => theme.background};
  border-radius: 30px;
`;

const SteamBadge = styled(Badge)`
  background: linear-gradient(120deg, blue, red);
  background: linear-gradient(90deg, #399aed, #245ecf);
`;

const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0px 20px;
`;

const GameName = styled.div`
  font-size: 26px;
`;

const LastSave = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: ${({ theme }) => theme.dark};
  margin-top: 5px;
`;

const RunningIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const IsGamePathValidIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.75);
  background: linear-gradient(90deg, #399aed, #245ecf);
`;

const IsSavesConfigValidIcon = styled(IsGamePathValidIcon)`
  background: #e0bf00;
`;

export default GameCard;
