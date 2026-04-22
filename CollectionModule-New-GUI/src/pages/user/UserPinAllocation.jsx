// src/pages/Roles.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { useNotification } from '../../context/useNotification';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
// import { fetchLayoutMode } from 'echarts/types/src/util/layout.js';

export default function UserPinAllocation() {
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
    <div className="page-users-edit p-4">
      <div className="page-header">
        <div>
          <h1 className="page-title">Pincode Allocation</h1>
          <nav className="breadcrumb">
            <a href="/" className="breadcrumb-item">Home</a>
            <span className="breadcrumb-item active">Pincode Allocation</span>
          </nav>
        </div>
        <div className="page-header-actions">
           <button type='button' className="btn btn-primary btn-sm">
                <span>✓</span> Save Changes
              </button>
        </div>
        
      </div>

      <div className="ue-summary-row mb-3">
          <div className="ue-summary-item">
            <span className="ue-summary-icon"><i className="bi bi-person-vcard"></i></span>
            <span className="ue-summary-label">User ID</span>
            <strong className="ue-summary-value">USR-001</strong>
          </div>
          <div className="ue-summary-item">
            <span className="ue-summary-icon"><i className="bi bi-shield-check"></i></span>
            <span className="ue-summary-label">Role</span>
            <strong className="ue-summary-value">Administrator</strong>
          </div>
          <div className="ue-summary-item">
            <span className="ue-summary-icon"><i className="bi bi-clock-history"></i></span>
            <span className="ue-summary-label">Last Login</span>
            <strong className="ue-summary-value">2 hours ago</strong>
          </div>
          <div className="ue-summary-item">
            <span className="ue-summary-icon"><i className="bi bi-graph-up-arrow"></i></span>
            <span className="ue-summary-label">Profile Score</span>
            <strong className="ue-summary-value">92%</strong>
          </div>
        </div>

        <div className="row g-3">

            <div className="col-xxl-8">
            <div className="card">
              <div className="card-header">
                <div>
                  <h5 className="card-title">Latest Reviews</h5>
                  <span className="text-muted small">Customer feedback from all channels</span>
                </div>
                <div className="card-actions d-flex gap-2">
                  <div className="input-group input-group-sm" style={{width: "150px"}}>
                    <span className="input-group-text"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control" placeholder="Search"/>
                  </div>
                  <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical"></i></button>
                </div>
              </div>
              <div className="card-body p-0">
                <table className="table widget-reviews-table mb-0">
                  <thead>
                    <tr>
                      <th><input type="checkbox" className="form-check-input"/></th>
                      <th>Customer</th>
                      <th>Reviews</th>
                      <th>Time</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" className="form-check-input"/></td>
                      <td>
                        <div className="widget-reviewer">
                          <img src="assets/img/avatars/avatar-1.webp" alt="User" className="widget-reviewer-avatar"/>
                          <div>
                            <div className="widget-reviewer-name">Rachel Torres</div>
                            <div className="widget-reviewer-email">rtorres@company.io</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="widget-review-text">Excellent interface and smooth onboarding. The team was very helpful...</p>
                      </td>
                      <td><span className="widget-review-time">Jan 14</span></td>
                      <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical"></i></button></td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" className="form-check-input"/></td>
                      <td>
                        <div className="widget-reviewer">
                          <img src="assets/img/avatars/avatar-2.webp" alt="User" className="widget-reviewer-avatar"/>
                          <div>
                            <div className="widget-reviewer-name">David Kim</div>
                            <div className="widget-reviewer-email">dkim@startup.co</div>
                            <div className="widget-reviewer-rating">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star"></i>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="widget-review-text">Great product overall. Performance improvements are noticeable after...</p>
                      </td>
                      <td><span className="widget-review-time">Jan 12</span></td>
                      <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical"></i></button></td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" className="form-check-input"/></td>
                      <td>
                        <div className="widget-reviewer">
                          <img src="assets/img/avatars/avatar-3.webp" alt="User" className="widget-reviewer-avatar"/>
                          <div>
                            <div className="widget-reviewer-name">Maria Santos</div>
                            <div className="widget-reviewer-email">msantos@design.net</div>
                            <div className="widget-reviewer-rating">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="widget-review-text">Absolutely love the new features. Customer support resolved my issue...</p>
                      </td>
                      <td><span className="widget-review-time">Jan 10</span></td>
                      <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical"></i></button></td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" className="form-check-input"/></td>
                      <td>
                        <div className="widget-reviewer">
                          <img src="assets/img/avatars/avatar-4.webp" alt="User" className="widget-reviewer-avatar"/>
                          <div>
                            <div className="widget-reviewer-name">Alex Bennett</div>
                            <div className="widget-reviewer-email">abennett@agency.com</div>
                            <div className="widget-reviewer-rating">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star"></i>
                              <i className="bi bi-star"></i>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="widget-review-text">Good value for the price. Would appreciate more customization options...</p>
                      </td>
                      <td><span className="widget-review-time">Jan 8</span></td>
                      <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical"></i></button></td>
                    </tr>
                  </tbody>
                </table>
                <div className="widget-table-footer">
                  <span className="text-muted small">1-4 of 47</span>
                  <button className="btn btn-primary btn-sm">View All Reviews</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">

        <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">Skills</h5>
              </div>
              <div className="card-body">
                <div className="profile-skills">
                  <span className="profile-skill">Design Systems</span>
                  <span className="profile-skill">Figma</span>
                  <span className="profile-skill">UX Research</span>
                  <span className="profile-skill">Interaction Design</span>
                  <span className="profile-skill">Accessibility</span>
                  <span className="profile-skill">HTML/CSS</span>
                  <span className="profile-skill">Prototyping</span>
                  <span className="profile-skill">Mentoring</span>
                </div>
              </div>
            </div>
</div></div>

    </div>
  );
}