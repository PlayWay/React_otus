import React, { memo } from "react";
import { Form } from "../index";
import s from "./Main.module.scss";
import { Cards } from "./Cards";

export const Main: React.FC = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Игра на тренировку памяти</h1>
      <div className={s.wrap}>
        <Form />
        {/*Карточки*/}
        <Cards />
      </div>
    </div>
  );
};

export default memo(Main);
