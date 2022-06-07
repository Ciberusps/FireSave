import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { format, formatDistance } from "date-fns";

import Text from "./Text";
import Image from "./Image";
import Button from "./Button";

import Toaster from "../utils/toaster";
import { joinAndNormalize } from "../utils/common";

const height = 170;
const maxImgWidth = (height * 16) / 9;

type TProps = {
  game: TGame;
  gamePath: string;
  savePoint: TSavePoint;
  className?: string;
};

const SavePoint = (props: TProps) => {
  const { game, gamePath, savePoint, className } = props;

  const name = useMemo(
    () => savePoint?.name || savePoint.id,
    [savePoint?.name, savePoint.id]
  );
  const screenshotPath: string | undefined = useMemo(() => {
    if (savePoint?.screenshotFileName) {
      return joinAndNormalize(
        "file://",
        gamePath + `__${game.id}`,
        savePoint.folderName,
        "__screenshots",
        savePoint?.screenshotFileName
      );
    }
    return undefined;
  }, [game.id, gamePath, savePoint?.screenshotFileName, savePoint.folderName]);

  const formatedDate = (() => {
    const date = new Date(savePoint.date);
    const distance = formatDistance(date, new Date());
    return format(date, "dd.MM.yyyy, HH:mm") + " - " + distance + " ago";
  })();

  const onLoadSave = useCallback(
    async (savePoint: TSavePoint) => {
      const isLoaded = await window.electron.loadSavePoint(
        game.id,
        savePoint.id
      );
      if (isLoaded) {
        Toaster.add({ content: "Saved & Loaded", intent: "success" });
      } else {
        Toaster.add({ content: "Load failed", intent: "error" });
      }
    },
    [game.id]
  );

  const onRemoveSave = useCallback(
    async (savePoint: TSavePoint) => {
      await window.electron.removeSavePoint(game.id, savePoint.id);
    },
    [game.id]
  );

  return (
    <Container className={className}>
      <Screenshot src={screenshotPath} width={maxImgWidth} height={height} />
      <Info>
        <Description>
          <Name title={savePoint.id}>{name}</Name>
          <Type>
            {savePoint?.type === "manual" ? "Manual save" : "Autosave"}{" "}
            {savePoint.saveNumberByType && " - " + savePoint.saveNumberByType}
          </Type>
        </Description>
        <DateText>{formatedDate}</DateText>
      </Info>

      <CTAButtons>
        <Button
          title="Make backup save and load this save point"
          icon="upload"
          onClick={() => onLoadSave(savePoint)}
        >
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
  height: ${height}px;
  max-width: 900px;
  max-height: ${height}px;
  background: #1c1c1c;
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.75));
`;

const Screenshot = styled(Image)`
  max-width: ${maxImgWidth}px;
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
