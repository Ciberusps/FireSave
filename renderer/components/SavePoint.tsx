import React from "react";
import styled from "styled-components";

import Text from "./Text";
import Button from "./Button";

type TProps = {
  game: TGame;
  savePoint: TSavePoint;
  className?: string;
};

const SavePoint = (props: TProps) => {
  const { game, savePoint, className } = props;

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

  const name = savePoint?.name || savePoint.id;

  return (
    <Container className={className}>
      {savePoint?.screenshot && <Screenshot src={"file://" + savePoint.screenshot} />}
      <Info>
        <Description>
          <Name>{name}</Name>
          <Type>
            {savePoint?.type === "manualsave" ? "Ручное сохранение" : "Автосохранение"}{" "}
            {savePoint.typeNumber && " - " + savePoint.typeNumber}
          </Type>
        </Description>
        <DateText>{new Date(savePoint.date).getTime()}</DateText>
      </Info>

      <CTAButtons>
        <Button icon="upload" onClick={() => onLoadSave(savePoint)}>
          Load
        </Button>
        <Button icon="close" onClick={() => onRemoveSave(savePoint)} />
      </CTAButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 900px;
  max-height: 170px;
  background: #1c1c1c;
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.75));
`;

const Screenshot = styled.img`
  max-height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin-left: 25px;
  padding: 15px 0px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

const Type = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.dark};
  margin-top: 5px;
`;

const DateText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.dark};
`;

const CTAButtons = styled.div`
  display: flex;
  margin-left: 15px;
  margin-right: 25px;

  > {
    &:last-child {
      margin-left: 10px;
    }
  }
`;

export default SavePoint;
