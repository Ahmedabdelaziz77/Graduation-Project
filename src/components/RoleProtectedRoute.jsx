import { Navigate } from "react-router-dom";
import { useAppSelector } from "../State/Store";

// rolesAllowed = ["ROLE_ADMIN", "ROLE_SELLER", "ROLE_USER"]
const RoleProtectedRoute = ({ children, rolesAllowed }) => {
  const { token, roles } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!token;
  const hasRequiredRole = roles.some((role) => rolesAllowed.includes(role));
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (!hasRequiredRole) return <Navigate to="/" />;

  return children;
};

export default RoleProtectedRoute;
