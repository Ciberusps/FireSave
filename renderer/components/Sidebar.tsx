import React, { useContext } from "react";
import Link from "next/link";
import styled, { ThemeContext } from "styled-components";
import Icon from "./Icon";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { pathname } = useRouter();
  const theme = useContext(ThemeContext);

  console.log(pathname);
  const isSavesTabActive = pathname === "/" || pathname.startsWith("/games");
  const isSettingsTabActive = pathname === "/settings";

  const onLatestReleaseLink = () => {
    window.electron.openLatestReleasePage();
  };

  return (
    <Container>
      <Link href="/">
        <Tab isActive={isSavesTabActive}>
          <Icon icon="save" color={isSavesTabActive ? undefined : theme.dark} />
        </Tab>
      </Link>

      <Link href="/settings">
        <Tab isActive={isSettingsTabActive}>
          <Icon icon="settings" color={isSettingsTabActive ? undefined : theme.dark} />
        </Tab>
      </Link>

      <Update
        title={`Link on latest version. To update manually download "exe" file`}
        onClick={onLatestReleaseLink}
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

const Tab = styled.a<TTab>`
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
