import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function LogoutPage() {
  const { clearAuthData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    clearAuthData();
    navigate("/login");
  }, [clearAuthData, navigate]);

  return null;
}
