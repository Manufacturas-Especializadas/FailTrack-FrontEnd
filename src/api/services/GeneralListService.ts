import { API_CONFIG } from "../../config/api";
import type { Lines } from "../../types/Lines";
import type { Machines } from "../../types/Machines";
import { apiClient } from "../client";

class GeneralListService {
  private getListEndpoint = API_CONFIG.endpoints.generalList.getLines;
  private getMachineByLineEndpoint =
    API_CONFIG.endpoints.generalList.getMachinesByLine;

  async getLines(): Promise<Lines[]> {
    return apiClient.get<Lines[]>(this.getListEndpoint);
  }

  async getMachineByLine(id: number): Promise<Machines[]> {
    return apiClient.get<Machines[]>(`${this.getMachineByLineEndpoint}${id}`);
  }
}

export const generalListService = new GeneralListService();
