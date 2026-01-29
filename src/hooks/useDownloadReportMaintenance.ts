import { useState } from "react";
import { maintenanceService } from "../api/services/MaintenanceService";

export const useDownloadReportMaintenance = () => {
  const [downloading, setDownloading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const downloadReport = async (year: number, month: number) => {
    try {
      setDownloading(month);
      setError(null);
      await maintenanceService.downloadReport(year, month);
    } catch (err: any) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Hubo un error descargando el archivo";
      setError(errorMessage);
      console.error("Download error: ", err);
    } finally {
      setDownloading(null);
    }
  };

  const clearError = () => setError(null);

  return {
    downloading,
    error,
    downloadReport,
    clearError,
  };
};
