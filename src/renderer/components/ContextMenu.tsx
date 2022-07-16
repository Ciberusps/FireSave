import styled from "styled-components";
import { transparentize } from "polished";

import Button, { TButtonProps } from "./Button";
import Tooltip from "./Tooltip";
import { TIcons } from "./Icon";

type TItem = TButtonProps & {
  title: string;
  icon?: TIcons;
  onClick: VoidFunction;
};

const ContextMenuItem = (props: TItem) => {
  const { title, icon, onClick, ...restProps } = props;
  return (
    <ItemContainer
      icon={icon}
      size="small"
      variant="secondary"
      textStyles={{
        padding: "0px 15px",
        justifyContent: "flex-start",
      }}
      onClick={onClick}
      {...restProps}
    >
      {title}
    </ItemContainer>
  );
};

export type TContextMenuProps = {
  items: TItem[];
  children: React.ReactNode;
  visible: boolean;
  getReferenceClientRect: () => DOMRect;
  onClickOutside: VoidFunction;
};

const ContextMenu = (props: TContextMenuProps) => {
  const { items, children, ...restProps } = props;

  return (
    <TooltipStyled
      allowHTML
      placement="right-start"
      interactive={true}
      text={
        <Container>
          {items.map((item, index) => (
            <ContextMenuItem key={index} {...item} />
          ))}
        </Container>
      }
      {...restProps}
    >
      {children}
    </TooltipStyled>
  );
};

export default ContextMenu;
export { ContextMenuItem };

const TooltipStyled = styled(Tooltip)`
  padding: 8px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => transparentize(0.2, theme.purple)};
  box-shadow: 0px 0px 10px ${({ theme }) => theme.purple};
  border-radius: 7px;
`;

const Container = styled.div`
  width: 170px;
  padding: 0px;
`;

const ItemContainer = styled(Button)`
  height: 35px;
  width: 100%;
  text-align: start;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;
