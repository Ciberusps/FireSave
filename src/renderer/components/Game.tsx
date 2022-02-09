import styled from "styled-components";
import { formatDistance } from "date-fns";

import Link from "./Link";
import Stats from "./Stats";
import Image from "./Image";

type TProps = {
  game: TGame;
  className?: string;
};

const Game = (props: TProps) => {
  const { game, className } = props;

  const savePoints = game.savePoints && Object.values(game.savePoints);
  const lastSaveDate =
    savePoints && new Date(savePoints[savePoints?.length - 1].date);

  return (
    <Link to={`/games/${game.id}`}>
      <Container className={className}>
        <Img width="100%" height={215} src={game?.steamInfo?.header_image} />
        <Description>
          <GameName>{game?.steamInfo?.name || game.name}</GameName>
          <div>
            <Stats game={game} />
            <LastSave>
              {lastSaveDate
                ? `last save ${formatDistance(lastSaveDate, new Date())} ago`
                : "no saves yet"}
            </LastSave>
          </div>
        </Description>
      </Container>
    </Link>
  );
};

const Container = styled.div`
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

export default Game;
