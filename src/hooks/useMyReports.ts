import { useState, useEffect, useMemo } from "react";
import type { Reports } from "../types/MyReports";
import toast from "react-hot-toast";
import { maintenanceService } from "../api/services/MaintenanceService";

export const useMyReports = () => {
  const [reports, setReports] = useState<Reports[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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
        report.id.toString().includes(searchTerm),
    );
  }, [reports, searchTerm]);

  const totalPages = Math.ceil(filteredReports.length / rowsPerPage);

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredReports.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredReports, currentPage, rowsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return {
    reports: paginatedReports,
    totalCount: filteredReports.length,
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    refresh: fetchReports,
  };
};
