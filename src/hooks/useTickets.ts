import { useCallback, useEffect, useState } from "react";
import type { Ticket } from "../types/Ticket";
import { maintenanceService } from "../api/services/MaintenanceService";

export const useTickets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTicket] = useState<Ticket[]>([]);

  const getTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await maintenanceService.getMaintenanceList();
      setTicket(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar la lista";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return {
    tickets,
    loading,
    error,
    refresh: getTickets,
  };
};
