import React from "react";
import { Form } from "../index";
import s from "./Main.module.scss";
import { Cards } from "../Cards";

interface MainProps {
  value: number;
}

export const Main: React.FC<MainProps> = ({ value }) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Игра на тренировку памяти</h1>
      <div className={s.wrap}>
        <Form />
        {/*Карточки*/}
        <Cards value={value} />
      </div>
    </div>
  );
};

export default Main;
