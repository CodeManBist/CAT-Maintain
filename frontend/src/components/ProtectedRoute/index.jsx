import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const { user, loading } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;

  if (loading) return <p>Loading...</p>;

  // ✅ Role check
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
