import React, { memo, useCallback, useContext } from "react";
import Auth from "./Auth";
import { useInput } from "../../hooks/useInput";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationState } from "../../types";
import { AuthProviderContext } from "./AuthProvider";

export const AuthContainer: React.FC = ({}) => {
  const { login } = useContext(AuthProviderContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { value, onChange } = useInput("");

  const onSubmit = useCallback(() => {
    const state = location.state as NavigationState;
    login(value);
    navigate(state?.from || "/");
  }, [location.state, login, navigate, value]);

  return <Auth value={value} onChange={onChange} onSubmit={onSubmit} />;
};

export default memo(AuthContainer);
