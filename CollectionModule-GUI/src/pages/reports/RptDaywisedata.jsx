


import React from 'react'
import { useForm } from 'react-hook-form'
import apiClient from '../../services/apiService';
import GridTable from '../../components/reports/GridTable';

const RptDaywisedata = () => {

  const today = new Date().toISOString().split('T')[0]

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const [tableData, setTableData] = React.useState([])
  const [showTable, setShowTable] = React.useState(false)

  const tableHeader = [
    { displayName: "Contract Upload Date" },
    { displayName: "Account Type" },
    { displayName: "EMI Amount" },
    { displayName: "DIFF IN INT CREDIT" },
    { displayName: "CAP UNPD INT" },
    { displayName: "COLLECTABLE AMOUNT" },
    { displayName: "SMA Type" }
  ];

  const keyMapping = {
    "Contract Upload Date": "uploadDate",
    "Account Type": "accountType",
    "EMI Amount": "emiAmount",
    "DIFF IN INT CREDIT": "diffInt",
    "CAP UNPD INT": "capUnpd",
    "COLLECTABLE AMOUNT": "collectable",
    "SMA Type": "sma"
  };

  // ✅ FORMAT DATE
  const formatDate = (date) => {
    if (!date) return ''

    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${day}-${month}-${year}`
  }

  // ✅ HANDLE SEARCH (FORM SUBMIT)
  const onSubmit = async (data) => {

    // VALIDATION (extra safety)


    try {
      const params = {
        startDate: formatDate(data.startDate),
        endDate: formatDate(data.endDate)
      }

      if (data.accountNo?.trim() !== '') {
        params.userId = data.accountNo
      }

      if (data.smaType !== '') {
        params.smaType = data.smaType
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

  return (
    <div className='bg-gray-50'>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className='mb-6'>
          <h1 className="text-2xl font-semibold text-gray-900">
            Daily Uploaded Data Report
          </h1>
        </div>


        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">

          {/* ✅ FORM START */}
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Start Date:
                </label>
                <input
                  type="date"
                  max={today}
                  {...register('startDate', {
                    required: 'Start Date is required'
                  })}
                  className="w-full border rounded px-3 py-2"
                />

                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select End Date:
                </label>
                <input
                  type="date"
                  max={today}
                  {...register('endDate', {
                    required: 'End Date is required'
                  })}
                  className="w-full border rounded px-3 py-2"
                />

                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Number:
                </label>
                <input
                  type="text"
                  {...register('accountNo')}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* SMA Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  SMA Type:
                </label>
                <select
                  {...register('smaType')}
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
            <div className="flex justify-center gap-4 mt-5">
              <button
                type="submit"
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => {
                  reset()
                  setShowTable(false)
                  setTableData([])
                }}
                className="px-8 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg"
              >
                Close
              </button>
            </div>

          </form>
          {/* ✅ FORM END */}

          {showTable && (
            <p className="mt-4 text-sm text-gray-700 mb-2">
              No Of Allocations: {tableData.length}
            </p>
          )}

          {tableData.length > 0 && (
            <div className="bg-white rounded-lg ">
              <GridTable
                title="Daily Uploaded Data Report"
                headers={tableHeader}
                rows={tableData}
                columnMapping={keyMapping}
              />
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default RptDaywisedata