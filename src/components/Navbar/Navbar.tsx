import { useAuthContext } from "../../context/AuthContext";
import Logo from "../../assets/images/logomesa.png";
import { LogOut, UserCircle } from "lucide-react"; // Añadí UserCircle para el icono de login
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthContext();

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white/80 
      backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="p-1 rounded-lg transition-colors group-hover:bg-slate-50">
              <img
                src={Logo}
                alt="MESA logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="hidden md:block h-6 w-px bg-slate-200" />
            <h1 className="text-lg font-semibold tracking-tight text-slate-800">
              FAIL<span className="text-blue-600">TRACK</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Línea Activa
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 px-3 py-0.5 rounded-full text-sm font-bold border border-blue-100">
                      {user.username}
                    </span>
                  </div>
                </div>

                <div className="h-8 w-px bg-slate-200 mx-1" />

                <button
                  onClick={logout}
                  className="group flex items-center gap-2 p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 hover:cursor-pointer"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  <span className="text-sm font-medium hidden sm:inline">
                    Salir
                  </span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 
                hover:bg-slate-100 transition-all duration-200 font-medium text-sm
                hover:cursor-pointer"
              >
                <UserCircle className="w-5 h-5" />
                <span>Iniciar sesión</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
