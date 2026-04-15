import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Search } from 'lucide-react';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import LineChart from '../../components/charts/LineChart';
import { Card } from '../../components/ui';
import TailwindGridTable from '../../components/reports/TailwindGridTable';

function FrmActiveAgents() {
    const { user } = useAuth();
    const userId = user?.userId;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: {
            monthYear: getCurrentMonthYear()    
        }
    });

    const [summaryDetails, setSummaryDetails] = useState({});
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const tableHeader = [
        {
            displayName: "Zone Name",
            field: "zone"
        },
        {
            displayName: "Region Name",
            field: "regionName",
        },
        {
            displayName: "Branch Name",
            field: "branchName"
        },
        {
            displayName: "Collection Associate ID",
            field: "collassociateId"
        },
        {
            displayName: "Collection Associate",
            field: "collassociate"
        },
        {
            displayName: "Login Date",
            field: "loginDate"
        },
        {
            displayName: "First Login of the Day",
            field: "firstLogin"
        },
        {
            displayName: "Last Logout of the Day",
            field: "lastLogout"
        },
        {
            displayName: "MDM ID",
            field: "mdmId"
        },
    ]
    const [tableData, setTableData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    function getCurrentMonthYear(padded = false) {
    const now = new Date();

    let month = now.getMonth() + 1; // 0-based → 1-based
    const year = now.getFullYear();

    if (padded) {
        month = String(month).padStart(2, '0');
    }

    return `${month}-${year}`;
}

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
    
    const fetchData = async (monthYear) => {
        try {
            const [month, year] = monthYear.split("-");
            const userNo = userId.split("E")[1];

            const response = await apiClient.get(`/active-agents/dashboard?userId=${userNo}&month=${month}&year=${year}`, {});

            if (response.data.success) {
                setSummaryDetails(response.data.data.summary);
                const formattedChartData = {
                    labels: response.data.data.chart.labels,
                    datasets: [
                        {
                            label: "Unique Collection Associate using the app on a day",
                            data: response.data.data.chart.data,
                            borderColor: 'rgba(59, 130, 246, 1)',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.4,
                            fill: true,
                        }
                    ]
                }
                setChartData(formattedChartData);

                const formattedGridData = response.data.data.grid.map(item => ({
                    zone: item.GRANDPARENT_BRANCH_NAME,
                    regionName: item.PARENT_BRANCH_NAME,
                    branchName: item.CURRENT_BRANCH_NAME,
                    collassociateId: item.USERID,
                    collassociate: item.VAR_USERMST_USERFULLNAME,
                    loginDate: item?.LOGIN_DATE ? formatDate(item.LOGIN_DATE) : "",
                    firstLogin: item?.MIN_LOGIN ? formatDate(item.MIN_LOGIN) : "",
                    lastLogout: item?.MAX_LOGOUT ? formatDate(item.MAX_LOGOUT) : "",
                    mdmId: item.MDM_ID
                }))
                setTableData(formattedGridData);
                setShowDetails(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = async (values) => {
        fetchData(values.monthYear);
    }

    useEffect(() => {
        if (userId) {
            const monthYearStr = getCurrentMonthYear();
            fetchData(monthYearStr);
        }
    }, [userId]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full px-4 py-6">
            <div className="w-full bg-white rounded-lg border border-gray-200 p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-8 my-3">
                        <p className='font-bold'>Collection Associate</p>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <label className="block text-sm font-medium text-gray-900" >Select Month & Year:</label>
                            <select
                                {...register('monthYear', {
                                    required: 'Month Year is required'
                                })}
                                defaultValue=""
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
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
                        <div>
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                {showDetails &&
                    <>
                        <div className="mt-7">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="flex gap-4 p-4 rounded-md border border-gray-200">
                                    <p className='font-semibold'>No. of Onboarded and Active Collection Associate: {summaryDetails?.onboardedActiveAssociates}</p>
                                </div>
                                <div className="flex gap-4 p-4 rounded-md border border-gray-200">
                                    <p className='font-semibold'>Collection Associate having Accounts Assigned: {summaryDetails?.accountsAssigned}</p>
                                </div>
                                <div className="flex gap-4 p-4 rounded-md border border-gray-200">
                                    <p className='font-semibold'>Total No. of Unique Logins: {summaryDetails?.uniqueLogins}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-7 w-full">
                            <Card className="w-full">
                                <div className="p-4 w-full">
                                    <div className="relative h-[400px] w-full">
                                        <LineChart data={chartData} options={{ maintainAspectRatio: false }} />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="mt-7">
                            <TailwindGridTable
                                title="Active Agents"
                                headers={tableHeader}
                                rows={tableData}
                            />
                        </div>
                    </>
                }
            </div>
            </div>

        </div>
    )
}

export default FrmActiveAgents