import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = sessionStorage.getItem("admin");

  if (user !== "loggedin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export { ProtectedRoute };
