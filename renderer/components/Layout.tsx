import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <header>
      <Navigation>
        <Link href="/">
          <Tab>Saves</Tab>
        </Link>
        <Link href="/settings">
          <Tab>Settings</Tab>
        </Link>
      </Navigation>
    </header>

    {children}

    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
`;

const Tab = styled.a`
  width: 50px;
  height: 50px;
  background: grey;
  border: 1px solid white;
`;

export default Layout;
