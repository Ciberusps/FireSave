import { useContext } from "react";
import { useLocation } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import {
  faSave as faSaveSolid,
  faGear as faGearSolid,
  faCircleQuestion as faCircleQuestionSolid,
} from "@fortawesome/free-solid-svg-icons";

import Icon from "./Icon";
import Link from "./Link";

const iconsSize = 24;

const Sidebar = () => {
  const { pathname } = useLocation();
  const theme = useContext(ThemeContext);

  const isSavesTabActive = pathname === "/" || pathname.startsWith("/games");
  const isSettingsTabActive = pathname === "/settings";
  const isAboutTabActive = pathname === "/about";

  return (
    <Container>
      <Tab to="/" isActive={isSavesTabActive}>
        <FontAwesomeIcon
          icon={isSavesTabActive ? faSaveSolid : faSave}
          color={isSavesTabActive ? undefined : theme.dark}
          fontSize={iconsSize}
        />
      </Tab>

      <Tab to="/settings" isActive={isSettingsTabActive}>
        {isSettingsTabActive ? (
          <FontAwesomeIcon icon={faGearSolid} fontSize={iconsSize} />
        ) : (
          <Icon icon="settings" size="medium" color={theme.dark} />
        )}
      </Tab>

      <Tab to="/about" isActive={isAboutTabActive}>
        <FontAwesomeIcon
          icon={isAboutTabActive ? faCircleQuestionSolid : faCircleQuestion}
          color={isAboutTabActive ? undefined : theme.dark}
          fontSize={iconsSize}
        />
      </Tab>

      <Update
        to="https://cutt.ly/kjxFNiB"
        title={`Link on latest version. To update manually download "exe" file`}
      >
        <Icon icon="upload" color={theme.dark} />
      </Update>
    </Container>
  );
};

export const sidebarWidth = 60;

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  background: #222222;
`;

type TTab = {
  isActive?: boolean;
};

const Tab = styled(Link)<TTab>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${sidebarWidth}px;
  height: 60px;
  background: transparent;
  border-left: 2px solid
    ${({ theme, isActive }) => (isActive ? theme.purple : "transparent")};
  cursor: pointer;

  &:hover,
  &.hover {
    background: ${({ theme }) => theme.darkOpacity};
  }
`;

const Update = styled(Tab)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${sidebarWidth}px;
  bottom: 0px;
`;

export default Sidebar;
