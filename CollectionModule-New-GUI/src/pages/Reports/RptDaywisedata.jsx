import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/useNotification";
import DataTable from "../../components/Datatable";
import { useLoader } from "../../context/LoaderContext";
import Chart from "react-apexcharts";

const MilestoneDate = ({ date }) => {
  if (!date) return <span>-</span>;

  let parsedDate;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    const [day, month, year] = date.split("/");
    parsedDate = new Date(`${year}-${month}-${day}`);
  } else {
    parsedDate = new Date(date);
  }
  if (isNaN(parsedDate)) return <span>-</span>;

  const d = parsedDate.getDate();
  const m = parsedDate.toLocaleString("default", { month: "short" });
  const y = parsedDate.getFullYear();

  return (
    <div className="milestone-date-horizontal">
      <span className="milestone-day-big">{d}</span>
      <div className="milestone-right">
        <span className="milestone-month">{m}</span>
        <span className="milestone-year">{y}</span>
      </div>
    </div>
  );
};

const formatDateForApi = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function RptDaywisedata() {
  const { showError, showSuccess, showWarning } = useNotification();
  const { setLoader } = useLoader();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const {
    register,
    handleSubmit: handleFormSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      accountNo: "",
      smaType: "",
    },
  });

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [smaType, setSmaType] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const [showPivotModal, setShowPivotModal] = useState(false);
  const [pivotData, setPivotData] = useState({ months: [], values: [] });
  const [pivotLoading, setPivotLoading] = useState(false);

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    const todayDate = getTodayDate();
    setStartDate(todayDate);
    setEndDate(todayDate);
    setValue("startDate", todayDate);
    setValue("endDate", todayDate);
  }, []);

  const columns2 = [
    {
      key: "uploadDate",
      label: "Contract Upload Date",
      render: (val) => <MilestoneDate date={val} />,
    },
    {
      key: "contractNumber",
      label: "Contract Number",
      render: (val) => <span>{val}</span>,
    },
    {
      key: "accountType",
      label: "Account Type",
      render: (val) =>
        val === "CCOD" ? (
          <span className="badge bg-primary text-white">{val}</span>
        ) : val === "DLTL" ? (
          <span className="badge bg-info text-white">{val}</span>
        ) : (
          <span className="badge bg-secondary text-white">{val}</span>
        ),
    },
    {
      key: "emiAmount",
      label: "EMI Amount",
      render: (val) => <span>₹ {val}</span>,
    },
    {
      key: "diffInt",
      label: "Diff In Int Credit",
      render: (val) => <span>₹ {val}</span>,
    },
    {
      key: "capUnpd",
      label: "Cap UNPD INT",
      render: (val) => <span>₹ {val}</span>,
    },
    {
      key: "collectable",
      label: "Collectable Amount",
      render: (val) => <span>₹ {val}</span>,
    },
    {
      key: "sma",
      label: "SMA Type",
      render: (val) =>
        val === "SMA0" ? (
          <span className="badge bg-success text-white">{val}</span>
        ) : val === "SMA1" ? (
          <span className="badge bg-warning text-black">{val}</span>
        ) : (
          <span className="badge bg-danger text-white">{val}</span>
        ),
    },
  ];

  const handleSearch = async () => {
    const params = {
      startDate: formatDateForApi(startDate),
      endDate: formatDateForApi(endDate),
    };
    if (accountNo.trim()) params.userId = accountNo.trim();
    if (smaType) params.smaType = smaType;
    const queryParams = new URLSearchParams(params);

    setLoading(true);
    try {
      setLoader(true);
      const response = await apiClient.get(
        `/reports/dailyUploadedReport?${queryParams.toString()}`,
      );
      const success = response?.success;
      const data = Array.isArray(response?.data) ? response.data : [];

      if (!success || !data.length) {
        setRows([]);
        showWarning("No Data Found");
        return;
      }

      const formatted = data.map((item) => ({
        uploadDate: item.CONTRACTUPLOADDATE || "",
        accountNumber: item.CONTRACTNUMBER || "",
        accountType: item.ACCOUNTTYPE || "",
        emiAmount: item.EMI || 0,
        diffInt: item.DIFF_IN_INT_CREDIT || 0,
        capUnpd: item.CAP_UNPD_INT || 0,
        collectable: item.COLLECTABLEAMOUNT || 0,
        sma: item.VAR_BANKDATA_DPDBUCKET || "",
        contractNumber: item.CONTRACTNUMBER || "",
      }));

      setRows(formatted);
      showSuccess(`Found ${formatted.length} records`);
    } catch (apiError) {
      setRows([]);
      showError(apiError.message || "API Error");
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  const handleClose = () => {
    setStartDate("");
    setEndDate("");
    setAccountNo("");
    setSmaType("");
    setRows([]);
    setValue("startDate", "");
    setValue("endDate", "");
    setValue("accountNo", "");
    setValue("smaType", "");
    const todayDate = getTodayDate();
    setStartDate(todayDate);
    setEndDate(todayDate);
    setValue("startDate", todayDate);
    setValue("endDate", todayDate);
  };

  const handlePivotClick = async () => {
    setPivotLoading(true);
    try {
      const response = await apiClient.get("/reports/lastThreeMonthPivot");
      if (response?.success && Array.isArray(response.data)) {
        const months = response.data.map(
          (item) => item.MONTH_NAME?.trim() || "",
        );
        const values = response.data.map((item) => item.TOTAL_COUNT ?? 0);
        setPivotData({ months, values });
      } else {
        showError("Failed to load pivot data");
      }
    } catch (err) {
      showError(err?.message || "API error");
    } finally {
      setPivotLoading(false);
      setShowPivotModal(true);
    }
  };

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: { position: "top" },
        barHeight: "60%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toLocaleString(),
      offsetX: 15,
      style: { fontSize: "13px", fontWeight: "bold", colors: ["#333"] },
    },
    xaxis: {
      categories: pivotData.months,
      title: { text: "Unique Data Uploaded (Count)" },
      labels: { formatter: (val) => val.toLocaleString() },
      min: 0,
      max: Math.max(...pivotData.values) * 1.15,
      tickAmount: 5,
    },
    yaxis: {
      title: { text: "Month" },
    },
    colors: ["#0d6efd"],
    title: {
      text: "",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold" },
    },
    tooltip: {
      y: { formatter: (val) => val.toLocaleString() },
    },
  };

  const chartSeries = [{ name: "Uploads", data: pivotData.values }];

  useEffect(() => {
    if (state?.flag === true && startDate && endDate) {
      handleSearch();
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [state, startDate, endDate]);

  return (
    <div className="main-content page-daywise-data-report">
      <div className="page-header">
        <h1 className="page-title">
          Daily Uploaded Data Report
          <span className="info-icon">
            <i className="bi bi-info-circle-fill text-muted"></i>
            <span className="info-icon-text">
              This report shows daily uploaded contract data with EMI, interest,
              and collectable amounts. Filter by date range, account number, and
              SMA type.
            </span>
          </span>
        </h1>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Search Filters</h5>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handlePivotClick}
          >
            Pivot
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit(handleSearch)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Select Start Date <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  max={today}
                  className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
                  value={startDate}
                  {...register("startDate", {
                    required: "Start Date is required",
                    onChange: (e) => setStartDate(e.target.value),
                  })}
                />
                {errors.startDate && (
                  <div className="invalid-feedback">
                    {errors.startDate.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  Select End Date <span className="text-danger">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  max={today}
                  className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
                  value={endDate}
                  {...register("endDate", {
                    required: "End Date is required",
                    onChange: (e) => setEndDate(e.target.value),
                  })}
                />
                {errors.endDate && (
                  <div className="invalid-feedback">
                    {errors.endDate.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <label htmlFor="accountNo" className="form-label">
                  Account Number
                </label>
                <input
                  id="accountNo"
                  type="text"
                  className="form-control"
                  value={accountNo}
                  placeholder="Enter account number (optional)"
                  {...register("accountNo", {
                    onChange: (e) => setAccountNo(e.target.value),
                  })}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="smaType" className="form-label">
                  SMA Type
                </label>
                <select
                  id="smaType"
                  className="form-select"
                  value={smaType}
                  {...register("smaType", {
                    onChange: (e) => setSmaType(e.target.value),
                  })}
                >
                  <option value="">--Select Option--</option>
                  <option value="SMA0">SMA0</option>
                  <option value="SMA1">SMA1</option>
                  <option value="SMA2">SMA2</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="card">
          <div className="card-body">
            <DataTable
              title="Daily Data Report"
              subtitle={`Number of Allocations: ${rows.length}`}
              columns={columns2}
              data={rows}
              perPage={5}
              csvFilename="daily_uploaded_data_report.csv"
            />
          </div>
        </div>
      )}

      {showPivotModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Last Three Month Unique Data Uploaded
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPivotModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {pivotLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <Chart
                    options={{
                      ...chartOptions,
                      xaxis: {
                        ...chartOptions.xaxis,
                        categories: pivotData.months,
                      },
                    }}
                    series={chartSeries}
                    type="bar"
                    height={350}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPivotModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RptDaywisedata;
