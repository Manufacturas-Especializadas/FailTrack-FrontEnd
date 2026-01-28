import { useCallback, useEffect, useState } from "react";
import type { Ticket } from "../types/Ticket";
import { maintenanceService } from "../api/services/MaintenanceService";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
} from "@microsoft/signalr";
import { API_CONFIG } from "../config/api";

export const useTickets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTicket] = useState<Ticket[]>([]);

  const getTickets = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const data = await maintenanceService.getMaintenanceList();
      setTicket(data);
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
          console.log("🟢 Conectado a SignalR en: " + API_CONFIG.hubUrl);
        }
      } catch (err) {
        console.error("🔴 Error conectando a SignalR:", err);
        setTimeout(startConnection, 5000);
      }
    };

    startConnection();

    connection.on("ReceiveUpdate", () => {
      console.log("🔔 Notificación recibida: Actualizando datos...");
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
