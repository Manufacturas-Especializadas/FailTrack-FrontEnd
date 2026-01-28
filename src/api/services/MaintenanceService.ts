import { API_CONFIG } from "../../config/api";
import type { Maintenance } from "../../types/Maintenance";
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
  private createEndpoint = API_CONFIG.endpoints.maintenance.create;
  private updateEndpoint = API_CONFIG.endpoints.maintenance.update;

  async getMaintenanceList(): Promise<Ticket[]> {
    return apiClient.get<Ticket[]>(this.getMaintenanceListEndpoint);
  }

  async getMaintenanceById(id: number): Promise<Maintenance> {
    return apiClient.get(`${this.getMaintenanceByIdEndpoint}${id}`);
  }

  async create(formData: Maintenance): Promise<ApiResponse> {
    return apiClient.post<ApiResponse>(this.createEndpoint, formData);
  }

  async update(formData: Maintenance, id: number): Promise<ApiResponse> {
    return apiClient.put<ApiResponse>(`${this.updateEndpoint}${id}`, formData);
  }
}

export const maintenanceService = new MaintenanceService();
