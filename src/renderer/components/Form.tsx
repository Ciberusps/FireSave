import styled from "styled-components";

type TProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: any;
  className?: string;
};

const Form = (props: TProps) => {
  const { children, className, ...restProps } = props;
  return (
    <Container className={className} {...restProps}>
      {children}
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

export default Form;
