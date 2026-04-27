import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";
import { useLoader } from "../../context/LoaderContext";
import { useConfirm } from "../../context/ConfirmModalContext";
import apiClient from "../../services/apiClient";
import { base64ToDataUrl } from "../../utils/imageHelper";

const FrmImageUploadmobapp = () => {
  const { showSuccess, showError } = useNotification();
  const { setLoader } = useLoader();
  const confirm = useConfirm();

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

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPreviewSource, setCurrentPreviewSource] = useState("fetched");
  const [fetchedData, setFetchedData] = useState({});

  const fileInputRef = useRef(null);
  const watchDocumentType = watch("documentType");

  // Fetch images on page load
  const fetchImages = async () => {
    try {
      setLoader(true);
      const response = await apiClient.get("/image-upload-mobapp");
      const data = response;
      if (Array.isArray(data)) {
        const map = {};
        data.forEach((item) => {
          const title = item.VAR_IMAGE_TITLE;
          if (title === "Notification" || title === "EOTM") {
            map[title] = {
              imageDataUrl: base64ToDataUrl(item.BLB_IMAGE_DATA),
              flag: item.VAR_FLAG,
            };
          }
        });
        setFetchedData(map);
      }
    } catch (err) {
      console.error("Failed to fetch images", err);
      showError("Could not load existing images");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  // Update preview when document type changes
  useEffect(() => {
    if (!selectedFile && watchDocumentType && fetchedData[watchDocumentType]) {
      const { imageDataUrl, flag } = fetchedData[watchDocumentType];
      if (imageDataUrl) {
        setPreviewUrl(imageDataUrl);
        setCurrentPreviewSource("fetched");
        setValue("visibility", flag);
      } else {
        setPreviewUrl(null);
      }
    } else if (
      !selectedFile &&
      watchDocumentType &&
      !fetchedData[watchDocumentType]
    ) {
      setPreviewUrl(null);
      setValue("visibility", "");
    }
  }, [watchDocumentType, fetchedData, selectedFile, setValue]);

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setSelectedFile(file);
      setValue("file", file, { shouldValidate: true });
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setCurrentPreviewSource("uploaded");
      } else {
        setPreviewUrl(null);
      }
    },
    [setValue],
  );

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (previewUrl && currentPreviewSource === "uploaded") {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, currentPreviewSource]);

  const resetForm = () => {
    reset({
      documentType: "",
      visibility: "",
      file: null,
    });
    setSelectedFile(null);
    if (previewUrl && currentPreviewSource === "uploaded") {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setCurrentPreviewSource("fetched");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ Delete function using apiClient.delete
  const handleDelete = async () => {
    if (!watchDocumentType) {
      showError("Please select a document type first");
      return;
    }
    const agreed = await confirm(
      `Are you sure you want to delete the image for "${watchDocumentType}"?`,
    );
    if (!agreed) return;

    try {
      setLoader(true);
      const response = await apiClient.delete(
        `/image-upload-mobapp/delete-image?title=${watchDocumentType}`,
      );
      showSuccess(`${response.message}`);
      setFetchedData((prev) => ({
        ...prev,
        [watchDocumentType]: { imageDataUrl: null, flag: "" },
      }));
      setSelectedFile(null);
      if (previewUrl && currentPreviewSource === "uploaded")
        URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setCurrentPreviewSource("fetched");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setValue("visibility", "");
      fetchImages(); // fetching updated data
    } catch (err) {
      console.error("Delete error:", err);
      showError(err?.message || "Delete request failed");
    } finally {
      setLoader(false);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.documentType);
    formData.append("visibility", data.visibility);
    formData.append("image", data.file);

    try {
      setLoader(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/image-upload-mobapp/upload`,
        {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const result = await response.json();
      if (result.result === true) {
        showSuccess(result.message || "Upload successful");
        const refreshRes = await apiClient.get("/image-upload-mobapp");
        if (Array.isArray(refreshRes.data)) {
          const map = {};
          refreshRes.data.forEach((item) => {
            if (
              item.VAR_IMAGE_TITLE === "Notification" ||
              item.VAR_IMAGE_TITLE === "EOTM"
            ) {
              map[item.VAR_IMAGE_TITLE] = {
                imageDataUrl: base64ToDataUrl(item.BLB_IMAGE_DATA),
                flag: item.VAR_FLAG,
              };
            }
          });
          setFetchedData(map);
        }
        resetForm();
        fetchImages(); // fetching updated data
      } else {
        showError(result.message || "Upload failed");
      }
    } catch (err) {
      showError(err?.message || "Upload failed");
    } finally {
      setLoader(false);
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
                    <option value="Notification">Notification</option>
                    <option value="EOTM">Employee of the month</option>
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

        {/* Right Panel: Preview + Delete Button */}
        <div className="col-lg-7 col-12">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Preview</h5>
              <button
                className="btn btn-danger btn-sm m-0"
                onClick={handleDelete}
                disabled={!watchDocumentType}
              >
                <i className="bi bi-trash me-1"></i> Delete
              </button>
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
                  <p className="mt-2">No image selected / available</p>
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
