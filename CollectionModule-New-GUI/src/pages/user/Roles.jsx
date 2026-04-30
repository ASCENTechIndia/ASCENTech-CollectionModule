// src/pages/Roles.jsx
import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/useNotification";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useConfirm } from "../../context/ConfirmModalContext";

const Roles = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Administrator",
      icon: "🛡️",
      color: "danger",
      users: 3,
      description: "Full system access with all permissions enabled.",
    },
    {
      id: 2,
      name: "Manager",
      icon: "⚙️",
      color: "warning",
      users: 8,
      description: "Can manage team members and approve changes.",
    },
    {
      id: 3,
      name: "Editor",
      icon: "✏️",
      color: "info",
      users: 12,
      description: "Can create, edit and publish content.",
    },
    {
      id: 4,
      name: "User",
      icon: "👤",
      color: "accent",
      users: 156,
      description: "Standard user access.",
    },
    {
      id: 5,
      name: "Viewer",
      icon: "👁️",
      color: "muted",
      users: 45,
      description: "Read-only access to the system.",
    },
  ]);

  const { user } = useAuth();
  const location = useLocation();
  const confirm = useConfirm();
  const webUserId = user?.userId;
  const { employeeId } = location.state || {};
  const { showSuccess, showError, showWarning } = useNotification();
  const [userStatusDetails, setUserStatusDetails] = useState({});
  const [userPageDetails, setUserPageDetails] = useState({});
  const [userID, setUserId] = useState(employeeId);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [newStatus, setNewStatus] = useState("");
  const [permissions, setPermissions] = useState({});

  // Common icon for all module names – colorful and consistent
  const commonIcon = {
    icon: "bi bi-file-text",
    color: "#0ea5a4", // teal color, can be changed to any color
  };

  const handleSearch = async (userId) => {
    if (!userId) {
      showWarning("Enter User ID");
      return;
    }
    try {
      const response = await apiClient.get(
        `/users/search-by-userid?userId=${userId}`,
      );
      if (response?.success) {
        setUserStatusDetails(response?.data);
      } else {
        showWarning(response?.message || "No user found for this User ID");
      }
    } catch (error) {
      console.error(error);
      showError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch user details",
      );
    }
  };

  const fetchPageAccessDetails = async () => {
    try {
      const response = await apiClient.get(
        `/users/get-page-access?userId=${userID}`,
      );
      if (response.success) {
        setUserPageDetails(response?.data);
        const mappedPermissions = {};
        response.data.pages.forEach((page) => {
          mappedPermissions[page.menuName] = {
            menuId: page.menuId,
            view: page.selected,
            create: page.selected,
            edit: page.selected,
            delete: page.selected,
            menuSelected: page.selected,
          };
        });
        setPermissions(mappedPermissions);
      } else {
        showError(response?.message || "Failed to fetch page access details");
      }
    } catch (error) {
      console.error(error);
      showError(
        error?.response.message ||
          error?.message ||
          "Failed to fetch page access details",
      );
    }
  };

  const getSelectedMenuIds = () => {
    return Object.values(permissions)
      .filter((p) => p.menuSelected)
      .map((p) => Number(p.menuId));
  };

  const handleModifyStatus = async () => {
    try {
      if (!newStatus.trim().length) {
        showWarning("Please select the status");
        return;
      }
      const agreed = await confirm("Do you want to modify status?");
      if (!agreed) return;
      const payload = {
        userId: userStatusDetails?.userId,
        newStatus: newStatus,
        insBy: webUserId,
      };
      const response = await apiClient.post(
        "/users/modify-status-submit",
        payload,
      );
      if (response.success && response.data.out_ErrorCode === -100) {
        showSuccess(
          response.data.out_ErrorMsg || "User status updated successfully",
        );
        setNewStatus("");
        handleSearch(userStatusDetails?.userId);
      }
    } catch (error) {
      console.error(error);
      showError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update user status",
      );
    }
  };

  const handlePageAccess = async () => {
    try {
      const agreed = await confirm("Do you want to give page access?");
      if (!agreed) return;
      const payload = {
        userId: userPageDetails?.userId,
        menuIds: getSelectedMenuIds(),
      };
      const response = await apiClient.post(
        `/users/update-page-access`,
        payload,
      );
      if (response.success && response.data.out_ErrorCode === "9999") {
        showSuccess("Page Access Updated Successfully");
        handleSearch(userID);
        fetchPageAccessDetails();
      }
    } catch (error) {
      console.error(error);
      showError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update page access",
      );
    }
  };

  const handleSelectAll = (module) => {
    const isSelected = permissions[module]?.menuSelected;
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        view: !isSelected,
        create: !isSelected,
        edit: !isSelected,
        delete: !isSelected,
        menuSelected: !isSelected,
      },
    }));
  };

  useEffect(() => {
    handleSearch(userID);
    fetchPageAccessDetails();
  }, [userID]);

  return (
    <div className="page-roles p-4">
      <div className="page-header">
        <h1 className="page-title">Edit User</h1>
      </div>

      <div className="row g-4">
        <div className="col-xl-4 col-lg-5">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">Role Details</h5>
            </div>
            <div className="card-body">
              <div className="roles-detail-list">
                <div className="roles-detail">
                  <span className="roles-detail-label">Name</span>
                  <span
                    className="card-title"
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#0ea5a4",
                    }}
                  >
                    {userPageDetails?.userName}
                  </span>
                </div>
                <div className="roles-detail">
                  <span className="roles-detail-label">User Code</span>
                  <span className="roles-detail-value">
                    {userPageDetails?.userId}
                  </span>
                </div>
                <div className="roles-detail">
                  <span className="roles-detail-label">User Of</span>
                  <span className="roles-detail-value">
                    {userPageDetails?.userOf}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Status</h5>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleModifyStatus}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="card-body">
              <p>
                <strong>Current Status: </strong>
                {userStatusDetails?.currentStatus}
              </p>
              <div>
                <p>
                  <strong>New Status:</strong>
                </p>
                <select
                  className="form-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">-- Select Status --</option>
                  <option
                    value="A"
                    disabled={userStatusDetails?.currentStatus === "Active"}
                  >
                    Active
                  </option>
                  <option
                    value="I"
                    disabled={userStatusDetails?.currentStatus === "Inactive"}
                  >
                    Inactive
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-8 col-lg-7">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title mb-0">Page Access</h5>
                <span className="roles-subtitle">
                  Page access for user
                </span>
              </div>
              <button
                type="button"
                onClick={handlePageAccess}
                className="btn btn-primary btn-sm"
              >
                <span>✓</span> Save Changes
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table roles-perm-table mb-0">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th className="text-center">All</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(permissions).map((module) => (
                      <tr key={module}>
                        <td className="roles-perm-module d-flex align-items-center">
                          <div
                            className="me-2"
                            style={{
                              backgroundColor: "#e0f2fe",
                              position: "relative",
                              height: "35px",
                              width: "35px",
                              borderRadius: "5px"
                            }}
                          >
                            <i
                              className={`bi ${commonIcon.icon} me-2`}
                              style={{
                                color: commonIcon.color,
                                fontSize: "1.1rem",
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                              }}
                            ></i>
                          </div>
                          {module}
                        </td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={permissions[module]?.menuSelected || false}
                            onChange={() => handleSelectAll(module)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
