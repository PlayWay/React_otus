import React, { ChangeEvent, memo } from "react";
import s from "./Auth.module.scss";
import ui from "../ui/ui.module.scss";
import Button from "../ui/Button";
import clsx from "clsx";

interface AuthProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onChange, value, onSubmit }) => {
  return (
    <div className={s.wrap}>
      <h1 className={s.title} data-testid="auth-title">
        Как вас зовут?
      </h1>
      <form onSubmit={onSubmit} className={s.form}>
        <input
          data-testid="auth-input"
          required
          className={clsx(ui.input, s.input)}
          type="text"
          placeholder="Ваше имя"
          onChange={onChange}
          value={value}
        />
        <Button className={s.btn} data-testid="auth-btn" type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};

export default memo(Auth);
