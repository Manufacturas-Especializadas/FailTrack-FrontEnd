import { Route, Routes } from "react-router-dom";
import { MaintenanceIndex } from "../pages/Maintenance/MaintenanceIndex";
import { Home } from "../pages/Home/Home";
import { DashboardMaintenance } from "../pages/MaintenanceAdministrator/DashboardMaintenance";
import { ToolingIndex } from "../pages/Tooling/ToolingIndex";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mantenimiento" element={<MaintenanceIndex />} />

      <Route
        path="/dasboard-mantenimiento-admin"
        element={<DashboardMaintenance />}
      />

      <Route path="/herramentales" element={<ToolingIndex />} />
    </Routes>
  );
};
