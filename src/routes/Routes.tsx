import { Route, Routes } from "react-router-dom";
import { MaintenanceIndex } from "../pages/Maintenance/MaintenanceIndex";
import { Home } from "../pages/Home/Home";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mantenimiento" element={<MaintenanceIndex />} />
    </Routes>
  );
};
