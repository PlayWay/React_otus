import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import Form from "./Form";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch";
import {
  gameStatusSelector,
  settingsSelector,
} from "../../../store/reducers/game/selectors";
import { useInput } from "../../../hooks/useInput";
import { setSettings } from "../../../store/reducers/game/gameSlice";

export const FormContainer: React.FC = ({}) => {
  const settings = useAppSelector(settingsSelector);
  const dispatch = useAppDispatch();
  const status = useAppSelector(gameStatusSelector);
  const level = useInput<HTMLSelectElement>(settings.level);
  const complexity = useInput<HTMLSelectElement>(settings.complexity);

  useEffect(() => {
    level.onChange({ target: { value: settings.level } });
  }, [settings]);

  const onSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(
        setSettings({
          level: level.value,
          complexity: complexity.value,
        })
      );
    },
    [complexity.value, dispatch, level.value]
  );

  const form = useMemo(() => {
    return {
      level,
      complexity,
    };
  }, [complexity, level]);

  return <Form onSubmit={onSubmit} form={form} disabled={status === "start"} />;
};

export default memo(FormContainer);
