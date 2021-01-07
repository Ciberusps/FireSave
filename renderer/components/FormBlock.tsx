import styled from "styled-components";

type TProps = {
  children: any;
  className?: string;
};

const FormBlock = (props: TProps) => {
  const { children, className } = props;
  return <Container className={className}>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: ${({ theme }) => theme.underlay};
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);

  > * {
    padding-top: 20px;
    padding-bottom: 20px;

    &:not(:first-child) {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    &:first-child {
      padding-top: 0px;
    }

    &:last-child {
      padding-bottom: 0px;
    }
  }
`;

export default FormBlock;
