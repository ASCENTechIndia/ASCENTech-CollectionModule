import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Edit, Search, Building2 } from "lucide-react";
import apiClient from "../../services/apiClient";
import { useLoader } from "../../context/LoaderContext";

const CompanyList = () => {
  const navigate = useNavigate();
  const { setLoader } = useLoader();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [totalPages, setTotalPages] = useState(1);

  const [counts, setCounts] = useState({
    total: 0,
    active: 0,
    inactive: 0,
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
    setFilterType("all");
    setFilterStatus("all");
    setPage(1);
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setLoader(true);

      const params = new URLSearchParams();

      if (filterType !== "all")
        params.append("companyType", filterType);

      if (filterStatus !== "all")
        params.append("status", filterStatus);

      params.append("page", page);
      params.append("limit", limit);

      const response = await apiClient.get(
        `/company/list?${params.toString()}`
      );

      if (response.success) {
        setCompanies(response.data.records || []);

        setCounts(
          response.data.counts || {
            total: 0,
            active: 0,
            inactive: 0,
          }
        );

        setTotalPages(
          response.data.pagination?.totalPages || 1
        );
      }
    } catch (err) {
      console.error(err);
      setCompanies([]);
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page, filterType, filterStatus]);

  const filteredCompanies = companies.filter((company) => {
    return (
      company.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      company.code
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      company.primaryEmail
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  const getStatusBadge = (status) => {
    return status === "active"
      ? { class: "active", label: "Active" }
      : { class: "inactive", label: "Inactive" };
  };

  return (
    <div className="main-content">

      <div className="page-users">

        <div className="page-header users-page-header">
          <div>
            <h1 className="page-title">
              Company Master
            </h1>
          </div>

          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                navigate("/masters/company/create")
              }
            >
              <Building2
                className="inline me-2"
                size={16}
              />
              Add Company
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
                      Total Companies
                    </span>

                    <span className="widget-stat-value">
                      {counts.total}
                    </span>
                  </div>
                </div>

                <div className="widget-stat-bar primary" />
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
                      Active Companies
                    </span>

                    <span className="widget-stat-value">
                      {counts.active}
                    </span>
                  </div>
                </div>

                <div className="widget-stat-bar warning" />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="widget-stat-icon danger">
                    <i className="bi bi-x-circle"></i>
                  </div>

                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">
                      Inactive Companies
                    </span>

                    <span className="widget-stat-value">
                      {counts.inactive}
                    </span>
                  </div>
                </div>

                <div className="widget-stat-bar danger" />
              </div>
            </div>
          </div>

        </div>

        <div className="card users-list-card">

          <div className="users-toolbar">

            <div className="ms-auto">
              <button
                onClick={clearFilters}
                style={{
                  color: "#0ea5a4",
                  fontWeight: 600,
                }}
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
                    filterStatus === "inactive"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFilterStatus("inactive")
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
                    placeholder="Search Company..."
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
                  <option value="bank">
                    Bank
                  </option>
                  <option value="nbfc">
                    NBFC
                  </option>
                  <option value="fintech">
                    Fintech
                  </option>
                  <option value="utility">
                    Utility
                  </option>
                  <option value="telecom">
                    Telecom
                  </option>
                </select>

              </div>

            </div>

          </div>

          <div className="table-responsive">

            {loading ? (
              <div className="text-center py-5">
                Loading Companies...
              </div>
            ) : (
              <table className="table table-hover align-middle mb-0">

                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Contact</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredCompanies.map(
                    (company) => {
                      const status =
                        getStatusBadge(
                          company.status
                        );

                      return (
                        <tr
                          key={
                            company.companyId
                          }
                        >
                          <td>
                            <strong>
                              {company.name}
                            </strong>

                            <br />

                            <small>
                              {company.code}
                            </small>
                          </td>

                          <td>
                            {
                              company.companyType
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
                            {
                              company.primaryEmail
                            }

                            <br />

                            {
                              company.phone
                            }
                          </td>

                          <td>
                            {
                              company.createdDate
                            }
                          </td>

                          <td>
                            <div className="users-actions">

                              <Link
                                to={`/masters/company/view/${company.companyId}`}
                                className="users-action-btn"
                              >
                                <Eye
                                  size={
                                    16
                                  }
                                />
                              </Link>

                              <Link
                                to={`/masters/company/edit/${company.companyId}`}
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
                    setPage(
                      page - 1
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
                      page + 1
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

export default CompanyList;