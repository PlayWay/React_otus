import React, { useContext } from "react";
import Button from "../../ui/Button";
import { AuthProviderContext } from "../../Auth/AuthProvider";
import s from "../Header.module.scss";

export const Header: React.FC = ({}) => {
  const { logout, user } = useContext(AuthProviderContext);
  return (
    <nav className={s.nav}>
      <b>Think-Game</b>
      <h1 className={s.name} data-testid="header-user">
        {user}
      </h1>
      <Button onClick={logout} data-testid="header-logout">
        Выйти
      </Button>
    </nav>
  );
};

export default Header;
