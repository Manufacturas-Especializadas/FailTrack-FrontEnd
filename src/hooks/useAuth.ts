import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/services/AuthService";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { login: saveAuth } = useAuthContext();
  const navigate = useNavigate();

  const login = async (data: any) => {
    const toastId = toast.loading("Iniciando sesión...");
    setLoading(true);

    try {
      const token = await authService.login(data);

      saveAuth(token);

      toast.success("¡Acceso concedido!", { id: toastId });
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Credenciales inválidas", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Sesión cerrada");
    navigate("/");
  };

  return { login, loading, logout };
};
