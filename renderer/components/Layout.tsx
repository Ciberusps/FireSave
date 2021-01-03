import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Navigation>
      <Link href="/">
        <Tab>Saves</Tab>
      </Link>
      <Link href="/settings">
        <Tab>Settings</Tab>
      </Link>
    </Navigation>

    <Content>{children}</Content>
  </Container>
);

const sidebarWidth = 70;

const Container = styled.div`
  flex: 1;
  display: flex;
`;

const Navigation = styled.nav`
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

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${sidebarWidth}px;
  padding: 10px;
`;

export default Layout;
