import React, {
  createContext,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

type AuthProviderType = {
  user: string;
  login: (name: string) => void;
  logout: () => void;
};
export const AuthProviderContext = createContext<AuthProviderType>(
  {} as AuthProviderType
);
export const AuthProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [user, setUser] = useState<string>(localStorage.getItem("user") || "");

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = useCallback((name: string) => setUser(name), []);
  const logout = useCallback(() => setUser(""), []);

  return (
    <AuthProviderContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export default memo(AuthProvider);
