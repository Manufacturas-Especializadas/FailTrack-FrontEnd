import { API_CONFIG } from "../../config/api";
import type { MonthlyReportItem } from "../../types/MonthlyReportItem";
import type { TicketsTooling } from "../../types/TicketsTooling";
import type { Tooling } from "../../types/Tooling";
import { apiClient } from "../client";

interface Response {
  success: boolean;
  message: string;
}

class ToolingService {
  private getToolingListEndpoint = API_CONFIG.endpoints.tooling.getToolingList;
  private getToolingByIdEndpoint = API_CONFIG.endpoints.tooling.getToolingById;
  private getAvailableMontlyReportsEndpoint =
    API_CONFIG.endpoints.tooling.getAvailableMonthlyReports;
  private createEndpoint = API_CONFIG.endpoints.tooling.create;
  private updateEndpoint = API_CONFIG.endpoints.tooling.update;

  async getToolingList(): Promise<TicketsTooling[]> {
    return apiClient.get<TicketsTooling[]>(this.getToolingListEndpoint);
  }

  async getToolingById(id: number): Promise<Tooling> {
    return apiClient.get(`${this.getToolingByIdEndpoint}${id}`);
  }

  async getAvailableMontlyReports(): Promise<MonthlyReportItem[]> {
    return apiClient.get<MonthlyReportItem[]>(
      this.getAvailableMontlyReportsEndpoint,
    );
  }

  async create(formData: Tooling): Promise<Response> {
    return apiClient.post<Response>(this.createEndpoint, formData);
  }

  async update(formData: Tooling, id: number): Promise<Response> {
    return apiClient.put<Response>(`${this.updateEndpoint}${id}`, formData);
  }
}

export const toolingService = new ToolingService();
