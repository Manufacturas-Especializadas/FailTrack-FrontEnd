const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  hubUrl: `${API_BASE_URL.replace("/api", "")}/machineHub`,
  endpoints: {
    maintenance: {
      getMaintenanceList: "/api/Maintenance/GetMaintenanceList",
      getMaintenanceById: "/api/Maintenance/GetMaintenanceById/",
      getAvailableMonthlyReports: "/api/Maintenance/GetAvailableMonthlyReports",
      create: "/api/Maintenance/Create",
      update: "/api/Maintenance/Update/",
    },
    tooling: {
      getToolingById: "/api/Tooling/GetTooling/",
      getToolingList: "/api/Tooling/GetToolingList",
      create: "/api/Tooling/Create",
      update: "/api/Tooling/Update/",
    },
    generalList: {
      getStatus: "/api/GeneralList/GetStatus",
      getLines: "/api/GeneralList/GetLines",
      getMachinesByLine: "/api/GeneralList/GetMachineByLine/",
    },
  },
};
