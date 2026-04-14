import { useNavigate } from "react-router-dom";
import { FormCard } from "../../components/FormCard/FormCard";
import { useLines } from "../../hooks/useLines";
import FormButton from "../../Inputs/FormButton";
import InputField from "../../Inputs/InputField";
import SelectField from "../../Inputs/SelectField";
import { useMachineByLine } from "../../hooks/useMachinesByLine";
import { TextareaField } from "../../Inputs/TextareaField";
import { useMaintenanceForm } from "../../hooks/useMaintenanceForm";
import { ClipboardList } from "lucide-react"; // Importamos un icono descriptivo

export const MaintenanceIndex = () => {
  const { lines, loading: linesLoading, error: errorLines } = useLines();
  const navigate = useNavigate();

  const {
    loading: formLoading,
    formData,
    handleChange,
    handleSubmit,
    isEditing,
  } = useMaintenanceForm();

  const { machines, loading: machineLoading } = useMachineByLine(
    formData.idLine,
  );

  const isLoading = formLoading || linesLoading;

  const linesOptions = lines.map((line) => ({
    value: line.id,
    label: line.lineName,
  }));

  const machinesOptions = machines.map((machine) => ({
    value: machine.id,
    label: machine.machine,
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
              Registro de mantenimiento
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Completa la información para generar un reporte
            </p>
          </div>

          <button
            onClick={() => navigate("/mis-solicitudes")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white 
            border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm 
            hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 group
            hover:cursor-pointer"
          >
            <ClipboardList className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span>Mis Reportes</span>
          </button>
        </div>

        <FormCard title="Reporte de falla">
          <div className="grid grid-cols-1 gap-6">
            <form onSubmit={handleSubmit}>
              <InputField
                type="text"
                label="Nombre del solicitante"
                value={formData.applicantName}
                onChange={(e) => handleChange("applicantName", e.target.value)}
              />

              <SelectField
                label="SELECCIONE UNA LINEA"
                value={formData.idLine || ""}
                onChange={(e) => {
                  const newLineId = parseInt(e.target.value) || 0;
                  handleChange("idLine", newLineId);
                  handleChange("idMachine", 0);
                }}
                options={[
                  { value: "", label: "Selecciona una linea" },
                  ...linesOptions,
                ]}
                required
                disabled={isLoading || linesLoading}
                error={errorLines ? "Error cargando líneas" : undefined}
              />

              <SelectField
                label="SELECCIONE UNA MÁQUINA"
                value={formData.idMachine || ""}
                onChange={(e) =>
                  handleChange("idMachine", parseInt(e.target.value) || 0)
                }
                options={[
                  { value: "", label: "Seleccionar una máquina" },
                  ...machinesOptions,
                ]}
                required
                disabled={
                  machineLoading || !formData.idLine || formData.idLine === 0
                }
                error={undefined}
              />

              <TextareaField
                label="Descripción de falla"
                value={formData.lineFaultDescription || ""}
                onChange={(e) =>
                  handleChange("lineFaultDescription", e.target.value)
                }
                required
              />

              <div className="flex gap-2 pt-4">
                <FormButton variant="secondary" onClick={() => navigate("/")}>
                  Cancelar
                </FormButton>
                <FormButton
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isEditing ? "Actualizar registro" : "Guardar registro"}
                </FormButton>
              </div>
            </form>
          </div>
        </FormCard>
      </div>
    </div>
  );
};
