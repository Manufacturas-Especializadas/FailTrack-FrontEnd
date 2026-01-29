import { Hammer, Wrench } from "lucide-react";
import { NavCard } from "../../components/NavCard/NavCard";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            Portal de Operaciones
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Selecciona el módulo al que deseas ingresar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NavCard
            title="Mantenimiento"
            description="Reporte de fallas de mantenimiento"
            path="/mantenimiento"
            icon={Wrench}
            variant="blue"
          />

          <NavCard
            title="Herramentales"
            description="Reporte de problemas de herramentales"
            path="/herramentales"
            icon={Hammer}
            variant="orange"
          />
        </div>
      </div>
    </div>
  );
};
