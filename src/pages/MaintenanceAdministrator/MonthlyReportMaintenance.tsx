import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { ReportsTable } from "../../components/ReportsTable/ReportsTable";
import { useDownloadReportMaintenance } from "../../hooks/useDownloadReportMaintenance";
import { useMonthlyReportsMaintenance } from "../../hooks/useMonthlyReportsMaintenance";

export const MonthlyReportMaintenance = () => {
  const {
    downloading,
    error: dowloadError,
    downloadReport,
    clearError,
  } = useDownloadReportMaintenance();

  const { reports, loading, error: listError } = useMonthlyReportsMaintenance();

  const combinedError = listError || dowloadError;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Button
            onClick={() => navigate("/dasboard-mantenimiento-admin")}
            variant="info"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 uppercase">
            Reportes mensuales
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between">
              <h2>Lista de reportes mensuales</h2>
            </div>
          </div>
          <div className="p-6">
            <ReportsTable
              reports={reports}
              loading={loading}
              error={combinedError}
              downloadingMonth={downloading}
              onDownload={downloadReport}
              onClearError={clearError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
