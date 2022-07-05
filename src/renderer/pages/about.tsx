import styled from "styled-components";

import FAQ from "../components/FAQ";
import Image from "../components/Image";
import Layout from "../components/Layout";

import addGameImg from "../../../assets/images/add_game.png";
import addGame2Img from "../../../assets/images/add_game_2.png";
import settingsImg from "../../../assets/images/settings.png";
import gameImg from "../../../assets/images/game.png";

const multiplier = 30;
const SCREENSHOT_WIDTH = 16 * multiplier;
const SCREENSHOT_HEIGHT = 9 * multiplier;

const AboutPage = () => {
  return (
    <Layout contentStyles={{ height: "100vh", alignItems: "center" }}>
      <Container>
        <h1>FAQ</h1>

        <FAQStyled
          items={[
            {
              title: "How to add game?",
              description: (
                <>
                  <Description>1. Add game</Description>
                  <Screenshot
                    width={SCREENSHOT_WIDTH}
                    height={SCREENSHOT_HEIGHT}
                    src={addGameImg}
                  />
                  <Description>
                    2. Choose &quot;.exe&quot; file and save file location
                  </Description>
                  <Screenshot
                    width={SCREENSHOT_WIDTH}
                    height={SCREENSHOT_HEIGHT}
                    src={addGame2Img}
                  />
                  <Description>3. Check settings</Description>
                  <Screenshot
                    width={SCREENSHOT_WIDTH}
                    height={SCREENSHOT_HEIGHT}
                    src={settingsImg}
                  />
                  <Description>
                    4. Now you are ready to go - run game
                  </Description>
                  <SmallerDescription>
                    FireSave will save your game automatically only when game is
                    running, you can press F5 to save game manually(dont work in
                    fullscreen mode for now, &quot;window&quot; or
                    &quot;borderless window&quot; only)
                  </SmallerDescription>
                  <Screenshot
                    width={SCREENSHOT_WIDTH}
                    height={SCREENSHOT_HEIGHT}
                    src={gameImg}
                  />
                </>
              ),
            },
            {
              title: "How to remove game?",
              description: "Currently not possible",
            },
          ]}
        />
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 900px;
`;

const Screenshot = styled(Image)`
  border-radius: 20px;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25));
  margin-bottom: 20px;
`;

const Description = styled.h2`
  max-width: ${16 * multiplier}px;
`;

const SmallerDescription = styled.div`
  max-width: ${16 * multiplier}px;
  margin-bottom: 20px;
`;

const FAQStyled = styled(FAQ)`
  margin-top: 20px;
`;

export default AboutPage;
