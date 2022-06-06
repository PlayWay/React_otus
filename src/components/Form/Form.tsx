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
    <form onSubmit={onSumbit}>
      <div className={s.wrap}>
        <input value={value} className={s.input} name="x" onChange={onChange} />
        <span className={s.x}>X</span>
        <input value={value} className={s.input} name="y" onChange={onChange} />
      </div>
      <div className={s.btnWrap}>
        <Button type="submit" className={s.button}>
          Начать игру
        </Button>
        <div className={s.searchColor}>
          <h2>Цвет:</h2>
          <Card color={"red"} />
        </div>
      </div>
    </form>
  );
};

export default Form;
