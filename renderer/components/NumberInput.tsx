import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import useDebounce from "react-use/lib/useDebounce";

type TProps = {
  label: string;
  value: number | undefined;
  description: string;
  isDisabled?: boolean;
  onChange: (value: number) => void;
};

const NumberInput = (props: TProps) => {
  const { label, value, description, isDisabled, onChange } = props;
  const [lastVal, setLastVal] = useState(value);
  const [val, setVal] = useState(value || 1);

  useDebounce(
    () => {
      if (val !== lastVal) {
        onChange(val);
        setLastVal(val);
      }
    },
    1000,
    [val]
  );

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    let newVal = Number(event.target.value.slice(0, 2));
    if (newVal <= 0) newVal = 1;
    setVal(newVal);
  };

  return (
    <Container isDisabled={isDisabled}>
      <Label>{label}</Label>

      <InputContainer>
        <Top>
          <Input value={val} type="number" min={1} max={60} onChange={onChangeValue} />
        </Top>

        <Description>{description}</Description>
      </InputContainer>
    </Container>
  );
};

type TContainer = {
  isDisabled?: boolean;
};

const Container = styled.div<TContainer>`
  display: flex;
  background: ${({ theme, isDisabled }) =>
    isDisabled ? theme.darkOpacity : "transparent"};
`;

const Label = styled.div`
  width: 120px;
  padding-right: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Top = styled.div`
  display: flex;

  > * {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

const Input = styled.input`
  background: ${({ theme }) => theme.darkOpacity};
  outline: none;
  border: 0px;
  border-radius: 4px;
  height: 30px;
  color: ${({ theme }) => theme.white};
  padding-left: 15px;
`;

const Description = styled.div`
  font-style: normal;
  font-weight: lighter;
  font-size: 14px;
  margin-top: 10px;
`;

export default NumberInput;
