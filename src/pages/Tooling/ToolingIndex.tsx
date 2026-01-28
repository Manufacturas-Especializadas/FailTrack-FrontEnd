import { FormCard } from "../../components/FormCard/FormCard";
import InputField from "../../Inputs/InputField";

export const ToolingIndex = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 uppercase mt-2">
          Registro de herramentales
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Completa la información para generar un reporte
        </p>
      </div>

      <FormCard title="Reporte de problemas con herramentales">
        <div className="grid grid-cols-1 gap-6">
          <form>
            <InputField type="text" label="Nombre del solicitante" />
          </form>
        </div>
      </FormCard>
    </div>
  );
};
