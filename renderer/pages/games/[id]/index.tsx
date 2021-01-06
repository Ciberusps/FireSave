import { useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import GameHeader from "../../../components/GameHeader";
import GlobalContext from "../../../components/GlobalContext";

const GamePage = () => {
  const { state } = useContext(GlobalContext);
  const Router = useRouter();
  const id = Router.query?.id as string;
  const game = state?.games?.[id];
  if (!game) return <div>error</div>;

  const savePoints = game.savePoints && Object.values(game.savePoints);

  const onLoadSave = async (savePoint: TSavePoint) => {
    const newExePath = await ipcRenderer.invoke("loadSavePoint", game.id, savePoint.id);
    // TODO: handle error
    if (newExePath) {
      console.log("Game Saved", newExePath);
      //   setExePath(newExePath);
    } else {
    }
  };

  const onRemoveSave = async (savePoint: TSavePoint) => {
    await ipcRenderer.invoke("removeSavePoint", game.id, savePoint.id);
  };

  return (
    <Layout title="New Game" contentStyles={{ padding: 0 }}>
      <GameHeader game={game} />

      <SavePoints>
        {savePoints?.reverse()?.map((point) => (
          <Save key={point.id}>
            {point.screenshot && <Screenshot src={"file://" + point.screenshot} />}
            <Info>
              <Description>
                <div>id: {point.id}</div>
                <div>date: {point.date}</div>
                <div style={{ overflowWrap: "anywhere" }}>{"path: " + point.path}</div>
              </Description>

              <CTAButtons>
                <Button onClick={() => onLoadSave(point)}>Load</Button>
                <Button onClick={() => onRemoveSave(point)}>Remove</Button>
              </CTAButtons>
            </Info>
          </Save>
        ))}
      </SavePoints>
    </Layout>
  );
};

const SavePoints = styled.div`
  margin-top: 40px;
  align-items: center;
`;

const Save = styled.div`
  display: flex;
  align-items: center;
  background: #333;
  border-radius: 10px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const Screenshot = styled.img`
  max-width: 360px;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
  padding: 10px 20px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin: -10px;
  margin-left: 20px;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  color: white;
  border: 0px;
  border-radius: 6px;
  background: #20af13;
  margin: 10px;
  cursor: pointer;
`;

export default GamePage;
