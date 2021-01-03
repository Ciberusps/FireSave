import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";

import Layout from "../components/Layout";
import GlobalContext from "../components/GlobalContext";

const IndexPage = () => {
  const { state } = useContext(GlobalContext);

  return (
    <Layout title="Saves List">
      <Header>
        <h1>Games</h1>
        <Link href="/games/[id]" as="/games/new">
          <a>Add new game</a>
        </Link>
      </Header>

      <Games>
        {state?.games.map((game) => (
          <Link href="/games/[id]" as={`/games/${escape(game.exePath)}`}>
            <Game>{game.name}</Game>
          </Link>
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

const Games = styled.div``;

const Game = styled.div`
  width: 150px;
  height: 200px;
  border: 1px solid red;
`;

export default IndexPage;
