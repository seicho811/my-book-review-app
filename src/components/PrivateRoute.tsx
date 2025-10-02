import { Navigate, useLocation, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {
  const { token, clearAuthData } = useAuth();
  const location = useLocation();
  if (!token) {
    clearAuthData();
    const next = encodeURIComponent(location.pathname + location.search);
    return (
      <Navigate
        to={`/login?next=${next}`}
        replace
      />
    );
  }
  return <Outlet />;
}
