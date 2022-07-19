import styled from "styled-components";

import FAQ from "../components/FAQ";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";

import readmemd from "../../../README.md";
import howToAddCustomGameMd from "../../../docs/how_to_add_custom_game.md";

const AboutPage = () => {
  return (
    <Layout contentStyles={{ height: "100vh", alignItems: "center" }}>
      <Container>
        <h1>FAQ</h1>

        <FAQStyled
          items={[
            {
              title: `How to add "custom" game?`,
              description: <Markdown>{howToAddCustomGameMd}</Markdown>,
            },
            {
              title: "How to remove game?",
              description: "Currently not possible",
            },
            {
              title: "About FireSave",
              description: <Markdown>{readmemd}</Markdown>,
            },
          ]}
        />
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 960px;
  padding: 0 30px;
`;

const FAQStyled = styled(FAQ)`
  margin-top: 20px;
`;

export default AboutPage;
