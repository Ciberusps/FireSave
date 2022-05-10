import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TProps = {
  type: "include" | "exclude";
  inputProps: any;
  list: string[];
  saveFullFolder: boolean;
  onClickRemove: (key: string) => void;
};

const ListInput = (props: TProps) => {
  const { type, inputProps, list, saveFullFolder, onClickRemove } = props;

  const showIncludesNotRequired = type === "include" && saveFullFolder;

  const _onClickRemove = useCallback(
    (key: string) => () => onClickRemove(key),
    [onClickRemove]
  );

  return (
    <Content>
      <h3>{type === "include" ? "Include list" : "Exclude list"}</h3>

      <List>
        {showIncludesNotRequired ? (
          <div>Include list only required if "Save full folder" turned off</div>
        ) : (
          !list?.length && "No files"
        )}
        {list?.map((file) => (
          <Item key={file}>
            <RemoveButton icon={faClose} onClick={_onClickRemove(file)} />
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

const List = styled.div`
  display: flex;
  flex-direction: column;
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
