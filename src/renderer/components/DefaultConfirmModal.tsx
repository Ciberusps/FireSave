import styled from "styled-components";

import Modal from "./Modal";
import Button from "./Button";

type TProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onRequestClose: (isSuccess?: boolean) => void;
};

const DefaultConfirmModal = (props: TProps) => {
  const { title, description, isOpen, onRequestClose } = props;
  return (
    <ModalStyled isOpen={isOpen} onRequestClose={() => onRequestClose()}>
      <Title>{title}</Title>

      <div>{description}</div>

      <Actions>
        <DeleteButton onClick={() => onRequestClose(true)}>Yes</DeleteButton>

        <CloseButton variant="secondary" onClick={() => onRequestClose(false)}>
          Cancel
        </CloseButton>
      </Actions>
    </ModalStyled>
  );
};

export default DefaultConfirmModal;

const ModalStyled = styled(Modal)`
  width: 400px;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const Actions = styled.div`
  display: flex;
  margin-top: 40px;
`;

const DeleteButton = styled(Button)`
  margin-right: 10px;
`;

const CloseButton = styled(Button)``;
