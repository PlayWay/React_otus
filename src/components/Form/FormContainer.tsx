import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";
import Form from "./Form";
import { GameContext, SetSizeContext } from "../Main/MainContainer";

export const FormContainer: React.FC = ({}) => {
  const setSize = useContext(SetSizeContext);
  const { gameInfo, status } = useContext(GameContext);
  const [value, setValue] = useState<number>(3);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const numVal: number = +val;

    if (isNaN(numVal) || numVal > 10) {
      return;
    }
    setValue(numVal || 0);
  }, []);

  const onSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSize(value);
    },
    [value]
  );

  return (
    <Form
      onSumbit={onSubmit}
      value={value}
      onChange={onChange}
      disabled={status === "start"}
      color={gameInfo.searchColor}
    />
  );
};

export default memo(FormContainer);
