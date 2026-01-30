import { useEffect, useState } from "react";
import type { MonthlyReportItem } from "../types/MonthlyReportItem";
import { toolingService } from "../api/services/ToolingService";

export const useMonthlyReportsTooling = () => {
  const [reports, setReports] = useState<MonthlyReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await toolingService.getAvailableMontlyReports();
        setReports(data);
      } catch (err: any) {
        setError("Error al obtener los reportes disponibles");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
  };
};
