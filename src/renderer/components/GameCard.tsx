import { useMemo } from "react";
import styled from "styled-components";
import { formatDistance } from "date-fns";

import Link from "./Link";
import Stats from "./Stats";
import Image from "./Image";
import Icon from "./Icon";
import Tooltip from "./Tooltip";

import { useGamesStore } from "../utils/stores";

type TProps = {
  game: TGame;
};

const GameCard = (props: TProps) => {
  const { game } = props;

  const gameSavePoints = useGamesStore((state) => state.savePoints[game.id]);
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

  return (
    <Container
      to={game.isValid ? `/games/${game.id}` : `/games/${game.id}/settings`}
      isPlayingNow={game.isPlaingNow}
    >
      {game.isPlaingNow && <RunningIcon>running</RunningIcon>}

      {!game.isValid && (
        <Tooltip text="Setup required">
          <IsValidIcon>
            <Icon size="small" icon="warning" color="black" />
          </IsValidIcon>
        </Tooltip>
      )}

      <Img width="100%" height={215} src={game?.imageUrl} />

      <Description>
        <GameName>{game?.steam?.storeInfo?.name || game.name}</GameName>
        <div>
          <Stats game={game} />
          <LastSave>
            {lastSaveDateFormatted
              ? `last save ${lastSaveDateFormatted} ago`
              : "no saves yet"}
          </LastSave>
        </div>
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

const Img = styled(Image)`
  object-fit: cover;
`;

const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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

const IsValidIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: #e0bf00;
  border-radius: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.75);
`;

export default GameCard;