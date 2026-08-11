import { useState, useRef } from "react";
import { useNotification } from "../../context/useNotification";
import { useLoader } from "../../context/LoaderContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function FrmExcelUpload() {
  const { showSuccess, showError } = useNotification();
  const { setLoader } = useLoader();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isDisplayLink, setIsDisplayLink] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (
      dropped &&
      (dropped.name.endsWith(".xlsx") || dropped.name.endsWith(".xls"))
    ) {
      setFile(dropped);
    } else {
      showError("Only Excel files (.xlsx, .xls) are allowed!");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      showError("Please select an Excel file first!");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", file);
    if (user?.userid) formData.append("userName", user.userid);

    try {
      setUploading(true);
      setLoader(true);

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/excel-upload/upload`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const json = await response.json();

      if (!response.ok)
        throw new Error(json?.message || `HTTP ${response.status}`);

      const { successCount, failCount } = json.data;

      if (failCount === 0) {
        showSuccess(`All ${successCount} records uploaded successfully!`);
        setIsDisplayLink(true);
      } else {
        showError(`${successCount} records uploaded, ${failCount} failed.`);
      }

      // Reset after success
      handleReset();
    } catch (err) {
      showError(err.message || "Upload failed!");
      setIsDisplayLink(false);
    } finally {
      setUploading(false);
      setLoader(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="main-content page-excel-upload">
      <div className="page-header">
        <h1 className="page-title"></h1>
      </div>

      <div className="card">
        <div className="card-body py-4">
          <div className="mx-auto" style={{ maxWidth: "800px" }}>
            {/* Info Banner */}
            <div className="border rounded-4 bg-body-tertiary p-4 mb-4 shadow-sm">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{
                    width: "44px",
                    height: "44px",
                    background:
                      "color-mix(in srgb, var(--accent-color), transparent 84%)",
                    color: "var(--accent-color)",
                  }}
                >
                  <i className="bi bi-file-earmark-spreadsheet fs-5" />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 fw-semibold">
                    Excel Upload Collection Data
                  </h5>
                  <p className="mb-0 text-muted small">
                    Upload an Excel file (.xlsx / .xls) containing Collection
                    records. Each row will be processed and inserted into the
                    Oracle database.
                  </p>
                </div>
              </div>
            </div>

            {/* Drop Zone */}
            <div
              className={`rounded-4 text-center p-5 mb-4 ${dragOver ? "bg-primary bg-opacity-10" : "bg-body-tertiary"}`}
              style={{
                cursor: "pointer",
                transition: "all 0.2s",
                borderStyle: "dashed",
                borderWidth: "2px",
                borderColor: dragOver ? "var(--accent-color)" : "#dee2e6",
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {file ? (
                <div>
                  <i
                    className="bi bi-file-earmark-excel text-success"
                    style={{ fontSize: "2.5rem" }}
                  />
                  <div className="mt-2 fw-semibold">{file.name}</div>
                  <div className="text-muted small">
                    {formatSize(file.size)}
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                  >
                    <i className="bi bi-x-circle me-1" /> Remove
                  </button>
                </div>
              ) : (
                <div>
                  <i
                    className="bi bi-cloud-upload text-muted"
                    style={{ fontSize: "2.5rem" }}
                  />
                  <div className="mt-2 fw-semibold">
                    Drag & drop your Excel file here
                  </div>
                  <div className="text-muted small mb-2">
                    or click to browse
                  </div>
                  <span className="badge bg-secondary">
                    Supports .xlsx and .xls
                  </span>
                </div>
              )}
            </div>

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="d-none"
              onChange={handleFileChange}
            />

            {isDisplayLink && (
              <div className="d-flex justify-content-center">
                <p
                  className=" text-primary fs-6 fw-bold"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() =>
                    navigate("/reports/daywise-data", {
                      state: {
                        flag: true,
                      },
                    })
                  }
                >
                  View List
                </p>
              </div>
            )}

            {/* Upload Button */}
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary px-5"
                onClick={handleUpload}
                disabled={uploading || !file}
              >
                {uploading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-upload me-2" />
                    Upload & Process
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrmExcelUpload;
