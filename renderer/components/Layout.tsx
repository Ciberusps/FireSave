import React, { ReactNode } from "react";
import Head from "next/head";
import styled from "styled-components";

import Sidebar, { sidebarWidth } from "./Sidebar";

type Props = {
  children: ReactNode;
  title?: string;
  contentStyles?: any;
};

const Layout = ({
  children,
  title = "This is the default title",
  contentStyles,
}: Props) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Sidebar />

    <Content style={contentStyles}>{children}</Content>
  </Container>
);

const Container = styled.div`
  flex: 1;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${sidebarWidth}px;
  padding: 30px 40px;
  position: relative;
`;

export default Layout;
