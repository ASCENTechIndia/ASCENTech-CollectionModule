import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../services/apiClient";
// import { useAuth } from '../../context/AuthContext'  // temporarily commented
// import { useNotification } from '../../context/NotificationContext'

function FrmAccessofPages() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      userOf: "",
      userId: "",
      userName: "",
      accessPages: [],
    },
  });
  // const { user } = useAuth()
  // const { showSuccess, showError } = useNotification()
  const navigate = useNavigate();
  const location = useLocation();
  const { userID } = location.state || null;

  const userOfOptions = [
    { label: "Conneqt", value: "1" },
    { label: "Central Bank", value: "2" },
  ];

  const [userPageAccessDetails, setUserPageAccessDetails] = useState({});
  const [pageAccessList, setPageAccessList] = useState([]);

  const fetchUserOfId = (name) => {
    const userOfObj = userOfOptions.find((item) => item.label === name);
    return userOfObj ? userOfObj.value : "";
  };

  const fetchPageAccessDetails = async () => {
    try {
      const response = await apiClient.get(
        `/users/get-page-access?userId=${userID}`,
      );
      if (response.success) {
        setUserPageAccessDetails(response.data);
        setValue("userId", response.data.userId);

        const userOfValue = fetchUserOfId(response.data.userOf);
        setValue("userOf", userOfValue);

        setPageAccessList(response.data.pages);

        const selectedPages = response.data.pages
          .filter((page) => page.selected)
          .map((page) => page.menuId);
        setValue("accessPages", selectedPages);
      }
    } catch (error) {
      console.error(error);
      alert(error?.message || "Failed to fetch page access details");
    }
  };

  const onSubmit = async (values) => {
    try {
      const payload = {
        userId: values.userId,
        menuIds: values.accessPages.map((id) => Number(id)),
      };
      const response = await apiClient.post(
        `/users/update-page-access`,
        payload,
      );
      if (response?.success && response?.data?.out_ErrorCode === "9999") {
        alert("Page Access Updated Successfully");
        reset({
          userOf: "",
          userId: "",
          userName: "",
          accessPages: [],
        });
        navigate("/User/FrmUserModification");
      }
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update page access",
      );
    }
  };

  useEffect(() => {
    if (userID) {
      fetchPageAccessDetails();
    }
  }, [userID]);

  return (
    <div className="main-content">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Page Access</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">User Management</span>
          <span className="breadcrumb-item active">Page Access</span>
        </nav>
      </div>

      {/* Form Card */}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* User Of Dropdown (disabled) */}
            <div className="mb-3">
              <label className="form-label">
                User Of <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.userOf ? "is-invalid" : ""}`}
                disabled
                {...register("userOf", { required: "User Of is required" })}
              >
                <option value="">-- Select Option --</option>
                {userOfOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              {errors.userOf && (
                <div className="invalid-feedback">{errors.userOf.message}</div>
              )}
            </div>

            {/* User ID (disabled) */}
            <div className="mb-3">
              <label className="form-label">
                User ID <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.userId ? "is-invalid" : ""}`}
                disabled
                placeholder="User ID"
                {...register("userId", { required: "User ID is required" })}
              />
              {errors.userId && (
                <div className="invalid-feedback">{errors.userId.message}</div>
              )}
            </div>

            {/* User Name (read‑only text) */}
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <div className="form-control-plaintext pt-1">
                {userPageAccessDetails?.userName || "-"}
              </div>
            </div>

            {/* Access Pages – checkboxes */}
            <div className="mb-3">
              <label className="form-label">
                Access Pages <span className="text-danger">*</span>
              </label>
              <div
                className="border rounded p-3 bg-light"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {pageAccessList.length === 0 ? (
                  <p className="text-muted mb-0">No pages available</p>
                ) : (
                  <div className="row">
                    {pageAccessList.map((item) => (
                      <div key={item.menuId} className="col-md-6 mb-2">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={item.menuId}
                            id={`page-${item.menuId}`}
                            {...register("accessPages", {
                              required: "Select at least one page",
                            })}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`page-${item.menuId}`}
                          >
                            {item.menuName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.accessPages && (
                <div className="text-danger small mt-1">
                  {errors.accessPages.message}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/User/FrmUserModification")}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FrmAccessofPages;
