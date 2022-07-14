import path from "path";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Alert from "../../../components/Alert";
import Layout from "../../../components/Layout";
import GameHeader from "../../../components/GameHeader";
import SavePointCard from "../../../components/SavePointCard";

import { useGamesStore, usePersistentStore } from "../../../utils/stores";

const ONLINE_GAMES_STEAM_CATEGORIES = [
  "Online PvP",
  "Multi-player",
  "Online Co-op",
];

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const savesFolder = usePersistentStore((state) => state.savesFolder);
  const game = useGamesStore((state) => id && state.games[id]);
  const saves = useGamesStore((state) => id && state.savePoints[id]);
  const steamStoreInfo = useGamesStore(
    (state) =>
      id &&
      game &&
      game.steamAppId &&
      state.steamGamesStoreInfo[game.steamAppId]
  );

  if (!game) return <div>error</div>;

  const savePoints = ((saves && Object.values(saves)) || []).reverse();
  if (!savePoints) return <div>error</div>;

  const favoriteSavePoints = savePoints.filter((save) => save.isFavorite);

  const gameSavesPath = path.join(savesFolder, game.savePointsFolderName);

  const isOnlineGame =
    steamStoreInfo &&
    steamStoreInfo?.categories
      ?.map((c) => c.description)
      .some((c) => ONLINE_GAMES_STEAM_CATEGORIES.includes(c));

  return (
    <Layout contentStyles={{ padding: 0 }}>
      <GameHeader game={game} />

      <SavePoints>
        {isOnlineGame && (
          <OnlineGameAlert variant="info">
            {`Looks like its online game, manipulation with saves can lead to ban/shadow ban, to avoid it LOG OUT from online session before loading`}
          </OnlineGameAlert>
        )}

        {favoriteSavePoints.length > 0 && <h2>Favorites</h2>}
        {favoriteSavePoints?.map((point) => (
          <SavePointCard
            key={point.id}
            game={game}
            gameSavesPath={gameSavesPath}
            savePoint={point}
          />
        ))}

        {favoriteSavePoints.length > 0 && <h2>Timeline</h2>}
        {savePoints?.map((point) => (
          <SavePointCard
            key={point.id}
            game={game}
            gameSavesPath={gameSavesPath}
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
  align-self: center;
  padding: 30px 40px;
  width: 100%;
  max-width: 960px;
`;

const OnlineGameAlert = styled(Alert)`
  font-size: 0.9rem;
  margin-bottom: 20px;
`;

export default GamePage;
