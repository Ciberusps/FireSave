import styled from "styled-components";
import { useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import GameHeader from "../../../components/GameHeader";
import SavePointCard from "../../../components/SavePointCard";

import { useGamesStore, usePersistentStore } from "../../../utils/stores";
import { joinAndNormalize } from "../../../utils/common";

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const settingsStorePath = usePersistentStore(
    (state) => state.settingsStorePath
  );
  const game = useGamesStore((state) => id && state.games[id]);
  const saves = useGamesStore((state) => id && state.savePoints[id]);
  if (!game) return <div>error</div>;

  const savePoints = (saves && Object.values(saves)) || [];
  if (!savePoints) return <div>error</div>;

  const gamePath = joinAndNormalize(
    settingsStorePath,
    game.savePointsFolderName
  );

  return (
    <Layout contentStyles={{ padding: 0 }}>
      <GameHeader game={game} />

      <SavePoints>
        {savePoints?.reverse()?.map((point) => (
          <SavePointCard
            key={point.id}
            game={game}
            gamePath={gamePath}
            savePoint={point}
          />
        ))}
      </SavePoints>
    </Layout>
  );
};

const SavePoints = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  /* margin-top: 40px; */
  align-items: center;
  padding: 40px 40px;
`;

export default GamePage;
