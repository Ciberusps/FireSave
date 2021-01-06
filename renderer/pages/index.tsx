import { useContext } from "react";
import styled from "styled-components";

import Game from "../components/Game";
import Layout from "../components/Layout";
import GlobalContext from "../components/GlobalContext";
import Button from "../components/Button";

const IndexPage = () => {
  const { state } = useContext(GlobalContext);

  const games = state?.games && Object.values(state?.games);

  return (
    <Layout title="Saves List">
      <Header>
        <h1>Games</h1>

        <Button icon="add" href="/games/[id]/settings" as="/games/new/settings">
          Add game
        </Button>

        {/* <Button href="/games/[id]/settings" as="/games/new/settings">
          Add game
        </Button>

        <Button href="/games/[id]/settings" isDisabled={true}>
          Add game
        </Button>

        <Button href="/games/[id]/settings" isLoading={true}>
          Add game
        </Button>

        <Button icon="add" href="/games/[id]/settings" /> */}
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
