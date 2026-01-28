import { API_CONFIG } from "../../config/api";
import type { Tooling } from "../../types/Tooling";
import { apiClient } from "../client";

interface Response {
  success: boolean;
  message: string;
}

class ToolingService {
  private createEndpoint = API_CONFIG.endpoints.tooling.create;

  async create(formData: Tooling): Promise<Response> {
    return apiClient.post<Response>(this.createEndpoint, formData);
  }
}

export const toolingService = new ToolingService();
