import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  if (!parsedUser || !parsedUser.userData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export { ProtectedRoute };
