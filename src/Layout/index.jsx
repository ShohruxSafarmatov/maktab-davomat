import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getLocalStorage } from "../libs/localStorage";
import { useEffect } from "react";
export default function Layout() {
  const navigate = useNavigate();
  const token = getLocalStorage("school_token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return token ? (
    <div className="layout">
      <Sidebar />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}
