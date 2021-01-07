import { useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import SavePoint from "../../../components/SavePoint";
import GameHeader from "../../../components/GameHeader";
import GlobalContext from "../../../components/GlobalContext";

const GamePage = () => {
  const { state } = useContext(GlobalContext);
  const Router = useRouter();
  const id = Router.query?.id as string;
  const game = state?.games?.[id];
  if (!game) return <div>error</div>;

  const savePoints = game.savePoints && Object.values(game.savePoints);

  return (
    <Layout title="New Game" contentStyles={{ padding: 0 }}>
      <GameHeader game={game} />

      <SavePoints>
        {savePoints?.reverse()?.map((point) => (
          <SavePoint key={point.id} game={game} savePoint={point} />
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
