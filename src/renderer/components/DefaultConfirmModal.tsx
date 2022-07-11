import styled from "styled-components";

import Modal from "./Modal";
import Button from "./Button";

type TProps = {
  title: string;
  description: React.ReactNode;
  isOpen: boolean;
  onRequestClose: (isSuccess?: boolean) => void;
};

const DefaultConfirmModal = (props: TProps) => {
  const { title, description, isOpen, onRequestClose } = props;
  return (
    <ModalStyled isOpen={isOpen} onRequestClose={() => onRequestClose()}>
      <Title>{title}</Title>

      <Description>{description}</Description>

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
  display: flex;
  flex-direction: column;
  width: 450px;
`;

const Title = styled.div`
  font-size: 3rem;
  font-weight: 600;
  margin-top: 0;
`;

const Description = styled.div`
  margin-top: 20px;
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.6rem;
`;

const Actions = styled.div`
  display: flex;
  margin-top: 60px;
`;

const DeleteButton = styled(Button)`
  margin-right: 10px;
`;

const CloseButton = styled(Button)``;
