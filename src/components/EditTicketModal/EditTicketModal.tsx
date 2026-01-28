import { useEffect } from "react";
import { useLines } from "../../hooks/useLines";
import { useMaintenanceForm } from "../../hooks/useMaintenanceForm";
import { Save, X } from "lucide-react";
import SelectField from "../../Inputs/SelectField";
import InputField from "../../Inputs/InputField";
import { useStatus } from "../../hooks/useStatus";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ticketId: number | null;
  onSuccess: () => void;
}

export const EditTicketModal = ({
  isOpen,
  onClose,
  ticketId,
  onSuccess,
}: Props) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading: formLoading,
    resetForm,
  } = useMaintenanceForm(onSuccess, ticketId || undefined);

  const { lines } = useLines();

  const { status } = useStatus();

  const statusOptions = status.map((sta) => ({
    value: sta.id,
    label: sta.status,
  }));

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all scale-100">
        <div className="bg-[#0099cc] p-4 justify-between items-center text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="bg-white/20 p-1">#{ticketId}</span>
            Gestionar solicitud
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-full transition-colors hover:cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Solicitante"
                value={formData.applicantName}
                onChange={(e) => handleChange("applicantName", e.target.value)}
                disabled
              />

              <SelectField
                label="Línea"
                value={formData.idLine}
                onChange={() => {}}
                options={lines.map((l) => ({ value: l.id, label: l.lineName }))}
                disabled
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold border-b border-gray-200 pb-2">
                <SettingsIcon /> Zona de Técnico
              </div>

              <SelectField
                label="Estatus Actual"
                value={formData.idStatus || "Enviada"}
                onChange={(e) => handleChange("idStatus", e.target.value)}
                options={[
                  { value: "", label: "Seleccionar un status" },
                  ...statusOptions,
                ]}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reporte Técnico / Solución
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:outline-none 
                  focus:border-blue-500 focus:ring-blue-500 min-h-25 p-3 text-sm"
                  placeholder="Describe qué falló y cómo se solucionó..."
                  value={formData.faultDescription || ""}
                  onChange={(e) =>
                    handleChange("faultDescription", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                border-gray-300 rounded-lg hover:bg-gray-50 hover:cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg 
                hover:bg-blue-700 flex items-center gap-2 hover:cursor-pointer"
              >
                {formLoading ? (
                  "Guardando..."
                ) : (
                  <>
                    <Save size={16} /> Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SettingsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
