import { useEffect, useState } from "react";
import { maintenanceService } from "../api/services/MaintenanceService";
import type { MonthlyReportItem } from "../types/MonthlyReportItem";

export const useMonthlyReportsMaintenance = () => {
  const [reports, setReports] = useState<MonthlyReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await maintenanceService.getAvailableMontlyReports();
        setReports(data);
      } catch (err: any) {
        setError("Error al obener los reportes disponibles");
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
