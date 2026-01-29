import { API_CONFIG } from "../../config/api";
import type { Maintenance } from "../../types/Maintenance";
import type { MonthlyReportItem } from "../../types/MonthlyReportItem";
import type { Ticket } from "../../types/Ticket";
import { apiClient } from "../client";

export interface ApiResponse {
  success: boolean;
  message: string;
}

class MaintenanceService {
  private getMaintenanceListEndpoint =
    API_CONFIG.endpoints.maintenance.getMaintenanceList;
  private getMaintenanceByIdEndpoint =
    API_CONFIG.endpoints.maintenance.getMaintenanceById;
  private getAvailableMontlyReportsEndpoint =
    API_CONFIG.endpoints.maintenance.getAvailableMonthlyReports;
  private downloadReportEndpoint =
    API_CONFIG.endpoints.maintenance.downloadMonthlyReport;
  private createEndpoint = API_CONFIG.endpoints.maintenance.create;
  private updateEndpoint = API_CONFIG.endpoints.maintenance.update;

  async getMaintenanceList(): Promise<Ticket[]> {
    return apiClient.get<Ticket[]>(this.getMaintenanceListEndpoint);
  }

  async getMaintenanceById(id: number): Promise<Maintenance> {
    return apiClient.get(`${this.getMaintenanceByIdEndpoint}${id}`);
  }

  async getAvailableMontlyReports(): Promise<MonthlyReportItem[]> {
    return apiClient.get<MonthlyReportItem[]>(
      this.getAvailableMontlyReportsEndpoint,
    );
  }

  async downloadReport(year: number, month: number): Promise<void> {
    const endpoint = `${this.downloadReportEndpoint}?year=${year}&month=${month}`;

    const monthName = new Date(year, month - 1).toLocaleString("es-Mx", {
      month: "long",
    });

    const formattedMonth =
      monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const fileName = `Reporte_Mensual_${formattedMonth}_${year}.xlsx`;

    return apiClient.downloadFile(endpoint, fileName);
  }

  async create(formData: Maintenance): Promise<ApiResponse> {
    return apiClient.post<ApiResponse>(this.createEndpoint, formData);
  }

  async update(formData: Maintenance, id: number): Promise<ApiResponse> {
    return apiClient.put<ApiResponse>(`${this.updateEndpoint}${id}`, formData);
  }
}

export const maintenanceService = new MaintenanceService();
