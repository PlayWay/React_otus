import React, { ChangeEvent } from "react";
import Button from "../ui/Button";
import s from "./Form.module.scss";
import Card from "../Card";

interface FormProps {
  onSumbit: (e: ChangeEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}

export const Form: React.FC<FormProps> = ({ onSumbit, value, onChange }) => {
  return (
    <form onSubmit={onSumbit} data-testid="form">
      <div className={s.wrap}>
        <input
          value={value}
          className={s.input}
          name="x"
          onChange={onChange}
          data-testid="input-x"
        />
        <span className={s.x}>X</span>
        <input
          value={value}
          className={s.input}
          name="y"
          onChange={onChange}
          data-testid="input-y"
        />
      </div>
      <div className={s.btnWrap}>
        <Button type="submit" className={s.button} data-testid="play-btn">
          Начать игру
        </Button>
        <div className={s.searchColor} data-testid="color-box">
          <h2>Цвет:</h2>
          <Card color={"red"} />
        </div>
      </div>
    </form>
  );
};

export default Form;
