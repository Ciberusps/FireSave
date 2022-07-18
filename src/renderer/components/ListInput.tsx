import { faClose } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import Button from "./Button";

type TProps = {
  type: "include" | "exclude";
  title: string;
  inputProps: any;
  list: string[];
  isDisabled: boolean;
  disabledReason?: string;
  onClickRemove: (keys: string[]) => () => void;
};

const ListInput = (props: TProps) => {
  const { title, inputProps, list, isDisabled, disabledReason, onClickRemove } =
    props;
  const { t } = useTranslation();

  return (
    <Content isDisabled={isDisabled}>
      <HeaderContainer>
        <Header>{title}</Header>
        <Button
          size="small"
          isDisabled={isDisabled}
          onClick={onClickRemove([...list])}
        >
          {t("list_input_component.remove_all")}
        </Button>
      </HeaderContainer>

      <List>
        {isDisabled ? disabledReason : !list?.length && "No files"}

        {!isDisabled &&
          list?.map((file) => (
            <Item key={file}>
              <RemoveButton icon={faClose} onClick={onClickRemove([file])} />
              {file}
            </Item>
          ))}
      </List>

      <input style={{ display: "none" }} type="text" {...inputProps} />
    </Content>
  );
};

export default ListInput;

type TContent = {
  isDisabled: boolean;
};
const Content = styled.div<TContent>`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 10px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "unset")};
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  margin-bottom: 10px;
`;

const Header = styled.h4`
  flex: 1;
  margin: 0;
`;

const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  background: rgba(0, 0, 0, 0.25);
  padding: 10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const RemoveButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  background: ${({ theme }) => theme.purple};
  border-radius: 15px;
  width: 15px;
  height: 15px;
  padding: 5px;
  margin-right: 10px;
`;
