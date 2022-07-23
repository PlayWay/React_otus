import React, { ChangeEvent, memo } from "react";
import Button from "../../ui/Button";
import s from "./Form.module.scss";
import { GRID_LIMIT } from "../../../helpers/const";

type Field<T> = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: T;
};

export interface FormProps {
  onSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
  form: {
    level: Field<number>;
    complexity: Field<string>;
  };
  disabled: boolean;
}

export const Form: React.FC<FormProps> = ({ onSubmit, disabled, form }) => {
  return (
    <form onSubmit={onSubmit} data-testid="form">
      <div className={s.wrap}>
        <div className={s.item}>
          <label htmlFor="level" className={s.label}>
            Уровень:
          </label>
          <select
            name="level"
            id="level"
            data-testid="level-input"
            onChange={form.level.onChange}
            value={form.level.value}
            required
          >
            <option value="" />
            {Array.from({ length: GRID_LIMIT }).map((_, i) => (
              <option value={i + 2} key={i}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className={s.item}>
          <label htmlFor="complexity" className={s.label}>
            Сложность:
          </label>
          <select
            name="complexity"
            id="complexity"
            data-testid="complexity-input"
            onChange={form.complexity.onChange}
            value={form.complexity.value}
          >
            <option value="low">Лёгкий</option>
            <option value="middle">Средний</option>
            <option value="hard">Сложный</option>
          </select>
        </div>
        <div className={s.item}>
          <Button
            type="submit"
            disabled={disabled}
            className={s.button}
            data-testid="play-btn"
          >
            Начать игру
          </Button>
        </div>
      </div>
    </form>
  );
};

export default memo(Form);
