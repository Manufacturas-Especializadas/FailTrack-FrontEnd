import { useEffect, useState } from "react";
import type { Machines } from "../types/Machines";
import { generalListService } from "../api/services/GeneralListService";
import toast from "react-hot-toast";

export const useMachineByLine = (lineId: number) => {
  const [machines, setMachines] = useState<Machines[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lineId || lineId === 0) {
      setMachines([]);

      return;
    }

    const fetchMachines = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await generalListService.getMachineByLine(lineId);
        setMachines(data);
      } catch (err: any) {
        setError("Error al cargar las máquinas");
        toast.error("No se pudieron cargar las máquinas de esta líneas");
        setMachines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, [lineId]);

  return {
    machines,
    loading,
    error,
  };
};
