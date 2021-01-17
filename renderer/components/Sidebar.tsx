import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useRouter } from "next/router";

import Icon from "./Icon";
import Link from "./Link";

const Sidebar = () => {
  const { pathname } = useRouter();
  const theme = useContext(ThemeContext);

  const isSavesTabActive = pathname === "/" || pathname.startsWith("/games");
  const isSettingsTabActive = pathname === "/settings";
  const isAboutTabActive = pathname === "/about";

  return (
    <Container>
      <Tab href="/" isActive={isSavesTabActive}>
        <Icon icon="save" color={isSavesTabActive ? undefined : theme.dark} />
      </Tab>

      <Tab href="/settings" isActive={isSettingsTabActive}>
        <Icon icon="settings" color={isSettingsTabActive ? undefined : theme.dark} />
      </Tab>

      <Tab href="/about" isActive={isAboutTabActive}>
        <Icon icon="help" color={isAboutTabActive ? undefined : theme.dark} />
      </Tab>

      <Update
        href="https://cutt.ly/kjxFNiB"
        target="_blank"
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
