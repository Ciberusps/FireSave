import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";

import Game from "../components/Game";
import Layout from "../components/Layout";
import GlobalContext from "../components/GlobalContext";

const IndexPage = () => {
  const { state } = useContext(GlobalContext);

  const games = state?.games && Object.values(state?.games);

  return (
    <Layout title="Saves List">
      <Header>
        <h1>Games</h1>
        <Link href="/games/[id]/settings" as="/games/new/settings">
          <a>Add new game</a>
        </Link>
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
`;

export default IndexPage;
