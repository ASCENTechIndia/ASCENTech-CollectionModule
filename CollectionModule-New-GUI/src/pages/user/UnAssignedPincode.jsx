// src/pages/UnAssignedPincode.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function UnAssignedPincode() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userIds, setUserIds] = useState([
    { id: "10001100078", totalCount: 1 },
    { id: "10001103073", totalCount: 3 },
    { id: "10201103033", totalCount: 2 },
  ]);
  const [userAssignedPincodes, setUserAssignedPincodes] = useState([
    { id: "10001100078", pincodes: ["123456"] },
    { id: "10201103033", pincodes: ["123436", "546343"] },
    { id: "10001103073", pincodes: ["111111", "222222", "344333"] },
  ]);

  const selectedUser = userAssignedPincodes.find(
    (user) => user.id === selectedUserId,
  );
  const selectedUserPincodes = selectedUser?.pincodes || [];

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="page-users-edit p-4">
      <div className="page-header">
        <div>
          <h1 className="page-title">UnAssigned Pincode</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">
              Home
            </Link>
            <span className="breadcrumb-item active">UnAssigned Pincode</span>
          </nav>
        </div>
      </div>

      <div>
        <div className="support-container">
          {/* Mobile Sidebar Overlay */}
          <div
            className="support-sidebar-overlay"
            id="supportSidebarOverlay"
          ></div>

          {/* Support Sidebar */}
          <div className="support-sidebar" id="supportSidebar">
            <button
              className="support-sidebar-close"
              id="supportSidebarClose"
              aria-label="Close sidebar"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="support-sidebar-header">
              <button
                className="btn btn-primary w-100"
                data-bs-toggle="modal"
                data-bs-target="#newTicketModal"
              >
                <i className="bi bi-plus-lg me-2"></i>New Ticket
              </button>
            </div>

            <div className="support-nav">
              {userIds.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  className={`support-nav-item ${selectedUserId === item.id ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleUserClick(item.id);
                  }}
                >
                  <i className="bi bi-person"></i>
                  <span>{item.id}</span>
                  <span className="badge">{item.totalCount}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Support Main */}
          <div className="support-main">
            <div className="support-header">
              <button
                className="support-sidebar-toggle"
                id="supportSidebarToggle"
                aria-label="Open categories"
              >
                <i className="bi bi-funnel"></i>
              </button>

              <div className="support-search">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search pincodes..."
                  id="pincodeSearch"
                />
              </div>
              <div className="support-header-actions">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-sort-down me-1"></i>Sort
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item active" href="#">
                        Newest First
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Oldest First
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Pincode Ascending
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Pincode Descending
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pincodes List in Horizontal Layout */}
            <div className="support-tickets">
              {selectedUserId ? (
                selectedUserPincodes.length > 0 ? (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
                  >
                    {selectedUserPincodes.map((pincode, idx) => (
                      <div className="act-session-item" key={idx}>
                        <span className="act-session-icon">
                          <input type="checkbox" className="form-check-input" />
                        </span>
                        <div className="act-session-copy">
                          <div className="act-session-name">
                            Pincode: {pincode}
                          </div>
                          <div className="act-session-meta">
                            Assigned to {selectedUserId}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4">
                    No pincodes assigned for this user.
                  </div>
                )
              ) : (
                <div className="text-center p-4">
                  Select a user from the left sidebar to view assigned pincodes.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
