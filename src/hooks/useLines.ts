import { useCallback, useEffect, useState } from "react";
import type { Lines } from "../types/Lines";
import { generalListService } from "../api/services/GeneralListService";

export const useLines = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<Lines[]>([]);

  const getLines = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await generalListService.getLines();
      setLines(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar las líenas";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLines();
  }, [getLines]);

  return {
    lines,
    loading,
    error,
    refresh: getLines,
  };
};
