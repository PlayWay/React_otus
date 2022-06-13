import React, { PropsWithChildren, useContext } from "react";
import { AuthProviderContext } from "../Auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const { user } = useContext(AuthProviderContext);
  const location = useLocation();
  if (user) {
    return children;
  }
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default ProtectedRoute;
