// src/pages/Roles.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { useNotification } from '../../context/useNotification';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
// import { fetchLayoutMode } from 'echarts/types/src/util/layout.js';

export default function Roles() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Administrator', icon: '🛡️', color: 'danger', users: 3, description: 'Full system access with all permissions enabled.' },
    { id: 2, name: 'Manager', icon: '⚙️', color: 'warning', users: 8, description: 'Can manage team members and approve changes.' },
    { id: 3, name: 'Editor', icon: '✏️', color: 'info', users: 12, description: 'Can create, edit and publish content.' },
    { id: 4, name: 'User', icon: '👤', color: 'accent', users: 156, description: 'Standard user access.' },
    { id: 5, name: 'Viewer', icon: '👁️', color: 'muted', users: 45, description: 'Read-only access to the system.' }
  ]);

  const { user } = useAuth();
  const location = useLocation();
  const webUserId = user?.userId;
  const { employeeId } = location.state || "";
  console.log("employeeId",employeeId);
  const { showSuccess, showError, showWarning } = useNotification();
  const [userStatusDetails, setUserStatusDetails] = useState({})
  const [userPageDetails, setUserPageDetails] = useState({});
  const [userID, setUserId] = useState(employeeId);
  // const [userID, setUserId] = useState(employeeId);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [permissions, setPermissions] = useState({});

  // const modules = [
  //   {
  //     group: '📊 Dashboard', items: [
  //       "Active Agent Dashboard", "Disposition Dashborad", 'Daily Visit Dashboard']
  //   },
  //   { group: '👥 User Management', items: ["User Creation", 'User Modification', 'User Web Create', 'Reset Password', 'Change Password', 'Unassigned Cases by Pincode', 'User Block Status'] },
  //   { group: '📄 Reports', items: ['SMA Summary', 'Visit Done Summary', 'Users Account History', 'Overall Performance Summary', 'Daily Uploaded Data', 'Insert / Update Summary Reports', 'Unassigned Cases by Pincode', 'User Tracking Report', 'Non Visit Done Summary', 'Current Months Unallocated Accounts', "Transaction Details"] },
  //   { group: '🛒 Agency', items: ['Agency Management', 'Agency Creation'] },
  //   { group: '⚙️ Admin', items: ["Contract Allocation Details"] }
  // ];

  const roleUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', avatar: 'avatar-1.webp', status: 'active', joined: 'Jan 15, 2024' },
    { id: 8, name: 'Chris Thompson', email: 'c.thompson@example.com', avatar: 'avatar-8.webp', status: 'active', joined: 'Nov 20, 2023' },
    { id: 9, name: 'Kevin Anderson', email: 'k.anderson@example.com', avatar: 'profile-img.webp', status: 'active', joined: 'Jan 1, 2024' }
  ];

  const handleSearch = async (userId) => {
    if (!userId) {
      showWarning('Enter User ID')
      return
    }
    try {
      const response = await apiClient.get(`/users/search-by-userid?userId=${userId}`)
      // console.log(response);
      if (response?.success) {
        setUserStatusDetails(response?.data);
        //   console.log("hearch res :", response)
        //   setUserDetails(response.data)
        //   setValue('userName', response.data.userName)
        //   setValue('userCurrentStatus', response.data.currentStatus)
      }
      else {
        setUserDetails({})
        //   setValue('userName', "")
        //   setValue('userCurrentStatus', "")
        showWarning(response?.message || 'No user found for this User ID')
      }
    } catch (error) {
      console.error(error)
      showError(error?.response?.data?.message || error?.message || 'Failed to fetch user details')
    }
  }

  const fetchPageAccessDetails = async () => {
    try {
      const response = await apiClient.get(
        `/users/get-page-access?userId=${userID}`
      );
      // ✅ correct API response check
      if (response.success) {
        setUserPageDetails(response?.data);

        const mappedPermissions = {};

        response.data.pages.forEach(page => {
          mappedPermissions[page.menuName] = {
            menuId: page.menuId,
            view: page.selected,
            create: page.selected,
            edit: page.selected,
            delete: page.selected,
            menuSelected: page.selected
          };
        });

        setPermissions(mappedPermissions);
      }
      // if (response.success) {
      //   const data = response.data;
      //   setUserPageAccessDetails(data);
      //   setValue("userId", data.userId);

      //   const userOfObj = userOfOptions.find((item) => item.label === data.userOf);
      //   const userOfValue = userOfObj ? userOfObj.value : "";
      //   setValue("userOf", userOfValue);

      //   setPageAccessList(data.pages);

      //   const selectedPages = data.pages
      //     .filter((page) => page.selected)
      //     .map((page) => page.menuId);
      //   setValue("accessPages", selectedPages);
      // } 
      else {
        showError(response?.message || "Failed to fetch page access details");
      }
    } catch (error) {
      console.error(error);
      showError(error?.response.message || error?.message || "Failed to fetch page access details");
    }
  }

  const getSelectedMenuIds = () => {
    // console.log(Object.values(permissions)
    //   .filter(p => p.menuSelected)
    //   .map(p => Number(p.menuId)));

    return Object.values(permissions)
      .filter(p => p.menuSelected)
      .map(p => Number(p.menuId));
  };

  const handleModifyStatus = async () => {
    try {
      if (!newStatus.trim().length) {
        // alert("Please select the status");
        showWarning('Please select the status');
        return;
      }
      const payload = {
        "userId": userStatusDetails?.userId,
        "newStatus": newStatus,
        "insBy": webUserId
      };
      const response = await apiClient.post("/users/modify-status-submit", payload);
      if (response.success && response.data.out_ErrorCode === -100) {
        showSuccess(response.data.out_ErrorMsg || 'User status updated successfully');
        // setOpenModifyStatusModal(false);
        setNewStatus("");
        handleSearch(userStatusDetails?.userId);
      }
    } catch (error) {
      console.error(error);
      showError(error?.response?.data?.message || error?.message || 'Failed to update user status');
    }
  }

  const handlePageAccess = async () => {
    try {
      const payload = {
        "userId": userPageDetails?.userId,
        "menuIds": getSelectedMenuIds()
      }
      // console.log(payload);
      // return;
      const response = await apiClient.post(`/users/update-page-access`, payload);
      if (response.success && response.data.out_ErrorCode === "9999") {
        showSuccess("Page Access Updated Successfully");
        // reset({
        //   userOf: "",
        //   userId: "",
        //   userName: "",
        //   accessPages: []
        // });
        // navigate("/User/FrmUserModification");
        handleSearch(userID);
    fetchPageAccessDetails();
      }
    } catch (error) {
      console.error(error);
      showError(error?.response?.data?.message || error?.message || 'Failed to update page access');
    }
  }
  // console.log(permissions);
  // const handlePermissionChange = (module, action) => {
  //   setPermissions(prev => ({
  //     ...prev,
  //     [module]: {
  //       ...prev[module],
  //       [action]: !prev[module][action]
  //     }
  //   }));
  // };

  const handleSelectAll = (module) => {
    const isSelected = permissions[module]?.menuSelected;

    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        view: !isSelected,
        create: !isSelected,
        edit: !isSelected,
        delete: !isSelected,
        menuSelected: !isSelected
      }
    }));
  };

  useEffect(() => {
    handleSearch(userID);
    fetchPageAccessDetails();
  }, [userID]);

  return (
    <div className="page-roles p-4">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Edit</h1>
          <nav className="breadcrumb">
            <a href="/" className="breadcrumb-item">Home</a>
            <span className="breadcrumb-item active">User Edit</span>
          </nav>
        </div>
        <div className="page-header-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="inline mr-1" size={14} /> Add Role
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Roles List */}
        <div className="col-xl-4 col-lg-5">
          {/* Role Info */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">Role Details</h5>
            </div>
            <div className="card-body">
              <div className="roles-detail-list">
                <div className="roles-detail">
                  <span className="roles-detail-label">Name</span>
                  <span className="roles-detail-value">{userPageDetails?.userName}</span>
                </div>
                <div className="roles-detail">
                  <span className="roles-detail-label">User Code</span>
                  <span className="roles-detail-value">{userPageDetails?.userId}</span>
                </div>
                <div className="roles-detail">
                  <span className="roles-detail-label">User Of</span>
                  <span className="roles-detail-value">{userPageDetails?.userOf}</span>
                </div>
                {/* <div className="roles-detail">
                  <span className="roles-detail-label">Last Modified</span>
                  <span className="roles-detail-value">May 15, 2024</span>
                </div> */}
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <div className='d-flex justify-content-between align-items-center'>
                <h5 className="card-title">Status</h5>
                <button
                  type='button'
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    handleModifyStatus();
                  }}
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
                  <option value="A"
                    disabled={userStatusDetails?.currentStatus === 'Active'}
                  >Active</option>
                  <option value="I"
                    disabled={userStatusDetails?.currentStatus === 'Inactive'}
                  >Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* <div className="card">
            <div className="card-header">
              <h5 className="card-title">Roles</h5>
            </div>
            <div className="card-body p-0">
              <div className="roles-list">
                {roles.map(role => (
                  <div
                    key={role.id}
                    className={`roles-item ${selectedRole.id === role.id ? 'active' : ''}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className={`roles-item-icon role-${role.color}`}>
                      {role.icon}
                    </div>
                    <div className="roles-item-info">
                      <span className="roles-item-name">{role.name}</span>
                      <span className="roles-item-count">{role.users} users</span>
                    </div>
                    <button className="roles-item-edit" title="Edit">
                      <Edit size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* Permissions & Users */}
        <div className="col-xl-8 col-lg-7">
          {/* Permissions Matrix */}
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title mb-0">Permissions Matrix</h5>
                <span className="roles-subtitle">Configure access for {selectedRole.name} role</span>
              </div>
              <button type='button' onClick={() => {
                handlePageAccess();
              }} className="btn btn-primary btn-sm">
                <span>✓</span> Save Changes
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table roles-perm-table mb-0">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th className="text-center">View</th>
                      <th className="text-center">Create</th>
                      <th className="text-center">Edit</th>
                      <th className="text-center">Delete</th>
                      <th className="text-center">All</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {modules.map((moduleGroup, gidx) => (
                      <React.Fragment key={gidx}>
                        <tr className="roles-perm-group">
                          <td colSpan="6">{moduleGroup.group}</td>
                        </tr>
                        {moduleGroup.items.map(module => (
                          <tr key={module}>
                            <td className="roles-perm-module">
                              {module.charAt(0).toUpperCase() + module.slice(1)}
                            </td>
                            <td className="text-center">
                              <input
                                type="checkbox"
                                disabled
                                className="form-check-input"
                                checked={permissions[module]?.view || false}
                                onChange={() => handlePermissionChange(module, 'view')}
                              />
                            </td>
                            <td className="text-center">
                              <input
                                type="checkbox"
                                disabled
                                className="form-check-input"
                                checked={permissions[module]?.create || false}
                                onChange={() => handlePermissionChange(module, 'create')}
                              />
                            </td>
                            <td className="text-center">
                              <input
                                type="checkbox"
                                disabled
                                className="form-check-input"
                                checked={permissions[module]?.edit || false}
                                onChange={() => handlePermissionChange(module, 'edit')}
                              />
                            </td>
                            <td className="text-center">
                              <input
                                type="checkbox"
                                disabled
                                className="form-check-input"
                                checked={permissions[module]?.delete || false}
                                onChange={() => handlePermissionChange(module, 'delete')}
                              />
                            </td>
                            <td className="text-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                // checked={
                                //   permissions[module]?.view &&
                                //   permissions[module]?.create &&
                                //   permissions[module]?.edit &&
                                //   permissions[module]?.delete
                                // }
                                checked={permissions[module]?.menuSelected || false}
                                onChange={() => handleSelectAll(module)}
                              />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))} */}
                    {Object.keys(permissions).map((module) => (
                      <tr key={module}>
                        <td className="roles-perm-module">
                          {module}
                        </td>

                        <td className="text-center">
                          <input
                            type="checkbox"
                            disabled
                            className="form-check-input"
                            checked={permissions[module]?.view || false}
                          />
                        </td>

                        <td className="text-center">
                          <input
                            type="checkbox"
                            disabled
                            className="form-check-input"
                            checked={permissions[module]?.create || false}
                          />
                        </td>

                        <td className="text-center">
                          <input
                            type="checkbox"
                            disabled
                            className="form-check-input"
                            checked={permissions[module]?.edit || false}
                          />
                        </td>

                        <td className="text-center">
                          <input
                            type="checkbox"
                            disabled
                            className="form-check-input"
                            checked={permissions[module]?.delete || false}
                          />
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

          {/* Users with this role */}
          {/* <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="card-title mb-0">Users with {selectedRole.name} Role</h5>
              <span className="roles-user-count">{selectedRole.users} users</span>
            </div>
            <div className="card-body p-0">
              <div className="roles-users-list">
                {roleUsers.map(user => (
                  <div key={user.id} className="roles-user">
                    <img src={`assets/img/avatars/${user.avatar}`} alt={user.name} className="roles-user-avatar" />
                    <div className="roles-user-info">
                      <span className="roles-user-name">{user.name}</span>
                      <span className="roles-user-email">{user.email}</span>
                    </div>
                    <span className="roles-user-status active">Active</span>
                    <span className="roles-user-date">{user.joined}</span>
                    <button className="btn btn-outline-danger btn-sm roles-user-remove" title="Remove role">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Role</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Role Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Enter role name" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" placeholder="Describe what this role can do"></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Copy Permissions From</label>
                    <select className="form-select">
                      <option value="">Start with no permissions</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                    <div className="form-text">Optionally copy permissions from an existing role.</div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">Create Role</button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}