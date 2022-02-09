import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

// import Sidebar, { sidebarWidth } from "./Sidebar";

type Props = {
  children: ReactNode;
  title?: string;
  contentStyles?: any;
};

const Layout = ({ children, title = "FireSave", contentStyles }: Props) => (
  <Container>
    <Helmet>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Helmet>

    {/* <Sidebar /> */}

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
  padding: 30px 30px;
  position: relative;
`;

// const Content = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   margin-left: ${sidebarWidth}px;
//   padding: 30px 30px;
//   position: relative;
// `;

export default Layout;
