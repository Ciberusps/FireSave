import { useState } from "react";
import { transparentize } from "polished";
import styled from "styled-components";
import Button from "./Button";

type TItem = {
  title: string;
  description: React.ReactNode;
};

type TProps = {
  items: TItem[];
};

const FAQ = (props: TProps) => {
  const { items, ...restProps } = props;
  const [openedItemsTitles, setOpenedItemsTitles] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    if (openedItemsTitles.includes(title)) {
      setOpenedItemsTitles(openedItemsTitles.filter((item) => item !== title));
    } else {
      setOpenedItemsTitles([...openedItemsTitles, title]);
    }
  };

  return (
    <Container {...restProps}>
      {items.map((item, index) => {
        const isOpened = openedItemsTitles.includes(item.title);
        return (
          <Item key={index}>
            <Header>
              <Title>{item.title}</Title>
              <ExpandButton
                icon="chevronUp"
                size="small"
                variant="secondary"
                isOpened={isOpened}
                onClick={() => toggleItem(item.title)}
              />
            </Header>
            <Description isOpened={isOpened}>{item.description}</Description>
          </Item>
        );
      })}
    </Container>
  );
};

export default FAQ;

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin-bottom: 100px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  background: ${({ theme }) => transparentize(0.92, theme.purple)};
  border: 1px solid ${({ theme }) => theme.purple};
  border-radius: 4px;
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => transparentize(0.9, theme.purple)};
  padding: 10px 20px;
`;
const Title = styled.div``;

type TDescription = {
  isOpened: boolean;
};
const Description = styled.div<TDescription>`
  display: ${({ isOpened }) => (isOpened ? "block" : "none")};
  transition: all 1s ease-out;
  padding: 10px 20px;
`;

type TExpandButton = {
  isOpened: boolean;
};
const ExpandButton = styled(Button)<TExpandButton>`
  svg {
    transform: ${({ isOpened }) => (isOpened ? "unset" : "rotate(180deg)")};
  }
`;
