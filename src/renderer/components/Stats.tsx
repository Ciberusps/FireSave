import styled from "styled-components";

type TProps = {
  game: TGame;
  className?: string;
};

const Stats = (props: TProps) => {
  const { game, className } = props;
  return (
    <Container className={className}>
      <Stat>{game.savesStats.total} saves</Stat>
      <Stat>{game.savesStats.auto} autosaves</Stat>
      <Stat>{game.savesStats.manual} manual saves</Stat>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 5px;
`;

const Stat = styled.div`
  display: flex;
  color: ${({ theme }) => theme.dark};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;

  &:not(:first-child) {
    &::before {
      content: "•";
      margin-right: 5px;
    }
    margin-left: 5px;
  }
`;

export default Stats;
