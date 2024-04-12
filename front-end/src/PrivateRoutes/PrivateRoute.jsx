import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to={role === "agency" ? "/agencysignin" : role === "guide" ? "/guidesignin" : role === "hotel" ? "/hotelsignin" : "/signin"} />;

  const decoded = jwtDecode(token);

  const now = new Date(),
    exp = new Date(decoded.exp);

  if (exp > now) {
    localStorage.removeItem("token");
    return <Navigate to={role === "agency" ? "/agencysignin" : role === "guide" ? "/guidesignin" : role === "hotel" ? "/hotelsignin" : "/signin"} />;
  }

  return decoded.role === role ? (
    children
  ) : (
    <Navigate to={role === "agency" ? "/agencysignin" : role === "guide" ? "/guidesignin" : role === "hotel" ? "/hotelsignin" : "/signin"} />
  );
};
export default PrivateRoute;