import { API_CONFIG } from "../../config/api";
import type { Lines } from "../../types/Lines";
import type { Machines } from "../../types/Machines";
import type { Status } from "../../types/Status";
import { apiClient } from "../client";

class GeneralListService {
  private getStatusEndpoint = API_CONFIG.endpoints.generalList.getStatus;
  private getListEndpoint = API_CONFIG.endpoints.generalList.getLines;
  private getMachineByLineEndpoint =
    API_CONFIG.endpoints.generalList.getMachinesByLine;

  async getLines(): Promise<Lines[]> {
    return apiClient.get<Lines[]>(this.getListEndpoint);
  }

  async getMachineByLine(id: number): Promise<Machines[]> {
    return apiClient.get<Machines[]>(`${this.getMachineByLineEndpoint}${id}`);
  }

  async getStatus(): Promise<Status[]> {
    return apiClient.get<Status[]>(this.getStatusEndpoint);
  }
}

export const generalListService = new GeneralListService();
