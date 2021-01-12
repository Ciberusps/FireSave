import styled from "styled-components";

import Image from "../components/Image";
import Layout from "../components/Layout";

const AboutPage = () => {
  return (
    <Layout contentStyles={{ height: "100vh" }}>
      <h1>How to use</h1>
      <Description>1. Add game</Description>
      <Screenshot src={"./images/add_game.png"} />
      <Description>2. Choose ".exe" file folder and save file location</Description>
      <Screenshot src={"./images/add_game_2.png"} />
      <Description>3. Check settings</Description>
      <Screenshot src={"./images/settings.png"} />
      <Description>4. Now you are ready to go - run game</Description>
      <SmallerDescription>
        FireSave will save your game automatically only when game is running, you can
        press F5 to save game manually(dont work in fullscreen mode for now, "window" or
        "borderless window" only)
      </SmallerDescription>
      <Screenshot src={"./images/game.png"} />
    </Layout>
  );
};

const multiplier = 50;

const Screenshot = styled(Image)`
  width: ${16 * multiplier}px;
  height: ${9 * multiplier}px;
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

export default AboutPage;
