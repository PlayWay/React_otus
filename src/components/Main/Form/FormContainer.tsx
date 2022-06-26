import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Form from "./Form";
import { AreaSizeContext, GameContext } from "../MainContainer";
import { GRID_LIMIT } from "../../../helpers/const";

export const FormContainer: React.FC = ({}) => {
  const { setSize, size } = useContext(AreaSizeContext);
  const { gameInfo, status } = useContext(GameContext);
  const [value, setValue] = useState<number>(3);

  useEffect(() => {
    setValue(size);
  }, [size]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const numVal: number = +val;

    if (isNaN(numVal) || numVal > GRID_LIMIT) {
      return;
    }
    setValue(numVal || 0);
  }, []);

  const onSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSize(value);
    },
    [setSize, value]
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
