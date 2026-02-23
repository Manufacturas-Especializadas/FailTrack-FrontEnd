import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Maintenance } from "../types/Maintenance";
import { maintenanceService } from "../api/services/MaintenanceService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UseMaintenanceFormReturn {
  loading: boolean;
  error: string | null;
  formData: Maintenance;
  handleChange: (field: keyof Maintenance, value: string | number) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  resetForm: () => void;
  validateForm: () => boolean;
  isEditing: boolean;
}

const initialFormData: Maintenance = {
  applicantName: "",
  faultDescription: "",
  failureSolution: "",
  lineFaultDescription: "",
  responsible: "",
  idLine: 0,
  idMachine: 0,
  idStatus: 1,
};

export const useMaintenanceForm = (
  onSuccess?: () => void,
  editId?: number,
): UseMaintenanceFormReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalStatus, setOriginalStatus] = useState<number | null>(null);
  const [formData, setFormData] = useState<Maintenance>(initialFormData);
  const navigate = useNavigate();

  useEffect(() => {
    if (editId) {
      const loadData = async () => {
        setLoading(true);
        try {
          const response = await maintenanceService.getMaintenanceById(editId);
          setFormData({
            applicantName: response.applicantName,
            faultDescription: response.faultDescription,
            failureSolution: response.failureSolution,
            lineFaultDescription: response.lineFaultDescription,
            responsible: response.responsible,
            idLine: response.idLine,
            idMachine: response.idMachine,
            idStatus: response.idStatus,
          });
          setOriginalStatus(response.idStatus);
        } catch (err: any) {
          toast.error("Error al cargar los datos del registro");
          navigate("/");
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [editId, navigate]);

  const handleChange = useCallback(
    (field: keyof Maintenance, value: string | number) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (error) setError(null);
    },
    [error],
  );

  const validateForm = useCallback((): boolean => {
    const errors: string[] = [];

    if (!formData.applicantName.trim()) errors.push("El nombre es requerido");
    if (Number(formData.idLine) === 0)
      errors.push("Debe seleccionar una línea");
    if (Number(formData.idMachine) === 0)
      errors.push("Debe seleccionar una máquina");

    if (errors.length > 0) {
      const errorMessage = errors.join(". ");
      setError(errorMessage);
      toast.error(errors.join("\n"));
      return false;
    }

    return true;
  }, [formData]);

  const validateClosingFields = (): boolean => {
    const errors: string[] = [];

    const newStatus = Number(formData.idStatus);

    if (originalStatus === null) return true;

    const isTransitioningToResolved = newStatus === 3 && originalStatus !== 3;

    if (!isTransitioningToResolved) return true;

    if (!formData.faultDescription?.trim())
      errors.push("Falta el Reporte Técnico");

    if (!formData.responsible?.trim())
      errors.push("Falta indicar quién solucionó la falla");

    if (!formData.failureSolution?.trim())
      errors.push("Falta describir la solución de la falla");

    if (errors.length > 0) {
      toast.error(
        <div>
          <strong>No puedes marcar como Resuelto.</strong>
          <ul className="mt-2 list-disc list-inside text-sm">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>,
      );
      return false;
    }

    return true;
  };

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setError(null);
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      if (!validateClosingFields()) return;

      setLoading(true);
      setError(null);
      const actionText = editId ? "Actualizando..." : "Registrando...";
      const loadingToast = toast.loading(actionText);

      try {
        const payload = { ...formData };

        delete (payload as any).updatedAt;

        payload.idLine = Number(payload.idLine);
        payload.idMachine = Number(payload.idMachine);
        payload.idStatus = Number(payload.idStatus);

        if (!editId) {
          payload.idStatus = 1;
        }

        let response;
        if (editId) {
          response = await maintenanceService.update(payload, editId);
        } else {
          response = await maintenanceService.create(payload);
        }

        if (response.success) {
          toast.dismiss(loadingToast);
          toast.success(response.message || "Operación exitosa");

          if (!editId) resetForm();
          if (onSuccess) onSuccess();
        }
      } catch (err: any) {
        toast.dismiss(loadingToast);
        const errorMessage = err.message || "Ocurrió un error inesperado";

        toast.error(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [formData, validateForm, onSuccess, editId, resetForm],
  );

  return {
    loading,
    error,
    formData,
    handleChange,
    handleSubmit,
    resetForm,
    validateForm,
    isEditing: !!editId,
  };
};
