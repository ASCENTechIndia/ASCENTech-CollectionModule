import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  Edit,
  Search,
  UserPlus,
  MapPin,
  Briefcase,
} from "lucide-react";

import apiClient from "../../services/apiClient";
import { useLoader } from "../../context/LoaderContext";

const FOSList = () => {
  const navigate = useNavigate();
  const { setLoader } = useLoader();

  const [fosList, setFosList] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [agencies, setAgencies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [companyId, setCompanyId] = useState("all");
  const [agencyId, setAgencyId] = useState("all");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [counts, setCounts] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    assignedCases: 0,
  });

  const dropdownStyle = {
    padding: "0.375rem 2rem 0.375rem 0.75rem",
    fontSize: "0.875rem",
    border: "1px solid #dee2e6",
    borderRadius: "0.375rem",
    backgroundColor: "#fff",
  };

  const clearFilters = () => {
    setCompanyId("all");
    setAgencyId("all");
    setStatus("all");
    setSearchTerm("");
    setPage(1);
  };

  const fetchCompanies = async () => {
    try {
      const res = await apiClient.get(
        "/company/dropdown"
      );

      if (res.success) {
        setCompanies(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAgencies = async () => {
    try {
      const res = await apiClient.get(
        `/agency/dropdown?companyId=${companyId}`
      );

      if (res.success) {
        setAgencies(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFOS = async () => {
    try {
      setLoading(true);
      setLoader(true);

      const params = new URLSearchParams();

      if (companyId !== "all") {
        params.append("companyId", companyId);
      }

      if (agencyId !== "all") {
        params.append("agencyId", agencyId);
      }

      if (status !== "all") {
        params.append("status", status);
      }

      params.append("page", page);
      params.append("limit", limit);

      const response = await apiClient.get(
        `/fos/list?${params.toString()}`
      );

      if (response.success) {
        setFosList(response.data.records || []);

        setCounts(
          response.data.counts || {
            total: 0,
            active: 0,
            inactive: 0,
            assignedCases: 0,
          }
        );

        setTotalPages(
          response.data.pagination?.totalPages || 1
        );
      }
    } catch (err) {
      console.error(err);
      setFosList([]);
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companyId !== "all") {
      fetchAgencies();
    }
  }, [companyId]);

  useEffect(() => {
    fetchFOS();
  }, [companyId, agencyId, status, page]);

  const filteredFOS = fosList.filter((fos) => {
    return (
      fos.employeeName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      fos.employeeCode
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      fos.mobile
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  const getStatusBadge = (status) => {
    return status === "active"
      ? {
          class: "active",
          label: "Active",
        }
      : {
          class: "inactive",
          label: "Inactive",
        };
  };

  return (
    <div className="main-content">
      <div className="page-users">

        {/* Header */}

        <div className="page-header users-page-header">
          <div>
            <h1 className="page-title">
              Field Officer (FOS)
            </h1>
          </div>

          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                navigate("/masters/fos/create")
              }
            >
              <UserPlus
                size={16}
                className="me-2"
              />
              Add FOS
            </button>
          </div>
        </div>

        {/* Statistics */}

        <div className="row g-4 mb-3">

          <div className="col-lg-3">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="widget-stat-icon primary">
                    <i className="bi bi-people"></i>
                  </div>

                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">
                      Total FOS
                    </span>

                    <span className="widget-stat-value">
                      {counts.total}
                    </span>
                  </div>
                </div>

                <div className="widget-stat-bar primary"></div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="widget-stat-icon warning">
                    <i className="bi bi-person-check"></i>
                  </div>

                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">
                      Active FOS
                    </span>

                    <span className="widget-stat-value">
                      {counts.active}
                    </span>
                  </div>
                </div>

                <div className="widget-stat-bar warning"></div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="widget-stat-icon danger">
                    <i className="bi bi-person-x"></i>
                  </div>

                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">
                      Inactive FOS
                    </span>

                    <span className="widget-stat-value">
                      {counts.inactive}
                    </span>
                  </div>
                </div>

                <div className="widget-stat-bar danger"></div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="widget-stat-icon success">
                    <i className="bi bi-briefcase"></i>
                  </div>

                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">
                      Assigned Cases
                    </span>

                    <span className="widget-stat-value">
                      {counts.assignedCases}
                    </span>
                  </div>
                </div>

                <div className="widget-stat-bar success"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Filters */}

        <div className="card users-list-card">

          <div className="users-toolbar">

            <div className="ms-auto mb-2">
              <button
                style={{
                  color: "#0ea5a4",
                  fontWeight: 600,
                }}
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>

            <div className="d-flex justify-content-between">

              <div className="users-filter-tabs">
                <button
                  className={`users-filter-tab ${
                    status === "all"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setStatus("all")
                  }
                >
                  All
                </button>

                <button
                  className={`users-filter-tab ${
                    status === "active"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setStatus("active")
                  }
                >
                  Active
                </button>

                <button
                  className={`users-filter-tab ${
                    status === "inactive"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setStatus("inactive")
                  }
                >
                  Inactive
                </button>
              </div>

              <div className="users-toolbar-right">

                <div className="users-search">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search FOS..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                  />
                </div>

                <select
                  style={dropdownStyle}
                  value={companyId}
                  onChange={(e) =>
                    setCompanyId(
                      e.target.value
                    )
                  }
                >
                  <option value="all">
                    All Companies
                  </option>

                  {companies.map((item) => (
                    <option
                      key={item.companyId}
                      value={item.companyId}
                    >
                      {item.companyName}
                    </option>
                  ))}
                </select>

                <select
                  style={dropdownStyle}
                  value={agencyId}
                  onChange={(e) =>
                    setAgencyId(
                      e.target.value
                    )
                  }
                >
                  <option value="all">
                    All Agencies
                  </option>

                  {agencies.map((item) => (
                    <option
                      key={item.agencyId}
                      value={item.agencyId}
                    >
                      {item.agencyName}
                    </option>
                  ))}
                </select>

              </div>

            </div>
          </div>

          {/* Table */}

          <div className="table-responsive users-table-wrap">

            <table className="table table-hover align-middle">

              <thead>
                <tr>
                  <th>FOS</th>
                  <th>Agency</th>
                  <th>Zone</th>
                  <th>Cases</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredFOS.map((fos) => {

                  const statusInfo =
                    getStatusBadge(
                      fos.status
                    );

                  return (
                    <tr key={fos.fosId}>

                      <td>
                        <div className="users-user">

                          <div className="users-avatar-wrap">
                            <img
                              src="/assets/img/profile-img.jpg"
                              alt=""
                              className="users-avatar"
                            />
                          </div>

                          <div className="users-user-info">

                            <span className="users-user-mobile">
                              {fos.employeeName}
                            </span>

                            <span className="users-user-email">
                              {fos.employeeCode}
                            </span>

                            <span className="users-user-email">
                              {fos.mobile}
                            </span>

                          </div>

                        </div>
                      </td>

                      <td>
                        {fos.agencyName}
                      </td>

                      <td>
                        <MapPin
                          size={14}
                          className="me-1"
                        />
                        {fos.zoneName}
                      </td>

                      <td>
                        <Briefcase
                          size={14}
                          className="me-1"
                        />
                        {fos.assignedCases}
                      </td>

                      <td>
                        <span
                          className={`users-status ${statusInfo.class}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      <td>
                        <div className="users-actions">

                          <Link
                            to={`/masters/fos/view/${fos.fosId}`}
                            className="users-action-btn"
                          >
                            <Eye size={16} />
                          </Link>

                          <Link
                            to={`/masters/fos/edit/${fos.fosId}`}
                            className="users-action-btn"
                          >
                            <Edit size={16} />
                          </Link>

                        </div>
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

          {/* Pagination */}

          <div className="users-pagination">

            <div className="users-pagination-info">
              Page {page} of {totalPages}
            </div>

            <ul className="pagination pagination-sm mb-0">

              <li
                className={`page-item ${
                  page === 1
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setPage((prev) => prev - 1)
                  }
                >
                  Previous
                </button>
              </li>

              <li
                className={`page-item ${
                  page === totalPages
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setPage((prev) => prev + 1)
                  }
                >
                  Next
                </button>
              </li>

            </ul>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FOSList;