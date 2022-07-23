import React, {
  createContext,
  memo,
  PropsWithChildren,
  useCallback,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { login } from "../../store/reducers/auth/authSlice";
import { userNameSelector } from "../../store/reducers/auth/selector";
import { LOGOUT_SAGA } from "../../store/saga/actions/types";

export type AuthProviderType = {
  user: string;
  login: (name: string) => void;
  logout: () => void;
};
export const AuthProviderContext = createContext<AuthProviderType>(
  {} as AuthProviderType
);
export const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userNameSelector);

  const auth = useCallback((name: string) => dispatch(login(name)), [dispatch]);
  const logout = useCallback(() => dispatch({ type: LOGOUT_SAGA }), [dispatch]);

  return (
    <AuthProviderContext.Provider value={{ user, logout, login: auth }}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export default memo(AuthProvider);
