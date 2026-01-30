import { Activity, FileText, LayoutGrid } from "lucide-react";
import { useTicketsTooling } from "../../hooks/useTicketsTooling";
import { useState } from "react";
import { useCurrentTime } from "../../hooks/useCurrentTime";
import { StatusBoard } from "../../components/StatusBoard/StatusBoard";
import { EditTicketToolingModal } from "../../components/EditTicketToolingModal/EditTicketToolingModal";
import { Toaster } from "react-hot-toast";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export const DasboardTooling = () => {
  const { tickets, loading, refresh } = useTicketsTooling();

  const currentTime = useCurrentTime();

  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicketId(null);
  };

  const handleSuccess = () => {
    refresh();
    handleCloseModal();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            background: "#363636",
            color: "#fff",
            zIndex: 9999,
          },
          success: {
            duration: 10000,
            position: "top-right",
            style: {
              background: "#10B981",
              color: "#fff",
            },
          },
          error: {
            duration: 5000,
            position: "top-right",
            style: {
              background: "#EF4444",
              color: "#fff",
            },
          },
          loading: {
            duration: Infinity,
            position: "top-right",
            style: {
              background: "#3B82F6",
              color: "#fff",
            },
          },
        }}
      />
      <header className="bg-primary text-white shadow-sm z-10 shrink-0">
        <div className="px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <LayoutGrid size={24} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase">
                Monitor de herramentales
              </h1>
              <div className="flex items-center gap-2 text-blue-100 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                SISTEMA EN LÍNEA
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4 text-sm border-r border-white/20 pr-6">
              <div className="text-center">
                <span className="block font-bold text-lg leading-none">
                  {tickets.length}
                </span>
                <span className="text-blue-100">Solicitudes</span>{" "}
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-mono font-bold leading-none tracking-wider">
                {currentTime}
              </div>
              <p className="text-blue-100">
                {new Date().toLocaleDateString([], {
                  day: "numeric",
                  month: "long",
                  weekday: "long",
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative flex flex-col">
        {loading ? (
          <div className="flex h-full items-center justify-center text-gray-500 gap-2">
            <Activity className="animate-spin" /> Cargando datos...
          </div>
        ) : (
          <>
            <div className="px-6 pt-4 shrink-0 flex justify-end">
              <Button
                className="flex items-center gap-2"
                variant="success"
                size="md"
                onClick={() => navigate("/reporte-mensual-tooling")}
              >
                <FileText size={16} />
                Reportes
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <StatusBoard tickets={tickets} onCardClick={handleCardClick} />
            </div>
          </>
        )}
      </main>

      {isModalOpen && (
        <EditTicketToolingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          ticketId={selectedTicketId}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};
