import React, { PropsWithChildren } from "react";
import Header from "./Header";
import s from "./Header.module.scss";
import { useAppSelector } from "../../hooks/useAppDispatch";
import {
  gameInfoSelector,
  statisticSelector,
} from "../../store/reducers/game/selectors";

export const HeaderWrap: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { searchColor } = useAppSelector(gameInfoSelector);
  const statistic = useAppSelector(statisticSelector);
  return (
    <div className={s.wrap}>
      <Header color={searchColor} statistic={statistic} />
      <main>{children}</main>
    </div>
  );
};

export default HeaderWrap;
