import styled from "styled-components";

import Game from "../components/Game";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { useGamesStore } from "../utils/stores";

const IndexPage = () => {
  const games = useGamesStore((state) => Object.values(state.games));

  console.log({
    games: games.map((g) => ({ id: g.id, isPlayingNow: g.isPlaingNow })),
  });

  return (
    <Layout>
      <Header>
        <h1>Games</h1>

        <Button icon="add" to="/games/new/settings">
          Add game
        </Button>
      </Header>

      <Games>
        {games?.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </Games>
    </Layout>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Games = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  margin-top: 20px;
`;

export default IndexPage;
