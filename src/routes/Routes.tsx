import { Route, Routes } from "react-router-dom";
import { MaintenanceIndex } from "../pages/Maintenance/MaintenanceIndex";
import { Home } from "../pages/Home/Home";
import { DashboardMaintenance } from "../pages/MaintenanceAdministrator/DashboardMaintenance";
import { ToolingIndex } from "../pages/Tooling/ToolingIndex";
import { DasboardTooling } from "../pages/ToolingAdministrator/DasboardTooling";
import { MonthlyReportMaintenance } from "../pages/MaintenanceAdministrator/MonthlyReportMaintenance";
import { MonthlyReportTooling } from "../pages/ToolingAdministrator/MonthlyReportTooling";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mantenimiento" element={<MaintenanceIndex />} />

      <Route
        path="/dasboard-mantenimiento-admin"
        element={<DashboardMaintenance />}
      />

      <Route
        path="/reporte-mensual-mentenimiento"
        element={<MonthlyReportMaintenance />}
      />

      <Route path="/herramentales" element={<ToolingIndex />} />

      <Route path="/dasboard-tooling-admin" element={<DasboardTooling />} />

      <Route
        path="/reporte-mensual-tooling"
        element={<MonthlyReportTooling />}
      />
    </Routes>
  );
};
