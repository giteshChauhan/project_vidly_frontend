import { Outlet, Navigate } from "react-router-dom";
import auth from "../../services/authService";

const PrivateRoutes = ({ to, checkIsAdmin = false }) => {
  const user = auth.getCurrentUser();
  let check = true;
  if (!user) check = false;
  if (user && checkIsAdmin && !user.isAdmin) check = false;

  return check ? <Outlet /> : <Navigate to={to} replace />;
};

export default PrivateRoutes;
