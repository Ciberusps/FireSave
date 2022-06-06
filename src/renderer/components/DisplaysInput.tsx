import { useMemo } from "react";
import styled from "styled-components";
import InputWrapper from "./InputWrapper";

const DISPLAYS_MAP_HEIGHT = 300;

type TProps = {
  label: string;
  description: string;
  selectedDisplayId: number;
  displays: Electron.Display[];
  onChange: (newDisplay: Electron.Display) => void;
};

const DisplaysInput = (props: TProps) => {
  const { label, description, selectedDisplayId, displays, onChange } = props;
  const displaysMap = useMemo(() => {
    const minX = Math.min(...displays.map((d) => d.bounds.x));
    const minY = Math.min(...displays.map((d) => d.bounds.y));
    const maxX = Math.max(...displays.map((d) => d.bounds.x + d.bounds.width));
    const maxY = Math.max(...displays.map((d) => d.bounds.y + d.bounds.height));
    const width = maxX - minX;
    const height = maxY - minY;
    const scale = DISPLAYS_MAP_HEIGHT / height;
    return {
      minX,
      minY,
      maxX,
      maxY,
      width,
      height,
      scale,
    };
  }, [displays]);

  if (displays.length <= 1) return null;

  return (
    <InputWrapper label={label} description={description}>
      <DisplaysContainer>
        <DisplaysWrapper
          width={displaysMap.width * displaysMap.scale}
          height={displaysMap.height * displaysMap.scale}
        >
          {displays.map((display, idx) => (
            <Display
              key={display.id}
              bounds={display.bounds}
              scale={displaysMap.scale}
              offsetX={displaysMap.minX}
              offsetY={displaysMap.minY}
              isSelected={display.id === selectedDisplayId}
              onClick={() => onChange(display)}
            >
              {idx + 1}
            </Display>
          ))}
        </DisplaysWrapper>
      </DisplaysContainer>
    </InputWrapper>
  );
};

const DisplaysContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${DISPLAYS_MAP_HEIGHT}px;
  margin: 30px 0;
  align-items: center;
  justify-content: center;
`;

type TDisplaysWrapper = {
  width: number;
  height: number;
};
const DisplaysWrapper = styled.div<TDisplaysWrapper>`
  display: flex;
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

type TDisplayProps = Pick<Electron.Display, "bounds"> & {
  isSelected: boolean;
  scale: number;
  offsetX: number;
  offsetY: number;
};

const Display = styled.div<TDisplayProps>`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  top: ${({ bounds, offsetY, scale }) => (bounds.y - offsetY) * scale}px;
  height: ${({ bounds, scale }) => bounds.height * scale}px;
  left: ${({ bounds, offsetX, scale }) => (bounds.x - offsetX) * scale}px;
  width: ${({ bounds, scale }) => bounds.width * scale}px;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.purple : "#454545"};
  border: 1px solid
    ${({ theme, isSelected }) => (isSelected ? "white" : theme.purple)};
  border-radius: 7.5px;
  font-size: 1.5em;
  cursor: pointer;

  &::selection {
    background-color: transparent;
  }

  &:hover {
    border: 3px solid white;
  }
`;

export default DisplaysInput;
