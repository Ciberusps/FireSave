import { useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import SavePoint from "../../../components/SavePoint";
import GameHeader from "../../../components/GameHeader";
import GlobalContext from "../../../components/GlobalContext";

const GamePage = () => {
  const { settingsStore, persistentStore } = useContext(GlobalContext);
  const { id } = useParams<{ id: string }>();
  const game = id && settingsStore?.games?.[id];
  if (!game) return <div>error</div>;

  const savePoints = game.savePoints && Object.values(game.savePoints);
  const gamePath =
    persistentStore?.settingsStorePath + "/" + game.savePointsFolderName;

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
