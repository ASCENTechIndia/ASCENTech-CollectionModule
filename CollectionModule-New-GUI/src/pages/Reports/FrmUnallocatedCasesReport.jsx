import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import DataTable from "../../components/DataTable";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/useNotification";
import { useLoader } from "../../context/LoaderContext";

function FrmUnallocatedCasesReport() {
  const { user } = useAuth();
  const { setLoader } = useLoader();

  const { showError, showSuccess } = useNotification();

  const brid = user?.brid ? String(user.brid) : "";
  const branchName = user?.branchName ? String(user.branchName) : "";

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastFetchKeyRef = useRef("");

  // Column definitions with custom renderers
  const columns = [
    {
      key: "accountNumber",
      label: "Account Number",
      sortable: true,
      render: (val) => (
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-credit-card text-primary"></i>
          <span className="font-monospace">{val}</span>
        </div>
      ),
    },
    {
      key: "pincode",
      label: "Pincode",
      sortable: true,
      render: (val) => (
        <span className="badge bg-secondary bg-opacity-10 text-dark">
          <i className="bi bi-geo-alt me-1"></i> {val}
        </span>
      ),
    },
    {
      key: "reason",
      label: "Reason",
      sortable: true,
      render: (val) => (
        <span className="d-flex align-items-center gap-2">
          <i className="bi bi-exclamation-triangle text-warning"></i>
          <span>{val}</span>
        </span>
      ),
    },
  ];

  // Helper to map API response
  const mapApiData = (data) =>
    data.map((item) => ({
      accountNumber: String(
        item.VAR_BANKDATA_CONTRACTNUM ?? item.var_bankdata_contractnum ?? "",
      ),
      pincode: String(
        item.NUM_BANKDATA_PINCODE ?? item.num_bankdata_pincode ?? "",
      ),
      reason: String(item.REASON ?? item.reason ?? ""),
    }));

  //  Fetch data from API
  useEffect(() => {
    const fetchKey = `${brid}|${branchName}`;
    if (lastFetchKeyRef.current === fetchKey) return;
    lastFetchKeyRef.current = fetchKey;

    const fetchData = async () => {
      if (!brid || !branchName) {
        setRows([]);
        setLoading(false);
        showError("Branch id or branch name missing");
        return;
      }

      setLoading(true);
      try {
        setLoader(true);
        const response = await apiClient.get("/reports/unallocatedcases", {
          params: { brid, branchName },
        });

        const success = response?.success;
        const data = Array.isArray(response?.data) ? response.data : [];

        if (!success || !data.length) {
          setRows([]);
          showError("No record found");
          return;
        }

        const mapped = mapApiData(data);
        setRows(mapped);
        showSuccess(`Found ${mapped.length} records`);
      } catch (apiError) {
        setRows([]);
        const message = apiError?.message || "Failed to fetch";
        showError(message);
      } finally {
        setLoading(false);
        setLoader(false);
      }
    };

    fetchData();
  }, [brid, branchName]);

  const tableData = useMemo(
    () => rows.map((item, idx) => ({ id: idx, ...item })),
    [rows],
  );

  return (
    <div className="main-content page-unallocated-cases-report">
      <div className="page-header">
        <h1 className="page-title">Unallocated Cases Report</h1>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Report Summary</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="d-flex align-items-center gap-2 text-muted">
              <div
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              <span>Loading report...</span>
            </div>
          ) : (
            <p className="mb-0 text-muted">
              <i className="bi bi-info-circle me-1"></i>
              No. of unallocated cases: {rows.length}
            </p>
          )}
        </div>
      </div>

      {!loading && tableData.length > 0 && (
        <div className="card">
          <div className="card-body">
            <DataTable
              title="Unallocated Cases"
              columns={columns}
              data={tableData}
              defaultPerPage={10}
              csvFilename="unallocated_cases.csv"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FrmUnallocatedCasesReport;
