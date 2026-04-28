import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Edit, Search, Plus, MapPinX, MapPinCheck, MapPinned, Trash2, Pin } from "lucide-react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/useNotification";
import { useForm } from "react-hook-form";
import { useConfirm } from "../../context/ConfirmModalContext";
import { useLoader } from "../../context/LoaderContext";

const FrmPincodeList = () => {
    const { user } = useAuth();
    const { showError, showSuccess, showWarning } = useNotification();
    const navigate = useNavigate();
    const confirm = useConfirm()
    const { setLoader } = useLoader();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: { pinCode: "" },
    });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const [page, setPage] = useState(1);
    const limit = 10; // fixed limit
    const [totalPages, setTotalPages] = useState(1);
    const [counts, setCounts] = useState({});

    const fetchAllPincodes = async () => {
        try {
            setLoader(true);
            const response = await apiClient.get("/assignPincode/fetchAllPincodesList");

            if (response.success && Array.isArray(response.data.pincodes) && response.data.pincodes.length > 0) {
                showSuccess(`Pincodes found: ${response.data.pincodes.length}`);
                setCounts({
                    total: response.data.summary.TOTAL_PINCODES,
                    assigned: response.data.summary.TOTAL_ASSIGNED,
                    unassigned: response.data.summary.TOTAL_UNASSIGNED
                })
                setTableData(response.data.pincodes);
            }
        } catch (error) {
            console.log(error);
            showError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch pincodes",
            );
        } finally {
            setLoader(false);
        }
    }

    const handleDelete = async (pinCode) => {
        const agreed = await confirm("Do you want to delete this pincode?");

        if (!agreed) return;

        try {
            setLoader(true);
            const payload = {
                "pincode": pinCode
            }
            // return;
            const response = await apiClient.delete("/assignPincode/deletePincode", {
                data: payload
            });

            if (response.success && response.message === "success") {
                showSuccess(response.data?.message);
                fetchAllPincodes();
            } else {
                showWarning(response?.message);
            }
        } catch (error) {
            console.error(error);
            showError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete the pincode",
            );
        } finally {
            setLoader(false)
        }
    }

    const onModalSubmit = async (values) => {
        try {
            setLoader(true);
            const payload = { pincode: values.pinCode };
            const response = await apiClient.post(
                "/assignPincode/insertPincodeMaster",
                payload,
            );

            if (response.success && response.data.isSuccess) {
                showSuccess(response.data.message || "Pincode inserted successfully");
                reset({ pinCode: "" });
                setShowModal(false);
                fetchAllPincodes();
            } else if (response.success && !response.data.isSuccess) {
                showError(response.data.message || "Failed to insert pincode");
            }
        } catch (error) {
            console.log(error);
            showError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to insert pincode",
            );
        } finally {
            setLoader(false);
        }
    };

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const filteredData = tableData.filter((item) => {
        const matchesSearch = item.VAR_PINCODE_NO
            ?.toString()
            .includes(searchTerm);

        const matchesFilter =
            filterStatus === "all" ||
            (filterStatus === "assigned" && item.ASSIGNED_COUNT > 0) ||
            (filterStatus === "unassigned" && item.ASSIGNED_COUNT === 0);

        return matchesSearch && matchesFilter;
    });

    const paginatedData = filteredData.slice(startIndex, endIndex);



    useEffect(() => {
        fetchAllPincodes();
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredData.length / limit) || 1);
    }, [filteredData]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(1);
        }
    }, [totalPages]);
    return (
        <div className="main-content">
            <div className="page-users">
                <div className="page-header users-page-header">
                    <div>
                        <h1 className="page-title">Pincode List</h1>
                    </div>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowModal(true)}
                    >
                        <Plus className="inline mr-2" size={16} /> Add Pincode
                    </button>
                </div>
                <div className="row g-4 mb-3">
                    <div className="col-lg-4 col-md-6">
                        <div className="card widget-stat-progress">
                            <div className="card-body">
                                <div className="widget-stat-icon primary">
                                    <MapPinned />
                                </div>
                                <div className="widget-stat-content">
                                    <span className="widget-stat-label">Total Pincode</span>
                                    <span className="widget-stat-value">{counts?.total}</span>
                                </div>
                                <div className="widget-stat-bar primary" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card widget-stat-progress">
                            <div className="card-body">
                                <div className="widget-stat-icon warning">
                                    <MapPinCheck />
                                </div>
                                <div className="widget-stat-content">
                                    <span className="widget-stat-label">Assigned Pincode</span>
                                    <span className="widget-stat-value">{counts?.assigned}</span>
                                </div>
                                <div className="widget-stat-bar warning" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card widget-stat-progress">
                            <div className="card-body">
                                <div className="widget-stat-icon danger">
                                    <MapPinX />
                                </div>
                                <div className="widget-stat-content">
                                    <span className="widget-stat-label">Unassigned Pincode</span>
                                    <span className="widget-stat-value">{counts?.unassigned}</span>
                                </div>
                                <div className="widget-stat-bar danger" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card users-list-card">
                    <div className="users-toolbar">
                        <div className="users-toolbar-left">
                            <div className="users-filter-tabs">
                                <button
                                    className={`users-filter-tab
                                        ${filterStatus === "all" ? "active" : ""}`
                                    }
                                    onClick={() => {
                                        setFilterStatus("all");
                                        setPage(1);
                                    }}
                                >
                                    All
                                    <span className="users-filter-count">{tableData.length}</span>
                                </button>
                                <button
                                    className={`users-filter-tab
                                        ${filterStatus === "assigned" ? "active" : ""}`
                                    }
                                    onClick={() => {
                                        setFilterStatus("assigned");
                                        setPage(1);
                                    }}
                                >
                                    Assigned{" "}
                                    <span className="users-filter-count">
                                        {tableData.filter((u) => u.ASSIGNED_COUNT > 0).length}
                                    </span>
                                </button>
                                <button
                                    className={`users-filter-tab
                                        ${filterStatus === "unassigned" ? "active" : ""}`
                                    }
                                    onClick={() => {
                                        setFilterStatus("unassigned");
                                        setPage(1);
                                    }}
                                >
                                    Unassigned{" "}
                                    <span className="users-filter-count">
                                        {tableData.filter((u) => u.ASSIGNED_COUNT === 0).length}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="users-toolbar-right">
                            <div className="users-search">
                                <Search className="inline search-icon" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search pincode.."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setPage(1);
                                    }}
                                    maxLength={6}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, "");
                                    }}
                                />
                            </div>

                            {/* <div className="d-flex gap-2">
                                <select style={dropdownStyle} value={userLevel} onChange={(e) => setUserLevel(e.target.value)}>
                                  <option value="">Select User Level</option>
                                  <option value="Zone">Zone</option>
                                  <option value="Region">Region</option>
                                  <option value="Branch">Branch</option>
                                </select>
                
                                <select
                                  style={dropdownStyle}
                                  value={branchId}
                                  onChange={(e) => setBranchId(e.target.value)}
                                  disabled={!userLevel}
                                >
                                  <option value="">Select Z/R/B</option>
                                  {branchOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                
                                <select
                                  style={dropdownStyle}
                                  value={filterRole}
                                  onChange={(e) => setFilterRole(e.target.value)}
                                >
                                  <option value="all">All roles</option>
                                  <option value="5">Generic</option>
                                  <option value="1">FOS</option>
                                </select>
                              </div> */}
                        </div>
                    </div>

                    <div className="table-responsive users-table-wrap">
                        {loading ? (
                            <div className="text-center py-5">Loading users...</div>
                        ) :
                            (
                                <table className="table table-hover align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Pincode</th>
                                            <th>Assigned Cases</th>
                                            <th>Status</th>
                                            <th className="users-th-actions">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.length > 0 && paginatedData.map((pincode, index) => (
                                            <tr key={index + 1}>
                                                <td>
                                                    <span className="badge bg-primary text-white p-2 gap-2">
                                                        <i class="bi bi-geo-fill"></i>
                                                        {pincode.VAR_PINCODE_NO}
                                                    </span>

                                                </td>
                                                <td>{pincode.ASSIGNED_COUNT}</td>
                                                <td>{pincode.VAR_PINCODE_ACTIVE === "Y" ? <span className="badge bg-success text-white">Active</span> : <span className="badge bg-danger text-white">Inactive</span>}</td>
                                                <td>
                                                    <div className="users-actions">
                                                        {/* <button type="button" onClick={() => {
                                                            setValue("pinCode", `${pincode.VAR_PINCODE_NO}`);
                                                            setShowModal(true);
                                                        }}>
                                                            <Edit size={16} />
                                                        </button> */}
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => {
                                                            handleDelete(pincode.VAR_PINCODE_NO);
                                                        }}>
                                                            <i class="bi bi-trash"></i>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                    </div>

                    <div className="users-pagination">
                        <div className="users-pagination-info">
                            Showing{" "}
                            <strong>
                                {filteredData.length === 0 ? 0 : (page - 1) * limit + 1} -{" "}
                                {Math.min(page * limit, filteredData.length)}
                            </strong>{" "}
                            of <strong>{filteredData.length}</strong> users
                        </div>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
                                        ← Previous
                                    </button>
                                </li>
                                <li className={`page-item ${page === totalPages || totalPages === 0 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage((prev) => prev + 1)}
                                        disabled={page === totalPages || totalPages === 0}
                                    >
                                        Next →
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
            {showModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ zIndex: 1050 }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Add Pincode</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowModal(false);
                                        reset()
                                    }}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit(onModalSubmit)}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Pincode</label>
                                        <input
                                            type="text"
                                            {...register("pinCode", {
                                                required: "Pincode is required",
                                                pattern: {
                                                    value: /^\d{6}$/,
                                                    message: "Pincode must be exactly 6 digits",
                                                },
                                            })}
                                            placeholder="Enter Pincode (6 digits)"
                                            maxLength={6}
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/\D/g, "");
                                            }}
                                            className={`form-control ${errors.pinCode ? "is-invalid" : ""}`}
                                        />

                                        {errors.pinCode && (
                                            <div className="invalid-feedback">
                                                {errors.pinCode.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setShowModal(false);
                                            reset()
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </form>


                        </div>
                    </div>

                    <div
                        className="modal-backdrop fade show"
                        style={{ zIndex: -1 }}
                    ></div>
                </div>
            )}
        </div>
    )
}

export default FrmPincodeList;