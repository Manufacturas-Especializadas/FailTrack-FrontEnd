import { useNavigate } from "react-router-dom";
import { FormCard } from "../../components/FormCard/FormCard";
import { useLines } from "../../hooks/useLines";
import { useMachineByLine } from "../../hooks/useMachinesByLine";
import { useToolingForm } from "../../hooks/useToolingForm";
import InputField from "../../Inputs/InputField";
import FormButton from "../../Inputs/FormButton";
import SelectField from "../../Inputs/SelectField";
import { Toaster } from "react-hot-toast";

export const ToolingIndex = () => {
  const { lines, loading: linesLoading, error: errorLines } = useLines();

  const {
    loading: formLoading,
    formData,
    handleChange,
    handleSubmit,
    isEditing,
  } = useToolingForm();

  const { machines, loading: machineLoading } = useMachineByLine(
    formData.idLine,
  );

  const navigate = useNavigate();

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
    <div className="max-w-2xl mx-auto space-y-6">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            background: "#363636",
            color: "#fff",
            zIndex: 9999,
          },
          success: {
            duration: 10000,
            position: "top-right",
            style: {
              background: "#10B981",
              color: "#fff",
            },
          },
          error: {
            duration: 5000,
            position: "top-right",
            style: {
              background: "#EF4444",
              color: "#fff",
            },
          },
          loading: {
            duration: Infinity,
            position: "top-right",
            style: {
              background: "#3B82F6",
              color: "#fff",
            },
          },
        }}
      />
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
                { value: "", label: "Seleccionar un turno" },
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

            <div className="flex gap-2 pt-4">
              <FormButton variant="secondary" onClick={() => navigate("/")}>
                Cancelar
              </FormButton>
              <FormButton variant="primary" type="submit">
                {isEditing ? "Actualizar registro" : "Guardar registro"}
              </FormButton>
            </div>
          </form>
        </div>
      </FormCard>
    </div>
  );
};
