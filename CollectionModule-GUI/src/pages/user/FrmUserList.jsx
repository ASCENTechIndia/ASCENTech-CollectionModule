import { Card } from '../../components/ui'
import { Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui'
import { DataTable } from '../../components/tables/DataTable'
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiService';
import { useAuth } from "../../context/AuthContext";
// export default function FrmUserList() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         <div className="mb-6">
//           <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
//         </div>

//         <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
//           <Users size={48} className="mx-auto text-gray-400 mb-4" />
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
//           <p className="text-gray-600">User management page template. Implement with DataTable component.</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// const columns = [
//   {
//     key: "agentid",
//     label: "Agent ID"
//   },
//   {
//     key: "agentname",
//     label: "Agent Name"
//   },
//   {
//     key: "mobileno",
//     label: "Mobile Number"
//   },
//   {
//     key: "email",
//     label: "Email"
//   },
//   {
//     key: "role",
//     label: "Role"
//   }
// ];

// const data = [
//   { agentid: "E100011", agentname: "Hinduja Admin", mobileno: "9845120145", email: "admin@upass.com", role: "FOS" }
// ]

const FrmUserList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    userLevel: "",
    zoneRegionBranch: ""
  });

  const navigate = useNavigate();

  const { user } = useAuth();
  // console.log(user);
  const brCategory = user?.brCategory;
  const [selectedUserLevel, setSelectedUserLevel] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [tableHeader, setTableHeader] = useState([
    {
      key: "agentid",
      label: "Agent ID"
    },
    {
      key: "agentname",
      label: "Agent Name"
    },
    {
      key: "mobileno",
      label: "Mobile Number"
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "role",
      label: "Role"
    }
  ])
  const [tableData, setTableData] = useState([]);

  const fetchBranches = async () => {
    try {
      const response = await apiClient.get(`/users/getBranches/?brcategory=${brCategory}&userLevel=${selectedUserLevel}`, {});

      if (response.data.success && Array.isArray(response.data.data)) {
        const formattedOptions = response.data.data.map((item) => ({
          label: item.BRANCHNAME,
          value: item.BRID
        }))
        setBranchOptions(formattedOptions);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchAgents = async () => {
    try {
      const response = await apiClient.get(`/users/getAgents/?brid=${selectedBranch}`, {});

      if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        const formattedTableData = response.data.data.map((item) => ({
          ...item,
          agentid: item.USERID,
          agentname: item.EMPNAME,
          mobileno: item.MOBNO,
          email: item.EMAIL,
          role: item.VAR_USERROLE_NAME
        }));
        setTableData(formattedTableData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(selectedUserLevel, brCategory);
    if (!selectedUserLevel || !brCategory) return;

    fetchBranches();
  }, [selectedUserLevel, brCategory]);

  useEffect(() => {
    if (!selectedBranch) return;

    fetchAgents();
  }, [selectedBranch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">User Creation</h1>
        </div> */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row justify-start gap-5 mb-7">
            <button
              type='button'
              className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => {
                navigate("/User/FrmUserCreation")
              }}
            >
              New Mobile User
            </button>
            <button
              type="button"
              className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => {
                navigate("/User/FrmUserCreationWeb")
              }}
            >
              New Web User
            </button>
          </div>
          <hr className='my-7 h-[10px]' />
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Level<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register('userLevel')}
                  defaultValue=""
                  onChange={(e) => {
                    setSelectedUserLevel(e.target.value)
                    setTableData([]);
                    setSelectedBranch("");
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">-- Select Option --</option>
                  <option value="Zone">Zone</option>
                  <option value="Region">Region</option>
                  <option value="Branch">Branch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Zone/Region/Branch<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register('zoneRegionBranch')}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                  onChange={(e) => {
                    setSelectedBranch(e.target.value)
                  }}
                >
                  <option value="">--Select Option--</option>
                  {branchOptions.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {tableData.length > 0 &&
              <div className="mt-7">
                <DataTable
                  columns={tableHeader}
                  data={tableData}
                />
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default FrmUserList;
