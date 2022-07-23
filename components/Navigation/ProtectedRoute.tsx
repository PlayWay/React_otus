import React, { PropsWithChildren, useContext } from "react";
import { AuthProviderContext } from "../Auth/AuthProvider";
import { useRouter } from "next/router";

export const ProtectedRoute: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const { user } = useContext(AuthProviderContext);
  const router = useRouter();
  console.log(user);
  if (user) {
    return children;
  }
  router.replace("/auth");
  return <h1>Redirect...</h1>;
};

export default ProtectedRoute;
