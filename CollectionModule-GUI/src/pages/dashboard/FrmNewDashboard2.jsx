import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Search } from 'lucide-react';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import LineChart from '../../components/charts/LineChart';
import { Card } from '../../components/ui';
import { DataTable } from '../../components/tables/DataTable';
import TailwindGridTable from '../../components/reports/TailwindGridTable';

const FrmNewDashboard2 = () => {
    const { user } = useAuth();
    const userId = user?.userId;
    const brCategory = user?.brCategory;
    const userOf = user?.userProofType;
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


    const [tableHeader, setTableHeader] = useState([
        {
            field: "dispositionDate",
            displayName: "Disposition Date"
        },
        {
            field: "mdmId",
            displayName: "MDM ID"
        },
        {
            field: "branchName",
            displayName: "Branch Name"
        },
        {
            field: "accountNumber",
            displayName: "Account Number"
        },
        {
            field: "customerName",
            displayName: "Customer Name"
        },
        {
            field: "customerAddress",
            displayName: "Customer Address"
        },
        {
            field: "productType",
            displayName: "Product Type"
        },
        {
            field: "dispositionCode",
            displayName: "Disposition Code"
        },
        {
            field: "subDispositionCode",
            displayName: "Sub Disposition Code"
        },
        {
            field: "collectionAllocationName",
            displayName: "Collection Associate Name"
        },
        {
            field: "employeeId",
            displayName: "Employee ID"
        },
        {
            field: "latitude",
            displayName: "Latitude"
        },
        {
            field: "longitude",
            displayName: "Longitude"
        }
    ]);
    const [tableData, setTableData] = useState([]);
    const [firstChartData, setFirstChartData] = useState({
        labels: [],
        datasets: []
    });
    const [secondChartData, setSecondChartData] = useState({
        labels: [],
        datasets: []
    });
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

    const fetchData = async (monthYear) => {
        try {
            const [month, year] = monthYear.split("-");
            const userNo = userId.split("E")[1];

            const response = await apiClient.get(`/disposition-dashboard/report?month=${month}&year=${year}&userId=${userNo}&brCategory=${brCategory}&userOf=${userOf ?? 0}`, {});

            if (response.data.success) {
                const formattedChartOneData = {
                    labels: response.data.data.chart1.labels,
                    datasets: [
                        {
                            label: "Unique Agents Adding Disposition",
                            data: response.data.data.chart1.data,
                            borderColor: 'rgba(34, 197, 94, 1)',
                            backgroundColor: 'rgb(148, 231, 179)',
                            tension: 0.4,
                            fill: true,
                        }
                    ]
                };

                setFirstChartData(formattedChartOneData);

                const formattedChartSecondData = {
                    labels: response.data.data.chart2.labels,
                    datasets: [
                        {
                            label: "Dispositions Added in a Day",
                            data: response.data.data.chart2.data,
                            borderColor: 'rgb(163, 12, 218)',
                            backgroundColor: 'rgb(214, 131, 244)',
                            tension: 0.4,
                            fill: true,
                        }
                    ]
                };

                setSecondChartData(formattedChartSecondData);

                const formattedTableData = response.data.data.grid.map(item => ({
                    dispositionDate: item.TRANS_DATE,
                    mdmId: item.MDM_ID,
                    branchName: item.VAR_BANKDATA_BRANCH,
                    accountNumber: item.CONTRACTNUM,
                    customerName: item.CUSTOMERNAME,
                    customerAddress: item.CUSTOMERADDRESS,
                    productType: item.PRODUCT_TYPE,
                    dispositionCode: item.VISITSTSTS,
                    subDispositionCode: item.FEEDBACK,
                    collectionAllocationName: item.USERNAME,
                    employeeId: item.EMPLOYECODE,
                    latitude: item.LATTITUDE,
                    longitude: item.LONGTITUDE
                }));

                setTableData(formattedTableData);
                setShowDetails(true);
            }
        } catch (error) {
            console.error(error?.response);
        }
    }

    useEffect(() => {
        if (userId && brCategory) {
            const monthYear = getCurrentMonthYear();
            fetchData(monthYear);
        }
    }, [userId, brCategory, userOf])

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Count'
                },
                beginAtZero: true
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900">Disposition Report</h1>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <form>
                    <div className="flex flex-col md:flex-row gap-5">
                        <label className="block text-sm font-medium text-gray-900">Select Month: </label>
                        <select
                            {...register('monthYear', {
                                required: 'Month Year is required'
                            })}
                            onChange={(e) => {
                                setShowDetails(false);
                                const monthYear = e.target.value;
                                fetchData(monthYear);
                            }}
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
                    {showDetails &&
                        <>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7 w-full">
                                <Card className="w-full">
                                    <div className="p-4 w-full">
                                        <div className="relative h-[400px] w-full">
                                            <LineChart data={firstChartData} options={chartOptions} />
                                        </div>
                                    </div>
                                </Card>
                                <Card className="w-full">
                                    <div className="p-4 w-full">
                                        <div className="relative h-[400px] w-full">
                                            <LineChart data={secondChartData} options={chartOptions} />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="mt-7">
                                <TailwindGridTable
                                    title='Disposition Table'
                                    headers={tableHeader}
                                    rows={tableData}
                                />
                            </div>
                        </>
                    }

                </form>
            </div>
        </div>

    )
};

export default FrmNewDashboard2;