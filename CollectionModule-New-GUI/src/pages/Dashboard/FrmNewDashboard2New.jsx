import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from "../../services/apiClient";
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";

const FrmNewDashboard2New = () => {
    const { user } = useAuth();
    const userId = user?.userId;
    const { showError } = useNotification();
    const [loading, setLoading] = useState(false);
    const [summaryDetails, setSummaryDetails] = useState({});
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [tableData, setTableData] = useState([]);
    const columns = [
        { label: 'Zone Name', sortable: false },
        { label: 'Region Name', sortable: false },
        { label: 'Branch Name', sortable: false },
        {
            label: 'Collection Associate ID',
            sortable: true,
        },
        {
            label: 'Collection Associate',
            sortable: false,
        },
        {
            label: 'Login Date',
            sortable: true,
        },
        {
            label: 'First Login of the Day',
            sortable: true,
        },
        {
            label: 'Last Logout of the Day',
            sortable: true,
        },
        {
            label: 'MDM ID',
            sortable: true,
        },
    ]
    const {
        register,
    } = useForm({
        defaultValues: {
            monthYear: getCurrentMonthYear()
        }
    });

    function getCurrentMonthYear(padded = false) {
        const now = new Date();

        let month = now.getMonth() + 1; // 0-based → 1-based
        const year = now.getFullYear();

        if (padded) {
            month = String(month).padStart(2, '0');
        }

        return `${month}-${year}`;
    }
    return (
        <div className="main">
            <div className="main-content page-users-view">
                <div className="page-users-view">
                    <div className="page-header uv-page-header">
                        <div>
                            <h1 className="page-title">Disposition Report</h1>
                            <nav className="breadcrumb">
                                <span className="breadcrumb-item">Home</span>
                                <span className="breadcrumb-item">Dashboard</span>
                                <span className="breadcrumb-item active">Disposition Dashboard</span>
                            </nav>
                        </div>
                        <div className="d-flex flex-column align-items-md-center">
                            {/* <label className="form-label mb-0">
                                Select Month & Year:
                            </label> */}
                            <select className="form-select"
                                style={{ maxWidth: '280px' }}
                                {...register("monthYear")}
                                onChange={(e) => {
                                    fetchData(e.target.value);
                                }}
                            >
                                <option value="4-2025">April 2025</option>
                                <option value="5-2025">May 2025</option>
                                <option value="6-2025">June 2025</option>
                                <option value="7-2025">July 2025</option>
                                <option value="8-2025">August 2025</option>
                                <option value="9-2025">September 2025</option>
                                <option value="10-2025">October 2025</option>
                                <option value="11-2025">November 2025</option>
                                <option value="12-2025">December 2025</option>
                                <option value="1-2026">January 2026</option>
                                <option value="2-2026">February 2026</option>
                                <option value="3-2026">March 2026</option>
                                <option value="4-2026">April 2026</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FrmNewDashboard2New;