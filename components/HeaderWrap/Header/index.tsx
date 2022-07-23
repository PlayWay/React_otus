import React, { useContext } from "react";
import Button from "../../ui/Button";
import { AuthProviderContext } from "../../Auth/AuthProvider";
import s from "../Header.module.scss";
import { Statistic } from "../../../types";

type HeaderProps = {
  statistic: Statistic | null;
  color: string;
};
export const Header: React.FC<HeaderProps> = ({ statistic = null, color }) => {
  const { logout, user } = useContext(AuthProviderContext);

  return (
    <nav className={s.nav} style={{ backgroundColor: color }} data-testid="nav">
      <b className={s.name} data-testid="header-user">
        {user}
      </b>
      <h1 data-testid="header-statistic" className={s.stats}>
        {statistic && (
          <>
            <span>
              Попыток: <b data-testid="try">{statistic.try}</b>
            </span>
            <span>
              Победил: <b data-testid="win">{statistic.win}</b>
            </span>
            <span>
              Проиграл: <b data-testid="lose">{statistic.lose}</b>
            </span>
          </>
        )}
      </h1>
      <Button onClick={logout} data-testid="header-logout">
        Выйти
      </Button>
    </nav>
  );
};

export default Header;
