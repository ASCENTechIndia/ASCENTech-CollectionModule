import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";
import { useLoader } from "../../context/LoaderContext";
import apiClient from "../../services/apiClient";

const FrmImageUploadmobapp = () => {
  const { showSuccess, showError } = useNotification();
  const { setLoader } = useLoader();

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      documentType: "",
      visibility: "",
      file: null,
    },
  });

  // File preview state
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Ref for hidden file input (to trigger click on dropzone)
  const fileInputRef = useRef(null);

  // Watch form values (for preview & validation)
  const watchedFile = watch("file");

  // Handle file change from the hidden input
  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setSelectedFile(file);
      setValue("file", file, { shouldValidate: true });
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    },
    [setValue],
  );

  // Trigger file picker when dropzone is clicked
  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  // Cleanup preview URL on unmount or when file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Reset form and preview
  const resetForm = () => {
    reset({
      documentType: "",
      visibility: "",
      file: null,
    });
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit handler
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("type", data.documentType);
    formData.append("visibility", data.visibility);
    formData.append("file", data.file);

    try {
      setLoader(true);
      // Replace with actual API call
        const response = await apiClient.get(
          "/reports/AccAllocationReport?startDate=02-MAY-2025&endDate=15-MAY-2026&brid=10001&branchName=HEAD OFFICE",
        );
        console.log("response :", response)
      console.log("Submitting:", Object.fromEntries(formData));
      showSuccess("Upload successful (demo)");
      //   resetForm();
    } catch (err) {
      showError(err?.message || "Upload failed");
    } finally {
      setLoader(false)
    }
  };

  return (
    <div className="page-users-edit p-4">
      <div className="page-header">
        <h1 className="page-title">Image Upload</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Admin</span>
          <span className="breadcrumb-item active">Image Upload</span>
        </nav>
      </div>

      <div className="row g-4">
        {/* Left Panel: Form */}
        <div className="col-lg-5 col-12">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">Upload Details</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Dropdown */}
                <div className="mb-3">
                  <label className="form-label">
                    Document Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.documentType ? "is-invalid" : ""}`}
                    {...register("documentType", {
                      required: "Please select a document type",
                    })}
                  >
                    <option value="">Select type</option>
                    <option value="1">Notification</option>
                    <option value="2">Employee of the month</option>
                  </select>
                  {errors.documentType && (
                    <div className="invalid-feedback">
                      {errors.documentType.message}
                    </div>
                  )}
                </div>

                {/* File Dropzone */}
                <div className="mb-3">
                  <label className="form-label">
                    File <span className="text-danger">*</span>
                  </label>
                  <div
                    className={`upload-dropzone ${errors.file ? "is-invalid" : ""}`}
                    onClick={handleDropzoneClick}
                    style={{
                      cursor: "pointer",
                      border: errors.file ? "1px solid #dc3545" : undefined,
                    }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                    />
                    <div className="upload-dropzone-content">
                      <div className="upload-dropzone-icon">
                        <i className="bi bi-cloud-arrow-up"></i>
                      </div>
                      <h5 className="upload-dropzone-title">
                        Click here to upload
                      </h5>
                      <p className="upload-dropzone-text">
                        Supports: JPG, PNG (Max 10MB each)
                      </p>
                    </div>
                  </div>
                  {/* Hidden register for file validation */}
                  <input
                    type="hidden"
                    {...register("file", { required: "Please select a file" })}
                  />
                  {selectedFile && (
                    <div className="mt-2 alert alert-info py-1 px-2">
                      <i className="bi bi-file-earmark-image me-1"></i>
                      {selectedFile.name} (
                      {(selectedFile.size / 1024).toFixed(2)} KB)
                    </div>
                  )}
                  {errors.file && (
                    <div className="text-danger mt-1 small">
                      {errors.file.message}
                    </div>
                  )}
                </div>

                {/* Radio Buttons */}
                <div className="mb-3">
                  <label className="form-label">
                    Visibility <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="Y"
                        id="visY"
                        {...register("visibility", {
                          required: "Please select visibility",
                        })}
                      />
                      <label className="form-check-label" htmlFor="visY">
                        Visible (Y)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="N"
                        id="visN"
                        {...register("visibility", {
                          required: "Please select visibility",
                        })}
                      />
                      <label className="form-check-label" htmlFor="visN">
                        Hidden (N)
                      </label>
                    </div>
                  </div>
                  {errors.visibility && (
                    <div className="text-danger mt-1 small">
                      {errors.visibility.message}
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="col-lg-7 col-12">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">Preview</h5>
              <p className="card-subtitle">Selected image will appear here</p>
            </div>
            <div className="card-body d-flex align-items-center justify-content-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              ) : (
                <div className="text-center text-muted">
                  <i className="bi bi-image fs-1"></i>
                  <p className="mt-2">No image selected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrmImageUploadmobapp;
