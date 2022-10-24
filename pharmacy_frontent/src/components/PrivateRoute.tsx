import { Component, FC, FunctionComponent, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const currentUser = useStore((state) => state.currentUser);
  const location = useLocation();

  if (!currentUser)
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`}
      />
    );

  if (currentUser && currentUser?.role === 'ROLE_USER')
    return (
      <Navigate
        to={`/`}
      />
    );

  if (currentUser && currentUser?.role === 'ROLE_ADMIN')
    return (
      <Navigate
        to={`/admin`}
      />
    );

  return <>{children}</>;
};

export default PrivateRoute;
