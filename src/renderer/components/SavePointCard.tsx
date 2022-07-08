import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import CreatableSelect from "react-select/creatable";
import { StylesConfig, OnChangeValue } from "react-select";
import { format, formatDistance } from "date-fns";
import lodashDebounce from "lodash.debounce";

import Text from "./Text";
import Image from "./Image";
import Button from "./Button";
import DefaultConfirmModal from "./DefaultConfirmModal";

import Toaster from "../utils/toaster";
import { joinAndNormalize } from "../utils/common";
import { transparentize } from "polished";
import { useGamesStore } from "renderer/utils/stores";

const DEFAULT_CARD_HEIGHT = 170;
const MAX_IMG_WIDTH = (DEFAULT_CARD_HEIGHT * 16) / 9;
const CARD_BORDER_RADIUS = 10;

const changeSavePointNameDebounced = lodashDebounce(
  (gameId: string, savePointId: string, newName: string) => {
    window.electron.changeSavePointName(gameId, savePointId, newName);
  },
  1000
);

type TOption = { value: string; label: string };

type TProps = {
  game: TGame;
  gameSavesPath: string;
  savePoint: TSavePoint;
  className?: string;
};

const SavePointCard = (props: TProps) => {
  const { game, gameSavesPath, savePoint, className } = props;
  const theme = useTheme();
  const [name, setName] = useState<string>(savePoint.name);
  const tags = useGamesStore((state) => state.tags);
  const [savePointToDelete, setSavePointToDelete] = useState<TSavePoint>();

  const tagsInputOptions = useMemo(
    () => tags.map((t) => ({ value: t, label: t })),
    [tags]
  );

  const tagsInputStyles: StylesConfig = useMemo(
    () => ({
      valueContainer: (base) => ({ ...base, paddingLeft: 0, margin: -2 }),
      control: (base) => ({
        ...base,
        borderColor: transparentize(0.9, theme.purple),
        background: "transparent",
        borderTopColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
      }),
      indicatorSeparator: (base) => ({
        ...base,
      }),
      option: (base) => ({
        ...base,
        borderRadius: 40,
        cursor: "pointer",
      }),
      menu: (base) => ({
        ...base,
        background: "#1c1c1c",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      }),
      multiValue: (base) => ({
        ...base,
        borderRadius: 10,
      }),
      multiValueRemove: (base) => ({
        ...base,
        cursor: "pointer",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingLeft: 2,
      }),
    }),
    [theme]
  );

  const screenshotPath: string | undefined = useMemo(() => {
    if (savePoint?.screenshotFileName) {
      return joinAndNormalize(
        "file://",
        gameSavesPath + `__${game.id}`,
        savePoint.folderName,
        "__screenshots",
        savePoint?.screenshotFileName
      );
    }
    return undefined;
  }, [
    game.id,
    gameSavesPath,
    savePoint?.screenshotFileName,
    savePoint.folderName,
  ]);

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

  useEffect(() => {
    setName(savePoint.name);
  }, [savePoint.name]);

  const removeSave = useCallback(
    async (savePoint: TSavePoint) => {
      await window.electron.removeSavePoint(game.id, savePoint.id);
    },
    [game.id]
  );

  const onChangeTags = useCallback(
    (newTags: OnChangeValue<TOption, true>) => {
      window.electron.changeSavePointTags(
        game.id,
        savePoint.id,
        newTags.map((t) => t.value)
      );
    },
    [game.id, savePoint.id]
  );

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (newVal) => {
      const newName = newVal.target.value;
      setName(newName);
      changeSavePointNameDebounced(game.id, savePoint.id, newName);
    },
    [game.id, savePoint.id]
  );

  return (
    <Container className={className} tabIndex={0}>
      <ScreenshotContainer>
        <ScreenshotBackground
          src={screenshotPath}
          width={MAX_IMG_WIDTH}
          height={DEFAULT_CARD_HEIGHT}
        />
        <Screenshot
          src={screenshotPath}
          width={MAX_IMG_WIDTH}
          height={DEFAULT_CARD_HEIGHT}
        />
      </ScreenshotContainer>

      <Info>
        <Description>
          <Name
            type="text"
            title={savePoint.id}
            value={name}
            onChange={onChangeName}
          />
          <Type>
            {savePoint?.type === "manual" ? "Manual save" : "Autosave"}{" "}
            {savePoint.saveNumberByType && " - " + savePoint.saveNumberByType}
          </Type>
        </Description>

        <CreatableSelect
          placeholder="no tags..."
          isMulti
          isClearable
          closeMenuOnSelect={false}
          menuPortalTarget={document.body}
          options={tagsInputOptions}
          styles={tagsInputStyles}
          value={savePoint.tags.map((t) => ({ value: t, label: t }))}
          theme={(reactSelectTheme) => ({
            ...reactSelectTheme,
            colors: {
              ...reactSelectTheme.colors,
              primary: theme.purple,
              primary75: transparentize(0.75, theme.purple),
              primary50: transparentize(0.5, theme.purple),
              primary25: transparentize(0.25, theme.purple),
              neutral0: theme.white,
              neutral5: transparentize(0.95, theme.purple),
              neutral10: transparentize(0.5, theme.purple), // tags background
              neutral20: transparentize(0.8, theme.purple),
              neutral30: transparentize(0.7, theme.purple),
              neutral40: transparentize(0.6, theme.purple),
              neutral50: theme.dark,
              neutral60: transparentize(0.4, theme.purple),
              neutral70: transparentize(0.3, theme.purple),
              neutral80: theme.white,
              neutral90: transparentize(0.1, theme.purple),
            },
          })}
          // @ts-ignore
          onChange={onChangeTags}
        />

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
        <Button
          icon="close"
          variant="secondary"
          onClick={() => setSavePointToDelete(savePoint)}
        />
      </CTAButtons>

      <DefaultConfirmModal
        isOpen={!!savePointToDelete}
        title="Remove save"
        description="Are you sure you want to delete this save?"
        onRequestClose={(result) => {
          if (result && savePointToDelete) {
            removeSave(savePointToDelete);
          } else {
            setSavePointToDelete(undefined);
          }
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: ${DEFAULT_CARD_HEIGHT}px;
  background: #1c1c1c;
  border-radius: ${CARD_BORDER_RADIUS}px;
  margin-bottom: 15px;
  position: relative;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.75));
`;

const ScreenshotContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 400px;
  height: 100%;
  max-width: ${MAX_IMG_WIDTH}px;
  border-top-left-radius: ${CARD_BORDER_RADIUS}px;
  border-bottom-left-radius: ${CARD_BORDER_RADIUS}px;
  background: rgba(0, 0, 0, 0.25);
`;

const ScreenshotBackground = styled(Image)`
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.15;
`;

const Screenshot = styled(Image)`
  object-fit: contain;
  z-index: 1;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin-left: 25px;
  padding: 10px 0px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.input`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  background: transparent;
  color: ${({ theme }) => theme.white};
  border: none;
  border-color: red;
  border-bottom-width: 1px;
`;

const Type = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.dark};
  margin-top: 5px;
`;

const DateText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
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

export default SavePointCard;
