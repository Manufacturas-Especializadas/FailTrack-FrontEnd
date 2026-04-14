import { useState, useEffect, useMemo } from "react";
import type { Reports } from "../types/MyReports";
import toast from "react-hot-toast";
import { maintenanceService } from "../api/services/MaintenanceService";

export const useMyReports = () => {
  const [reports, setReports] = useState<Reports[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await maintenanceService.getMyReports();
      setReports(data);
    } catch (error: any) {
      toast.error(error.message || "Error al cargar reportes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter(
      (report) =>
        report.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toString().includes(searchTerm),
    );
  }, [reports, searchTerm]);

  return {
    reports: filteredReports,
    loading,
    searchTerm,
    setSearchTerm,
    refresh: fetchReports,
  };
};
