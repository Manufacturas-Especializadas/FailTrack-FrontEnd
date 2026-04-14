import {
  ArrowLeft,
  Search,
  Calendar,
  CheckCircle2,
  Clock,
  User,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useMyReports } from "../../hooks/useMyReports";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const MyReportsView = () => {
  const { isAuthenticated } = useAuthContext();
  const {
    reports,
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount,
  } = useMyReports();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div
          className="max-w-md w-full text-center space-y-6 bg-white p-10 
          rounded-3xl shadow-xl border border-slate-100"
        >
          <div
            className="bg-amber-50 w-20 h-20 rounded-2xl flex items-center 
            justify-center mx-auto mb-6"
          >
            <Lock className="w-10 h-10 text-amber-500" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Acceso Restringido
            </h2>
            <p className="text-slate-500">
              Para consultar el historial de reportes, es necesario
              identificarse con el usuario de su línea de producción.
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 
            text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg 
            shadow-blue-100 group hover:cursor-pointer"
          >
            <span>Ir al inicio de sesión</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-slate-400">
            MesaCore FailTrack v1.0 • Sistema Interno
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white rounded-full shadow-sm border 
              border-slate-200 transition-all hover:cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Mis Solicitudes
              </h1>
              <p className="text-slate-500 text-sm">
                Historial de reportes realizados por esta línea
              </p>
            </div>
          </div>

          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 
              text-slate-400 group-focus-within:text-blue-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Buscar por máquina o falla..."
              className="pl-10 pr-4 py-2.5 w-full md:w-80 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-500 font-medium">
                Cargando historial...
              </p>
            </div>
          ) : reports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Folio / Fecha
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Máquina
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Estado
                    </th>
                    {/* <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Técnico / Solución
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {reports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-blue-600">
                          #{report.id}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(report.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-slate-700">
                          {report.machine}
                        </div>
                        <div className="text-xs text-slate-400">
                          {report.line}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 line-clamp-2 max-w-xs">
                          {report.lineDescription || report.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {report.closingDate ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Cerrado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 animate-pulse">
                            <Clock className="w-3.5 h-3.5" />
                            Pendiente
                          </span>
                        )}
                      </td>
                      {/* <td className="px-6 py-4">
                        {report.reponsible ? (
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-slate-700 flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" />
                              {report.reponsible}
                            </div>
                            <div className="text-[11px] text-slate-500 italic line-clamp-1">
                              "{report.solution}"
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-300 italic">
                            Asignación pendiente...
                          </span>
                        )}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-500 font-medium">
                  Mostrando{" "}
                  <span className="text-slate-900">{reports.length}</span> de{" "}
                  <span className="text-slate-900">{totalCount}</span>{" "}
                  resultados
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1 || loading}
                    className="p-2 rounded-lg border border-slate-200 bg-white 
                    hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed 
                    transition-all hover:cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>

                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 rounded-lg text-sm font-bold transition-all hover:cursor-pointer ${
                          currentPage === i + 1
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || loading}
                    className="p-2 rounded-lg border border-slate-200 bg-white 
                    hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed 
                    transition-all hover:cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-20 text-center">
              <div
                className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center 
                justify-center mx-auto mb-4"
              >
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-slate-900 font-bold">
                No se encontraron reportes
              </h3>
              <p className="text-slate-500 text-sm">
                Prueba ajustando los filtros de búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
