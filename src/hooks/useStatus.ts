import { useCallback, useEffect, useState } from "react";
import type { Status } from "../types/Status";
import { generalListService } from "../api/services/GeneralListService";

export const useStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status[]>([]);

  const getStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await generalListService.getStatus();
      setStatus(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar los status";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return {
    status,
    loading,
    error,
  };
};
