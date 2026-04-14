import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ userName, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl 
        border border-gray-100"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            FailTrack <span className="text-blue-600">MesaCore</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Ingresa los datos de tu línea de producción
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 
                rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 
                sm:text-sm outline-none transition-all"
                placeholder="Ej. L1"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 
                rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 
                sm:text-sm outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 rounded-xl 
              shadow-sm text-sm font-semibold text-white bg-blue-600 
              hover:bg-blue-700 transition-all ${
                loading ? "opacity-70 scale-[0.98]" : "hover:scale-[1.02]"
              }`}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};
