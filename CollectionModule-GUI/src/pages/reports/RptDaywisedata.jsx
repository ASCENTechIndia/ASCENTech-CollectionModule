import React, { useState } from 'react'
import apiClient from '../../services/apiService';

const RptDaywisedata = () => {

    const today = new Date().toISOString().split('T')[0]

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [smaType, setSmaType] = useState('')
    const [tableData, setTableData] = useState([])
    const [showTable, setShowTable] = useState(false)

    // Dummy Search (replace with API later)
   const handleSearch = async () => {
    try {
        const params = {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate)
        }

        // 👉 Optional params (VERY IMPORTANT)
        if (accountNo.trim() !== '') {
            params.userId = accountNo
        }

        if (smaType !== '') {
            params.smaType = smaType
        }

        const response = await apiClient.get(
            '/reports/dailyUploadedReport',
            { params }
        )

        const result = response.data

        if (result.success && result.data.length > 0) {

            const formatted = result.data.map(item => ({
                uploadDate: item.CONTRACTUPLOADDATE,
                accountNumber: item.CONTRACTNUMBER,
                accountType: item.ACCOUNTTYPE,
                emiAmount: item.EMI,
                diffInt: item.DIFF_IN_INT_CREDIT,
                capUnpd: item.CAP_UNPD_INT,
                collectable: item.COLLECTABLEAMOUNT,
                sma: item.VAR_BANKDATA_DPDBUCKET
            }))

            setTableData(formatted)
            setShowTable(true)

        } else {
            setTableData([])
            setShowTable(false)
            alert("No Data Found")
        }

    } catch (error) {
        console.error(error)
        alert("API Error")
    }
}


    const formatDate = (date) => {
    if (!date) return ''

    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${day}-${month}-${year}`
}

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

                {/* CARD */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">

                    {/* TITLE */}
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Daily Uploaded Data Report
                    </h2>

                    {/* FORM */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Select Start Date:
                            </label>
                            <input
                                type="date"
                                max={today}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Select End Date:
                            </label>
                            <input
                                type="date"
                                max={today}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* Account Number */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Account Number:
                            </label>
                            <input
                                type="text"
                                value={accountNo}
                                onChange={(e) => setAccountNo(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* SMA Type */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                SMA Type:
                            </label>
                            <select
                                value={smaType}
                                onChange={(e) => setSmaType(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">--Select Option--</option>
                                <option value="SMA0">SMA0</option>
                                <option value="SMA1">SMA1</option>
                                <option value="SMA2">SMA2</option>
                            </select>
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-4 mt-5">
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                        >
                            Search
                        </button>

                        <button
                            onClick={() => {
                                setStartDate('')
                                setEndDate('')
                                setAccountNo('')
                                setSmaType('')
                                setShowTable(false)
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>

                    {/* INFO */}
                    {showTable && (
                        <p className="mt-4 text-sm text-gray-700">
                            No Of Allocations: {tableData.length}
                        </p>
                    )}

                    {/* EXPORT BUTTON */}
                    {showTable && (
                        <div className="mt-3">
                            <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">
                                Export To Excel
                            </button>
                        </div>
                    )}

                    {/* TABLE */}
                    {showTable && (
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full border text-sm">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="p-2 border">Contract Upload Date</th>
                                        <th className="p-2 border">Account Number</th>
                                        <th className="p-2 border">Account Type</th>
                                        <th className="p-2 border">EMI Amount</th>
                                        <th className="p-2 border">DIFF IN INT CREDIT</th>
                                        <th className="p-2 border">CAP UNPD INT</th>
                                        <th className="p-2 border">COLLECTABLE AMOUNT</th>
                                        <th className="p-2 border">SMA Type</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border p-2">{row.uploadDate}</td>
                                            <td className="border p-2">{row.accountNumber}</td>
                                            <td className="border p-2">{row.accountType}</td>
                                            <td className="border p-2">{row.emiAmount}</td>
                                            <td className="border p-2">{row.diffInt}</td>
                                            <td className="border p-2">{row.capUnpd}</td>
                                            <td className="border p-2">{row.collectable}</td>
                                            <td className="border p-2">{row.sma}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default RptDaywisedata