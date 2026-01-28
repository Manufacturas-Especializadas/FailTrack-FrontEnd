import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Tooling } from "../types/Tooling";
import { useNavigate } from "react-router-dom";
import { toolingService } from "../api/services/ToolingService";
import toast from "react-hot-toast";

interface UseToolingFormReturn {
  loading: boolean;
  error: string | null;
  formData: Tooling;
  handleChange: (field: keyof Tooling, value: string | number) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  resetForm: () => void;
  validateForm: () => boolean;
  isEditing: boolean;
}

const initialFormData: Tooling = {
  applicantName: "",
  faultDescription: "",
  idLine: 0,
  idMachine: 0,
  idStatus: 1,
  updatedAt: "",
};

export const useToolingForm = (
  onSuccess?: () => void,
  editId?: number,
): UseToolingFormReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Tooling>(initialFormData);
  const navigate = useNavigate();

  useEffect(() => {
    if (editId) {
      const loadData = async () => {
        setLoading(true);

        try {
          const response = await toolingService.getToolingById(editId);
          setFormData({
            applicantName: response.applicantName,
            faultDescription: response.faultDescription,
            idLine: response.idLine,
            idMachine: response.idMachine,
            idStatus: response.idStatus,
            updatedAt: response.updatedAt,
          });
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
    (field: keyof Tooling, value: string | number) => {
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

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setError(null);
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

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
          response = await toolingService.update(payload, editId);
        } else {
          response = await toolingService.create(payload);
        }

        if (response.success) {
          toast.dismiss(loadingToast);
          toast.success(response.message || "Operación exitosa");

          if (!editId) resetForm();
          if (onSuccess) onSuccess();

          setTimeout(() => {
            navigate("/");
          }, 5000);
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
