import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "../Auth/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import HeaderWrap from "../HeaderWrap";
import MainPage from "../../pages";
import AuthPage from "../../pages/auth";

const mainElement = (
  <HeaderWrap>
    <ProtectedRoute>
      <MainPage />
    </ProtectedRoute>
  </HeaderWrap>
);

export const Navigation: React.FC = ({}) => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route index element={mainElement} />
        <Route path="*" element={<h1>ТАкой страницы нет!</h1>} />
      </Routes>
    </AuthProvider>
  );
};

export default Navigation;
