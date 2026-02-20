import {
  AlertCircle,
  CheckCircle2,
  Clock,
  PlayCircle,
  Settings,
  User,
} from "lucide-react";
import type { Ticket } from "../../types/Ticket";
import { formatDateTime } from "../../utils/dateFormatter";

const statusConfig = {
  Enviada: {
    color: "bg-blue-50 border-blue-200",
    headerColor: "bg-blue-600",
    textColor: "text-blue-700",
    icon: AlertCircle,
    label: "Solicitudes Enviadas",
  },
  "En proceso": {
    color: "bg-orange-50 border-orange-200",
    headerColor: "bg-orange-500",
    textColor: "text-orange-700",
    icon: PlayCircle,
    label: "En Reparación",
  },
  Resuelto: {
    color: "bg-emerald-50 border-emerald-200",
    headerColor: "bg-emerald-600",
    textColor: "text-emerald-700",
    icon: CheckCircle2,
    label: "Completados",
  },
};

interface StatusColumnProps {
  status: "Enviada" | "En proceso" | "Resuelto";
  tickets: Ticket[];
  onCardClick: (id: number) => void;
}

const StatusColumn = ({ status, tickets, onCardClick }: StatusColumnProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div
        className={`${config.headerColor} p-4 text-white flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <Icon size={24} className="text-white" />
          <h2 className="text-xl font-bold uppercase tracking-wide">
            {config.label}
          </h2>
        </div>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
          {tickets.length}
        </span>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50/50">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => onCardClick(ticket.id)}
            className={`cursor-pointer relative p-5 rounded-xl border-l-4 shadow-sm bg-white 
      hover:shadow-md transition-all duration-300 active:scale-[0.98]
      ${config.color.replace("bg-", "border-l-")} 
      border-y border-r border-gray-200`}
          >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 text-gray-700 font-bold text-lg min-w-0">
                <Settings size={18} className="text-gray-400 shrink-0" />
                <span className="truncate">{ticket.lineName}</span>
                <span className="text-gray-300">|</span>
                <span className="text-xs font-mono text-gray-400 truncate">
                  {ticket.machineName}
                </span>
              </div>
            </div>

            <p
              className="text-sm text-gray-600 line-clamp-2 mb-3"
              title={ticket.descriptionLine}
            >
              {ticket.descriptionLine}
            </p>

            <p
              className="text-gray-800 text-base font-medium leading-snug mb-4 line-clamp-2"
              title={ticket.description}
            >
              {ticket.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm min-w-0">
                <User size={16} />
                <span className="font-medium truncate">
                  {ticket.applicantName}
                </span>
              </div>

              <div className="flex items-center gap-1 text-gray-400 text-xs shrink-0">
                <Clock size={14} />
                <time className="font-mono">
                  {formatDateTime(ticket.closingDate ?? ticket.date)}
                </time>
              </div>
            </div>
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="text-center py-10 text-gray-400 italic">
            No hay solicitudes en este estado
          </div>
        )}
      </div>
    </div>
  );
};

export const StatusBoard = ({
  tickets,
  onCardClick,
}: {
  tickets: Ticket[];
  onCardClick: (id: number) => void;
}) => {
  const sentTickets = tickets.filter((t) => t.status === "Enviada");
  const processTickets = tickets.filter((t) => t.status === "En proceso");
  const solvedTickets = tickets.filter((t) => t.status === "Resuelto");

  return (
    <div className="p-6 h-full w-full bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <StatusColumn
          status="Enviada"
          tickets={sentTickets}
          onCardClick={onCardClick}
        />
        <StatusColumn
          status="En proceso"
          tickets={processTickets}
          onCardClick={onCardClick}
        />
        <StatusColumn
          status="Resuelto"
          tickets={solvedTickets}
          onCardClick={onCardClick}
        />
      </div>
    </div>
  );
};
