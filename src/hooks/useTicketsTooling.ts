import { useCallback, useEffect, useState } from "react";
import type { TicketsTooling } from "../types/TicketsTooling";
import { toolingService } from "../api/services/ToolingService";

export const useTicketsTooling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<TicketsTooling[]>([]);

  const getTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await toolingService.getToolingList();
      setTickets(data);
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
