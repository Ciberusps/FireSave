import { faClose } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "./Button";

type TProps = {
  type: "include" | "exclude";
  inputProps: any;
  list: string[];
  saveFullFolder: boolean;
  onClickRemove: (keys: string[]) => () => void;
};

const ListInput = (props: TProps) => {
  const { type, inputProps, list, saveFullFolder, onClickRemove } = props;

  const showIncludesNotRequired = type === "include" && saveFullFolder;

  return (
    <Content>
      <HeaderContainer>
        <Header>{type === "include" ? "Include list" : "Exclude list"}</Header>
        <Button size="small" onClick={onClickRemove([...list])}>
          remove all
        </Button>
      </HeaderContainer>

      <List>
        {showIncludesNotRequired
          ? "Necessary only if 'Save full folder' turned off"
          : !list?.length && "No files"}

        {list?.map((file) => (
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

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 10px;
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
