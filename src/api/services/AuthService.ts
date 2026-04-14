import { API_CONFIG } from "../../config/api";
import type { Login } from "../../types/Login";
import type { Register } from "../../types/Register";
import { apiClient } from "../client";

class AuthService {
  private registerEndpoint = API_CONFIG.endpoints.auth.register;
  private loginEndpoint = API_CONFIG.endpoints.auth.login;

  async register(data: Register): Promise<void> {
    return apiClient.post(this.registerEndpoint, data);
  }

  async login(data: Login): Promise<string> {
    return apiClient.post<string>(this.loginEndpoint, data);
  }
}

export const authService = new AuthService();
