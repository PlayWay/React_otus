import React, { PropsWithChildren } from "react";
import Header from "./Header";
import s from "./Header.module.scss";

export const HeaderWrap: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <div className={s.wrap}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default HeaderWrap;
