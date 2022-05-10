import styled from "styled-components";
import { useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import SavePoint from "../../../components/SavePoint";
import GameHeader from "../../../components/GameHeader";
import { useGamesStore, usePersistentStore } from "../../../utils/stores";
import { joinAndNormalize } from "../../../utils/common";

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const settingsStorePath = usePersistentStore(
    (state) => state.settingsStorePath
  );
  if (!id) return null;
  const game = useGamesStore((state) => state.games[id]);
  const saves = useGamesStore((state) => state.savePoints[id]);
  if (!game) return <div>error</div>;

  const savePoints = saves && Object.values(saves);
  const gamePath = joinAndNormalize(
    settingsStorePath,
    game.savePointsFolderName
  );

  console.log({ gamePath, savePoints });

  return (
    <Layout contentStyles={{ padding: 0 }}>
      <GameHeader game={game} />

      <SavePoints>
        {savePoints?.reverse()?.map((point) => (
          <SavePoint
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
