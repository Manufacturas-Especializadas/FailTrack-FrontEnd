import { API_CONFIG } from "../../config/api";
import type { Tooling } from "../../types/Tooling";
import { apiClient } from "../client";

interface Response {
  success: boolean;
  message: string;
}

class ToolingService {
  private getToolingByIdEndpoint = API_CONFIG.endpoints.tooling.getToolingById;
  private createEndpoint = API_CONFIG.endpoints.tooling.create;
  private updateEndpoint = API_CONFIG.endpoints.tooling.update;

  async getToolingById(id: number): Promise<Tooling> {
    return apiClient.get(`${this.getToolingByIdEndpoint}${id}`);
  }

  async create(formData: Tooling): Promise<Response> {
    return apiClient.post<Response>(this.createEndpoint, formData);
  }

  async update(formData: Tooling, id: number): Promise<Response> {
    return apiClient.put<Response>(`${this.updateEndpoint}${id}`, formData);
  }
}

export const toolingService = new ToolingService();
