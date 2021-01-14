import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Image from "../components/Image";

type TProps = {
  game: TGame;
  className?: string;
};

const Game = (props: TProps) => {
  const { game, className } = props;
  return (
    <Link href="/games/[id]" as={`/games/${game.id}`}>
      <Container className={className}>
        <Img width="100%" height={215} src={game?.steamInfo?.header_image} />
        <Description>
          <GameName>{game?.steamInfo?.name || game.name}</GameName>
        </Description>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  width: 460px;
  background: #1c1c1c;
  margin: 10px;
  padding-bottom: 14px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25));
`;

const Img = styled(Image)`
  object-fit: cover;
`;

const Description = styled.div`
  margin-top: 12px;
  padding: 0px 20px;
`;

const GameName = styled.div`
  font-size: 26px;
`;

export default Game;
