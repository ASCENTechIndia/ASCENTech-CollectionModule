import React, { useState } from "react";
import axios from "axios";

// ──────────────────────────────────────────────────────────────────────────────
// 📊 ExcelUploader Component
//
// FLOW:
//  1. User selects an Excel file (.xlsx or .xls) using the file input
//  2. User clicks "Upload & Extract"
//  3. React wraps the file in FormData and POSTs it to the Node.js backend
//  4. Backend (multer) receives the file → parses it with xlsx → returns JSON
//  5. We display the rows in a table
//
// BACKEND ENDPOINT: POST http://localhost:5000/api/excel-upload/upload
// FORM FIELD NAME : "excelFile"  (must match backend's upload.single('excelFile'))
// ──────────────────────────────────────────────────────────────────────────────

const API_BASE_URL = "http://localhost:5000";

const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);   // stores fileName, totalRows, sheetNames
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ────────────────────────────────────────
  // 📁 Step 1: User picks a file
  // e.target.files[0] → the selected File object
  // ────────────────────────────────────────
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      setData([]);   // clear previous results
      setMeta(null);
    }
  };

  // ────────────────────────────────────────
  // 🚀 Step 2: Upload to backend
  // ────────────────────────────────────────
  const handleUpload = async () => {
    if (!file) {
      setError("Please select an Excel file first!");
      return;
    }

    // FormData is REQUIRED for file uploads.
    // It sends the request as multipart/form-data (not JSON).
    // "excelFile" must match the backend's upload.single('excelFile')
    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${API_BASE_URL}/api/excel-upload/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Backend returns: { data: { fileName, totalRows, sheetNames, data: [...] } }
      const result = response.data?.data;
      setData(result.data);    // array of row objects
      setMeta(result);         // fileName, totalRows, etc.

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Upload failed! Check if the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ────────────────────────────────────────
  // 🎨 Step 3: Render the extracted data
  // Object.keys(data[0]) gets column headers from the first row
  // ────────────────────────────────────────
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Excel File Uploader</h2>

      {/* File Input */}
      <div style={{ marginBottom: "12px" }}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
        />
        {file && (
          <span style={{ marginLeft: "10px", color: "#555" }}>
            {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </span>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        style={{ padding: "8px 16px", cursor: loading ? "wait" : "pointer" }}
      >
        {loading ? "⏳ Processing..." : "🚀 Upload & Extract"}
      </button>

      {/* Error Message */}
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>❌ {error}</p>
      )}

      {/* File Metadata */}
      {meta && (
        <div style={{ marginTop: "12px", color: "#333" }}>
          <p>✅ <strong>File:</strong> {meta.fileName}</p>
          <p>📄 <strong>Sheet:</strong> {meta.activeSheet}</p>
          <p>🔢 <strong>Total Rows:</strong> {meta.totalRows}</p>
        </div>
      )}

      {/* Data Table */}
      {data.length > 0 && (
        <div style={{ marginTop: "16px", overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="8"
            cellSpacing="0"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                {columns.map((col) => (
                  <th key={col} style={{ textAlign: "left" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                  {columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
