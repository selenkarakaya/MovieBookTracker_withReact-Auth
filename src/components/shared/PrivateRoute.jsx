import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const location = useLocation();

  if (checkingStatus) {
    return <Spinner />;
  }
  if (location.pathname === "/") {
    return <Outlet />;
  } else if (location.pathname === "/Profile") {
    return loggedIn ? <Outlet /> : <Navigate to="/SignIn" />;
  }
};

export default PrivateRoute;
