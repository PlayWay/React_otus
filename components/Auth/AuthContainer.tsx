import React, { memo, useCallback, useContext } from "react";
import Auth from "./Auth";
import { useInput } from "../../hooks/useInput";
import { AuthProviderContext } from "./AuthProvider";
import { useRouter } from "next/router";

export const AuthContainer: React.FC = ({}) => {
  const { login } = useContext(AuthProviderContext);
  const router = useRouter();

  const { value, onChange } = useInput("");

  const onSubmit = useCallback(() => {
    login(value);
    router.push("/");
  }, [login, router, value]);

  return <Auth value={value} onChange={onChange} onSubmit={onSubmit} />;
};

export default memo(AuthContainer);
