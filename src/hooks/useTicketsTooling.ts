import { useCallback, useEffect, useState } from "react";
import type { TicketsTooling } from "../types/TicketsTooling";
import { toolingService } from "../api/services/ToolingService";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
} from "@microsoft/signalr";
import { API_CONFIG } from "../config/api";

export const useTicketsTooling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<TicketsTooling[]>([]);

  const getTickets = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const data = await toolingService.getToolingList();
      setTickets(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar la lista";
      setError(message);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTickets(true);
  }, [getTickets]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(API_CONFIG.hubUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    const startConnection = async () => {
      try {
        if (connection.state === HubConnectionState.Disconnected) {
          await connection.start();
          console.log("🛠️ Tooling conectado a SignalR");
        }
      } catch (err) {
        console.error("Error conectando SignalR (Tooling):", err);
        setTimeout(startConnection, 5000);
      }
    };

    startConnection();

    connection.on("ReceiveUpdate", () => {
      console.log("🛠️ Actualización de Herramentales recibida");
      getTickets(false);
    });

    return () => {
      connection.stop();
    };
  }, [getTickets]);

  return {
    tickets,
    loading,
    error,
    refresh: () => getTickets(true),
  };
};
