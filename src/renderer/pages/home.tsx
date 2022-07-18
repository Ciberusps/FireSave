import { useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Button from "../components/Button";
import Layout from "../components/Layout";
import GameCard from "../components/GameCard";

import { useGamesStore } from "../utils/stores";

const HomePage = () => {
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
        <h1>{t("home_page.games")}</h1>

        <Button icon="add" to="/games/new/settings">
          {t("home_page.add_game")}
        </Button>
      </Header>

      {validGames.length > 0 && (
        <GamesContainer>
          <h2>{t("home_page.ready_games")}</h2>
          <Games>
            {validGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Games>
        </GamesContainer>
      )}

      {notValidGames.length > 0 && (
        <GamesContainer>
          <h2>{t("home_page.your_saves_library")}</h2>
          <Games>
            {notValidGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Games>
        </GamesContainer>
      )}

      {installedGames.length > 0 && (
        <GamesContainer>
          <h2>{t("home_page.installed_games")}</h2>
          <Games>
            {installedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Games>
        </GamesContainer>
      )}

      {validGames.length === 0 && notValidGames.length === 0 && (
        <NoGames>{t("home_page.no_games_found")}</NoGames>
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

export default HomePage;
