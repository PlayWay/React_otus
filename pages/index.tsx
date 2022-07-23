import React from "react";
import { Main } from "../components/Main";
import HeaderWrap from "../components/HeaderWrap";
import ProtectedRoute from "../components/Navigation/ProtectedRoute";

export const MainPage: React.FC = ({}) => {
  return (
    <HeaderWrap>
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    </HeaderWrap>
  );
};

export default MainPage;
