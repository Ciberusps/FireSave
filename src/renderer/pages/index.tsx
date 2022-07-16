import styled from "styled-components";
import { useTranslation } from "react-i18next";

import GameCard from "../components/GameCard";
import Button from "../components/Button";
import Layout from "../components/Layout";

import { useGamesStore } from "../utils/stores";
import { useMemo } from "react";

const IndexPage = () => {
  const { t } = useTranslation();
  const games = useGamesStore((state) => Object.values(state.games));

  const validGames = useMemo(() => {
    return games.filter((game) => game.isValid && game.isSettupedAtLeastOnce);
  }, [games]);

  const notValidGames = useMemo(() => {
    return games.filter((game) => !game.isValid && game.isSettupedAtLeastOnce);
  }, [games]);

  const installedGames = useMemo(() => {
    return games.filter((game) => !game.isValid && !game.isSettupedAtLeastOnce);
  }, [games]);

  return (
    <Layout>
      <Header>
        <h1>{t("Games")}</h1>

        <Button icon="add" to="/games/new/settings">
          {t("Add game")}
        </Button>
      </Header>

      {validGames.length > 0 && (
        <GamesContainer>
          <h2>Ready games</h2>
          <Games>
            {validGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Games>
        </GamesContainer>
      )}

      {notValidGames.length > 0 && (
        <GamesContainer>
          <h2>Your Saves Library</h2>
          <Games>
            {notValidGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Games>
        </GamesContainer>
      )}

      {installedGames.length > 0 && (
        <GamesContainer>
          <h2>Installed games</h2>
          <Games>
            {installedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Games>
        </GamesContainer>
      )}

      {validGames.length === 0 && notValidGames.length === 0 && (
        <NoGames>No games found, you can add new one</NoGames>
      )}
    </Layout>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GamesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Games = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: -10px;
  margin-bottom: 15px;
  /* margin-top: 20px; */
`;

const NoGames = styled.div`
  margin-top: 30px;
`;

export default IndexPage;
