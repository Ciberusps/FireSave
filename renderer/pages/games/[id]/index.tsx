import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import GlobalContext from "../../../components/GlobalContext";

const GamePage = () => {
  const { state } = useContext(GlobalContext);
  const Router = useRouter();
  const id = Router.query?.id as string;
  const game = state?.games?.[id];
  if (!game) return;

  const onChooseExe = async () => {
    const newExePath = await ipcRenderer.invoke("chooseGameExe");
    // TODO: handle error
    if (newExePath) {
      console.log("ExePath added", newExePath);
      //   setExePath(newExePath);
    } else {
    }
  };

  return (
    <Layout title="New Game">
      <Header>
        <h1>{game.name}</h1>

        <Link href="/games/[id]/settings" as={`/games/${game.id}/settings`}>
          <a>Settings</a>
        </Link>
      </Header>

      <div>
        {game.savePoints &&
          Object.values(game.savePoints).map((point) => (
            <Save>
              {point.screenshot && <Screenshot src={"file://" + point.screenshot} />}
              <Info>
                <div>id: {point.id}</div>
                <div>date: {point.date}</div>
                <div>path: {point.path}</div>
              </Info>
            </Save>
          ))}
      </div>
    </Layout>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Save = styled.div`
  display: flex;
  background: #333;
  border-radius: 10px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const Screenshot = styled.img`
  max-width: 360px;
`;

const Info = styled.div`
  margin-left: 20px;
  padding: 10px 20px;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  color: white;
  border: 0px;
  border-radius: 6px;
  background: #20af13;
  margin-top: 16px;
`;

export default GamePage;
