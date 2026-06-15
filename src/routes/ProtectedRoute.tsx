import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Role } from "../types";

export function ProtectedRoute({ role }: { role: Role }) {
  const { currentUser } = useApp();

  if (!currentUser) return <Navigate to={`/auth/${role}`} replace />;
  if (currentUser.role !== role) return <Navigate to={`/${currentUser.role}`} replace />;

  return <Outlet />;
}
