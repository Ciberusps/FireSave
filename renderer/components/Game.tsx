import React from "react";
import Link from "next/link";
import styled from "styled-components";

type TProps = {
  game: TGame;
  className?: string;
};

const Game = (props: TProps) => {
  const { game, className } = props;
  return (
    <Link href="/games/[id]" as={`/games/${game.id}`}>
      <Container className={className}>
        <Image src={game?.steamInfo?.header_image} />
        <h1>{game?.steamInfo?.name || game.name}</h1>
      </Container>
    </Link>
  );
};

const size = 0.8;

const Container = styled.div`
  position: relative;
  width: ${460 * size}px;
  height: ${215 * size}px;
  /* border: 1px solid red; */
  margin: 10px;
  border-radius: 6px;
  cursor: pointer;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Game;
