import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { pathname } = useRouter();
  return (
    <Container>
      <Link href="/">
        <Tab>Saves</Tab>
      </Link>

      <Link href="/settings">
        <Tab>Settings</Tab>
      </Link>
    </Container>
  );
};

export const sidebarWidth = 70;

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  background: grey;
`;

const Tab = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${sidebarWidth}px;
  height: 90px;
  background: grey;
  border: 1px solid white;
`;

export default Sidebar;
