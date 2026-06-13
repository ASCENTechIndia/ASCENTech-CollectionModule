import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  Edit,
  Search,
  Building,
} from "lucide-react";

import apiClient from "../../services/apiClient";
import { useLoader } from "../../context/LoaderContext";

const AgencyList = () => {
  const navigate = useNavigate();
  const { setLoader } = useLoader();

  const [agencies, setAgencies] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] =
    useState("all");
  const [filterType, setFilterType] =
    useState("all");
  const [filterStatus, setFilterStatus] =
    useState("all");

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [totalPages, setTotalPages] =
    useState(1);

  const [counts, setCounts] = useState({
    total: 0,
    active: 0,
    expired: 0,
  });

  const dropdownStyle = {
    padding: "0.375rem 2rem 0.375rem 0.75rem",
    fontSize: "0.875rem",
    border: "1px solid #dee2e6",
    borderRadius: "0.375rem",
    backgroundColor: "#fff",
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCompany("all");
    setFilterType("all");
    setFilterStatus("all");
    setPage(1);
  };

  const fetchCompanies = async () => {
    try {
      const res = await apiClient.get(
        "/company/dropdown"
      );

      if (res.success) {
        setCompanyOptions(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAgencies = async () => {
    try {
      setLoading(true);
      setLoader(true);

      const params =
        new URLSearchParams();

      if (filterCompany !== "all") {
        params.append(
          "companyId",
          filterCompany
        );
      }

      if (filterType !== "all") {
        params.append(
          "agencyType",
          filterType
        );
      }

      if (filterStatus !== "all") {
        params.append(
          "status",
          filterStatus
        );
      }

      params.append("page", page);
      params.append("limit", limit);

      const response =
        await apiClient.get(
          `/agency/list?${params.toString()}`
        );

      if (response.success) {
        setAgencies(
          response.data.records || []
        );

        setCounts(
          response.data.counts || {
            total: 0,
            active: 0,
            expired: 0,
          }
        );

        setTotalPages(
          response.data.pagination
            ?.totalPages || 1
        );
      }
    } catch (err) {
      console.error(err);
      setAgencies([]);
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    fetchAgencies();
  }, [
    page,
    filterCompany,
    filterType,
    filterStatus,
  ]);

  const filteredAgencies =
    agencies.filter((agency) => {
      return (
        agency.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        agency.code
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        agency.companyName
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
      );
    });

  const getStatusBadge = (status) => {
    if (status === "active") {
      return {
        class: "active",
        label: "Active",
      };
    }

    if (status === "expired") {
      return {
        class: "inactive",
        label: "Expired",
      };
    }

    return {
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
              Agency Master
            </h1>
          </div>

          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                navigate(
                  "/masters/agency/create"
                )
              }
            >
              <Building
                size={16}
                className="me-2"
              />
              Add Agency
            </button>
          </div>

        </div>

        {/* Statistics */}

        <div className="row g-4 mb-3">

          <div className="col-lg-4">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">

                <div className="d-flex align-items-center">

                  <div className="widget-stat-icon primary">
                    <i className="bi bi-building"></i>
                  </div>

                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">
                      Total Agencies
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

          <div className="col-lg-4">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">

                <div className="d-flex align-items-center">

                  <div className="widget-stat-icon warning">
                    <i className="bi bi-check-circle"></i>
                  </div>

                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">
                      Active Agencies
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

          <div className="col-lg-4">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">

                <div className="d-flex align-items-center">

                  <div className="widget-stat-icon danger">
                    <i className="bi bi-exclamation-circle"></i>
                  </div>

                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">
                      Expired License
                    </span>

                    <span className="widget-stat-value">
                      {counts.expired}
                    </span>
                  </div>

                </div>

                <div className="widget-stat-bar danger"></div>

              </div>
            </div>
          </div>

        </div>

        {/* List Card */}

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
                    filterStatus === "all"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFilterStatus("all")
                  }
                >
                  All
                </button>

                <button
                  className={`users-filter-tab ${
                    filterStatus === "active"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFilterStatus("active")
                  }
                >
                  Active
                </button>

                <button
                  className={`users-filter-tab ${
                    filterStatus ===
                    "inactive"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFilterStatus(
                      "inactive"
                    )
                  }
                >
                  Inactive
                </button>

              </div>

              <div className="users-toolbar-right">

                <div className="users-search">

                  <Search
                    className="search-icon"
                    size={16}
                  />

                  <input
                    type="text"
                    placeholder="Search Agency..."
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
                  value={filterCompany}
                  onChange={(e) =>
                    setFilterCompany(
                      e.target.value
                    )
                  }
                >
                  <option value="all">
                    All Companies
                  </option>

                  {companyOptions.map(
                    (company) => (
                      <option
                        key={
                          company.companyId
                        }
                        value={
                          company.companyId
                        }
                      >
                        {
                          company.companyName
                        }
                      </option>
                    )
                  )}
                </select>

                <select
                  style={dropdownStyle}
                  value={filterType}
                  onChange={(e) =>
                    setFilterType(
                      e.target.value
                    )
                  }
                >
                  <option value="all">
                    All Types
                  </option>
                  <option value="primary">
                    Primary
                  </option>
                  <option value="secondary">
                    Secondary
                  </option>
                  <option value="legal">
                    Legal
                  </option>
                  <option value="skip_trace">
                    Skip Trace
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* Table */}

          <div className="table-responsive users-table-wrap">

            {loading ? (
              <div className="text-center py-5">
                Loading Agencies...
              </div>
            ) : (
              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Agency</th>
                    <th>Company</th>
                    <th>Type</th>
                    <th>Coverage</th>
                    <th>License Expiry</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredAgencies.map(
                    (agency) => {
                      const status =
                        getStatusBadge(
                          agency.status
                        );

                      return (
                        <tr
                          key={
                            agency.agencyId
                          }
                        >
                          <td>
                            <strong>
                              {agency.name}
                            </strong>

                            <br />

                            <small>
                              {agency.code}
                            </small>
                          </td>

                          <td>
                            {
                              agency.companyName
                            }
                          </td>

                          <td>
                            {
                              agency.agencyType
                            }
                          </td>

                          <td>
                            {
                              agency.coverageText
                            }
                          </td>

                          <td>
                            {
                              agency.licenseExpiry
                            }
                          </td>

                          <td>
                            <span
                              className={`users-status ${status.class}`}
                            >
                              {
                                status.label
                              }
                            </span>
                          </td>

                          <td>
                            <div className="users-actions">

                              <Link
                                to={`/masters/agency/view/${agency.agencyId}`}
                                className="users-action-btn"
                              >
                                <Eye
                                  size={
                                    16
                                  }
                                />
                              </Link>

                              <Link
                                to={`/masters/agency/edit/${agency.agencyId}`}
                                className="users-action-btn"
                              >
                                <Edit
                                  size={
                                    16
                                  }
                                />
                              </Link>

                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>
            )}

          </div>

          {/* Pagination */}

          <div className="users-pagination">

            <div className="users-pagination-info">
              Page {page} of{" "}
              {totalPages}
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
                    setPage(
                      (prev) =>
                        prev - 1
                    )
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
                    setPage(
                      (prev) =>
                        prev + 1
                    )
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

export default AgencyList;