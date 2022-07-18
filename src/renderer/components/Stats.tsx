import styled from "styled-components";
import { useTranslation } from "react-i18next";

type TProps = {
  game: TGame;
  className?: string;
};

const Stats = (props: TProps) => {
  const { game, className } = props;
  const { t } = useTranslation();
  return (
    <Container className={className}>
      <Stat>
        {t("stats_component.saves_count", {
          count: game.savesStats.total,
        })}
      </Stat>

      <Stat>
        {t("stats_component.autosaves_count", { count: game.savesStats.auto })}
      </Stat>

      <Stat>
        {t("stats_component.manual_saves_count", {
          count: game.savesStats.manual,
        })}
      </Stat>
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
