import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";
import { useLoader } from "../../context/LoaderContext";
import { useConfirm } from "../../context/ConfirmModalContext";
import apiClient from "../../services/apiClient";
import { base64ToDataUrl } from "../../utils/imageHelper";

const FrmImageUploadMobApp2 = () => {
  const { showSuccess, showError } = useNotification();
  const { setLoader } = useLoader();
  const confirm = useConfirm();

  const [showModal, setShowModal] = useState(false);
  const [fetchedData, setFetchedData] = useState({});

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
  const fileInputRef = useRef(null);
  const watchDocumentType = watch("documentType");

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
              title: title,
            };
          }
        });
        setFetchedData(map);
      }
    } catch (err) {
      console.error("Failed to fetch images", err);
      showError("Could not load images");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // When document type changes, set visibility radio (only used in modal)
  useEffect(() => {
    if (!selectedFile && watchDocumentType && fetchedData[watchDocumentType]) {
      const { flag } = fetchedData[watchDocumentType];
      setValue("visibility", flag);
    }
  }, [watchDocumentType, fetchedData, selectedFile, setValue]);

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setSelectedFile(file);
      setValue("file", file, { shouldValidate: true });
      // No preview in modal – we removed it
    },
    [setValue]
  );

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const resetModalForm = () => {
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

  const closeModal = () => {
    setShowModal(false);
    resetModalForm();
  };

  const handleDelete = async (title) => {
    const agreed = await confirm(`Are you sure you want to delete the image for "${title}"?`);
    if (!agreed) return;
    try {
      setLoader(true);
      const response = await apiClient.delete(`/image-upload-mobapp/delete-image?title=${title}`);
      showSuccess(response.message || "Image deleted successfully");
      await fetchImages();
    } catch (err) {
      console.error("Delete error:", err);
      showError(err?.message || "Delete request failed");
    } finally {
      setLoader(false);
    }
  };

  const handleToggleVisibility = async (title, currentFlag) => {
    const newFlag = currentFlag === "Y" ? "N" : "Y";
    try {
      setLoader(true);
      const response = await apiClient.patch("/image-upload-mobapp/update-visibility", {
        title: title,
        visibility: newFlag,
      });
      showSuccess(response.message || `Visibility toggled to ${newFlag === "Y" ? "Visible" : "Hidden"}`);
      await fetchImages();
    } catch (err) {
      console.error("Toggle error:", err);
      showError(err?.message || "Failed to update visibility");
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
        }
      );
      const result = await response.json();
      if (result.result === true) {
        showSuccess(result.message || "Upload successful");
        await fetchImages();
        closeModal();
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
    <div className="main-content p-4">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Image Management</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <span className="breadcrumb-item">Admin</span>
            <span className="breadcrumb-item active">Image Upload</span>
          </nav>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-cloud-upload me-2"></i> Upload Image
        </button>
      </div>

      <div className="row g-4 mt-2">
        {/* Notification Card */}
        <div className="col-md-6 d-flex">
          <div className="card h-100 w-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Notification</h5>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete("Notification")}
                disabled={!fetchedData.Notification?.imageDataUrl}
              >
                <i className="bi bi-trash"></i> Delete
              </button>
            </div>
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "250px" }}>
                {fetchedData.Notification?.imageDataUrl ? (
                  <img
                    src={fetchedData.Notification.imageDataUrl}
                    alt="Notification"
                    className="img-fluid rounded"
                    style={{ maxHeight: "250px", objectFit: "contain" }}
                  />
                ) : (
                  <div className="text-center text-muted">
                    <i className="bi bi-image fs-1"></i>
                    <p>No image uploaded</p>
                  </div>
                )}
              </div>
              <div className="mt-auto d-flex justify-content-between align-items-center pt-3">
                <span className="badge bg-secondary">
                  Visibility: {fetchedData.Notification?.flag === "Y" ? "Visible" : "Hidden"}
                </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchNotification"
                    checked={fetchedData.Notification?.flag === "Y"}
                    disabled={!fetchedData.Notification?.imageDataUrl}
                    onChange={() => handleToggleVisibility("Notification", fetchedData.Notification?.flag)}
                  />
                  <label className="form-check-label" htmlFor="switchNotification">
                    Visible
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee of the Month Card */}
        <div className="col-md-6 d-flex">
          <div className="card h-100 w-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Employee of the Month</h5>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete("EOTM")}
                disabled={!fetchedData.EOTM?.imageDataUrl}
              >
                <i className="bi bi-trash"></i> Delete
              </button>
            </div>
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "250px" }}>
                {fetchedData.EOTM?.imageDataUrl ? (
                  <img
                    src={fetchedData.EOTM.imageDataUrl}
                    alt="EOTM"
                    className="img-fluid rounded"
                    style={{ maxHeight: "250px", objectFit: "contain" }}
                  />
                ) : (
                  <div className="text-center text-muted">
                    <i className="bi bi-image fs-1"></i>
                    <p>No image uploaded</p>
                  </div>
                )}
              </div>
              <div className="mt-auto d-flex justify-content-between align-items-center pt-3">
                <span className="badge bg-secondary">
                  Visibility: {fetchedData.EOTM?.flag === "Y" ? "Visible" : "Hidden"}
                </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchEOTM"
                    checked={fetchedData.EOTM?.flag === "Y"}
                    disabled={!fetchedData.EOTM?.imageDataUrl}
                    onChange={() => handleToggleVisibility("EOTM", fetchedData.EOTM?.flag)}
                  />
                  <label className="form-check-label" htmlFor="switchEOTM">
                    Visible
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Upload */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload New Image</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Dropdown */}
                  <div className="mb-3">
                    <label className="form-label">
                      Document Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.documentType ? "is-invalid" : ""}`}
                      {...register("documentType", { required: "Please select a document type" })}
                    >
                      <option value="">Select type</option>
                      <option value="Notification">Notification</option>
                      <option value="EOTM">Employee of the month</option>
                    </select>
                    {errors.documentType && <div className="invalid-feedback">{errors.documentType.message}</div>}
                  </div>

                  {/* Redesigned File Dropzone (compact) */}
                  <div className="mb-3">
                    <label className="form-label">
                      File <span className="text-danger">*</span>
                    </label>
                    <div
                      className="upload-dropzone d-flex align-items-center p-2 border rounded"
                      onClick={handleDropzoneClick}
                      style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                      />
                      <div className="me-2">
                        <i className="bi bi-cloud-arrow-up fs-4 text-primary"></i>
                      </div>
                      <div>
                        <span>Click to upload the Image</span>
                      </div>
                    </div>
                    <input type="hidden" {...register("file", { required: "Please select a file" })} />
                    {selectedFile && (
                      <div className="mt-2 alert alert-info py-1 px-2">
                        <i className="bi bi-file-earmark-image me-1"></i>
                        {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                      </div>
                    )}
                    {errors.file && <div className="text-danger mt-1 small">{errors.file.message}</div>}
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
                          {...register("visibility", { required: "Please select visibility" })}
                        />
                        <label className="form-check-label" htmlFor="visY">Visible (Y)</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="N"
                          id="visN"
                          {...register("visibility", { required: "Please select visibility" })}
                        />
                        <label className="form-check-label" htmlFor="visN">Hidden (N)</label>
                      </div>
                    </div>
                    {errors.visibility && <div className="text-danger mt-1 small">{errors.visibility.message}</div>}
                  </div>

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrmImageUploadMobApp2;